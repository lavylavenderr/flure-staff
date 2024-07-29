import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const { user } = await validateRequest();
  if (user) return redirect("/dashboard");

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[url('/assets/waves.svg')] bg-cover !overscroll-none !overflow-hidden">
        <Card className={cn("w-[380px]", "m-2")}>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Welcome to Flure, go ahead and login below.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/login/discord">
              <Button className="w-full bg-[#B52678] hover:bg-[#B52678]">
                Login with Discord
              </Button>
            </Link>
            <Link href="/login/roblox">
              <Button className="w-full bg-[#B52678] hover:bg-[#B52678]">
                Login with Roblox
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
