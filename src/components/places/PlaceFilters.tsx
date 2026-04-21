"use client";

import { useTranslations } from "next-intl";
import type { PlaceCategory } from "@/lib/types";
import { Mountain, Home, Landmark, UtensilsCrossed, Bed, Layers, Search, X, Ticket } from "lucide-react";

const CATEGORIES: Array<{ key: PlaceCategory | "all"; icon: React.ComponentType<{ size?: number }> }> = [
  { key: "all", icon: Layers },
  { key: "viewpoint", icon: Mountain },
  { key: "village", icon: Home },
  { key: "museum", icon: Landmark },
  { key: "restaurant", icon: UtensilsCrossed },
  { key: "activity", icon: Ticket },
  { key: "casita", icon: Bed },
];

interface Props {
  active: PlaceCategory | "all";
  onChange: (c: PlaceCategory | "all") => void;
  counts?: Record<string, number>;
  search: string;
  onSearchChange: (v: string) => void;
}

export function PlaceFilters({ active, onChange, counts, search, onSearchChange }: Props) {
  const t = useTranslations("filters");

  return (
    <div className="space-y-3">
      {/* Buscador */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full h-11 pl-10 pr-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
          aria-label={t("searchPlaceholder")}
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Chips de categoría */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {CATEGORIES.map(({ key, icon: Icon }) => {
          const isActive = active === key;
          const count = counts?.[key];
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`inline-flex items-center gap-1.5 shrink-0 h-10 px-4 rounded-full border text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/40"
              }`}
            >
              <Icon size={15} />
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
    </div>
  );
}
