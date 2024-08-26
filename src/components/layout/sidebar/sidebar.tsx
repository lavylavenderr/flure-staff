"use client";

import { Rank } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateRandomColor } from "@/lib/color";
import {
  Book,
  Cog,
  Hammer,
  Home,
  List,
  LogOut,
  Menu,
  PersonStanding,
  Plane,
  Settings,
  Shield,
  TreePalm,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

interface ExpectedData {
  avatar: string;
  username: string;
  rank: Rank;
}

export function Sidebar({ avatar, username, rank }: ExpectedData) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center gap-x-6 bg-[#922D79] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger className="md:hidden" asChild>
            <Menu className="h-6 w-6 text-white" />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-[#922D79]">
            <div className="w-full space-y-3">
              <div className="-mx-2 space-y-1">
                <a
                  className="text-white bg-[#641f53] group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard"
                >
                  <div className="flex flex-row  gap-2 justify-center">
                    <Home className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Dashboard</p>
                  </div>
                </a>
                <a
                  className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <Plane className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Flight Overview</p>
                  </div>
                </a>
                <a
                  className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <List className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Staff List</p>
                  </div>
                </a>
                <a
                  className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <TreePalm className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Leave of Absenses</p>
                  </div>
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold leading-6 text-white">
                  Admin Section
                </div>
                <div className="-mx-2 space-y-1">
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Cog className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Flight Admin</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Book className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Training</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Hammer className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Blacklist</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Shield className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Flure Lead</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1 text-sm font-semibold leading-6 text-white"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer select-none">
              <AvatarImage
                draggable="false"
                src={avatar}
                alt="User Avatar"
                className={generateRandomColor("a")}
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-46" align="end" forceMount>
            <DropdownMenuLabel className="text-sm">
              {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <Link href="/logout">
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden lg:fixed lg:flex lg:flex-col lg:z-30 lg:inset-y-0 lg:w-72 h-fit lg:h-screen bg-[#922D79]">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#922D79] px-6 py-2">
          <div className="flex h-16 shrink-0 items-center">
            <img
              src="/assets/flurewhite.png"
              alt="Sidebar icon"
              className="w-auto h-8"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-y-7">
              <div className="-mx-2 space-y-1">
                <a
                  className="text-white hover:bg-[#641f53] transition-colors group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard"
                >
                  <div className="flex flex-row  gap-2 justify-center">
                    <Home className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Dashboard</p>
                  </div>
                </a>
                <a
                  className="text-white hover:bg-[#641f53] transition-colors group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard/flights"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <Plane className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Flight Overview</p>
                  </div>
                </a>
                <a
                  className="text-white hover:bg-[#641f53] transition-colors group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard/staff"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <List className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Staff List</p>
                  </div>
                </a>
                <a
                  className="text-white group hover:bg-[#641f53] transition-colors flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  href="/dashboard/absenses"
                >
                  <div className="flex flex-row gap-2 justify-center">
                    <TreePalm className="text-white h-6 w-6 shrink-0" />{" "}
                    <p className="self-center">Leave of Absenses</p>
                  </div>
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold leading-6 text-white">
                  Admin Section
                </div>
                <div className="-mx-2 space-y-1">
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Cog className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Flight Admin</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Book className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Training</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Hammer className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Blacklist</p>
                    </div>
                  </a>
                  <a
                    className="text-white group flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    href="/dashboard"
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <Shield className="text-white h-6 w-6 shrink-0" />{" "}
                      <p className="self-center">Flure Lead</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="-mx-6 mt-auto w-ull">
                <div className="flex cursor-pointer items-center w-full gap-x-4 px-6 py-3 text-sm font-semibold rounded-none leading-6 text-white bg-[#922D79] hover:bg-[#641f53]">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      draggable={false}
                      src={avatar}
                      alt="User Avatar"
                      className={generateRandomColor(username)}
                    />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{username}</span>
                </div>
              </div>
            </div>
            <footer className="mt-2">
              <div className="border-t py-3 text-center text-sm transition text-gray-199 sm:text-left">
                <p className="text-gray-300 text-xs text-center">
                  © 2024 Flure Group, All rights reserved.
                </p>
              </div>
            </footer>
          </nav>
        </div>
      </div>
    </>
  );
}
