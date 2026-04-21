import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { SITE_URL, canonicalUrl, hreflangMap } from "./site";

interface BuildPageMetadataOptions {
  locale: Locale | string;
  /** Path del sitio sin el prefijo de locale. Ej: "" para home, "/sobre", "/sitio/roque-nublo". */
  path: string;
  title: string;
  description: string;
  /**
   * Ruta pública de la imagen OG. Si no se pasa, Next usa automáticamente la
   * OG dinámica definida en `src/app/[locale]/opengraph-image.tsx`.
   */
  ogImage?: string;
  /** Ancho de la imagen OG. Por defecto 1200. */
  ogImageWidth?: number;
  /** Alto de la imagen OG. Por defecto 630. */
  ogImageHeight?: number;
  /** Alt-text de la OG image. */
  ogImageAlt?: string;
  /** type openGraph, por defecto "website". */
  ogType?: "website" | "article";
  /** Permite override del título del openGraph (sin el sufijo de marca). */
  ogTitle?: string;
}

/**
 * Construye el objeto Metadata de Next con los campos críticos de SEO
 * (canonical + hreflang + OG + Twitter) para una página localizada.
 * Unifica el patrón que hasta ahora solo estaba en sitio/[slug]/page.tsx.
 *
 * Si `ogImage` no se pasa, Next aplica la OG dinámica generada por el
 * file-convention `src/app/[locale]/opengraph-image.tsx`.
 */
export function buildPageMetadata(opts: BuildPageMetadataOptions): Metadata {
  const {
    locale,
    path,
    title,
    description,
    ogImage,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogImageAlt,
    ogType = "website",
    ogTitle,
  } = opts;

  const canonical = canonicalUrl(locale, path);
  const languages = hreflangMap(path);

  const imageUrl = ogImage ? resolveAbsolute(ogImage) : null;
  const images = imageUrl
    ? [
        {
          url: imageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt ?? title,
        },
      ]
    : undefined;

  const openGraph = {
    title: ogTitle ?? title,
    description,
    url: canonical,
    siteName: "Real Canaria",
    type: ogType,
    locale,
    ...(images && { images }),
  };

  const twitter = {
    card: "summary_large_image" as const,
    title: ogTitle ?? title,
    description,
    ...(imageUrl && { images: [imageUrl] }),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph,
    twitter,
  };
}

function resolveAbsolute(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const clean = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${clean}`;
}
