import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

/**
 * Base URL del sitio. Se lee de NEXT_PUBLIC_SITE_URL (setear en Vercel).
 * Si migra de dominio (subdominio Casitas Canarias, dominio propio), solo
 * cambia esta variable de entorno — nada hardcodeado.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://real-canaria.vercel.app";

/**
 * URL externa a Casitas Canarias para cross-sell. Si un día se cambia el
 * dominio de CC, solo se toca esta env var.
 */
export const CASITAS_URL =
  process.env.NEXT_PUBLIC_CASITAS_URL ?? "https://casitascanarias.com";

/** Construye una URL absoluta dentro del sitio, opcionalmente localizada. */
export function absoluteUrl(path: string = "", locale?: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale) return `${SITE_URL}/${locale}${clean === "/" ? "" : clean}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

/** Mapa hreflang → URL absoluta para los 6 locales, dado un path (sin locale). */
export function hreflangMap(path: string = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of routing.locales) {
    out[loc] = absoluteUrl(path, loc);
  }
  return out;
}

/** URL canonical para una página localizada. */
export function canonicalUrl(locale: Locale | string, path: string = ""): string {
  return absoluteUrl(path, locale);
}

/**
 * Añade parámetros UTM a una URL externa (ej. casitascanarias.com) para
 * medir el tráfico que sale de Real Canaria hacia CC.
 */
export function withUtm(
  url: string,
  campaign: string,
  medium: string = "crosssell",
  source: string = "realcanaria",
): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}
