import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getSessionUserId } from "@/lib/session";
import { getUserById } from "@/lib/db";
import { recommendForDate } from "@/lib/recommend";
import { PlanFavorites } from "@/components/PlanFavorites";
import { buildPageMetadata } from "@/lib/seo";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.plan" });
  return buildPageMetadata({
    locale,
    path: "/plan",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("plan");
  const uid = await getSessionUserId();
  const user = uid ? getUserById(uid) : null;

  if (!user) {
    return (
      <div className="container-rc py-16 max-w-lg text-center">
        <h1 className="font-[var(--font-display)] text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-[var(--color-ink-muted)] mb-6">{t("emptyPlan")}</p>
        <Link
          href={`/${locale}#signup`}
          className="inline-flex items-center justify-center h-11 px-6 rounded-[var(--radius)] bg-[var(--color-primary)] text-white font-semibold text-sm"
        >
          ← Home
        </Link>
      </div>
    );
  }

  // Recomendación REAL basada en fecha de visita
  const { places: recommended, seasonLabel, highlights } = recommendForDate(user.visitDate);

  const dateObj = new Date(user.visitDate);
  const formatter = new Intl.DateTimeFormat(user.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const seasonBadge: Record<string, { label: string; emoji: string }> = {
    winter: { label: "Winter", emoji: "❄️" },
    spring: { label: "Spring", emoji: "🌸" },
    summer: { label: "Summer", emoji: "☀️" },
    autumn: { label: "Autumn", emoji: "🍂" },
  };

  return (
    <div className="container-rc py-10 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] mb-1">
          <span>{formatter.format(dateObj)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wide">
            {seasonBadge[seasonLabel].emoji} {seasonBadge[seasonLabel].label}
          </span>
        </div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mt-1">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-ink-muted)] mt-2">
          {t("greeting", { name: user.name })}
        </p>

        {highlights.length > 0 && (
          <div className="mt-4 p-4 rounded-[var(--radius)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)] mb-1.5">
              <Sparkles size={12} />
              Durante tu visita
            </div>
            <ul className="space-y-1">
              {highlights.map((h, i) => (
                <li key={i} className="text-sm">• {h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recomendaciones + favoritos */}
      <PlanFavorites recommendedSlugs={recommended.map((p) => p.slug)} />

      <CasitaCtaBlock variant="compact" campaign="plan" />
    </div>
  );
}
