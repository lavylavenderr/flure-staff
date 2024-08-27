"use server";

import z from "zod";
import { schemaAndAuth } from "../middleware";
import noblox from "@/lib/noblox";
import ky from "ky";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const staffSchema = z.object({
  discordId: z.string(),
  robloxId: z.string(),
  rankId: z.string(),
});

export const addStaff = async (formData: z.infer<typeof staffSchema>) =>
  schemaAndAuth(staffSchema, formData, async (data, user) => {
    let robloxUsername: string;
    let userInfo: any;
    let robloxAvatar;

    try {
      robloxUsername = await noblox.getUsernameFromId(parseInt(data.robloxId));
      robloxAvatar = await noblox.getPlayerThumbnail(
        parseInt(data.robloxId),
        420,
        "jpeg",
        false,
        "headshot"
      );
    } catch {
      throw new Error("INVALID_ROBLOX");
    }

    try {
      userInfo = await ky
        .get("https://discord.com/api/v9/users/" + formData.discordId, {
          headers: {
            Authorization: "Bot " + env.DISCORD_TOKEN,
          },
        })
        .json();
    } catch {
      throw new Error("INVALID_DISCORD");
    }

    const rank = await prisma.rank.findUnique({
      where: { id: parseInt(formData.rankId) },
    });
    if (!rank) throw new Error("INVALID_RANK");

    const requestingUser = await prisma.staff.findUnique({
      where: { id: user.id },
      include: { rank: true },
    });
    if (!requestingUser) throw new Error("UNAUTHORIZED");
    if (rank.displayOrder <= requestingUser.rank.displayOrder)
      throw new Error("INVALID_RANK");

    await prisma.staff.create({
      data: {
        robloxId: formData.robloxId,
        robloxUsername: robloxUsername,
        discordId: formData.discordId,
        discordUsername: userInfo.username,
        rank: {
          connect: {
            id: parseInt(formData.rankId),
          },
        },
        avatar: robloxAvatar[0].imageUrl!,
      },
    });

    return formData;
  });
