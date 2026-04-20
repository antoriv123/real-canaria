"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

const STORAGE_KEY = "rc_favorites";

export function getFavorites(): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function setFavorites(slugs: string[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  // Notificar a otros tabs/componentes
  window.dispatchEvent(new CustomEvent("rc-favorites-changed", { detail: slugs }));
}

export function useFavorites(): [string[], (slug: string) => void] {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavorites());
    const onChange = () => setFavs(getFavorites());
    window.addEventListener("rc-favorites-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("rc-favorites-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  function toggle(slug: string) {
    const current = getFavorites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    setFavorites(next);
    setFavs(next);
  }

  return [favs, toggle];
}

interface Props {
  slug: string;
  variant?: "button" | "icon";
}

export function AddToPlanButton({ slug, variant = "button" }: Props) {
  const t = useTranslations("place");
  const [favs, toggle] = useFavorites();
  const isAdded = favs.includes(slug);

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(slug);
        }}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
          isAdded
            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
            : "bg-white/80 border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-primary)]"
        }`}
        aria-label={isAdded ? t("removeFromPlan") : t("addToPlan")}
      >
        <Heart size={14} fill={isAdded ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      onClick={() => toggle(slug)}
      className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius)] font-semibold text-sm transition-colors ${
        isAdded
          ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
          : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      <Heart size={16} fill={isAdded ? "currentColor" : "none"} />
      {isAdded ? t("removeFromPlan") : t("addToPlan")}
    </button>
  );
}
