"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../middleware/index";

export const getRoles = async () =>
  auth(async () => {
    const rankStuff = await prisma.rank.findMany();
    return rankStuff;
  });
