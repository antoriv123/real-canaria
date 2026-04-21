import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Clock, Route as RouteIcon } from "lucide-react";
import { routes } from "@/data/routes";
import type { Locale } from "@/i18n/config";

/**
 * Teaser de rutas de un día en la home — 3 tarjetas con título, duración
 * y distancia + CTA al listado completo en /rutas.
 */
export function HomeRoutesTeaser() {
  const t = useTranslations("home");
  const tRoutes = useTranslations("routes");
  const locale = useLocale() as Locale;

  const preview = routes.slice(0, 3);

  return (
    <section>
      <div className="container-rc py-24 sm:py-32 lg:py-40">
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <span className="font-[var(--font-display)] text-sm font-bold text-[var(--color-accent)]">03</span>
              <span className="inline-block w-10 h-px bg-[var(--color-accent)]/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                {t("routesTitle")}
              </span>
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] leading-tight">
              {t("routesHeadline")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-3 lg:mt-4 max-w-xl text-base lg:text-lg">
              {t("routesSubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/rutas`}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:gap-2 transition-all shrink-0"
          >
            {t("seeAllRoutes")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="grid sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {preview.map((r) => {
            const tr = r.translations[locale];
            return (
              <li key={r.slug}>
                <Link
                  href={`/${locale}/rutas/${r.slug}`}
                  className="block group h-full p-6 lg:p-8 rounded-[var(--radius-lg)] bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all hover:shadow-md"
                >
                  <h3 className="font-[var(--font-display)] text-lg lg:text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-3 leading-tight">
                    {tr.name}
                  </h3>
                  <p className="text-sm lg:text-base text-[var(--color-ink-muted)] mb-5 line-clamp-2 leading-relaxed">
                    {tr.description}
                  </p>
                  <div className="flex gap-4 text-xs lg:text-sm text-[var(--color-ink-muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} />
                      {tRoutes("durationLabel", { hours: r.durationHours })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <RouteIcon size={13} />
                      {tRoutes("distanceLabel", { km: r.distanceKm })}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 sm:hidden">
          <Link
            href={`/${locale}/rutas`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]"
          >
            {t("seeAllRoutes")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
