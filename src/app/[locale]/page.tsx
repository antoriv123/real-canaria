import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ExploreSection } from "@/components/ExploreSection";
import { SignupForm } from "@/components/auth/SignupForm";
import { places } from "@/data/places";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 70% 0%, rgba(45,80,22,0.08), transparent 60%), radial-gradient(circle at 10% 100%, rgba(196,114,58,0.08), transparent 55%)",
          }}
        />
        <div className="container-rc pt-10 sm:pt-14 pb-24 sm:pb-32 text-center fade-up">
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-ink)] max-w-3xl mx-auto leading-[1.05]">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[var(--color-ink-muted)] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="#map"
              className="inline-flex items-center justify-center h-11 px-6 rounded-[var(--radius)] bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              {t("cta")}
            </Link>
            <Link
              href="#signup"
              className="inline-flex items-center justify-center h-11 px-6 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] font-semibold text-sm hover:border-[var(--color-primary)]/40 transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Mapa + Lista */}
      <ExploreSection places={places} />

      {/* Signup */}
      <section id="signup" className="container-rc pt-16 pb-4 max-w-lg">
        <SignupForm />
      </section>
    </>
  );
}
