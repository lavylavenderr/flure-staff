import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await validateRequest();  
  if (!session) return redirect("/login")
  else return redirect("/dashboard")
}
