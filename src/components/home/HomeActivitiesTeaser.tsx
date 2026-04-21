import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Ticket } from "lucide-react";
import type { Place } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { PlaceImage } from "@/components/places/PlaceImage";

interface Props {
  activities: Place[];
}

/**
 * Teaser de actividades en el home: 3-4 tarjetas de las actividades
 * destacadas (featured) con eyebrow de "Civitatis", CTA a /actividades.
 * Diferenciado visualmente del bloque de sitios curados (color warm).
 */
export function HomeActivitiesTeaser({ activities }: Props) {
  const t = useTranslations("home");
  const tAct = useTranslations("activities");
  const locale = useLocale() as Locale;

  if (activities.length === 0) return null;

  return (
    <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="container-rc py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--color-warm)]">
              <Ticket size={16} />
              <span className="text-xs font-bold uppercase tracking-wide">
                {tAct("eyebrow")}
              </span>
            </div>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
              {t("activitiesTitle")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-1 max-w-xl">
              {t("activitiesSubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/actividades`}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-warm)] hover:gap-2 transition-all shrink-0"
          >
            {t("seeAllActivities")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {activities.slice(0, 4).map((a) => {
            const tr = a.translations[locale];
            return (
              <li key={a.slug}>
                <Link
                  href={`/${locale}/sitio/${a.slug}`}
                  className="block group h-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-warm)]/60 transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PlaceImage
                      slug={a.slug}
                      name={tr.name}
                      category={a.category}
                      imageUrl={a.imageUrl}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-[var(--font-display)] font-semibold text-sm leading-tight mb-1">
                      {tr.name}
                    </p>
                    <p className="text-xs text-[var(--color-ink-muted)] line-clamp-2">
                      {tr.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 sm:hidden">
          <Link
            href={`/${locale}/actividades`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-warm)]"
          >
            {t("seeAllActivities")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
