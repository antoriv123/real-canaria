import type { Locale } from "@/i18n/config";

export type PlaceCategory =
  | "viewpoint"
  | "village"
  | "museum"
  | "restaurant"
  | "casita";

export interface PlaceTranslation {
  name: string;
  description: string;
  tip?: string;
}

export type Accessibility = "easy" | "moderate" | "hard";

export interface Place {
  slug: string;
  category: PlaceCategory;
  island: "gran-canaria";
  lat: number;
  lng: number;
  imageUrl: string;
  imageCredit?: string;
  externalUrl?: string;
  isCasita?: boolean;
  featured?: boolean;
  translations: Record<Locale, PlaceTranslation>;
  // Metadatos enriquecidos (opcional)
  openingHours?: string | null;       // "9:00-18:00" | "24h" | null
  priceEur?: number | null;            // null = gratis o n/a
  visitDurationMinutes?: number | null;
  accessibility?: Accessibility;
  bestSeason?: string[];               // ["spring", "summer", ...]
}

export interface User {
  id: number;
  name: string;
  email: string;
  visitDate: string; // YYYY-MM-DD
  locale: Locale;
}
