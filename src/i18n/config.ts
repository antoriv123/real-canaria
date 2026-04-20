export const locales = ["es", "en", "de", "nl", "it", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
  it: "Italiano",
  fr: "Français",
};

export const localeFlags: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  de: "🇩🇪",
  nl: "🇳🇱",
  it: "🇮🇹",
  fr: "🇫🇷",
};
