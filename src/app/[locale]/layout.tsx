import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, CASITAS_URL, absoluteUrl, hreflangMap } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Real Canaria",
    url: absoluteUrl("", locale),
    logo: `${SITE_URL}/favicon.ico`,
    parentOrganization: {
      "@type": "Organization",
      name: "Casitas Canarias",
      url: CASITAS_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Gran Canaria",
    },
    sameAs: [CASITAS_URL],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Real Canaria",
    url: absoluteUrl("", locale),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Casitas Canarias",
    },
    alternateName: Object.values(hreflangMap("")),
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
