"use client";

import { useTranslations } from "next-intl";
import type { PlaceCategory } from "@/lib/types";
import { Mountain, Home, Landmark, UtensilsCrossed, Bed, Layers } from "lucide-react";

const CATEGORIES: Array<{ key: PlaceCategory | "all"; icon: React.ComponentType<{ size?: number }> }> = [
  { key: "all", icon: Layers },
  { key: "viewpoint", icon: Mountain },
  { key: "village", icon: Home },
  { key: "museum", icon: Landmark },
  { key: "restaurant", icon: UtensilsCrossed },
  { key: "casita", icon: Bed },
];

interface Props {
  active: PlaceCategory | "all";
  onChange: (c: PlaceCategory | "all") => void;
  counts?: Record<string, number>;
}

export function PlaceFilters({ active, onChange, counts }: Props) {
  const t = useTranslations("filters");

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      {CATEGORIES.map(({ key, icon: Icon }) => {
        const isActive = active === key;
        const count = counts?.[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 shrink-0 h-9 px-3 rounded-full border text-sm transition-all ${
              isActive
                ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/40"
            }`}
          >
            <Icon size={14} />
            <span>{t(key)}</span>
            {count !== undefined && count > 0 && (
              <span className={`text-xs ${isActive ? "opacity-80" : "text-[var(--color-ink-muted)]"}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
