"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { generateRandomColor } from "@/lib/color";
import { LogOut, Settings, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ExpectedData {
  avatar: string;
  username: string;
}

export async function Navbar({ avatar, username }: ExpectedData) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-[#922D79] text-white">
      <div className="container mx-auto">
        <div className="flex h-16 items-center">
          <Link href="/dashboard">
            <img src="/assets/flurewhite.png" className="h-8" />
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <nav className="hidden md:flex items-center mx-4 space-x-6">
              <Link href="/dashboard/flights">Flights</Link>
              <Link href="/dashboard/staff">Staff</Link>
              <Link href="/dashboard/documents">Documents</Link>
            </nav>
            <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger className="md:hidden" asChild>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent>
                <div className="w-full space-y-3">
                  <Link href="/dashboard/flights">Flights</Link>
                  <Link href="/dashboard/staff">Staff</Link>
                  <Link href="/dashboard/documents">Documents</Link>
                </div>
              </SheetContent>
            </Sheet>
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
        </div>
      </div>
    </div>
  );
}
