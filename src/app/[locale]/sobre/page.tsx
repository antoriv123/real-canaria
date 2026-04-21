import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CasitaCtaBlock } from "@/components/cross-sell/CasitaCtaBlock";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.sobre" });
  return buildPageMetadata({
    locale,
    path: "/sobre",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      <article className="container-rc py-12 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg lg:text-xl text-[var(--color-ink-muted)] leading-relaxed">
            {t("body")}
          </p>
        </div>
      </article>
      <CasitaCtaBlock variant="full" campaign="sobre" />
    </>
  );
}
