import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

export default async function StaffList() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const staffMem = await prisma.staff.findUnique({
    where: {
      id: user.id,
    },
    include: {
      rank: true,
    },
  });

  const staffData = await prisma.staff.findMany({
    include: {
      rank: {
        select: {
          name: true,
          displayOrder: true,
          id: true,
        },
      },
    },
  });

  staffData.sort((a, b) => a.rank.displayOrder - b.rank.displayOrder);

  const sortedStaffInfo = [];

  for (const staff of staffData) {
    sortedStaffInfo.push({
      id: staff.id,
      robloxUsername: staff.robloxUsername,
      discordUsername: staff.discordUsername,
      rank: staff.rank.name,
      rankId: staff.rank.id,
      robloxId: staff.robloxId,
      discordId: staff.discordId,
      rankViewOrder: staff.rank.displayOrder
    });
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <h1 className="text-2xl font-semibold border-b border-gray-200 pb-3">Staff Members</h1>
        <DataTable
          userId={user.id}
          columns={columns}
          data={sortedStaffInfo}
          manageStaff={staffMem!.rank.manageStaff}
          rankOrder={staffMem!.rank.displayOrder}
        />
      </div>
    </>
  );
}
