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
    });
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <h1 className="text-2xl font-semibold border-b border-gray-200 pb-3">Staff Members</h1>
        {staffMem?.rank.manageStaff ? (
          <div className="flex flex-row mb-1 mt-4 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
              <Plus className="h-4 w-4 mt-[2px]" />
              <span>Add Staff</span>
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700 flex items-center gap-1">
              <RefreshCw className="h-4 w-4 mt-[2px]" />
              <span>Reactivate Account</span>
            </Button>
          </div>
        ) : (
          <></>
        )}
        <DataTable
          columns={columns}
          data={sortedStaffInfo}
          manageStaff={staffMem!.rank.manageStaff}
        />
      </div>
    </>
  );
}
