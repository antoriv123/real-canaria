import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Place } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { PlaceImage } from "@/components/places/PlaceImage";

interface Props {
  activities: Place[];
}

/**
 * Teaser de actividades en la home: 4 tarjetas de las actividades
 * destacadas con CTA a /actividades. El disclaimer de afiliado solo
 * vive en /actividades (no ensuciamos aquí al usuario con detalles
 * técnicos).
 */
export function HomeActivitiesTeaser({ activities }: Props) {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  if (activities.length === 0) return null;

  return (
    <section className="bg-[var(--color-surface-muted)]">
      <div className="container-rc py-24 sm:py-32 lg:py-40">
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <span className="font-[var(--font-display)] text-sm font-bold text-[var(--color-warm)]">02</span>
              <span className="inline-block w-10 h-px bg-[var(--color-warm)]/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                {t("activitiesTitle")}
              </span>
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] leading-tight">
              {t("activitiesHeadline")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-3 lg:mt-4 max-w-xl text-base lg:text-lg">
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

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
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
                  <div className="p-4 lg:p-5">
                    <p className="font-[var(--font-display)] font-semibold text-sm lg:text-base leading-tight mb-2">
                      {tr.name}
                    </p>
                    <p className="text-xs lg:text-sm text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed">
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
