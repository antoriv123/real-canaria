import type { Locale } from "@/i18n/config";

export interface SuggestedRoute {
  slug: string;
  zone: "cumbres" | "norte" | "sur" | "las-palmas" | "oeste";
  durationHours: number;
  distanceKm: number;
  stopSlugs: string[];
  translations: Record<
    Locale,
    { name: string; description: string; tips: string }
  >;
}

export const routes: SuggestedRoute[] = [
  {
    slug: "dia-cumbres",
    zone: "cumbres",
    durationHours: 8,
    distanceKm: 55,
    stopSlugs: ["cruz-tejeda", "roque-nublo", "tejeda", "artenara", "pico-nieves"],
    translations: {
      es: {
        name: "Un día en las cumbres",
        description: "Ruta circular por el corazón de Gran Canaria. Roque Nublo, Tejeda, Artenara y miradores a 1.800 m.",
        tips: "Desayuna fuerte. Lleva chaqueta (arriba hace fresco). Para en la Cruz de Tejeda para comer en el Parador.",
      },
      en: {
        name: "A day in the summits",
        description: "Circular route through Gran Canaria's heart. Roque Nublo, Tejeda, Artenara and 1,800 m viewpoints.",
        tips: "Hearty breakfast. Bring a jacket (cool up top). Stop at Cruz de Tejeda for lunch at the Parador.",
      },
      de: {
        name: "Ein Tag in den Gipfeln",
        description: "Rundtour durchs Herz Gran Canarias. Roque Nublo, Tejeda, Artenara und Aussichtspunkte auf 1.800 m.",
        tips: "Ordentlich frühstücken. Jacke mitnehmen. Mittagessen im Parador an der Cruz de Tejeda.",
      },
      nl: {
        name: "Een dag in de bergen",
        description: "Rondrit door het hart van Gran Canaria. Roque Nublo, Tejeda, Artenara en uitzichten op 1.800 m.",
        tips: "Stevig ontbijten. Neem een jas mee. Lunch bij Parador Cruz de Tejeda.",
      },
      it: {
        name: "Un giorno sulle cime",
        description: "Itinerario circolare nel cuore di Gran Canaria. Roque Nublo, Tejeda, Artenara.",
        tips: "Colazione abbondante. Porta una giacca. Pranzo al Parador Cruz de Tejeda.",
      },
      fr: {
        name: "Une journée dans les sommets",
        description: "Circuit au cœur de Gran Canaria. Roque Nublo, Tejeda, Artenara et belvédères à 1 800 m.",
        tips: "Petit-déj copieux. Prends une veste. Déjeuner au Parador Cruz de Tejeda.",
      },
    },
  },
  {
    slug: "dia-norte",
    zone: "norte",
    durationHours: 7,
    distanceKm: 70,
    stopSlugs: ["arucas", "firgas", "fontanales", "moya", "agaete"],
    translations: {
      es: {
        name: "Un día por el norte",
        description: "Ruta del norte verde. Ron en Arucas, agua en Firgas, queso en Fontanales, laurisilva en Moya y pescado en Agaete.",
        tips: "Empieza en Arucas con la visita a la destilería. Termina con pescado en Puerto de las Nieves al atardecer.",
      },
      en: {
        name: "A day in the north",
        description: "The green north. Rum in Arucas, water in Firgas, cheese in Fontanales, laurel forest in Moya, fish in Agaete.",
        tips: "Start with the Arucas distillery. End with fish at Puerto de las Nieves at sunset.",
      },
      de: {
        name: "Ein Tag im Norden",
        description: "Grüner Norden. Rum in Arucas, Wasser in Firgas, Käse in Fontanales, Lorbeerwald in Moya, Fisch in Agaete.",
        tips: "Start in der Destillerie Arucas. Abschluss: Fisch in Puerto de las Nieves.",
      },
      nl: {
        name: "Een dag in het noorden",
        description: "Het groene noorden. Rum in Arucas, water in Firgas, kaas in Fontanales, laurierbos in Moya, vis in Agaete.",
        tips: "Begin in de distilleerderij van Arucas. Eindig met vis bij Puerto de las Nieves.",
      },
      it: {
        name: "Un giorno nel nord",
        description: "Il nord verde. Rum ad Arucas, acqua a Firgas, formaggio a Fontanales, laurisilva a Moya, pesce ad Agaete.",
        tips: "Parti dalla distilleria di Arucas. Finisci con pesce al Puerto de las Nieves.",
      },
      fr: {
        name: "Une journée dans le nord",
        description: "Le nord vert. Rhum à Arucas, eau à Firgas, fromage à Fontanales, laurisilve à Moya, poisson à Agaete.",
        tips: "Commence par la distillerie d'Arucas. Termine avec le poisson au Puerto de las Nieves.",
      },
    },
  },
  {
    slug: "dia-las-palmas",
    zone: "las-palmas",
    durationHours: 8,
    distanceKm: 10,
    stopSlugs: ["vegueta", "catedral-santa-ana", "casa-colon", "museo-canario", "caam", "playa-canteras"],
    translations: {
      es: {
        name: "Un día en Las Palmas",
        description: "La capital. Vegueta colonial, Catedral, museos y terminar en Las Canteras al atardecer.",
        tips: "Caminable todo. Jueves noche tapeo en Vegueta. Baño en Las Canteras + cena en el Auditorio.",
      },
      en: {
        name: "A day in Las Palmas",
        description: "The capital. Colonial Vegueta, cathedral, museums, ending at Las Canteras beach at sunset.",
        tips: "All walkable. Thursday night tapas in Vegueta. Swim at Las Canteras + dinner by the Auditorium.",
      },
      de: {
        name: "Ein Tag in Las Palmas",
        description: "Die Hauptstadt. Koloniales Vegueta, Kathedrale, Museen und Abschluss am Strand Las Canteras.",
        tips: "Alles zu Fuß. Donnerstag Tapas in Vegueta. Baden und dann Abendessen am Auditorium.",
      },
      nl: {
        name: "Een dag in Las Palmas",
        description: "De hoofdstad. Koloniaal Vegueta, kathedraal, musea, eindigen bij Las Canteras bij zonsondergang.",
        tips: "Alles lopend. Donderdag tapas in Vegueta. Zwemmen + diner bij het auditorium.",
      },
      it: {
        name: "Un giorno a Las Palmas",
        description: "La capitale. Vegueta coloniale, cattedrale, musei e spiaggia Las Canteras al tramonto.",
        tips: "Tutto a piedi. Giovedì sera tapas a Vegueta.",
      },
      fr: {
        name: "Une journée à Las Palmas",
        description: "La capitale. Vegueta coloniale, cathédrale, musées, plage Las Canteras au coucher du soleil.",
        tips: "Tout à pied. Jeudi soir tapas à Vegueta.",
      },
    },
  },
  {
    slug: "dia-sur",
    zone: "sur",
    durationHours: 8,
    distanceKm: 65,
    stopSlugs: ["dunas-maspalomas", "faro-maspalomas", "fataga", "puerto-mogan", "mirador-tirajanas"],
    translations: {
      es: {
        name: "Un día en el sur",
        description: "Dunas, faro, pueblo-oasis de Fataga, Puerto de Mogán y miradores sobre el barranco.",
        tips: "Dunas al amanecer antes de que caliente. Cena con puesta de sol en Puerto de Mogán.",
      },
      en: {
        name: "A day in the south",
        description: "Dunes, lighthouse, Fataga oasis village, Puerto de Mogán and canyon viewpoints.",
        tips: "Dunes at sunrise before it heats up. Sunset dinner at Puerto de Mogán.",
      },
      de: {
        name: "Ein Tag im Süden",
        description: "Dünen, Leuchtturm, Oasendorf Fataga, Puerto de Mogán und Schluchtaussichten.",
        tips: "Dünen bei Sonnenaufgang, bevor es heiß wird. Abendessen in Puerto de Mogán.",
      },
      nl: {
        name: "Een dag in het zuiden",
        description: "Duinen, vuurtoren, oasedorp Fataga, Puerto de Mogán en uitzichten op het ravijn.",
        tips: "Duinen bij zonsopgang. Diner bij zonsondergang in Puerto de Mogán.",
      },
      it: {
        name: "Un giorno nel sud",
        description: "Dune, faro, paese-oasi Fataga, Puerto de Mogán e belvederi.",
        tips: "Dune all'alba prima del caldo. Cena al tramonto a Puerto de Mogán.",
      },
      fr: {
        name: "Une journée dans le sud",
        description: "Dunes, phare, village-oasis de Fataga, Puerto de Mogán et belvédères.",
        tips: "Dunes au lever du soleil. Dîner au coucher à Puerto de Mogán.",
      },
    },
  },
  {
    slug: "dia-oeste",
    zone: "oeste",
    durationHours: 9,
    distanceKm: 80,
    stopSlugs: ["mirador-balcon", "aldea-san-nicolas", "playa-tasartico", "puerto-mogan"],
    translations: {
      es: {
        name: "Un día por el oeste salvaje",
        description: "La costa oeste, de las más espectaculares de Europa. Carretera de curvas, acantilados de 300 m y playas remotas.",
        tips: "Solo si no te marean las curvas. Salida temprano. Gasolina llena. 4x4 para Güigüí opcional.",
      },
      en: {
        name: "A day in the wild west",
        description: "The west coast, one of Europe's most spectacular. Winding road, 300 m cliffs, remote beaches.",
        tips: "Only if you don't get car-sick. Early start. Full tank. 4x4 for Güigüí optional.",
      },
      de: {
        name: "Ein Tag im wilden Westen",
        description: "Spektakulärste Küste Europas. Kurvige Straße, 300-m-Klippen, abgelegene Strände.",
        tips: "Nur ohne Reisekrankheit. Früh los. Voller Tank.",
      },
      nl: {
        name: "Een dag in het wilde westen",
        description: "Spectaculaire westkust. Bochtige weg, 300 m kliffen, afgelegen stranden.",
        tips: "Alleen als je niet wagenziek wordt. Vroeg vertrekken. Volle tank.",
      },
      it: {
        name: "Un giorno nel selvaggio ovest",
        description: "La costa ovest, tra le più spettacolari d'Europa. Strada tortuosa, scogliere di 300 m.",
        tips: "Solo se non soffri l'auto. Partenza presto.",
      },
      fr: {
        name: "Une journée dans l'ouest sauvage",
        description: "La côte ouest, parmi les plus spectaculaires d'Europe. Route sinueuse, falaises de 300 m.",
        tips: "Seulement sans mal des transports. Départ tôt.",
      },
    },
  },
];

export function getRouteBySlug(slug: string) {
  return routes.find((r) => r.slug === slug) ?? null;
}
