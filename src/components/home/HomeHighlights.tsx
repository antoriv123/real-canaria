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
    <section
      id="map"
      className="bg-[var(--color-surface)] border-t border-[var(--color-border)]"
    >
      <div className="container-rc pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        {/* Mapa full */}
        <div className="mb-10 sm:mb-14 lg:mb-16 fade-up">
          <MapView places={allPlaces} highlight={null} />
        </div>

        {/* Destacados */}
        <div className="flex items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] leading-tight">
              {t("highlightsTitle")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-2 max-w-xl lg:text-lg">
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
