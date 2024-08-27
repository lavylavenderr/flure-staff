import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateRandomColor } from "@/lib/color";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import StaffOverviewYearly from "./flightChart";
import { AtSign, Calendar, ContactRound } from "lucide-react";

const StaffInfo = async ({ params }: { params: { id: string } }) => {
  const userData = await prisma.staff.findUnique({
    where: { id: parseInt(params.id) },
    include: { rank: true },
  });
  if (!userData) redirect("/dashboard/staff");

  return (
    <div className="px-4 sm:px-6 lg:px-8 h-full">
      <h1 className="text-2xl font-semibold border-b border-gray-200 pb-3">
        Flure Group
      </h1>
      <div className="animate-in slide-in-from-left mt-4 flex flew-row justify-between flex-wrap gap-4">
        <div className="w-full">
          <div className="mt-4 flex flex-row justify-between flex-wrap gap-4">
            <div className="flex flex-row gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData?.avatar}
                  alt="Avatar"
                  className={cn(
                    generateRandomColor(userData.robloxUsername),
                    "rounded-full border-[#922D79] border-4 h-24 w-24"
                  )}
                />
                <AvatarFallback>UwU</AvatarFallback>
              </Avatar>
              <div className="self-center align-middle">
                <a
                  target="_blank"
                  className="transition hover:text-[#922D79] font-bold text-2xl"
                  href={`https://www.roblox.com/users/${userData.robloxId}/profile`}
                >
                  {userData.robloxUsername}{" "}
                  <span className="text-gray-300 font-semibold">
                    (@{userData.discordUsername})
                  </span>
                </a>
                <p className="text-lg font-semibold text-gray-500">
                  {userData.rank.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 min-w-[200px] flex-wrap">
          <div className="border-2 transition border-gray-100 rounded-lg py-2 grow">
            <p className="text-center font-bold text-2xl">0</p>
            <p className="text-center font-semibold text-sm">Total Flights</p>
            <p className="text-center text-xs font-semibold">this month</p>
          </div>
          <div className="border-2 transition border-gray-100 rounded-lg py-2 grow">
            <p className="text-center font-bold text-2xl">0</p>
            <p className="text-center font-semibold text-sm">Total Flights</p>
            <p className="text-center text-xs font-semibold">this year</p>
          </div>
          <div className="border-2 transition border-gray-100 rounded-lg py-2 grow">
            <p className="text-center font-bold text-2xl">0</p>
            <p className="text-center font-semibold text-sm">
              Attended Trainings
            </p>
            <p className="text-center text-xs font-semibold">
              within the last 6 months
            </p>
          </div>
          <div className="border-2 transition border-gray-100 rounded-lg py-2 grow">
            <p className="text-center font-bold text-2xl">0</p>
            <p className="text-center font-semibold text-sm">
              Hosted Trainings
            </p>
            <p className="text-center text-xs font-semibold">
              within the last 6 months
            </p>
          </div>
          <div className="border-2 transition border-gray-100 rounded-lg py-2 grow">
            <p className="text-center font-bold text-2xl">0</p>
            <p className="text-center font-semibold text-sm">Warnings</p>
            <p className="text-center text-xs font-semibold">
              within the last 6 months
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border-2 transition rounded-lg border-gray-100 p-3">
            <h1 className="text-md font-bold pb-3 pl-2  w-full">
              Monthly Summary
            </h1>
            <StaffOverviewYearly />
          </div>
          <div className="border-2 transition rounded-lg border-gray-100 p-3">
            <h1 className="text-md font-bold pb-3 pl-2  w-full">
              Yearly Summary
            </h1>
            <StaffOverviewYearly />
          </div>
        </div>
        <div className="w-full">
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-row gap-2 border-2 transition px-2 border-gray-100 py-1 rounded-lg">
              <ContactRound className="w-6 h06 text-gray-400 self-center align-middle" />
              <div>
                <small>Roblox User ID</small>
                <div className="self-center align-middle flex flex-row gap-2">
                  <p className="w-full">{userData.robloxId}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 border-2 transition px-2 border-gray-100 py-1 rounded-lg">
              <AtSign className="w-6 h06 text-gray-400 self-center align-middle" />
              <div>
                <small>Discord ID</small>
                <div className="self-center align-middle flex flex-row gap-2">
                  <p className="w-full">{userData.discordId}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 border-2 transition px-2 border-gray-100 py-1 rounded-lg">
              <Calendar className="w-6 h06 text-gray-400 self-center align-middle" />
              <div>
                <small>Added to Staff Hub</small>
                <div className="self-center align-middle flex flex-row gap-2">
                  <p className="w-full">{format(new Date(), "dd/MM/yyyy")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffInfo;
