"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

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
            href={`/${locale}/plan`}
            className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("myPlan")}
          </Link>
          <Link
            href={`/${locale}/sobre`}
            className="hidden md:inline-flex px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] rounded-[var(--radius)] transition-colors"
          >
            {t("about")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
