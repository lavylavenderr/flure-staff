import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { generateRandomColor } from "@/lib/color";
import { prisma } from "@/lib/prisma";

import { cn } from "@/lib/utils";
import { Calendar, Megaphone, PersonStanding, Plane, User } from "lucide-react";
import { redirect } from "next/navigation";
import { Overview } from "./components/overview";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YearOverview } from "./components/year";
import { endOfMonth, startOfMonth } from "date-fns";

export default async function StaffHome() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  let attendedFlights = 0;
  const usrData = await prisma.staff.findUnique({
    where: {
      id: user.id,
    },
  });

  const staffCount = await prisma.staff.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const flightsMonthly = await prisma.flight.findMany({
    where: {
      dateTime: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
    include: {
      attendees: true,
    },
  });

  for (const flight of flightsMonthly) {
    for (const attendee of flight.attendees) {
      if (attendee.id == user.id) {
        attendedFlights = attendedFlights + 1;
      }
    }
  }

  return (
    <>
      <div className="animate-in slide-in-from-left px-4 sm:px-6 lg:px-8 h-full">
        <h1 className="text-2xl font-semibold border-b border-gray-200 pb-3">
          Dashboard
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          <Card>
            <CardHeader className="flex flex-wrap mt-1 space-y-0 ">
              <CardTitle className="text-lg font-bold">
                Welcome back, {usrData?.robloxUsername}!
              </CardTitle>
              <CardDescription>Make yourself at home.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Flights This Month
              </CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flightsMonthly.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Attended Flights
              </CardTitle>
              <Megaphone className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendedFlights}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <User className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffCount.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle className="text-xl">Overview of Flights</CardTitle>
            </CardHeader>
            <CardContent className="-ml-10">
              <Overview />
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 col-span-5">
            <CardHeader>
              <CardTitle className="text-xl">New Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {staffCount.slice(0,5).map((usrData, index) => (
                  <div className="flex items-center" key={index}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={usrData?.avatar}
                        alt="Avatar"
                        className={generateRandomColor(usrData.robloxUsername)}
                      />
                      <AvatarFallback>UwU</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {usrData.discordUsername}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {usrData.robloxUsername}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full mt-4 h-96 mb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Yearly Flight Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <YearOverview />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
