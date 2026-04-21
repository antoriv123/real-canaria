/**
 * ID de afiliado Civitatis. Antonio lo setea en Vercel como
 * NEXT_PUBLIC_CIVITATIS_AID cuando tenga la cuenta activa.
 * Si esta vacio, los links a Civitatis funcionan igual (sin tracking).
 */
export const CIVITATIS_AFFILIATE_ID =
  process.env.NEXT_PUBLIC_CIVITATIS_AID ?? "";

/**
 * Dada una URL de Civitatis, devuelve la misma URL con el parametro de
 * afiliado (`?aid=...`) si hay ID configurado.
 *
 * Civitatis usa `aid` como query param estandar para afiliados.
 * Ref: https://www.civitatis.com/en/affiliates/
 */
export function civitatisLink(url: string): string {
  if (!CIVITATIS_AFFILIATE_ID) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("aid", CIVITATIS_AFFILIATE_ID);
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Indica si una URL apunta a Civitatis (para decidir si mostrar CTA de
 * reserva + disclaimer de afiliado en vez del boton generico de "web
 * oficial").
 */
export function isCivitatisUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname.endsWith("civitatis.com");
  } catch {
    return false;
  }
}
