import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ticket, Info } from "lucide-react";
import { places } from "@/data/places";
import { PlaceImage } from "@/components/places/PlaceImage";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.actividades" });
  return buildPageMetadata({
    locale,
    path: "/actividades",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ActividadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("activities");

  const activities = places.filter((p) => p.category === "activity");

  return (
    <>
      <header className="container-rc pt-8 sm:pt-12 pb-6">
        <div className="flex items-center gap-2 mb-2 text-[var(--color-warm)]">
          <Ticket size={18} />
          <span className="text-xs font-bold uppercase tracking-wide">
            {t("eyebrow")}
          </span>
        </div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-2">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-ink-muted)] max-w-2xl">
          {t("subtitle")}
        </p>
        <div className="mt-4 flex items-start gap-2 text-xs text-[var(--color-ink-muted)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-[var(--radius)] px-3 py-2 max-w-2xl">
          <Info size={14} className="shrink-0 mt-0.5" />
          <span>{t("affiliateNotice")}</span>
        </div>
      </header>

      <section className="container-rc pb-12">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {activities.map((place) => {
            const tr = place.translations[locale as Locale];
            return (
              <li key={place.slug}>
                <Link
                  href={`/${locale}/sitio/${place.slug}`}
                  className="block group h-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-warm)]/60 transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PlaceImage
                      slug={place.slug}
                      name={tr.name}
                      category={place.category}
                      imageUrl={place.imageUrl}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)] mb-1.5">
                      <Ticket size={12} />
                      <span className="uppercase tracking-wide">
                        {t("tag")}
                      </span>
                    </div>
                    <h2 className="font-[var(--font-display)] font-semibold text-base text-[var(--color-ink)] leading-tight mb-1">
                      {tr.name}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2 mb-3">
                      {tr.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-warm)] group-hover:gap-2 transition-all">
                      {t("seeDetails")}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CasitaCtaBlock variant="compact" campaign="actividades" />
    </>
  );
}
