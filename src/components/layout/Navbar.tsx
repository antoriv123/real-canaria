"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useFavorites } from "../places/AddToPlanButton";
import { Heart, LogOut } from "lucide-react";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [favs] = useFavorites();
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => setHasSession(!!d?.user))
      .catch(() => setHasSession(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/session/logout", { method: "POST" });
    setHasSession(false);
    window.location.href = `/${locale}`;
  }

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="container-rc flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-baseline gap-0.5">
          <span className="font-[var(--font-display)] font-bold text-xl tracking-tight text-[var(--color-ink)]">
            Real
          </span>
          <span className="font-[var(--font-display)] font-bold text-xl tracking-tight text-[var(--color-primary)]">
            Canaria
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href={`/${locale}#map`}
            className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("explore")}
          </Link>
          <Link
            href={`/${locale}/rutas`}
            className="hidden md:inline-flex px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("routes")}
          </Link>
          <Link
            href={`/${locale}/plan`}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("myPlan")}
            {favs.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold">
                {favs.length}
              </span>
            )}
          </Link>
          <Link
            href={`/${locale}/sobre`}
            className="hidden lg:inline-flex px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("about")}
          </Link>
          {hasSession && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2 py-2 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-danger)] rounded-[var(--radius)] transition-colors"
              aria-label={t("logout")}
              title={t("logout")}
            >
              <LogOut size={14} />
            </button>
          )}
          <LocaleSwitcher />
        </nav>
      </div>

      {/* Mobile: Heart/favorites shortcut */}
      {favs.length > 0 && (
        <Link
          href={`/${locale}/plan`}
          className="sm:hidden absolute top-full right-4 mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shadow-md"
        >
          <Heart size={12} fill="currentColor" />
          {favs.length}
        </Link>
      )}
    </header>
  );
}
