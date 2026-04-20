"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { places } from "@/data/places";
import { useFavorites } from "./places/AddToPlanButton";
import { PlaceList } from "./places/PlaceList";

interface Props {
  recommendedSlugs: string[];
}

export function PlanFavorites({ recommendedSlugs }: Props) {
  const t = useTranslations("plan");
  const [favs] = useFavorites();

  const favorites = useMemo(
    () => places.filter((p) => favs.includes(p.slug)),
    [favs],
  );

  const recommended = useMemo(
    () => places.filter((p) => recommendedSlugs.includes(p.slug) && !favs.includes(p.slug)),
    [recommendedSlugs, favs],
  );

  return (
    <div className="space-y-10">
      {favorites.length > 0 && (
        <section>
          <h2 className="font-[var(--font-display)] text-xl font-bold mb-4">
            💛 Tus favoritos ({favorites.length})
          </h2>
          <PlaceList places={favorites} />
        </section>
      )}

      {recommended.length > 0 && (
        <section>
          <h2 className="font-[var(--font-display)] text-xl font-bold mb-2">
            {favorites.length > 0 ? "Te puede interesar" : "Para tu fecha de visita"}
          </h2>
          <p className="text-sm text-[var(--color-ink-muted)] mb-4">
            Recomendados según la temporada en que vienes.
          </p>
          <PlaceList places={recommended} />
        </section>
      )}

      {favorites.length === 0 && recommended.length === 0 && (
        <p className="text-center text-[var(--color-ink-muted)] py-12">{t("emptyPlan")}</p>
      )}
    </div>
  );
}
