import type { MetadataRoute } from "next";
import { places } from "@/data/places";
import { routes as dayRoutes } from "@/data/routes";
import { routing } from "@/i18n/routing";
import { absoluteUrl, hreflangMap } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home + páginas fijas por idioma
  const staticPaths = ["", "/rutas", "/plan", "/sobre", "/privacidad"];
  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.7,
        alternates: { languages: hreflangMap(path) },
      });
    }
  }

  // Cada sitio × cada locale
  for (const locale of routing.locales) {
    for (const place of places) {
      const path = `/sitio/${place.slug}`;
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: hreflangMap(path) },
      });
    }
  }

  // Cada ruta sugerida × cada locale
  for (const locale of routing.locales) {
    for (const r of dayRoutes) {
      const path = `/rutas/${r.slug}`;
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: hreflangMap(path) },
      });
    }
  }

  return entries;
}
