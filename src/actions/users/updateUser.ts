"use server";

import z from "zod";
import { schemaAndAuth } from "../middleware";
import noblox from "@/lib/noblox";
import ky from "ky";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const formSchema = z.object({
  discordId: z.string(),
  robloxId: z.string(),
  rankId: z.string(),
  staffId: z.number(),
});

export const updateUser = async (formData: z.infer<typeof formSchema>) =>
  schemaAndAuth(formSchema, formData, async (data, user) => {
    const robloxUsername = await noblox.getUsernameFromId(
      parseInt(data.robloxId)
    );
    if (!robloxUsername) throw new Error("Roblox User Does Not Exist");

    let userInfo: any;

    try {
      userInfo = await ky
        .get("https://discord.com/api/v9/users/" + formData.discordId, {
          headers: {
            Authorization: "Bot " + env.DISCORD_TOKEN,
          },
        })
        .json();
    } catch {
      throw new Error("Discord ID Invalid");
    }

    const rank = await prisma.rank.findUnique({
      where: { id: parseInt(formData.rankId) },
    });
    if (!rank) throw new Error("Invalid Rank");

    const requestingUser = await prisma.staff.findUnique({
      where: { id: user.id },
      include: { rank: true },
    });
    if (!requestingUser) throw new Error("Unauthorized");
    if (rank.displayOrder <= requestingUser.rank.displayOrder)
      throw new Error("Cannot Manage Users Higher Than You");

    await prisma.staff.update({
      where: { id: formData.staffId },
      data: {
        robloxId: formData.robloxId,
        robloxUsername: robloxUsername,
        discordUsername: userInfo.username,
        discordId: formData.discordId,
        rank: {
          connect: {
            id: parseInt(formData.rankId),
          },
        },
      },
    });

    return {
      message: "OK",
    };
  });
