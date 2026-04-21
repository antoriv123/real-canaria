import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Clock, Euro, TrendingUp, Bed, Ticket } from "lucide-react";
import type { Metadata } from "next";
import { getPlaceBySlug, places, nearbyPlaces } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceImage } from "@/components/places/PlaceImage";
import { PlaceList } from "@/components/places/PlaceList";
import { AddToPlanButton } from "@/components/places/AddToPlanButton";
import type { Locale } from "@/i18n/config";
import { absoluteUrl, canonicalUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { civitatisLink, isCivitatisUrl } from "@/config/affiliates";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};
  const tr = place.translations[locale as Locale];
  const imageUrl = place.imageUrl || getPlaceImageUrl(slug);
  const description = tr.description.slice(0, 160);

  return buildPageMetadata({
    locale,
    path: `/sitio/${slug}`,
    title: `${tr.name} — Real Canaria`,
    description,
    ogTitle: tr.name,
    ogImage: imageUrl,
    ogImageHeight: 800,
    ogImageAlt: tr.name,
  });
}

function formatDuration(
  minutes: number,
  t: (key: string, vars?: Record<string, string | number | Date>) => string,
): string {
  if (minutes < 60) return t("minutes", { min: minutes });
  const h = Math.round(minutes / 60);
  return t("hours", { h });
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const t = await getTranslations("place");
  const tNav = await getTranslations("nav");
  const tr = place.translations[locale as Locale];
  const imageUrl = place.imageUrl || getPlaceImageUrl(place.slug);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
  const nearby = nearbyPlaces(place, 3);
  const casitasNearby = places
    .filter((p) => p.isCasita)
    .map((p) => ({ p, d: Math.sqrt((p.lat - place.lat) ** 2 + (p.lng - place.lng) ** 2) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 2)
    .map((x) => x.p);

  // JSON-LD: Product si es actividad con link de reserva; TouristAttraction para el resto
  const isActivity = place.category === "activity";
  const isCivitatis = isCivitatisUrl(place.externalUrl);
  const affiliateUrl = place.externalUrl
    ? isCivitatis
      ? civitatisLink(place.externalUrl)
      : place.externalUrl
    : null;

  const jsonLd = isActivity && place.externalUrl
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: tr.name,
        description: tr.description,
        image: imageUrl || undefined,
        category: "TouristTrip",
        brand: {
          "@type": "Organization",
          name: "Civitatis",
        },
        offers: {
          "@type": "Offer",
          url: place.externalUrl,
          availability: "https://schema.org/InStock",
          areaServed: {
            "@type": "Place",
            name: "Gran Canaria",
          },
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: tr.name,
        description: tr.description,
        image: imageUrl,
        geo: {
          "@type": "GeoCoordinates",
          latitude: place.lat,
          longitude: place.lng,
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "Las Palmas",
          addressCountry: "ES",
        },
        ...(place.externalUrl && { url: place.externalUrl }),
      };

  // BreadcrumbList: Home → (categoría) → Sitio
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
        name: tr.name,
        item: canonicalUrl(locale, `/sitio/${place.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="container-rc py-6 sm:py-10 max-w-3xl">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-ink-muted)] mb-3 flex gap-1 items-center">
          <Link href={`/${locale}`} className="hover:text-[var(--color-primary)]">
            {tNav("explore")}
          </Link>
          <span>›</span>
          <span className="text-[var(--color-primary)] capitalize">{place.category}</span>
          <span>›</span>
          <span className="truncate">{tr.name}</span>
        </nav>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] mb-4"
        >
          <ArrowLeft size={16} />
          {t("back")}
        </Link>

        <div className="relative aspect-[16/9] w-full rounded-[var(--radius-lg)] overflow-hidden mb-6">
          <PlaceImage
            slug={place.slug}
            name={tr.name}
            category={place.category}
            imageUrl={imageUrl}
            isCasita={place.isCasita}
            priority
          />
        </div>

        <div className="text-xs uppercase tracking-wide text-[var(--color-primary)] font-semibold mb-2">
          {place.category}
        </div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-ink)] leading-tight mb-4">
          {tr.name}
        </h1>
        <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed mb-6">{tr.description}</p>

        {/* Metadatos enriquecidos */}
        {(place.openingHours || place.priceEur !== undefined || place.visitDurationMinutes || place.accessibility) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-[var(--radius)] bg-[var(--color-surface-muted)]">
            {place.openingHours && (
              <div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)] font-semibold mb-1">
                  <Clock size={11} />
                  {t("openingHours")}
                </div>
                <div className="text-sm">{place.openingHours}</div>
              </div>
            )}
            {place.priceEur !== undefined && (
              <div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)] font-semibold mb-1">
                  <Euro size={11} />
                  {t("price")}
                </div>
                <div className="text-sm">
                  {place.priceEur === null ? t("priceFree") : `${place.priceEur}€`}
                </div>
              </div>
            )}
            {place.visitDurationMinutes && (
              <div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)] font-semibold mb-1">
                  <Clock size={11} />
                  {t("visitDuration")}
                </div>
                <div className="text-sm">{formatDuration(place.visitDurationMinutes, t)}</div>
              </div>
            )}
            {place.accessibility && (
              <div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)] font-semibold mb-1">
                  <TrendingUp size={11} />
                  {t("accessibility")}
                </div>
                <div className="text-sm">
                  {t(`access${place.accessibility.charAt(0).toUpperCase() + place.accessibility.slice(1)}`)}
                </div>
              </div>
            )}
          </div>
        )}

        {tr.tip && (
          <div className="p-4 rounded-[var(--radius)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 mb-6">
            <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)] mb-1">
              {t("tip")}
            </div>
            <p className="text-sm text-[var(--color-ink)] leading-relaxed">{tr.tip}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          {isActivity && affiliateUrl ? (
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius)] bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm hover:brightness-110 transition-all"
            >
              <Ticket size={16} />
              {t("bookOnCivitatis")}
            </a>
          ) : null}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius)] font-semibold text-sm ${
              isActivity && affiliateUrl
                ? "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/40"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
            }`}
          >
            <MapPin size={16} />
            {t("directions")}
          </a>
          {place.externalUrl && !(isActivity && affiliateUrl) && (
            <a
              href={place.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] font-semibold text-sm hover:border-[var(--color-primary)]/40"
            >
              <ExternalLink size={16} />
              {t("website")}
            </a>
          )}
          <AddToPlanButton slug={place.slug} />
        </div>
        {isActivity && affiliateUrl && isCivitatis && (
          <p className="text-xs text-[var(--color-ink-muted)] mb-8">
            {t("affiliateDisclosure")}
          </p>
        )}
        {!(isActivity && affiliateUrl && isCivitatis) && <div className="mb-5" />}

        {/* Dónde dormir cerca (casitas) */}
        {!place.isCasita && casitasNearby.length > 0 && (
          <section className="mb-10 p-5 rounded-[var(--radius-lg)] bg-[var(--color-warm)]/10 border border-[var(--color-warm)]/30">
            <div className="flex items-center gap-2 mb-3">
              <Bed size={16} className="text-[var(--color-warm)]" />
              <h2 className="font-[var(--font-display)] font-semibold text-lg">{t("sleepHere")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {casitasNearby.map((c) => {
                const ctr = c.translations[locale as Locale];
                return (
                  <Link
                    key={c.slug}
                    href={`/${locale}/sitio/${c.slug}`}
                    className="block bg-[var(--color-surface)] rounded-[var(--radius)] border border-[var(--color-border)] p-3 hover:border-[var(--color-warm)] transition-colors"
                  >
                    <p className="font-semibold text-sm">{ctr.name}</p>
                    <p className="text-xs text-[var(--color-ink-muted)] line-clamp-1">{ctr.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Sitios cercanos */}
        {nearby.length > 0 && (
          <section>
            <h2 className="font-[var(--font-display)] text-2xl font-bold mb-4">{t("nearby")}</h2>
            <PlaceList places={nearby} />
          </section>
        )}
      </article>
    </>
  );
}
