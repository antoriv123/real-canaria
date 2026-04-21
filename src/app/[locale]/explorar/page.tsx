import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ExploreSection } from "@/components/ExploreSection";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";
import { places } from "@/data/places";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  return buildPageMetadata({
    locale,
    path: "/explorar",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ExplorarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("explore");

  // Excluimos actividades de /explorar — viven en /actividades por diferencia
  // de intento (afiliado vs sitio curado gratis).
  const sites = places.filter((p) => p.category !== "activity");

  return (
    <>
      <header className="container-rc pt-16 sm:pt-24 lg:pt-32 pb-8 lg:pb-12">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] mb-5 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg lg:text-xl text-[var(--color-ink-muted)] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </header>
      <ExploreSection places={sites} />
      <CasitaCtaBlock variant="compact" campaign="explorar" />
    </>
  );
}
