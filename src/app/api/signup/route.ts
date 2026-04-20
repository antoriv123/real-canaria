import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateUser } from "@/lib/db";
import { setSessionCookie } from "@/lib/session";
import { isValidEmail } from "@/lib/utils";
import { locales } from "@/i18n/config";

// Rate limit en memoria (por IP) — simple, suficiente para MVP
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 60 * 1000;

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && now < entry.resetAt && entry.count >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const visitDate = typeof body.visitDate === "string" ? body.visitDate : "";
  const locale = typeof body.locale === "string" ? body.locale : "en";

  // Validación
  if (!name || name.length < 1 || name.length > 100) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (!(locales as readonly string[]).includes(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  // Registrar/actualizar y crear sesión
  const user = createOrUpdateUser({
    name,
    email,
    visitDate,
    locale: locale as (typeof locales)[number],
  });

  await setSessionCookie(user.id);

  // Actualizar rate limit
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count++;
  }

  return NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, visitDate: user.visitDate },
  });
}
