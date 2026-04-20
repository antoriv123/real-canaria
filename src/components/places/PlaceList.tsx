"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Place } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { MapPin, Home, Mountain, Landmark, UtensilsCrossed, Bed } from "lucide-react";
import { PlaceImage } from "./PlaceImage";
import { getPlaceImageUrl } from "@/data/place-images";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  viewpoint: Mountain,
  village: Home,
  museum: Landmark,
  restaurant: UtensilsCrossed,
  casita: Bed,
};

interface Props {
  places: Place[];
  onHover?: (slug: string | null) => void;
}

export function PlaceList({ places, onHover }: Props) {
  const locale = useLocale() as Locale;

  if (places.length === 0) {
    return (
      <div className="p-8 text-center text-[var(--color-ink-muted)] text-sm">
        No places match this filter.
      </div>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
      {places.map((place) => {
        const Icon = ICONS[place.category] ?? MapPin;
        const t = place.translations[locale];
        return (
          <li key={place.slug}>
            <Link
              href={`/${locale}/sitio/${place.slug}`}
              onMouseEnter={() => onHover?.(place.slug)}
              onMouseLeave={() => onHover?.(null)}
              className="block group rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <PlaceImage
                  slug={place.slug}
                  name={t.name}
                  category={place.category}
                  imageUrl={place.imageUrl || getPlaceImageUrl(place.slug)}
                  isCasita={place.isCasita}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)] mb-1.5">
                  <Icon size={12} />
                  <span className="uppercase tracking-wide">{place.category}</span>
                </div>
                <h3 className="font-[var(--font-display)] font-semibold text-base text-[var(--color-ink)] leading-tight mb-1">
                  {t.name}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2">{t.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
