import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { places } from "@/data/places";
import { getPlaceImageUrl } from "@/data/place-images";
import { PlaceImage } from "./places/PlaceImage";
import type { Locale } from "@/i18n/config";
import { Bed, ArrowRight } from "lucide-react";

export function SleepSection() {
  const t = useTranslations("sleep");
  const locale = useLocale() as Locale;
  const casitas = places.filter((p) => p.isCasita).slice(0, 4);

  return (
    <div className="bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-warm)]/10 border-t border-[var(--color-border)]">
      <section className="container-rc py-12 sm:py-16">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--color-warm)]">
              <Bed size={18} />
              <span className="text-xs font-bold uppercase tracking-wide">Casitas Canarias</span>
            </div>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
              {t("title")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-1">{t("subtitle")}</p>
          </div>
          <a
            href="https://casitascanarias.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-4 h-10 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm shrink-0 hover:brightness-110 transition-all"
          >
            {t("cta")}
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <div className="p-3">
                  <p className="font-[var(--font-display)] font-semibold text-sm leading-tight mb-1">
                    {tr.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)] line-clamp-2">
                    {tr.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <a
          href="https://casitascanarias.com"
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
