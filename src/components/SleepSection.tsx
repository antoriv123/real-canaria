import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { places } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceImage } from "./places/PlaceImage";
import type { Locale } from "@/i18n/config";
import { Bed, ArrowRight } from "lucide-react";
import { CASITAS_URL, withUtm } from "@/lib/site";

export function SleepSection() {
  const t = useTranslations("sleep");
  const locale = useLocale() as Locale;
  const casitas = places.filter((p) => p.isCasita).slice(0, 4);
  const casitasHref = withUtm(CASITAS_URL, "home-sleep");

  return (
    <div className="bg-gradient-to-b from-[var(--color-warm)]/5 to-[var(--color-warm)]/20">
      <section className="container-rc py-24 sm:py-32 lg:py-40">
        <div className="flex items-start justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <span className="font-[var(--font-display)] text-sm font-bold text-[var(--color-warm)]">04</span>
              <span className="inline-block w-10 h-px bg-[var(--color-warm)]/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Casitas Canarias
              </span>
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] leading-tight">
              {t("title")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-3 lg:mt-4 max-w-xl text-base lg:text-lg">{t("subtitle")}</p>
          </div>
          <a
            href={casitasHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-4 h-10 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm shrink-0 hover:brightness-110 transition-all"
          >
            {t("cta")}
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {casitas.map((c) => {
            const tr = c.translations[locale];
            const url = getPlaceImageUrl(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/${locale}/sitio/${c.slug}`}
                className="block group rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-warm)] transition-all hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <PlaceImage
                    slug={c.slug}
                    name={tr.name}
                    category={c.category}
                    imageUrl={url}
                    isCasita
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
            );
          })}
        </div>

        <a
          href={casitasHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-4 inline-flex items-center gap-1 px-4 h-10 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm"
        >
          {t("cta")}
          <ArrowRight size={14} />
        </a>
      </section>
    </div>
  );
}
