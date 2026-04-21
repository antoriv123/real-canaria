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
    <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="container-rc py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
              {t("routesTitle")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-1 max-w-xl">
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

        <ul className="grid sm:grid-cols-3 gap-4">
          {preview.map((r) => {
            const tr = r.translations[locale];
            return (
              <li key={r.slug}>
                <Link
                  href={`/${locale}/rutas/${r.slug}`}
                  className="block group h-full p-5 rounded-[var(--radius-lg)] bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all hover:shadow-md"
                >
                  <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-2 leading-tight">
                    {tr.name}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)] mb-3 line-clamp-2">
                    {tr.description}
                  </p>
                  <div className="flex gap-3 text-xs text-[var(--color-ink-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {tRoutes("durationLabel", { hours: r.durationHours })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <RouteIcon size={12} />
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
