"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { Globe, ChevronDown } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function switchLocale(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    const newPath = segments.join("/");
    startTransition(() => {
      router.replace(newPath);
      setOpen(false);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] px-3 py-2 rounded-[var(--radius)] transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe size={16} aria-hidden />
        <span>{localeFlags[locale]} {locale.toUpperCase()}</span>
        <ChevronDown size={14} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-44 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] shadow-lg z-50 overflow-hidden">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[var(--color-surface-muted)] transition-colors ${
                  l === locale ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-medium" : ""
                }`}
              >
                <span>{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
