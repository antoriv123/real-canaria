import { cookies } from "next/headers";

const COOKIE_NAME = "rc_uid";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 días

export async function setSessionCookie(userId: number): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, String(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSessionUserId(): Promise<number | null> {
  const jar = await cookies();
  const v = jar.get(COOKIE_NAME)?.value;
  if (!v) return null;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
