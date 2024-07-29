import { headers } from "next/headers";

export function getIP() {
  const fallback = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? fallback;
  }

  return headers().get("x-real-ip") ?? fallback;
}