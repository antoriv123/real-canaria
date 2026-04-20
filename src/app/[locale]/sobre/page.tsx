import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <article className="container-rc py-12 max-w-2xl">
      <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-6">
        {t("title")}
      </h1>
      <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed">{t("body")}</p>
    </article>
  );
}
