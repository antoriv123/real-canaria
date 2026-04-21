import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Route as RouteIcon } from "lucide-react";
import { routes } from "@/data/routes";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.rutas" });
  return buildPageMetadata({
    locale,
    path: "/rutas",
    title: t("title"),
    description: t("description"),
  });
}

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("routes");

  return (
    <>
      <div className="container-rc pt-16 sm:pt-24 lg:pt-32 pb-20 lg:pb-28">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg lg:text-xl text-[var(--color-ink-muted)] leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {routes.map((r) => {
            const tr = r.translations[locale as Locale];
            return (
              <Link
                key={r.slug}
                href={`/${locale}/rutas/${r.slug}`}
                className="block group p-6 lg:p-8 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
              >
                <h2 className="font-[var(--font-display)] text-xl lg:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-3 leading-tight">
                  {tr.name}
                </h2>
                <p className="text-sm lg:text-base text-[var(--color-ink-muted)] mb-6 line-clamp-3 leading-relaxed">
                  {tr.description}
                </p>
                <div className="flex gap-4 lg:gap-5 text-xs lg:text-sm text-[var(--color-ink-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    {t("durationLabel", { hours: r.durationHours })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <RouteIcon size={13} />
                    {t("distanceLabel", { km: r.distanceKm })}
                  </span>
                  <span>{r.stopSlugs.length} paradas</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <CasitaCtaBlock variant="compact" campaign="rutas-index" />
    </>
  );
}
