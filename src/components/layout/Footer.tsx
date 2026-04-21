import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { CASITAS_URL, withUtm } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const casitasHref = withUtm(CASITAS_URL, "footer");

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] mt-16">
      <div className="container-rc py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-0.5 mb-2">
              <span className="font-[var(--font-display)] font-bold text-lg text-[var(--color-ink)]">Real</span>
              <span className="font-[var(--font-display)] font-bold text-lg text-[var(--color-primary)]">Canaria</span>
            </div>
            <p className="text-sm text-[var(--color-ink-muted)] max-w-md">{t("tagline")}</p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-sm">
            <a
              href={casitasHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              {t("casitas")} →
            </a>
            <div className="flex gap-4">
              <Link href={`/${locale}/privacidad`} className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
