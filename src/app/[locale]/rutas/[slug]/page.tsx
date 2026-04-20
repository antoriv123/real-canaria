import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Route as RouteIcon } from "lucide-react";
import { routes, getRouteBySlug } from "@/data/routes";
import { getPlaceBySlug } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceList } from "@/components/places/PlaceList";
import type { Locale } from "@/i18n/config";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
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

  return (
    <article className="container-rc py-6 sm:py-10 max-w-4xl">
      <Link
        href={`/${locale}/rutas`}
        className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] mb-4"
      >
        <ArrowLeft size={16} />
        {t("title")}
      </Link>

      <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold mb-2">
        {tr.name}
      </h1>
      <p className="text-lg text-[var(--color-ink-muted)] mb-4">{tr.description}</p>

      <div className="flex gap-4 text-sm text-[var(--color-ink-muted)] mb-6">
        <span className="inline-flex items-center gap-1">
          <Clock size={14} />
          {t("durationLabel", { hours: route.durationHours })}
        </span>
        <span className="inline-flex items-center gap-1">
          <RouteIcon size={14} />
          {t("distanceLabel", { km: route.distanceKm })}
        </span>
      </div>

      <div className="p-4 rounded-[var(--radius)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 mb-8">
        <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)] mb-1">
          {tPlace("tip")}
        </div>
        <p className="text-sm">{tr.tips}</p>
      </div>

      <h2 className="font-[var(--font-display)] text-2xl font-bold mb-4">Paradas</h2>
      <ol className="space-y-2 mb-8 list-decimal list-inside">
        {stops.map((s, i) => (
          <li key={s.slug} className="text-sm">
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
    </article>
  );
}
