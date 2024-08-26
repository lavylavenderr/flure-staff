import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "./sidebar";
import { prisma } from "@/lib/prisma";

export default async function DashboardNav() {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  const userData = await prisma.staff.findUnique({
    where: { id: session.user.id },
    include: { rank: true },
  });

  return (
    <Sidebar
      avatar={session.user.avatar}
      username={session.user.robloxUsername}
      rank={userData!.rank}
    />
  );
}
