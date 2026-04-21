import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { HomeActivitiesTeaser } from "@/components/home/HomeActivitiesTeaser";
import { HomeRoutesTeaser } from "@/components/home/HomeRoutesTeaser";
import { SleepSection } from "@/components/SleepSection";
import { SignupForm } from "@/components/auth/SignupForm";
import { places } from "@/data/places";
import { routes } from "@/data/routes";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");

  // Sitios curados (sin casitas ni actividades) destacados. Si hay pocos
  // featured, igualmente limitamos a 12 para que el grid del home
  // quepa bien.
  const featuredSites = places
    .filter((p) => p.category !== "activity" && p.category !== "casita")
    .filter((p) => p.featured)
    .slice(0, 12);

  // Actividades destacadas para el teaser.
  const featuredActivities = places
    .filter((p) => p.category === "activity" && p.featured)
    .slice(0, 4);

  // Totales para la barra de stats
  const totalSites = places.filter((p) => p.category !== "activity").length;
  const totalActivities = places.filter((p) => p.category === "activity").length;
  const totalRoutes = routes.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 70% 0%, rgba(5,113,94,0.10), transparent 55%), radial-gradient(circle at 10% 100%, rgba(228,173,19,0.10), transparent 55%)",
          }}
        />
        <div className="container-rc pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 fade-up">
          <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)] mb-5">
              <span className="inline-block w-8 sm:w-10 h-px bg-[var(--color-accent)]" />
              {t("eyebrow")}
              <span className="inline-block w-8 sm:w-10 h-px bg-[var(--color-accent)]" />
            </span>
            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.02]">
              {t("title")}
            </h1>
            <p className="mt-5 sm:mt-6 text-lg sm:text-xl lg:text-2xl text-[var(--color-ink-muted)] max-w-3xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="#map"
                className="inline-flex items-center justify-center h-12 px-7 rounded-[var(--radius)] bg-[var(--color-primary)] text-white font-semibold text-sm sm:text-base hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                {t("cta")}
              </Link>
              <Link
                href="#signup"
                className="inline-flex items-center justify-center h-12 px-7 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] font-semibold text-sm sm:text-base hover:border-[var(--color-primary)]/40 transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Stats row — visible desde sm arriba */}
          <div className="hidden sm:grid grid-cols-4 gap-4 lg:gap-8 max-w-4xl lg:max-w-5xl mx-auto mt-14 lg:mt-20">
            {[
              { value: totalSites, label: t("statsSites") },
              { value: totalActivities, label: t("statsActivities") },
              { value: totalRoutes, label: t("statsRoutes") },
              { value: 6, label: t("statsLanguages") },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-[var(--font-display)] text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">
                  {s.value}
                </div>
                <div className="text-xs lg:text-sm text-[var(--color-ink-muted)] mt-1 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa + destacados curados */}
      <HomeHighlights allPlaces={places} highlights={featuredSites} />

      {/* Actividades (Civitatis) */}
      <HomeActivitiesTeaser activities={featuredActivities} />

      {/* Rutas de un día */}
      <HomeRoutesTeaser />

      {/* Casitas Canarias */}
      <SleepSection />

      {/* Signup */}
      <section id="signup" className="container-rc pt-16 pb-4 max-w-lg">
        <SignupForm />
      </section>
    </>
  );
}
