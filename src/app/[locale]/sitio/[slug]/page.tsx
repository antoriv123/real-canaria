import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { getPlaceBySlug, places } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceImage } from "@/components/places/PlaceImage";
import type { Locale } from "@/i18n/config";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
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
  const tr = place.translations[locale as Locale];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;

  return (
    <article className="container-rc py-6 sm:py-10 max-w-3xl">
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
          imageUrl={place.imageUrl || getPlaceImageUrl(place.slug)}
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

      {tr.tip && (
        <div className="p-4 rounded-[var(--radius)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 mb-6">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)] mb-1">
            {t("tip")}
          </div>
          <p className="text-sm text-[var(--color-ink)] leading-relaxed">{tr.tip}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius)] bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-hover)]"
        >
          <MapPin size={16} />
          {t("directions")}
        </a>
        {place.externalUrl && (
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
      </div>
    </article>
  );
}
