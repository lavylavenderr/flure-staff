import DashboardNav from "@/components/layout/navbar/client";
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
      {user && <DashboardNav />}
      <div className="container">{children}</div>
    </>
  );
}