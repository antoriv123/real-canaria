import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Route as RouteIcon } from "lucide-react";
import type { Metadata } from "next";
import { routes, getRouteBySlug } from "@/data/routes";
import { getPlaceBySlug } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceList } from "@/components/places/PlaceList";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, canonicalUrl } from "@/lib/site";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  const tr = route.translations[locale as Locale];
  const t = await getTranslations({ locale, namespace: "meta.rutasDetalle" });
  return buildPageMetadata({
    locale,
    path: `/rutas/${slug}`,
    title: t("title", { name: tr.name }),
    description: t("description", { name: tr.name }),
  });
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const t = await getTranslations("routes");
  const tPlace = await getTranslations("place");
  const tr = route.translations[locale as Locale];

  const stops = route.stopSlugs
    .map((s) => getPlaceBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // JSON-LD TouristTrip con itinerario (cada parada como TouristAttraction)
  const tripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tr.name,
    description: tr.description,
    url: canonicalUrl(locale, `/rutas/${route.slug}`),
    itinerary: stops.map((s, idx) => ({
      "@type": "TouristAttraction",
      position: idx + 1,
      name: s.translations[locale as Locale].name,
      url: canonicalUrl(locale, `/sitio/${s.slug}`),
      geo: {
        "@type": "GeoCoordinates",
        latitude: s.lat,
        longitude: s.lng,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Real Canaria",
        item: absoluteUrl("", locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: canonicalUrl(locale, "/rutas"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tr.name,
        item: canonicalUrl(locale, `/rutas/${route.slug}`),
      },
    ],
  };

  return (
    <article className="container-rc py-6 sm:py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Link
        href={`/${locale}/rutas`}
        className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] mb-5"
      >
        <ArrowLeft size={16} />
        {t("title")}
      </Link>

      <div className="max-w-4xl mb-10">
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
          {tr.name}
        </h1>
        <p className="text-lg lg:text-xl text-[var(--color-ink-muted)] mb-5">{tr.description}</p>

        <div className="flex flex-wrap gap-4 lg:gap-6 text-sm lg:text-base text-[var(--color-ink-muted)] mb-6">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={16} />
            {t("durationLabel", { hours: route.durationHours })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <RouteIcon size={16} />
            {t("distanceLabel", { km: route.distanceKm })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {stops.length} paradas
          </span>
        </div>

        <div className="p-4 lg:p-5 rounded-[var(--radius)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)] mb-1.5">
            {tPlace("tip")}
          </div>
          <p className="text-sm lg:text-base">{tr.tips}</p>
        </div>
      </div>

      <h2 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold mb-4">Paradas</h2>
      <ol className="space-y-2 mb-8 list-decimal list-inside max-w-3xl">
        {stops.map((s) => (
          <li key={s.slug} className="text-sm lg:text-base">
            <Link
              href={`/${locale}/sitio/${s.slug}`}
              className="font-medium hover:text-[var(--color-primary)]"
            >
              {s.translations[locale as Locale].name}
            </Link>
          </li>
        ))}
      </ol>

      <PlaceList places={stops} />
      <CasitaCtaBlock variant="compact" campaign="rutas-detalle" />
    </article>
  );
}
