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

  // ===== EXTRA (63 sitios nuevos) =====
  // Naturaleza
  "cruz-tejeda": "/places/cruz-tejeda.jpg",
  "pozo-nieves": "/places/pozo-nieves.jpg",
  "cuevas-cuatro-puertas": "/places/cuevas-cuatro-puertas.jpg",
  "montana-arucas": "/places/montana-arucas.jpg",
  "cueva-rey": "/places/cueva-rey.jpg",
  "playa-canteras": "/places/playa-canteras.jpg",
  "playa-confital": "/places/playa-confital.jpg",
  "playa-veneguera": "/places/playa-veneguera.jpg",
  "playa-tauro": "/places/playa-tauro.jpg",
  "playa-tasartico": "/places/playa-tasartico.jpg",
  "playa-aguadulce": "/places/playa-aguadulce.jpg",
  "roque-saucillo": "/places/roque-saucillo.jpg",
  "mirador-tirajanas": "/places/mirador-tirajanas.jpg",
  "barranco-veneguera": "/places/barranco-veneguera.jpg",
  "barranco-mogan": "/places/barranco-mogan.jpg",
  "tamadaba": "/places/tamadaba.jpg",
  "laurisilva-moya": "/places/laurisilva-moya.jpg",
  "cruz-hoya-plata": "/places/cruz-hoya-plata.jpg",
  "arinaga-volcano": "/places/arinaga-volcano.jpg",
  "roque-aguayro": "/places/roque-aguayro.jpg",

  // Pueblos
  "fontanales": "/places/fontanales.jpg",
  "moya": "/places/moya.jpg",
  "valleseco": "/places/valleseco.jpg",
  "valsequillo": "/places/valsequillo.jpg",
  "san-mateo": "/places/san-mateo.jpg",
  "santa-brigida": "/places/santa-brigida.jpg",
  "ingenio": "/places/ingenio.jpg",
  "guia": "/places/guia.jpg",
  "aldea-san-nicolas": "/places/aldea-san-nicolas.jpg",
  "mogan-pueblo": "/places/mogan-pueblo.jpg",
  "arinaga": "/places/arinaga.jpg",
  "tamaraceite": "/places/tamaraceite.jpg",
  "juncalillo": "/places/juncalillo.jpg",
  "puerto-rico": "/places/puerto-rico.jpg",
  "vecindario": "/places/vecindario.jpg",
  "telde": "/places/telde.jpg",
  "santa-lucia": "/places/santa-lucia.jpg",

  // Museos/cultura
  "fortaleza-ansite": "/places/fortaleza-ansite.jpg",
  "caam": "/places/caam.jpg",
  "castillo-luz": "/places/castillo-luz.jpg",
  "auditorio-kraus": "/places/auditorio-kraus.jpg",
  "casa-leon-castillo": "/places/casa-leon-castillo.jpg",
  "iglesia-santiago-galdar": "/places/iglesia-santiago-galdar.jpg",
  "tumulo-guancha": "/places/tumulo-guancha.jpg",
  "casa-tomas-morales": "/places/casa-tomas-morales.jpg",
  "parque-doramas": "/places/parque-doramas.jpg",
  "cueva-candiles": "/places/cueva-candiles.jpg",

  // Restaurantes
  "bevir": "/places/bevir.jpg",
  "pulperia-canarios": "/places/pulperia-canarios.jpg",
  "la-aquarela": "/places/la-aquarela.jpg",
  "muelle-arguineguin": "/places/muelle-arguineguin.jpg",
  "texeda": "/places/texeda.jpg",
  "deliciosa-marta": "/places/deliciosa-marta.jpg",
  "caseron-galdar": "/places/caseron-galdar.jpg",
  "cantina-firgas": "/places/cantina-firgas.jpg",
  "cho-zacarias": "/places/cho-zacarias.jpg",
  "ribera-agaete": "/places/ribera-agaete.jpg",

  // Casitas nuevas
  "casita-fontanales": "/places/casita-fontanales.jpg",
  "casita-moya": "/places/casita-moya.jpg",
  "casita-valleseco": "/places/casita-valleseco.jpg",
  "casita-santa-brigida": "/places/casita-santa-brigida.jpg",
  "casita-tejeda": "/places/casita-tejeda.jpg",
  "casita-firgas": "/places/casita-firgas.jpg",
};

export function getPlaceImageUrl(slug: string): string | undefined {
  return PLACE_IMAGES[slug];
}
