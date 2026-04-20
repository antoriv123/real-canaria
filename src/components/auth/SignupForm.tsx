"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/lib/utils";

export function SignupForm() {
  const t = useTranslations("signup");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // anti-bot
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (honeypot) return; // bot silent fail

    if (!name.trim()) return setError(t("errorName"));
    if (!isValidEmail(email)) return setError(t("errorEmail"));
    if (!visitDate) return setError(t("errorDate"));
    if (!consent) return setError(t("errorConsent"));

    startTransition(async () => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, visitDate, locale }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Error");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/plan`);
      }, 800);
    });
  }

  if (success) {
    return (
      <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-center">
        <p className="text-[var(--color-primary)] font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[var(--color-surface)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
      <div>
        <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] mb-1">
          {t("title")}
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)]">{t("subtitle")}</p>
      </div>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t("name")}
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="w-full h-11 px-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="w-full h-11 px-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label htmlFor="visit-date" className="block text-sm font-medium mb-1">
          {t("visitDate")}
        </label>
        <input
          id="visit-date"
          type="date"
          required
          value={visitDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setVisitDate(e.target.value)}
          className="w-full h-11 px-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
        />
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
        />
        <span className="text-xs text-[var(--color-ink-muted)]">{t("consent")}</span>
      </label>

      {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-12 rounded-[var(--radius)] bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-hover)] disabled:opacity-60 transition-colors"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
