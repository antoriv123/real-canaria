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
      <section className="container-rc py-16 sm:py-24 lg:py-32">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-warm)]/30 bg-gradient-to-br from-[var(--color-warm)]/5 via-[var(--color-bg)] to-[var(--color-warm)]/15 px-8 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20">
          <div className="flex items-center gap-2 mb-5 text-[var(--color-warm)]">
            <Bed size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.14em]">
              Casitas Canarias
            </span>
          </div>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] max-w-2xl leading-tight">
            {t("fullTitle")}
          </h2>
          <p className="mt-5 text-[var(--color-ink-muted)] max-w-xl text-base lg:text-lg leading-relaxed">
            {t("fullSubtitle")}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--color-warm)] text-[#2A1E00] font-semibold text-sm hover:brightness-110 transition-all"
          >
            {t("cta")}
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="container-rc py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-[var(--radius-lg)] border border-[var(--color-warm)]/30 bg-[var(--color-warm)]/8 px-6 sm:px-8 py-6 lg:py-8">
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
