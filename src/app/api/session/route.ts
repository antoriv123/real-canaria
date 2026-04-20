import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getUserById } from "@/lib/db";

export async function GET() {
  const uid = await getSessionUserId();
  if (!uid) return NextResponse.json({ user: null });
  const user = getUserById(uid);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      visitDate: user.visitDate,
      locale: user.locale,
    },
  });
}
