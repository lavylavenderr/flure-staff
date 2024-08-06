import { lucia } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import axios from "axios";
import { DiscordUser, AccessTokenResponse } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { getIP } from "@/lib/ip";
import { OAuth2RequestError } from "arctic";
import { discord } from "@/lib/discord";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("discord_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const { data: userData } = await axios.get<DiscordUser>(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const staffMember = await prisma.staff.findUnique({
      where: {
        discordId: userData.id,
      },
    });

    if (staffMember) {
      const session = await lucia.createSession(staffMember.id, {
        ipAddress: getIP(),
        userAgent: headers().get("User-Agent") ?? "None found",
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
        },
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/invalid",
        },
      });
    }
  } catch (error) {
    console.log(error);

    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
