import type { MetadataRoute } from "next";
import { places } from "@/data/places";
import { routes as dayRoutes } from "@/data/routes";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://real-canaria.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home + páginas fijas por idioma
  const staticPaths = ["", "/rutas", "/plan", "/sobre", "/privacidad"];
  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      const url = `${SITE_URL}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
          ),
        },
      });
    }
  }

  // Cada sitio × cada locale
  for (const locale of routing.locales) {
    for (const place of places) {
      entries.push({
        url: `${SITE_URL}/${locale}/sitio/${place.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}/sitio/${place.slug}`]),
          ),
        },
      });
    }
  }

  // Cada ruta sugerida × cada locale
  for (const locale of routing.locales) {
    for (const r of dayRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}/rutas/${r.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
