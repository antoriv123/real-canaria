/**
 * URLs de imagen por slug.
 * Imágenes servidas localmente desde /public/places/{slug}.jpg.
 * Descargadas via scripts/download-place-images.mjs (fuente: Wikimedia Commons).
 *
 * Si un archivo falta, PlaceImage cae al SVG placeholder automáticamente.
 */

export const PLACE_IMAGES: Record<string, string> = {
  // Miradores / naturaleza
  "roque-nublo": "/places/roque-nublo.jpg",
  "dunas-maspalomas": "/places/dunas-maspalomas.jpg",
  "pico-nieves": "/places/pico-nieves.jpg",
  "mirador-balcon": "/places/mirador-balcon.jpg",
  "roque-bentayga": "/places/roque-bentayga.jpg",
  "caldera-bandama": "/places/caldera-bandama.jpg",
  "playa-guigui": "/places/playa-guigui.jpg",
  "charco-azul": "/places/charco-azul.jpg",
  "faro-maspalomas": "/places/faro-maspalomas.jpg",
  "barranco-guayadeque": "/places/barranco-guayadeque.jpg",
  "degollada-becerra": "/places/degollada-becerra.jpg",

  // Pueblos
  "vegueta": "/places/vegueta.jpg",
  "puerto-mogan": "/places/puerto-mogan.jpg",
  "teror": "/places/teror.jpg",
  "tejeda": "/places/tejeda.jpg",
  "agaete": "/places/agaete.jpg",
  "fataga": "/places/fataga.jpg",
  "arucas": "/places/arucas.jpg",
  "firgas": "/places/firgas.jpg",
  "artenara": "/places/artenara.jpg",
  "aguimes": "/places/aguimes.jpg",
  "galdar": "/places/galdar.jpg",

  // Museos / cultura
  "jardin-canario": "/places/jardin-canario.jpg",
  "museo-canario": "/places/museo-canario.jpg",
  "casa-colon": "/places/casa-colon.jpg",
  "cueva-pintada": "/places/cueva-pintada.jpg",
  "cenobio-valeron": "/places/cenobio-valeron.jpg",
  "catedral-santa-ana": "/places/catedral-santa-ana.jpg",

  // Restaurantes (foto del entorno donde están)
  "tagoror-guayadeque": "/places/tagoror-guayadeque.jpg",
  "las-nasas-agaete": "/places/las-nasas-agaete.jpg",
  "meson-la-silla": "/places/meson-la-silla.jpg",
  "la-vaca-azul": "/places/la-vaca-azul.jpg",
  "el-santo": "/places/el-santo.jpg",

  // Casitas rurales (foto del pueblo donde están)
  "casita-teror": "/places/casita-teror.jpg",
  "casita-aguimes": "/places/casita-aguimes.jpg",
  "casita-valsequillo": "/places/casita-valsequillo.jpg",
  "casita-san-mateo": "/places/casita-san-mateo.jpg",
};

export function getPlaceImageUrl(slug: string): string | undefined {
  return PLACE_IMAGES[slug];
}
