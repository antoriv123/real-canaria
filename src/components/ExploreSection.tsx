"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapView } from "./map/MapView";
import { PlaceFilters } from "./places/PlaceFilters";
import { PlaceList } from "./places/PlaceList";
import type { Place, PlaceCategory } from "@/lib/types";
import type { Locale } from "@/i18n/config";

interface Props {
  places: Place[];
}

function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip accents
}

export function ExploreSection({ places }: Props) {
  const t = useTranslations("filters");
  const locale = useLocale() as Locale;
  const [category, setCategory] = useState<PlaceCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: places.length };
    for (const p of places) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [places]);

  const filtered = useMemo(() => {
    let out = category === "all" ? places : places.filter((p) => p.category === category);
    const q = normalizeForSearch(search.trim());
    if (q) {
      out = out.filter((p) => {
        const tr = p.translations[locale];
        const haystack = normalizeForSearch(`${tr.name} ${tr.description}`);
        return haystack.includes(q);
      });
    }
    return out;
  }, [places, category, search, locale]);

  return (
    <section id="map" className="container-rc pt-6 sm:pt-8 pb-12 sm:pb-16">
      <PlaceFilters
        active={category}
        onChange={setCategory}
        counts={counts}
        search={search}
        onSearchChange={setSearch}
      />

      <p className="text-sm text-[var(--color-ink-muted)] mt-3 mb-4">
        {t("showing", { count: filtered.length })}
      </p>

      <div className="mb-8 fade-up">
        <MapView places={filtered} highlight={hover} />
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-ink-muted)]">
          {t("noResults")}
        </div>
      ) : (
        <PlaceList places={filtered} onHover={setHover} />
      )}
    </section>
  );
}
