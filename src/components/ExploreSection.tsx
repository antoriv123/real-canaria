"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { MapView } from "./map/MapView";
import { PlaceFilters } from "./places/PlaceFilters";
import { PlaceList } from "./places/PlaceList";
import type { Place, PlaceCategory } from "@/lib/types";

interface Props {
  places: Place[];
}

export function ExploreSection({ places }: Props) {
  const t = useTranslations("filters");
  const [category, setCategory] = useState<PlaceCategory | "all">("all");
  const [hover, setHover] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: places.length };
    for (const p of places) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [places]);

  const filtered = useMemo(
    () => (category === "all" ? places : places.filter((p) => p.category === category)),
    [places, category],
  );

  return (
    <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <section id="map" className="container-rc pt-10 sm:pt-14 pb-12 sm:pb-16">
        <PlaceFilters active={category} onChange={setCategory} counts={counts} />

        <p className="text-sm text-[var(--color-ink-muted)] mt-2 mb-4">
          {t("showing", { count: filtered.length })}
        </p>

        <div className="mb-8 fade-up">
          <MapView places={filtered} highlight={hover} />
        </div>

        <PlaceList places={filtered} onHover={setHover} />
      </section>
    </div>
  );
}
