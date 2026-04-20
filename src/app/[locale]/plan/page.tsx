import { setRequestLocale, getTranslations } from "next-intl/server";
import { getSessionUserId } from "@/lib/session";
import { getUserById } from "@/lib/db";
import { places } from "@/data/places";
import { PlaceList } from "@/components/places/PlaceList";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

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

  // Recomendación simple V1: featured + 2 casitas
  const featured = places.filter((p) => p.featured || p.isCasita).slice(0, 6);
  const dateObj = new Date(user.visitDate);
  const formatter = new Intl.DateTimeFormat(user.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container-rc py-10 max-w-6xl">
      <div className="mb-8">
        <div className="text-sm text-[var(--color-ink-muted)]">{formatter.format(dateObj)}</div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mt-1">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-ink-muted)] mt-2">
          {t("greeting", { name: user.name })}
        </p>
      </div>

      <PlaceList places={featured} />
    </div>
  );
}
