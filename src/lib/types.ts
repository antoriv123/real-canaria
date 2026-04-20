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
}

export interface User {
  id: number;
  name: string;
  email: string;
  visitDate: string; // YYYY-MM-DD
  locale: Locale;
}
