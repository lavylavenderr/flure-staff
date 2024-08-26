import DashboardNav from "@/components/layout/navbar/client";
import SidebarNav from "@/components/layout/sidebar/client";
import { validateRequest } from "@/lib/auth";
import type React from "react";

export default async function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <>
      <div className="first-letter:h-screen bg-white transition">
        {user && <SidebarNav />}
        <div className="py-10 lg:pl-72 h-full min-h-screen first-letter:h-screen transition bg-white">
          {children}
        </div>
      </div>
    </>
  );
}
