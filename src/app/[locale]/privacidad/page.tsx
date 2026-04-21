import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacidad" });
  return buildPageMetadata({
    locale,
    path: "/privacidad",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

  return (
    <article className="container-rc py-12 lg:py-16">
      <div className="max-w-2xl lg:max-w-3xl">
        <h1 className="font-[var(--font-display)] text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-2">
          {t("title")}
        </h1>
        <p className="text-xs text-[var(--color-ink-muted)] mb-6">{t("lastUpdate")}</p>

        <div className="space-y-4 text-sm lg:text-base text-[var(--color-ink)] leading-relaxed">
        <p>
          Real Canaria es un proyecto de Casitas Canarias. Recopilamos solo: tu nombre, email
          y la fecha de tu visita, exclusivamente para personalizarte las recomendaciones de
          viaje. No vendemos datos, no hacemos marketing por email sin tu consentimiento
          explícito.
        </p>
        <p>
          <strong>Base legal:</strong> consentimiento (art. 6.1.a RGPD).
        </p>
        <p>
          <strong>Almacenamiento:</strong> base de datos cifrada en tránsito y en reposo, en
          servidores europeos (Neon/Vercel en Frankfurt).
        </p>
        <p>
          <strong>Sub-encargados:</strong> Vercel (hosting), Neon (base de datos), Mapbox
          (tiles del mapa, no recibe tus datos personales).
        </p>
        <p>
          <strong>Tus derechos (RGPD arts. 15-22):</strong> acceso, rectificación, supresión,
          portabilidad, limitación y oposición. Escríbenos a{" "}
          <a href="mailto:hola@casitascanarias.com" className="text-[var(--color-primary)] underline">
            hola@casitascanarias.com
          </a>{" "}
          para ejercerlos.
        </p>
        <p>
          <strong>Conservación:</strong> eliminamos tus datos al año de tu última visita o
          cuando lo solicites, lo que ocurra antes.
        </p>
        </div>
      </div>
    </article>
  );
}
