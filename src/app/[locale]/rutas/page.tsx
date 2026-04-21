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
      <div className="container-rc py-10 max-w-4xl">
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold mb-2">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-ink-muted)] mb-8">{t("subtitle")}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {routes.map((r) => {
            const tr = r.translations[locale as Locale];
            return (
              <Link
                key={r.slug}
                href={`/${locale}/rutas/${r.slug}`}
                className="block group p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
              >
                <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-2">
                  {tr.name}
                </h2>
                <p className="text-sm text-[var(--color-ink-muted)] mb-4 line-clamp-3">
                  {tr.description}
                </p>
                <div className="flex gap-4 text-xs text-[var(--color-ink-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {t("durationLabel", { hours: r.durationHours })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <RouteIcon size={12} />
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
