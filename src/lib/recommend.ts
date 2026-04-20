import type { Place } from "./types";
import { places } from "@/data/places";

/**
 * Recomienda sitios según la fecha de visita (estación + festividades).
 * Devuelve array de slugs con razonamiento contextual.
 */
export function recommendForDate(visitDate: string): {
  places: Place[];
  seasonLabel: "winter" | "spring" | "summer" | "autumn";
  highlights: string[];
} {
  const date = new Date(visitDate);
  const month = date.getMonth() + 1; // 1-12

  // Clasificar estación (hemisferio norte, matizado para Canarias)
  let season: "winter" | "spring" | "summer" | "autumn";
  if (month >= 12 || month <= 2) season = "winter";
  else if (month <= 5) season = "spring";
  else if (month <= 8) season = "summer";
  else season = "autumn";

  // Slugs priorizados por temporada
  const BY_SEASON: Record<string, string[]> = {
    winter: [
      // Invierno en Canarias = cumbres con nieve posible, ballenas, senderismo fresco
      "laurisilva-moya", "tamadaba", "roque-nublo", "pico-nieves", "barranco-guayadeque",
      "teror", "tejeda", "vegueta", "museo-canario", "playa-canteras",
      "cruz-tejeda", "barranco-veneguera", "fontanales",
    ],
    spring: [
      // Primavera = almendros en flor (feb-mar), floración
      "tejeda", "valsequillo", "roque-nublo", "fataga", "barranco-guayadeque",
      "artenara", "caldera-bandama", "jardin-canario", "teror",
      "fontanales", "valleseco", "puerto-mogan",
    ],
    summer: [
      // Verano = playas, cumbres frescas al amanecer, miradores costeros
      "dunas-maspalomas", "playa-canteras", "playa-guigui", "puerto-mogan",
      "faro-maspalomas", "mirador-balcon", "charco-azul", "playa-veneguera",
      "playa-tauro", "agaete", "las-nasas-agaete", "roque-nublo",
    ],
    autumn: [
      // Otoño = clima perfecto, cosechas, romerías
      "teror", "arucas", "guia", "fontanales", "moya", "laurisilva-moya",
      "caldera-bandama", "vegueta", "jardin-canario", "caam",
      "fataga", "tejeda", "barranco-guayadeque",
    ],
  };

  // Eventos especiales por mes
  const HIGHLIGHTS_BY_MONTH: Record<number, string[]> = {
    1: ["Fiesta de San Antón (Arucas, 17 ene)"],
    2: ["Carnaval de Las Palmas", "Almendros en flor en Tejeda"],
    3: ["Almendros en flor en Tejeda", "Semana Santa en Vegueta"],
    4: ["Semana Santa", "Temporada de senderismo ideal"],
    5: ["Mayo de Las Palmas", "Clima perfecto"],
    6: ["Noche de San Juan (Las Canteras, 23 jun)"],
    7: ["Bajada de la Rama (Agaete, 4 ago... cercano)", "Playas y fiestas costeras"],
    8: ["Bajada de la Rama (Agaete, 4 ago)", "Fiestas de verano"],
    9: ["Fiestas del Pino (Teror, 8 sept)", "Fin de playa, inicio de cumbres"],
    10: ["Romería del Pino", "Otoño en la laurisilva"],
    11: ["Fiesta de la Manzana (Valleseco)", "Castañas en las cumbres"],
    12: ["Navidad en Vegueta", "Senderismo en cumbres nevadas"],
  };

  const prioritySlugs = BY_SEASON[season];
  const seasonPlaces: Place[] = [];
  const seen = new Set<string>();

  for (const slug of prioritySlugs) {
    const p = places.find((x) => x.slug === slug);
    if (p && !seen.has(slug)) {
      seasonPlaces.push(p);
      seen.add(slug);
    }
  }

  return {
    places: seasonPlaces.slice(0, 9),
    seasonLabel: season,
    highlights: HIGHLIGHTS_BY_MONTH[month] ?? [],
  };
}

/**
 * Recomienda sitios a partir de una lista de favoritos (Mi plan).
 */
export function recommendFromFavorites(favoriteSlugs: string[]): Place[] {
  if (favoriteSlugs.length === 0) return [];
  return places.filter((p) => favoriteSlugs.includes(p.slug));
}
