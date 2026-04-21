import { useTranslations } from "next-intl";
import { ArrowRight, Bed } from "lucide-react";
import { CASITAS_URL, withUtm } from "@/lib/site";

interface Props {
  /**
   * "compact": banda delgada (1 línea + CTA) para intercalar al final de
   * listados y en páginas secundarias.
   * "full": tarjeta con título grande + subtítulo + CTA, pensada para
   * cerrar una página completa (home, /sobre).
   */
  variant?: "compact" | "full";
  /** Identificador para el parámetro utm_campaign. */
  campaign: string;
}

export function CasitaCtaBlock({ variant = "compact", campaign }: Props) {
  const t = useTranslations("sleep.ctaBlock");
  const href = withUtm(CASITAS_URL, campaign);

  if (variant === "full") {
    return (
      <section className="container-rc py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-warm)]/30 bg-gradient-to-br from-[var(--color-warm)]/5 via-[var(--color-bg)] to-[var(--color-warm)]/15 px-6 sm:px-10 py-10 sm:py-12">
          <div className="flex items-center gap-2 mb-3 text-[var(--color-warm)]">
            <Bed size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">
              Casitas Canarias
            </span>
          </div>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-ink)] max-w-2xl">
            {t("fullTitle")}
          </h2>
          <p className="mt-3 text-[var(--color-ink-muted)] max-w-xl">
            {t("fullSubtitle")}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm hover:brightness-110 transition-all"
          >
            {t("cta")}
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="container-rc py-10 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-warm)]/30 bg-[var(--color-warm)]/8 px-5 sm:px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 h-9 w-9 rounded-full bg-[var(--color-warm)]/15 text-[var(--color-warm)] inline-flex items-center justify-center">
            <Bed size={16} />
          </div>
          <div>
            <p className="font-[var(--font-display)] font-semibold text-base text-[var(--color-ink)] leading-tight">
              {t("compactTitle")}
            </p>
            <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
              {t("compactSubtitle")}
            </p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm shrink-0 hover:brightness-110 transition-all self-start sm:self-auto"
        >
          {t("cta")}
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
