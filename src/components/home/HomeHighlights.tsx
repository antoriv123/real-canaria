"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Place } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { MapView } from "@/components/map/MapView";
import { PlaceList } from "@/components/places/PlaceList";

interface Props {
  /** Todos los places (se usan para pintar el mapa completo). */
  allPlaces: Place[];
  /** Lista acotada (featured) para la cuadrícula de tarjetas debajo. */
  highlights: Place[];
}

/**
 * Sección principal del home: mapa general con todos los pins (para que
 * el visitante tenga la foto completa de la isla) + cuadrícula acotada
 * con solo los destacados (no el muro de 100 tarjetas) + CTA hacia
 * `/explorar` donde sí viven los filtros y el listado completo.
 */
export function HomeHighlights({ allPlaces, highlights }: Props) {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section id="map">
      <div className="container-rc pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 lg:pb-40">
        {/* Mapa full */}
        <div className="mb-20 sm:mb-28 lg:mb-36 fade-up">
          <MapView places={allPlaces} highlight={null} />
        </div>

        {/* Destacados */}
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <span className="font-[var(--font-display)] text-sm font-bold text-[var(--color-primary)]">01</span>
              <span className="inline-block w-10 h-px bg-[var(--color-primary)]/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                {t("highlightsTitle")}
              </span>
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] leading-tight">
              {t("highlightsHeadline")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-3 lg:mt-4 max-w-xl text-base lg:text-lg">
              {t("highlightsSubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/explorar`}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:gap-2 transition-all shrink-0"
          >
            {t("seeAllPlaces")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <PlaceList places={highlights} />

        <div className="mt-6 sm:hidden">
          <Link
            href={`/${locale}/explorar`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]"
          >
            {t("seeAllPlaces")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
