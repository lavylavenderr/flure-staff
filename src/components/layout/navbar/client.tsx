import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "./drawer";

export default async function DashboardNav() {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  return <Navbar avatar={session.user.avatar} username={session.user.robloxUsername}  />;
}