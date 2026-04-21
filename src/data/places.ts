import type { Place } from "@/lib/types";
import { placesExtra } from "./places-extra";
import { placesActivities } from "./places-activities";

const placesCore: Place[] = [
  // ========== MIRADORES / NATURALEZA (11) ==========
  {
    slug: "roque-nublo",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.9689, lng: -15.6147,
    imageUrl: "",
    featured: true,
    translations: {
      es: { name: "Roque Nublo", description: "El símbolo sagrado de Gran Canaria. Monolito volcánico de 80 m a 1.800 m de altitud con vistas a toda la isla y al Teide en días claros.", tip: "Al amanecer o atardecer. 30 min de caminata desde el parking. Chaqueta, arriba hace fresco." },
      en: { name: "Roque Nublo", description: "Gran Canaria's sacred symbol. An 80 m volcanic monolith at 1,800 m with views of the whole island — on clear days, Teide across the ocean.", tip: "Go at sunrise or sunset. 30-min easy walk from parking. Bring a jacket, it's cooler up there." },
      de: { name: "Roque Nublo", description: "Das heilige Wahrzeichen. 80 m hoher vulkanischer Monolith auf 1.800 m mit Blick auf die Insel — bei klarem Wetter bis zum Teide.", tip: "Sonnenaufgang oder -untergang. 30 Min. einfacher Weg. Jacke mitnehmen." },
      nl: { name: "Roque Nublo", description: "Het heilige symbool. Vulkanische monoliet van 80 m op 1.800 m hoogte met uitzicht over het eiland — op heldere dagen tot de Teide.", tip: "Bij zonsopgang of -ondergang. 30 min makkelijk lopen. Neem een jas mee." },
      it: { name: "Roque Nublo", description: "Il simbolo sacro dell'isola. Monolito vulcanico di 80 m a 1.800 m con vista sull'intera isola — nelle giornate limpide fino al Teide.", tip: "All'alba o al tramonto. 30 min di cammino facile. Porta una giacca." },
      fr: { name: "Roque Nublo", description: "Le symbole sacré. Monolithe volcanique de 80 m à 1 800 m d'altitude avec vue sur toute l'île — par temps clair, jusqu'au Teide.", tip: "Au lever ou coucher du soleil. 30 min de marche. Prends une veste." },
    },
  },
  {
    slug: "dunas-maspalomas",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.7423, lng: -15.5686,
    imageUrl: "", featured: true,
    translations: {
      es: { name: "Dunas de Maspalomas", description: "Un desierto en miniatura al borde del Atlántico. Reserva natural de 400 hectáreas que hacen olvidar que estás en Europa.", tip: "Entra por el Faro y camina hasta la playa. Evita el mediodía en verano — la arena quema." },
      en: { name: "Maspalomas Dunes", description: "A mini-desert at the edge of the Atlantic. A 400-hectare nature reserve that'll make you forget you're in Europe.", tip: "Enter by the Lighthouse and walk to the beach. Avoid midday in summer — the sand burns." },
      de: { name: "Dünen von Maspalomas", description: "Eine Mini-Wüste am Atlantik. 400 Hektar Naturschutzgebiet, das dich vergessen lässt, dass du in Europa bist.", tip: "Einstieg am Leuchtturm, zu Fuß zum Strand. Mittags im Sommer meiden." },
      nl: { name: "Duinen van Maspalomas", description: "Een mini-woestijn aan de Atlantische Oceaan. 400 hectare natuurreservaat dat je doet vergeten dat je in Europa bent.", tip: "Ingang bij de vuurtoren, loop naar het strand. Vermijd de middag in de zomer." },
      it: { name: "Dune di Maspalomas", description: "Un deserto in miniatura sull'Atlantico. Riserva naturale di 400 ettari che ti fa dimenticare di essere in Europa.", tip: "Entra dal Faro e cammina fino alla spiaggia. Evita il mezzogiorno d'estate." },
      fr: { name: "Dunes de Maspalomas", description: "Un mini-désert au bord de l'Atlantique. Réserve de 400 hectares qui te fait oublier que tu es en Europe.", tip: "Entre par le Phare et marche jusqu'à la plage. Évite midi en été." },
    },
  },
  {
    slug: "pico-nieves",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.9651, lng: -15.5737,
    imageUrl: "",
    translations: {
      es: { name: "Pico de las Nieves", description: "El punto más alto de Gran Canaria a 1.949 m. Vista 360° de la isla, del Teide en Tenerife y, con suerte, de La Gomera.", tip: "Carretera subiendo desde Tejeda. Aparca y camina 5 min al mirador. Abrígate — puede haber nieve en invierno." },
      en: { name: "Pico de las Nieves", description: "Gran Canaria's highest point at 1,949 m. 360° views of the island, Teide on Tenerife and on lucky days La Gomera.", tip: "Drive up from Tejeda. Park and walk 5 min to the viewpoint. Bundle up — it can snow in winter." },
      de: { name: "Pico de las Nieves", description: "Höchster Punkt Gran Canarias auf 1.949 m. 360°-Blick auf die Insel, den Teide und mit Glück La Gomera.", tip: "Straße hoch von Tejeda. Parken, 5 Min. zum Aussichtspunkt. Warm anziehen — im Winter schneit es." },
      nl: { name: "Pico de las Nieves", description: "Het hoogste punt van Gran Canaria op 1.949 m. 360° uitzicht op het eiland, de Teide en soms La Gomera.", tip: "Rijd omhoog vanuit Tejeda. Parkeer en loop 5 min. Warm aankleden — 's winters sneeuwt het." },
      it: { name: "Pico de las Nieves", description: "Punto più alto di Gran Canaria a 1.949 m. Vista 360° sull'isola, sul Teide e a volte su La Gomera.", tip: "Strada che sale da Tejeda. Parcheggia, 5 min a piedi. Copriti — d'inverno nevica." },
      fr: { name: "Pico de las Nieves", description: "Point culminant de Gran Canaria à 1 949 m. Vue 360° sur l'île, le Teide et parfois La Gomera.", tip: "Route qui monte depuis Tejeda. Gare-toi, 5 min à pied. Couvre-toi — il neige en hiver." },
    },
  },
  {
    slug: "mirador-balcon",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 28.0442, lng: -15.7767,
    imageUrl: "",
    translations: {
      es: { name: "Mirador del Balcón", description: "Acantilados de 300 m cayendo directos al Atlántico en la costa oeste. Uno de los atardeceres más bestias de Europa.", tip: "Ve 30 min antes del atardecer. Carretera GC-200 desde La Aldea. Llévate una sudadera, sopla viento." },
      en: { name: "Mirador del Balcón", description: "300 m cliffs dropping straight into the Atlantic on the west coast. One of Europe's most brutal sunsets.", tip: "Arrive 30 min before sunset. GC-200 road from La Aldea. Bring a jumper, it gets windy." },
      de: { name: "Mirador del Balcón", description: "300 m hohe Klippen, die direkt in den Atlantik fallen, an der Westküste. Einer der spektakulärsten Sonnenuntergänge Europas.", tip: "30 Min. vor Sonnenuntergang dort sein. Straße GC-200 ab La Aldea. Pulli mitnehmen, es weht." },
      nl: { name: "Mirador del Balcón", description: "300 m hoge kliffen die recht in de Atlantische Oceaan vallen, westkust. Een van Europa's meest brute zonsondergangen.", tip: "30 min voor zonsondergang aankomen. Weg GC-200 vanaf La Aldea. Neem een trui mee, het waait." },
      it: { name: "Mirador del Balcón", description: "Scogliere di 300 m a picco sull'Atlantico nella costa ovest. Uno dei tramonti più pazzeschi d'Europa.", tip: "Arriva 30 min prima del tramonto. GC-200 da La Aldea. Porta una felpa, c'è vento." },
      fr: { name: "Mirador del Balcón", description: "Falaises de 300 m tombant à pic dans l'Atlantique sur la côte ouest. Un des couchers de soleil les plus brutaux d'Europe.", tip: "Arrive 30 min avant le coucher. Route GC-200 depuis La Aldea. Prends un pull, il vente." },
    },
  },
  {
    slug: "roque-bentayga",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.9778, lng: -15.6358,
    imageUrl: "",
    translations: {
      es: { name: "Roque Bentayga", description: "Fortaleza sagrada aborigen tallada en roca volcánica. Sitio ceremonial de los antiguos canarios, menos turístico que Roque Nublo.", tip: "Centro de interpretación al lado del parking. Sendero corto de 20 min. Mejor al amanecer." },
      en: { name: "Roque Bentayga", description: "Aboriginal sacred fortress carved into volcanic rock. Ceremonial site of the ancient Canarians, less touristy than Roque Nublo.", tip: "Interpretation centre next to the parking. 20-min trail. Best at sunrise." },
      de: { name: "Roque Bentayga", description: "Heilige Ureinwohnerfestung im Vulkangestein. Zeremonialstätte der alten Kanarier, weniger touristisch als Roque Nublo.", tip: "Besucherzentrum am Parkplatz. 20 Min. Weg. Am besten bei Sonnenaufgang." },
      nl: { name: "Roque Bentayga", description: "Heilige vesting van de oorspronkelijke bewoners, uitgehouwen in vulkanisch gesteente. Minder toeristisch dan Roque Nublo.", tip: "Bezoekerscentrum naast de parking. 20 min wandeling. Vroeg in de ochtend het mooist." },
      it: { name: "Roque Bentayga", description: "Fortezza sacra aborigena scavata nella roccia vulcanica. Sito cerimoniale degli antichi canari, meno turistico di Roque Nublo.", tip: "Centro visite vicino al parcheggio. Sentiero di 20 min. Meglio all'alba." },
      fr: { name: "Roque Bentayga", description: "Forteresse sacrée aborigène taillée dans la roche volcanique. Site cérémoniel des anciens Canariens, moins touristique que Roque Nublo.", tip: "Centre d'interprétation à côté du parking. Sentier de 20 min. Mieux au lever du soleil." },
    },
  },
  {
    slug: "caldera-bandama",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 28.0333, lng: -15.4500,
    imageUrl: "",
    translations: {
      es: { name: "Caldera de Bandama", description: "Cráter volcánico de 1 km de diámetro y 200 m de profundidad. Se puede bajar al fondo, hay huertas y casas-cueva abandonadas.", tip: "Aparca arriba, mirador en 2 min. Bajada al cráter = 1h ida + 1h vuelta, llévate agua." },
      en: { name: "Bandama Caldera", description: "1 km wide volcanic crater, 200 m deep. You can hike down into it — there are abandoned farms and cave-houses.", tip: "Park at the top, viewpoint in 2 min. Crater descent is 1h each way — bring water." },
      de: { name: "Caldera de Bandama", description: "1 km breiter, 200 m tiefer Vulkankrater. Man kann hinunter wandern — es gibt verlassene Höfe und Höhlenhäuser.", tip: "Oben parken, Aussicht in 2 Min. Abstieg ins Krater: 1 h hin + 1 h zurück. Wasser mitnehmen." },
      nl: { name: "Caldera de Bandama", description: "Vulkaankrater van 1 km breed en 200 m diep. Je kan erin afdalen — verlaten boerderijen en grotwoningen.", tip: "Parkeer bovenaan, uitzichtpunt na 2 min. Afdaling naar krater: 1u heen + 1u terug. Neem water mee." },
      it: { name: "Caldera de Bandama", description: "Cratere vulcanico di 1 km di diametro, 200 m di profondità. Si può scendere — ci sono fattorie e case-grotta abbandonate.", tip: "Parcheggia sopra, panorama in 2 min. Discesa nel cratere: 1h andata + 1h ritorno. Porta acqua." },
      fr: { name: "Caldera de Bandama", description: "Cratère volcanique d'1 km de diamètre, 200 m de profondeur. On peut descendre — fermes et maisons-grottes abandonnées.", tip: "Gare-toi en haut, panorama en 2 min. Descente au cratère : 1 h aller + 1 h retour. Prends de l'eau." },
    },
  },
  {
    slug: "playa-guigui",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.9533, lng: -15.8361,
    imageUrl: "",
    translations: {
      es: { name: "Playa de Güigüí", description: "La playa más remota de la isla. Solo se llega en barco (desde Puerto de Mogán) o caminando 4h desde Tasartico. Arena negra, zero turistas.", tip: "Barco desde Mogán es lo fácil. Reserva con un día. Lleva comida y agua — no hay nada allí." },
      en: { name: "Güigüí Beach", description: "The island's most remote beach. Reachable only by boat (from Puerto de Mogán) or a 4h hike from Tasartico. Black sand, zero tourists.", tip: "Boat from Mogán is the easy way. Book a day ahead. Bring food and water — there's nothing there." },
      de: { name: "Playa de Güigüí", description: "Der abgelegenste Strand der Insel. Nur per Boot (ab Puerto de Mogán) oder 4-Stunden-Wanderung ab Tasartico. Schwarzer Sand, null Touristen.", tip: "Boot von Mogán ist einfach. Einen Tag vorher buchen. Essen und Wasser mitbringen — dort gibt's nichts." },
      nl: { name: "Playa de Güigüí", description: "Het meest afgelegen strand van het eiland. Alleen bereikbaar per boot (vanaf Puerto de Mogán) of 4u wandelen vanaf Tasartico. Zwart zand, geen toeristen.", tip: "Boot vanaf Mogán is de makkelijke optie. Reserveer een dag van tevoren. Neem eten en water mee." },
      it: { name: "Playa de Güigüí", description: "La spiaggia più remota dell'isola. Solo in barca (da Puerto de Mogán) o con 4h di cammino da Tasartico. Sabbia nera, zero turisti.", tip: "Barca da Mogán è l'opzione facile. Prenota un giorno prima. Porta cibo e acqua — non c'è nulla." },
      fr: { name: "Plage de Güigüí", description: "La plage la plus reculée de l'île. Accessible en bateau (depuis Puerto de Mogán) ou 4h de marche depuis Tasartico. Sable noir, zéro touristes.", tip: "Bateau depuis Mogán, c'est le plus facile. Réserve un jour avant. Prends à manger et à boire." },
    },
  },
  {
    slug: "charco-azul",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 28.0933, lng: -15.7236,
    imageUrl: "",
    translations: {
      es: { name: "Charco Azul (Agaete)", description: "Piscina natural en el acantilado con agua turquesa. Apartada, tranquila, cero ambiente de resort.", tip: "Subiendo por El Risco, media hora de sendero fácil desde el parking. Marea baja = más piscinas visibles." },
      en: { name: "Charco Azul (Agaete)", description: "Natural pool on the cliff with turquoise water. Remote, quiet, zero resort vibes.", tip: "Up through El Risco, 30-min easy trail from the parking. Low tide = more pools visible." },
      de: { name: "Charco Azul (Agaete)", description: "Natürliches Felsenbecken mit türkisem Wasser. Abgeschieden, ruhig, null Resort-Feeling.", tip: "Hoch über El Risco, 30 Min. einfacher Weg. Bei Ebbe mehr Becken sichtbar." },
      nl: { name: "Charco Azul (Agaete)", description: "Natuurlijke bergbadjes met turquoise water. Afgelegen, rustig, geen resortsfeer.", tip: "Omhoog via El Risco, 30 min makkelijk wandelen. Bij eb meer poelen zichtbaar." },
      it: { name: "Charco Azul (Agaete)", description: "Piscina naturale sulla scogliera con acqua turchese. Isolata, tranquilla, zero atmosfera da resort.", tip: "Salendo per El Risco, 30 min di sentiero facile. Bassa marea = più piscine." },
      fr: { name: "Charco Azul (Agaete)", description: "Piscine naturelle dans la falaise, eau turquoise. Isolée, calme, zéro ambiance resort.", tip: "Monte par El Risco, sentier facile de 30 min. Marée basse = plus de piscines." },
    },
  },
  {
    slug: "faro-maspalomas",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.7372, lng: -15.5856,
    imageUrl: "",
    translations: {
      es: { name: "Faro de Maspalomas", description: "Faro de 1890 donde terminan las dunas. Punto de acceso clásico a la reserva y al paseo marítimo del sur.", tip: "Combínalo con un café en la Charca. Al atardecer se pone bonito." },
      en: { name: "Maspalomas Lighthouse", description: "1890 lighthouse where the dunes end. Classic entry point to the reserve and the southern seafront.", tip: "Pair with a coffee at La Charca lagoon. Sunset is gorgeous." },
      de: { name: "Leuchtturm Maspalomas", description: "Leuchtturm von 1890, wo die Dünen enden. Klassischer Einstieg ins Reservat und zur Südpromenade.", tip: "Mit einem Kaffee an der Charca-Lagune kombinieren. Sonnenuntergang ist spektakulär." },
      nl: { name: "Vuurtoren Maspalomas", description: "Vuurtoren uit 1890 waar de duinen eindigen. Klassiek toegangspunt tot het reservaat en de zuidelijke boulevard.", tip: "Combineer met een koffie bij La Charca. Zonsondergang is prachtig." },
      it: { name: "Faro di Maspalomas", description: "Faro del 1890 dove finiscono le dune. Ingresso classico alla riserva e al lungomare sud.", tip: "Abbinalo a un caffè a La Charca. Al tramonto è bellissimo." },
      fr: { name: "Phare de Maspalomas", description: "Phare de 1890 où finissent les dunes. Entrée classique de la réserve et de la promenade du sud.", tip: "Combine avec un café à La Charca. Au coucher du soleil c'est magnifique." },
    },
  },
  {
    slug: "barranco-guayadeque",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.8940, lng: -15.4730,
    imageUrl: "",
    translations: {
      es: { name: "Barranco de Guayadeque", description: "Garganta volcánica con casas-cueva aborígenes habitadas hasta hoy. La iglesia está excavada en la roca. Sensación del siglo XV.", tip: "Come en el Tagoror, restaurante-cueva al final del barranco. Reserva, hay lista de espera." },
      en: { name: "Guayadeque Ravine", description: "Volcanic gorge with aboriginal cave-houses still inhabited today. The church is carved into the rock. Feels like the 15th century.", tip: "Eat at Tagoror, a cave-restaurant at the end of the ravine. Book ahead — there's a waiting list." },
      de: { name: "Barranco de Guayadeque", description: "Vulkanische Schlucht mit bewohnten Höhlenhäusern der Ureinwohner. Die Kirche ist in den Fels gehauen. Fühlt sich an wie 15. Jahrhundert.", tip: "Im Tagoror essen, Höhlenrestaurant am Ende der Schlucht. Reservieren — es gibt eine Warteliste." },
      nl: { name: "Barranco de Guayadeque", description: "Vulkanische kloof met bewoonde grotwoningen van de oorspronkelijke bewoners. De kerk is uit de rots gehouwen. Voelt als de 15e eeuw.", tip: "Eet bij Tagoror, een grotrestaurant achteraan de kloof. Reserveer — er is een wachtlijst." },
      it: { name: "Barranco de Guayadeque", description: "Gola vulcanica con case-grotta aborigene ancora abitate. La chiesa è scavata nella roccia. Sembra il XV secolo.", tip: "Mangia al Tagoror, ristorante-grotta in fondo al burrone. Prenota — c'è lista d'attesa." },
      fr: { name: "Ravin de Guayadeque", description: "Gorge volcanique avec maisons-grottes aborigènes encore habitées. L'église est creusée dans la roche. Sensation XVe siècle.", tip: "Mange au Tagoror, restaurant-grotte au bout du ravin. Réserve — il y a une liste d'attente." },
    },
  },
  {
    slug: "degollada-becerra",
    category: "viewpoint",
    island: "gran-canaria",
    lat: 27.9778, lng: -15.6111,
    imageUrl: "",
    translations: {
      es: { name: "Degollada de Becerra", description: "Mirador clásico a Roque Nublo y Roque Bentayga, ambos en el mismo encuadre. Fácil, se llega en coche.", tip: "Parada rápida viniendo de Tejeda. Atardecer con Nublo recortado contra el sol = foto obligada." },
      en: { name: "Degollada de Becerra", description: "Classic viewpoint of Roque Nublo and Roque Bentayga in one frame. Easy, drive right up.", tip: "Quick stop coming from Tejeda. Sunset with Nublo against the sun = must-take photo." },
      de: { name: "Degollada de Becerra", description: "Klassischer Aussichtspunkt auf Roque Nublo und Roque Bentayga im gleichen Bild. Einfach, per Auto erreichbar.", tip: "Kurzer Stopp von Tejeda kommend. Sonnenuntergang mit Nublo gegen die Sonne = Pflichtfoto." },
      nl: { name: "Degollada de Becerra", description: "Klassiek uitzicht op Roque Nublo en Roque Bentayga in één beeld. Makkelijk, direct met auto.", tip: "Korte stop onderweg vanaf Tejeda. Zonsondergang met Nublo tegen de zon = verplichte foto." },
      it: { name: "Degollada de Becerra", description: "Belvedere classico su Roque Nublo e Roque Bentayga in un'unica inquadratura. Facile, si arriva in auto.", tip: "Sosta rapida venendo da Tejeda. Tramonto con Nublo controluce = foto d'obbligo." },
      fr: { name: "Degollada de Becerra", description: "Belvédère classique sur Roque Nublo et Roque Bentayga dans le même cadre. Facile, en voiture.", tip: "Arrêt rapide depuis Tejeda. Coucher de soleil avec Nublo à contre-jour = photo obligatoire." },
    },
  },

  // ========== PUEBLOS (11) ==========
  {
    slug: "vegueta",
    category: "village",
    island: "gran-canaria",
    lat: 28.1019, lng: -15.4156,
    imageUrl: "", featured: true,
    translations: {
      es: { name: "Vegueta — casco histórico Las Palmas", description: "El barrio fundacional de Las Palmas desde 1478. Callejuelas coloniales, Catedral de Santa Ana y Casa de Colón.", tip: "Jueves noche: tapeo 'jueves de Vegueta'. Prueba ropa vieja en Calle Mendizábal." },
      en: { name: "Vegueta — Las Palmas old town", description: "The founding district of Las Palmas since 1478. Colonial alleys, Santa Ana Cathedral and Casa de Colón.", tip: "Thursday nights = 'jueves de Vegueta' tapas crawl. Try 'ropa vieja' on Calle Mendizábal." },
      de: { name: "Vegueta — Altstadt Las Palmas", description: "Gründungsbezirk von Las Palmas seit 1478. Koloniale Gassen, Kathedrale Santa Ana und Columbus-Haus.", tip: "Donnerstagabends 'jueves de Vegueta' Tapas-Tour. 'Ropa vieja' in Calle Mendizábal." },
      nl: { name: "Vegueta — oude stad Las Palmas", description: "De stichtingswijk van Las Palmas sinds 1478. Koloniale straatjes, kathedraal van Santa Ana en Columbus-huis.", tip: "Donderdagavond 'jueves de Vegueta' tapasronde. Probeer 'ropa vieja' in Calle Mendizábal." },
      it: { name: "Vegueta — centro storico Las Palmas", description: "Quartiere fondatore di Las Palmas dal 1478. Vicoli coloniali, Cattedrale di Santa Ana e Casa di Colombo.", tip: "Giovedì sera 'jueves de Vegueta', giro di tapas. Prova la 'ropa vieja' in Calle Mendizábal." },
      fr: { name: "Vegueta — vieille ville Las Palmas", description: "Quartier fondateur de Las Palmas depuis 1478. Ruelles coloniales, cathédrale Santa Ana et Casa de Colón.", tip: "Jeudi soir, tournée tapas 'jueves de Vegueta'. Goûte la 'ropa vieja' Calle Mendizábal." },
    },
  },
  {
    slug: "puerto-mogan",
    category: "village",
    island: "gran-canaria",
    lat: 27.8167, lng: -15.7667,
    imageUrl: "", featured: true,
    translations: {
      es: { name: "Puerto de Mogán", description: "La 'pequeña Venecia' del sur. Canales, casitas blancas con buganvillas y un puerto pesquero donde se cena pescado del día.", tip: "Viernes hay mercadillo. Come en el muelle viejo, no en el paseo nuevo — mucho más auténtico." },
      en: { name: "Puerto de Mogán", description: "The 'little Venice' of the south. Canals, whitewashed houses with bougainvillea, and a fishing harbour serving the day's catch.", tip: "Friday = weekly market. Eat at the old dock, not the new promenade — much more authentic." },
      de: { name: "Puerto de Mogán", description: "Das 'kleine Venedig' des Südens. Kanäle, weiße Häuser mit Bougainvilleen und ein Fischerhafen.", tip: "Freitags Wochenmarkt. Iss am alten Hafen, nicht an der Promenade — viel authentischer." },
      nl: { name: "Puerto de Mogán", description: "Het 'kleine Venetië' van het zuiden. Kanalen, witte huisjes met bougainville en een vissershaven.", tip: "Vrijdag markt. Eet bij de oude haven, niet op de nieuwe boulevard — veel authentieker." },
      it: { name: "Puerto de Mogán", description: "La 'piccola Venezia' del sud. Canali, casette bianche con bougainville e porto peschereccio.", tip: "Venerdì mercato. Mangia al molo vecchio, non sul lungomare nuovo — molto più autentico." },
      fr: { name: "Puerto de Mogán", description: "La 'petite Venise' du sud. Canaux, maisons blanches et port de pêche.", tip: "Vendredi, marché. Mange au vieux quai, pas sur la nouvelle promenade — bien plus authentique." },
    },
  },
  {
    slug: "teror",
    category: "village",
    island: "gran-canaria",
    lat: 28.0574, lng: -15.5461,
    imageUrl: "",
    translations: {
      es: { name: "Teror", description: "El pueblo más bonito de Gran Canaria. Balcones de madera canaria tallados, Basílica del Pino y mercadillo dominical.", tip: "Domingo por la mañana. Desayuna chorizo de Teror y café en la plaza. Llévate agua de Teror." },
      en: { name: "Teror", description: "Gran Canaria's prettiest village. Carved Canarian wooden balconies, Basilica of the Pine, and a legendary Sunday market.", tip: "Go Sunday morning. Breakfast = Teror chorizo + coffee on the square. Bring back Teror water." },
      de: { name: "Teror", description: "Das hübscheste Dorf Gran Canarias. Geschnitzte kanarische Holzbalkone, Basilika del Pino und Sonntagsmarkt.", tip: "Sonntagvormittag. Frühstück: Teror-Chorizo und Kaffee. Teror-Wasser mitnehmen." },
      nl: { name: "Teror", description: "Het mooiste dorp van Gran Canaria. Canarische houten balkons, Basiliek van de Pino en zondagsmarkt.", tip: "Zondagochtend. Ontbijt: Teror-chorizo en koffie. Neem een fles Teror-water mee." },
      it: { name: "Teror", description: "Il paese più bello di Gran Canaria. Balconi in legno canario, Basilica del Pino e mercatino domenicale.", tip: "Vai domenica mattina. Colazione: chorizo di Teror e caffè. Porta una bottiglia di acqua Teror." },
      fr: { name: "Teror", description: "Le plus beau village de Gran Canaria. Balcons en bois canarien sculpté, Basilique du Pino et marché du dimanche.", tip: "Dimanche matin. Petit-déj : chorizo de Teror et café. Ramène une bouteille d'eau de Teror." },
    },
  },
  {
    slug: "tejeda",
    category: "village",
    island: "gran-canaria",
    lat: 27.9933, lng: -15.6167,
    imageUrl: "",
    translations: {
      es: { name: "Tejeda", description: "Pueblo a 1.050 m dentro del cráter volcánico de la isla. Almendros, dulces de mazapán y vistas marcianas.", tip: "Febrero = flor del almendro. Prueba 'bienmesabe' (postre de almendra) en Dulcería Nublo." },
      en: { name: "Tejeda", description: "Mountain village at 1,050 m, inside the island's volcanic crater. Almond trees, marzipan and Martian views.", tip: "February = almond blossom. Try 'bienmesabe' (almond dessert) at Dulcería Nublo." },
      de: { name: "Tejeda", description: "Bergdorf auf 1.050 m im Vulkankrater. Mandelbäume, Marzipan und marsianische Aussichten.", tip: "Februar = Mandelblüte. 'Bienmesabe' (Mandel-Dessert) in der Dulcería Nublo." },
      nl: { name: "Tejeda", description: "Bergdorp op 1.050 m, binnen in de vulkaankrater. Amandelbomen, marsepein en marsachtige uitzichten.", tip: "Februari = amandelbloesem. Probeer 'bienmesabe' bij Dulcería Nublo." },
      it: { name: "Tejeda", description: "Paese di montagna a 1.050 m, dentro il cratere vulcanico. Mandorli, marzapane e viste marziane.", tip: "Febbraio = fioritura mandorli. Prova il 'bienmesabe' alla Dulcería Nublo." },
      fr: { name: "Tejeda", description: "Village de montagne à 1 050 m, dans le cratère volcanique. Amandiers, massepain et vues martiennes.", tip: "Février = floraison des amandiers. Goûte le 'bienmesabe' à la Dulcería Nublo." },
    },
  },
  {
    slug: "agaete",
    category: "village",
    island: "gran-canaria",
    lat: 28.1000, lng: -15.7000,
    imageUrl: "",
    translations: {
      es: { name: "Agaete — Puerto de las Nieves", description: "Pueblo pesquero al noroeste con piscinas naturales y el mejor pescado de la isla. Valle de Agaete = único café de Europa.", tip: "Pescado en Las Nasas. Pide 'vieja sancochada'. Sube al Valle y visita una finca de café." },
      en: { name: "Agaete — Puerto de las Nieves", description: "Northwest fishing village with natural pools and the island's best seafood. Agaete Valley = Europe's only coffee region.", tip: "Seafood at Las Nasas. Order 'vieja sancochada'. Drive up the Valley for a coffee farm visit." },
      de: { name: "Agaete — Puerto de las Nieves", description: "Fischerdorf im Nordwesten mit Naturpools und dem besten Fisch der Insel. Agaete-Tal = Europas einziges Kaffeeanbaugebiet.", tip: "Fisch im Las Nasas. 'Vieja sancochada' bestellen. Ins Tal für eine Kaffeefarm." },
      nl: { name: "Agaete — Puerto de las Nieves", description: "Vissersdorp in het noordwesten met natuurlijke zwembaden en de beste vis. Agaete-dal = Europa's enige koffiegebied.", tip: "Vis bij Las Nasas. Bestel 'vieja sancochada'. Rijd het dal in voor een koffieboerderij." },
      it: { name: "Agaete — Puerto de las Nieves", description: "Paese di pescatori con piscine naturali e il miglior pesce. Valle di Agaete = unica zona di caffè in Europa.", tip: "Pesce a Las Nasas. Ordina 'vieja sancochada'. Sali nella Valle per una fattoria di caffè." },
      fr: { name: "Agaete — Puerto de las Nieves", description: "Village de pêcheurs au nord-ouest, piscines naturelles et meilleur poisson de l'île. Vallée d'Agaete = seul café d'Europe.", tip: "Poisson chez Las Nasas. 'Vieja sancochada'. Monte dans la Vallée pour une ferme de café." },
    },
  },
  {
    slug: "fataga",
    category: "village",
    island: "gran-canaria",
    lat: 27.8728, lng: -15.5847,
    imageUrl: "",
    translations: {
      es: { name: "Fataga", description: "Pueblo-oasis en pleno barranco, entre palmeras. Casitas canarias, calles de piedra y una paz bestial.", tip: "Va en la ruta GC-60 Maspalomas-Tejeda. Para 1h, come dulce de palma y sigue." },
      en: { name: "Fataga", description: "Oasis village deep in a ravine, surrounded by palm trees. Canarian houses, stone streets and total peace.", tip: "On the GC-60 route Maspalomas–Tejeda. Stop 1h, try palm syrup sweets and move on." },
      de: { name: "Fataga", description: "Oasendorf in einer Schlucht, umgeben von Palmen. Kanarische Häuser, Steinstraßen und tiefe Ruhe.", tip: "An der Route GC-60 Maspalomas–Tejeda. 1h halten, Palmsirup-Süßes probieren." },
      nl: { name: "Fataga", description: "Oasedorpje diep in een ravijn, tussen palmen. Canarische huisjes, kasseien en enorme rust.", tip: "Op de GC-60 Maspalomas–Tejeda. Stop 1u, proef palmstroop-zoetigheid en rijd door." },
      it: { name: "Fataga", description: "Paese-oasi in fondo a un burrone, tra le palme. Casette canarie, strade in pietra e pace totale.", tip: "Sulla GC-60 Maspalomas–Tejeda. Fermati 1h, prova i dolci di miele di palma." },
      fr: { name: "Fataga", description: "Village-oasis au fond d'un ravin, entre palmiers. Maisons canariennes, rues pavées et paix totale.", tip: "Sur la GC-60 Maspalomas–Tejeda. Arrête-toi 1h, goûte le sirop de palmier." },
    },
  },
  {
    slug: "arucas",
    category: "village",
    island: "gran-canaria",
    lat: 28.1194, lng: -15.5253,
    imageUrl: "",
    translations: {
      es: { name: "Arucas", description: "Ciudad del ron. Iglesia neogótica de piedra azul (parece una catedral pequeña) y la destilería Arehucas con siglo de historia.", tip: "Visita guiada en Arehucas (9€, incluye cata). Sube al Montaña de Arucas para vista 360° del norte." },
      en: { name: "Arucas", description: "Rum city. Blue-stone neo-gothic church (looks like a mini cathedral) and Arehucas distillery with a century of history.", tip: "Guided tour at Arehucas (9€, includes tasting). Climb Montaña de Arucas for 360° northern views." },
      de: { name: "Arucas", description: "Rum-Stadt. Neugotische Kirche aus blauem Stein (wie eine Mini-Kathedrale) und Arehucas-Destillerie mit 100 Jahren Geschichte.", tip: "Führung in Arehucas (9€, mit Verkostung). Auf den Montaña de Arucas für 360° Nordblick." },
      nl: { name: "Arucas", description: "Stad van de rum. Neogotische kerk van blauwe steen (lijkt een minikathedraal) en distilleerderij Arehucas met eeuw geschiedenis.", tip: "Rondleiding bij Arehucas (9€, met proeverij). Beklim de Montaña de Arucas voor 360° uitzicht." },
      it: { name: "Arucas", description: "Città del rum. Chiesa neogotica in pietra blu (sembra una mini-cattedrale) e distilleria Arehucas con un secolo di storia.", tip: "Visita guidata ad Arehucas (9€, con degustazione). Sali al Montaña de Arucas per vista 360°." },
      fr: { name: "Arucas", description: "Ville du rhum. Église néo-gothique en pierre bleue (mini-cathédrale) et distillerie Arehucas, un siècle d'histoire.", tip: "Visite guidée à Arehucas (9€, avec dégustation). Monte au Montaña de Arucas pour vue 360°." },
    },
  },
  {
    slug: "firgas",
    category: "village",
    island: "gran-canaria",
    lat: 28.1053, lng: -15.5636,
    imageUrl: "",
    translations: {
      es: { name: "Firgas", description: "El pueblo del agua. Paseo de Gran Canaria con fuente en escalinata y mosaicos de las 21 islas y pueblos canarios.", tip: "Llévate botellas de agua de Firgas — las hay por toda España. Plaza central con casas pintadas en colores." },
      en: { name: "Firgas", description: "The water village. Paseo de Gran Canaria with a staircase fountain and mosaics of all 21 Canarian villages.", tip: "Take home bottles of Firgas water — sold all over Spain. Central square with candy-coloured houses." },
      de: { name: "Firgas", description: "Das Wasserdorf. Paseo de Gran Canaria mit Treppenbrunnen und Mosaiken aller 21 kanarischen Orte.", tip: "Firgas-Wasser mitnehmen — gibt's in ganz Spanien. Hauptplatz mit bunt bemalten Häusern." },
      nl: { name: "Firgas", description: "Het waterdorp. Paseo de Gran Canaria met trapfontein en mozaïeken van alle 21 Canarische dorpen.", tip: "Neem flessen Firgas-water mee — te koop in heel Spanje. Centrum met felkleurige huizen." },
      it: { name: "Firgas", description: "Il paese dell'acqua. Paseo di Gran Canaria con fontana a gradinata e mosaici dei 21 paesi canari.", tip: "Porta bottiglie di acqua Firgas — vendute in tutta Spagna. Piazza centrale con case coloratissime." },
      fr: { name: "Firgas", description: "Le village de l'eau. Paseo de Gran Canaria avec fontaine en escalier et mosaïques des 21 villages canariens.", tip: "Ramène des bouteilles d'eau de Firgas — vendues dans toute l'Espagne. Place centrale colorée." },
    },
  },
  {
    slug: "artenara",
    category: "village",
    island: "gran-canaria",
    lat: 28.0183, lng: -15.6478,
    imageUrl: "",
    translations: {
      es: { name: "Artenara", description: "El pueblo más alto de la isla (1.270 m). Casas-cueva habitadas, ermita en una cueva y vistas al Teide.", tip: "Come en Mesón La Silla (restaurante-cueva). Al atardecer, mirador Unamuno es mágico." },
      en: { name: "Artenara", description: "The island's highest village (1,270 m). Inhabited cave-houses, a cave chapel and views of Teide.", tip: "Eat at Mesón La Silla (cave restaurant). At sunset, Unamuno viewpoint is magical." },
      de: { name: "Artenara", description: "Das höchste Dorf der Insel (1.270 m). Bewohnte Höhlenhäuser, Kapelle in einer Höhle und Teide-Blick.", tip: "Im Mesón La Silla essen (Höhlenrestaurant). Beim Sonnenuntergang Unamuno-Aussichtspunkt." },
      nl: { name: "Artenara", description: "Het hoogste dorp van het eiland (1.270 m). Bewoonde grotwoningen, een grotkapel en uitzicht op de Teide.", tip: "Eet bij Mesón La Silla (grotrestaurant). Bij zonsondergang is uitzichtpunt Unamuno magisch." },
      it: { name: "Artenara", description: "Il paese più alto dell'isola (1.270 m). Case-grotta abitate, eremo in grotta e vista sul Teide.", tip: "Mangia al Mesón La Silla (ristorante-grotta). Al tramonto, mirador Unamuno è magico." },
      fr: { name: "Artenara", description: "Le village le plus haut de l'île (1 270 m). Maisons-grottes habitées, chapelle dans une grotte et vue sur le Teide.", tip: "Mange au Mesón La Silla (restaurant-grotte). Au coucher, le mirador Unamuno est magique." },
    },
  },
  {
    slug: "aguimes",
    category: "village",
    island: "gran-canaria",
    lat: 27.9047, lng: -15.4496,
    imageUrl: "",
    translations: {
      es: { name: "Agüimes", description: "Casco histórico restaurado con esculturas de bronce por todo el pueblo, casas ocre y una iglesia del XVIII.", tip: "Sábado mañana = mercado. Para comer, El Oroval en la plaza." },
      en: { name: "Agüimes", description: "Restored old town with bronze sculptures scattered through the streets, ochre houses and an 18th-century church.", tip: "Saturday morning = market. For lunch, El Oroval on the square." },
      de: { name: "Agüimes", description: "Restaurierte Altstadt mit Bronzefiguren in den Straßen, ockerfarbenen Häusern und einer Kirche aus dem 18. Jh.", tip: "Samstagvormittag = Markt. Zum Essen El Oroval am Platz." },
      nl: { name: "Agüimes", description: "Gerestaureerd historisch centrum met bronzen beelden in de straten, okerkleurige huizen en een 18e-eeuwse kerk.", tip: "Zaterdagochtend markt. Voor de lunch: El Oroval op het plein." },
      it: { name: "Agüimes", description: "Centro storico restaurato con sculture in bronzo nelle vie, case color ocra e chiesa del XVIII secolo.", tip: "Sabato mattina mercato. Per pranzo, El Oroval sulla piazza." },
      fr: { name: "Agüimes", description: "Vieille ville restaurée avec sculptures en bronze dans les rues, maisons ocre et église du XVIIIe.", tip: "Samedi matin = marché. Pour déjeuner, El Oroval sur la place." },
    },
  },
  {
    slug: "galdar",
    category: "village",
    island: "gran-canaria",
    lat: 28.1444, lng: -15.6531,
    imageUrl: "",
    translations: {
      es: { name: "Gáldar", description: "La capital histórica aborigen. Cueva Pintada (imprescindible), playa de Sardina y una drago milenario en la plaza.", tip: "Reserva la visita a la Cueva Pintada con días — los cupos vuelan." },
      en: { name: "Gáldar", description: "The historic aboriginal capital. Painted Cave (unmissable), Sardina beach and a 1,000-year-old dragon tree on the square.", tip: "Book the Painted Cave tour days ahead — slots sell out fast." },
      de: { name: "Gáldar", description: "Historische Ureinwohner-Hauptstadt. Cueva Pintada (Pflichtbesuch), Strand Sardina und 1.000-jähriger Drachenbaum am Platz.", tip: "Besuch der Cueva Pintada Tage im Voraus buchen — schnell ausverkauft." },
      nl: { name: "Gáldar", description: "Historische aboriginal-hoofdstad. Cueva Pintada (must-see), strand Sardina en duizendjarige drakenboom op het plein.", tip: "Reserveer Cueva Pintada dagen vooruit — snel uitverkocht." },
      it: { name: "Gáldar", description: "Capitale storica aborigena. Cueva Pintada (imperdibile), spiaggia di Sardina e drago millenario in piazza.", tip: "Prenota la Cueva Pintada con giorni di anticipo — posti volano." },
      fr: { name: "Gáldar", description: "Capitale historique aborigène. Cueva Pintada (incontournable), plage de Sardina et dragonnier millénaire sur la place.", tip: "Réserve la Cueva Pintada des jours à l'avance — places parties vite." },
    },
  },

  // ========== MUSEOS / CULTURA (6) ==========
  {
    slug: "jardin-canario",
    category: "museum",
    island: "gran-canaria",
    lat: 28.0672, lng: -15.4683,
    imageUrl: "",
    externalUrl: "https://www.jardincanario.org",
    translations: {
      es: { name: "Jardín Botánico Canario", description: "27 hectáreas con toda la flora endémica de Macaronesia. Laurisilva, cactus, palmeras canarias y paseo sombreado por un barranco.", tip: "Entrada gratis. Temprano, cierra a las 18h. Empieza por la entrada de abajo (menos turistas)." },
      en: { name: "Canarian Botanical Garden", description: "27 hectares of Macaronesian endemic flora. Laurisilva, cacti, Canary palms and a shaded walk down a ravine.", tip: "Free entry. Go early, closes at 6 PM. Start from the lower entrance (fewer tourists)." },
      de: { name: "Kanarischer Botanischer Garten", description: "27 Hektar endemische Flora der Makaronesischen Inseln. Lorbeerwald, Kakteen, kanarische Palmen.", tip: "Eintritt frei. Früh, schließt um 18 Uhr. Unten einsteigen (weniger Touristen)." },
      nl: { name: "Canarische Botanische Tuin", description: "27 hectare endemische flora van Macaronesië. Laurisilva, cactussen, Canarische palmen.", tip: "Gratis. Ga vroeg, sluit om 18u. Begin bij onderste ingang (minder toeristen)." },
      it: { name: "Giardino Botanico Canario", description: "27 ettari di flora endemica della Macaronesia. Laurisilva, cactus, palme canarie.", tip: "Ingresso gratuito. Vai presto, chiude alle 18. Parti dall'ingresso basso." },
      fr: { name: "Jardin Botanique des Canaries", description: "27 hectares de flore endémique de Macaronésie. Laurisilve, cactus, palmiers canariens.", tip: "Entrée gratuite. Vas-y tôt, ferme à 18h. Commence par l'entrée basse." },
    },
  },
  {
    slug: "museo-canario",
    category: "museum",
    island: "gran-canaria",
    lat: 28.1014, lng: -15.4158,
    imageUrl: "",
    externalUrl: "https://www.elmuseocanario.com",
    translations: {
      es: { name: "El Museo Canario", description: "La colección más importante sobre los aborígenes canarios. Cerámica, momias guanches y la historia previa a Castilla.", tip: "Combínalo con Vegueta (al lado). La sala de cráneos impresiona — no es para todos." },
      en: { name: "El Museo Canario", description: "The most important collection on Canarian aboriginals. Pottery, Guanche mummies and pre-Spanish history.", tip: "Combine with Vegueta (next door). The skull room is intense — not for everyone." },
      de: { name: "El Museo Canario", description: "Wichtigste Sammlung zu den kanarischen Ureinwohnern. Keramik, Guanchen-Mumien, vorkastilische Geschichte.", tip: "Mit Vegueta kombinieren (nebenan). Schädelraum ist intensiv — nicht für jeden." },
      nl: { name: "El Museo Canario", description: "Belangrijkste collectie over de Canarische oorspronkelijke bewoners. Aardewerk, Guanche-mummies.", tip: "Combineer met Vegueta (ernaast). Schedelzaal is heftig — niet voor iedereen." },
      it: { name: "El Museo Canario", description: "La collezione più importante sugli aborigeni. Ceramiche, mummie Guanche e storia pre-spagnola.", tip: "Abbinalo a Vegueta (accanto). Sala dei crani intensa — non per tutti." },
      fr: { name: "El Museo Canario", description: "La plus importante collection sur les aborigènes. Poteries, momies guanches et histoire pré-espagnole.", tip: "Combine avec Vegueta (juste à côté). Salle des crânes intense — pas pour tous." },
    },
  },
  {
    slug: "casa-colon",
    category: "museum",
    island: "gran-canaria",
    lat: 28.1014, lng: -15.4161,
    imageUrl: "",
    translations: {
      es: { name: "Casa de Colón", description: "Donde Colón se alojó en 1492 antes de cruzar el Atlántico. Patio colonial canario precioso y exposición sobre descubrimientos.", tip: "Entrada 4€. Combinable con Catedral y Museo Canario, todo en Vegueta." },
      en: { name: "Casa de Colón", description: "Where Columbus stayed in 1492 before crossing the Atlantic. Stunning Canarian colonial courtyard, exhibits on the voyages.", tip: "Entry €4. Combine with the Cathedral and Museo Canario, all in Vegueta." },
      de: { name: "Casa de Colón", description: "Wo Kolumbus 1492 vor der Atlantiküberquerung wohnte. Wunderschöner kanarischer Patio, Ausstellung zu Entdeckungen.", tip: "Eintritt 4€. Mit Kathedrale und Museo Canario kombinierbar, alles in Vegueta." },
      nl: { name: "Casa de Colón", description: "Waar Columbus in 1492 verbleef voor zijn oversteek. Prachtige Canarische koloniale binnenplaats, tentoonstelling over ontdekkingen.", tip: "Entree €4. Combineer met de kathedraal en Museo Canario, alles in Vegueta." },
      it: { name: "Casa di Colombo", description: "Dove Colombo alloggiò nel 1492 prima di attraversare l'Atlantico. Patio coloniale canario splendido, mostra sulle scoperte.", tip: "Ingresso 4€. Abbinabile con Cattedrale e Museo Canario, tutto in Vegueta." },
      fr: { name: "Casa de Colón", description: "Où Colomb a séjourné en 1492 avant la traversée. Magnifique patio colonial canarien, expo sur les découvertes.", tip: "Entrée 4€. Combine avec la cathédrale et Museo Canario, tout est à Vegueta." },
    },
  },
  {
    slug: "cueva-pintada",
    category: "museum",
    island: "gran-canaria",
    lat: 28.1444, lng: -15.6497,
    imageUrl: "",
    translations: {
      es: { name: "Cueva Pintada (Gáldar)", description: "Yacimiento arqueológico con pinturas geométricas aborígenes (entre las más importantes de Canarias). Visita guiada obligatoria.", tip: "Reserva con días. 6€, dura 1h. Imprescindible si te interesa la historia pre-Castilla." },
      en: { name: "Painted Cave (Gáldar)", description: "Archaeological site with geometric aboriginal paintings — among the most important in the Canaries. Guided tour required.", tip: "Book days ahead. €6, 1h long. A must if you care about pre-Spanish history." },
      de: { name: "Cueva Pintada (Gáldar)", description: "Archäologische Stätte mit geometrischen Ureinwohner-Malereien — eine der wichtigsten der Kanaren. Führung Pflicht.", tip: "Tage im Voraus buchen. 6€, 1 Stunde. Pflicht, wenn dich vorspanische Geschichte interessiert." },
      nl: { name: "Cueva Pintada (Gáldar)", description: "Archeologische site met geometrische aboriginal-schilderingen — een van de belangrijkste van de Canarische Eilanden. Rondleiding verplicht.", tip: "Dagen vooruit reserveren. €6, 1u. Onmisbaar als je pre-Spaanse geschiedenis interesseert." },
      it: { name: "Cueva Pintada (Gáldar)", description: "Sito archeologico con pitture geometriche aborigene — tra le più importanti delle Canarie. Visita guidata obbligatoria.", tip: "Prenota con giorni d'anticipo. 6€, 1h. Imperdibile se ti interessa la storia pre-spagnola." },
      fr: { name: "Cueva Pintada (Gáldar)", description: "Site archéologique avec peintures géométriques aborigènes — parmi les plus importantes des Canaries. Visite guidée obligatoire.", tip: "Réserve des jours à l'avance. 6€, 1h. Incontournable pour l'histoire pré-espagnole." },
    },
  },
  {
    slug: "cenobio-valeron",
    category: "museum",
    island: "gran-canaria",
    lat: 28.1483, lng: -15.5483,
    imageUrl: "",
    translations: {
      es: { name: "Cenobio de Valerón", description: "Granero aborigen con 350 cavidades excavadas en la roca. Almacén comunal de siglos pre-Castilla.", tip: "Entrada 3€. Se ve en 45 min. Parada obligada entre Agaete y Las Palmas." },
      en: { name: "Cenobio de Valerón", description: "Aboriginal granary with 350 cavities carved into the rock. Communal storehouse from pre-Spanish centuries.", tip: "Entry €3. 45 min visit. A must-stop between Agaete and Las Palmas." },
      de: { name: "Cenobio de Valerón", description: "Ureinwohner-Kornspeicher mit 350 Höhlen im Fels. Gemeinschaftslager aus vorspanischen Jahrhunderten.", tip: "Eintritt 3€. 45 Min. Besuch. Pflichthalt zwischen Agaete und Las Palmas." },
      nl: { name: "Cenobio de Valerón", description: "Aboriginal graanopslag met 350 in rots uitgehakte holen. Gemeenschappelijk depot van pre-Spaanse eeuwen.", tip: "Entree €3. 45 min bezoek. Verplichte stop tussen Agaete en Las Palmas." },
      it: { name: "Cenobio de Valerón", description: "Granaio aborigeno con 350 cavità scavate nella roccia. Magazzino comunitario pre-spagnolo.", tip: "Ingresso 3€. Visita di 45 min. Sosta d'obbligo tra Agaete e Las Palmas." },
      fr: { name: "Cenobio de Valerón", description: "Grenier aborigène avec 350 cavités taillées dans la roche. Entrepôt communautaire pré-espagnol.", tip: "Entrée 3€. 45 min de visite. Arrêt obligatoire entre Agaete et Las Palmas." },
    },
  },
  {
    slug: "catedral-santa-ana",
    category: "museum",
    island: "gran-canaria",
    lat: 28.1008, lng: -15.4156,
    imageUrl: "",
    translations: {
      es: { name: "Catedral de Santa Ana", description: "Catedral del siglo XV en Vegueta. Sube a la torre en ascensor — vista 360° de Las Palmas imbatible.", tip: "Ticket torre 1,50€. 5 min arriba. Perros de bronce en la plaza son la foto clásica." },
      en: { name: "Santa Ana Cathedral", description: "15th-century cathedral in Vegueta. Take the lift to the tower — unbeatable 360° views over Las Palmas.", tip: "Tower ticket €1.50. 5 min at the top. Bronze dogs on the square = classic photo." },
      de: { name: "Kathedrale Santa Ana", description: "Kathedrale aus dem 15. Jh. in Vegueta. Mit Aufzug auf den Turm — 360°-Blick auf Las Palmas unschlagbar.", tip: "Turm-Ticket 1,50€. 5 Min. oben. Bronzehunde am Platz = klassisches Foto." },
      nl: { name: "Kathedraal Santa Ana", description: "15e-eeuwse kathedraal in Vegueta. Neem de lift naar de toren — 360° uitzicht over Las Palmas.", tip: "Torenticket €1,50. 5 min boven. Bronzen honden op het plein = klassieke foto." },
      it: { name: "Cattedrale di Santa Ana", description: "Cattedrale del XV secolo a Vegueta. Sali in ascensore sulla torre — vista 360° imbattibile su Las Palmas.", tip: "Biglietto torre 1,50€. 5 min su. Cani di bronzo in piazza = foto classica." },
      fr: { name: "Cathédrale Santa Ana", description: "Cathédrale du XVe siècle à Vegueta. Monte à la tour en ascenseur — vue 360° imbattable sur Las Palmas.", tip: "Ticket tour 1,50€. 5 min en haut. Chiens de bronze sur la place = photo classique." },
    },
  },

  // ========== RESTAURANTES (5) ==========
  {
    slug: "tagoror-guayadeque",
    category: "restaurant",
    island: "gran-canaria",
    lat: 27.8830, lng: -15.4665,
    imageUrl: "",
    translations: {
      es: { name: "Restaurante Tagoror", description: "Restaurante-cueva al final del Barranco de Guayadeque. Cocina canaria clásica en un comedor excavado en la roca.", tip: "Reserva con días. Pide cabrito, papas arrugadas y mojo. No hay menú vegetariano fuerte." },
      en: { name: "Restaurante Tagoror", description: "Cave-restaurant at the end of Guayadeque Ravine. Classic Canarian cuisine in a dining room carved into the rock.", tip: "Book days ahead. Order goat, wrinkled potatoes and mojo. Limited vegetarian options." },
      de: { name: "Restaurante Tagoror", description: "Höhlenrestaurant am Ende der Guayadeque-Schlucht. Klassische kanarische Küche in einem Fels-Speisesaal.", tip: "Tage im Voraus reservieren. Zicklein, Runzelkartoffeln und Mojo bestellen. Wenig Vegetarisches." },
      nl: { name: "Restaurante Tagoror", description: "Grotrestaurant achteraan de Guayadeque-kloof. Klassieke Canarische keuken in een eetzaal uitgehouwen in de rots.", tip: "Reserveer dagen vooruit. Bestel geit, papas arrugadas en mojo. Weinig vegetarisch." },
      it: { name: "Restaurante Tagoror", description: "Ristorante-grotta in fondo al Barranco de Guayadeque. Cucina canaria classica in una sala scavata nella roccia.", tip: "Prenota con giorni. Ordina capretto, papas arrugadas e mojo. Poche opzioni vegetariane." },
      fr: { name: "Restaurante Tagoror", description: "Restaurant-grotte au bout du ravin de Guayadeque. Cuisine canarienne classique dans une salle creusée dans la roche.", tip: "Réserve des jours avant. Commande chevreau, papas arrugadas et mojo. Peu de végétarien." },
    },
  },
  {
    slug: "las-nasas-agaete",
    category: "restaurant",
    island: "gran-canaria",
    lat: 28.1020, lng: -15.7040,
    imageUrl: "",
    translations: {
      es: { name: "Las Nasas (Puerto de las Nieves)", description: "Pescado fresco directo del barco en Agaete. Mesa con vistas al mar y al roque Dedo de Dios.", tip: "Pide 'vieja sancochada' o 'sama a la espalda'. No reserves, va por orden de llegada." },
      en: { name: "Las Nasas (Puerto de las Nieves)", description: "Fresh-off-the-boat fish in Agaete. Seaside table with views of the Dedo de Dios rock.", tip: "Order 'vieja sancochada' or 'sama a la espalda'. No bookings — first come, first served." },
      de: { name: "Las Nasas (Puerto de las Nieves)", description: "Fisch direkt vom Boot in Agaete. Tisch am Meer mit Blick auf den Felsen Dedo de Dios.", tip: "'Vieja sancochada' oder 'sama a la espalda' bestellen. Keine Reservierung — wer zuerst kommt." },
      nl: { name: "Las Nasas (Puerto de las Nieves)", description: "Verse vis direct van de boot in Agaete. Tafel aan zee met uitzicht op de rots Dedo de Dios.", tip: "Bestel 'vieja sancochada' of 'sama a la espalda'. Geen reserveringen — wie eerst komt." },
      it: { name: "Las Nasas (Puerto de las Nieves)", description: "Pesce freschissimo direttamente dalla barca ad Agaete. Tavolo sul mare, vista sul Dedo de Dios.", tip: "Ordina 'vieja sancochada' o 'sama a la espalda'. Niente prenotazioni — primo che arriva." },
      fr: { name: "Las Nasas (Puerto de las Nieves)", description: "Poisson frais sorti du bateau à Agaete. Table face à la mer, vue sur le rocher Dedo de Dios.", tip: "Commande 'vieja sancochada' ou 'sama a la espalda'. Pas de réservations." },
    },
  },
  {
    slug: "meson-la-silla",
    category: "restaurant",
    island: "gran-canaria",
    lat: 28.0175, lng: -15.6487,
    imageUrl: "",
    translations: {
      es: { name: "Mesón La Silla (Artenara)", description: "Restaurante dentro de una cueva en el pueblo más alto. Conejo en salmorejo, vinos locales y atmósfera de otro siglo.", tip: "Reserva fin de semana. Mesa en la cueva, no fuera. Prueba el 'queso asado con mojo'." },
      en: { name: "Mesón La Silla (Artenara)", description: "Restaurant inside a cave in the highest village. Rabbit in salmorejo, local wines and an other-century atmosphere.", tip: "Book weekends. Ask for a table in the cave, not outside. Try the grilled cheese with mojo." },
      de: { name: "Mesón La Silla (Artenara)", description: "Restaurant in einer Höhle im höchsten Dorf. Kaninchen in Salmorejo, lokale Weine und Atmosphäre vergangener Jahrhunderte.", tip: "Am Wochenende reservieren. Tisch in der Höhle, nicht draußen. Gegrillten Käse mit Mojo probieren." },
      nl: { name: "Mesón La Silla (Artenara)", description: "Restaurant in een grot in het hoogste dorp. Konijn in salmorejo, lokale wijnen en een sfeer uit een andere eeuw.", tip: "Reserveer in het weekend. Vraag een tafel in de grot. Probeer gegrilde kaas met mojo." },
      it: { name: "Mesón La Silla (Artenara)", description: "Ristorante dentro una grotta nel paese più alto. Coniglio in salmorejo, vini locali e atmosfera di un altro secolo.", tip: "Prenota nel weekend. Tavolo nella grotta, non fuori. Prova il formaggio grigliato con mojo." },
      fr: { name: "Mesón La Silla (Artenara)", description: "Restaurant dans une grotte du village le plus haut. Lapin en salmorejo, vins locaux et ambiance d'un autre siècle.", tip: "Réserve le week-end. Table dans la grotte, pas dehors. Goûte le fromage grillé au mojo." },
    },
  },
  {
    slug: "la-vaca-azul",
    category: "restaurant",
    island: "gran-canaria",
    lat: 28.1008, lng: -15.7060,
    imageUrl: "",
    translations: {
      es: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Clásico de Agaete. Pescado fresco sencillo, terraza al mar. Sirve 'pescado del día' sin pretensiones.", tip: "Entre semana no hace falta reservar. Lapas a la plancha son imperdibles." },
      en: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Agaete classic. Simple fresh fish, seaside terrace. 'Catch of the day' with zero pretension.", tip: "Weekdays no booking needed. Grilled limpets are a must." },
      de: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Klassiker in Agaete. Einfacher frischer Fisch, Terrasse am Meer. 'Fisch des Tages' ohne Schnickschnack.", tip: "Wochentags ohne Reservierung. Gegrillte Napfschnecken sind Pflicht." },
      nl: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Klassieker in Agaete. Eenvoudige verse vis, terras aan zee. 'Vis van de dag' zonder franjes.", tip: "Doordeweeks geen reservering nodig. Gegrilde zeepokken zijn een must." },
      it: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Classico di Agaete. Pesce fresco semplice, terrazza sul mare. 'Pesce del giorno' senza pretese.", tip: "In settimana non serve prenotare. Patelle alla piastra imperdibili." },
      fr: { name: "La Vaca Azul (Puerto de las Nieves)", description: "Classique d'Agaete. Poisson frais simple, terrasse mer. 'Poisson du jour' sans chichi.", tip: "En semaine, pas besoin de réserver. Les patelles grillées sont incontournables." },
    },
  },
  {
    slug: "el-santo",
    category: "restaurant",
    island: "gran-canaria",
    lat: 27.8195, lng: -15.7680,
    imageUrl: "",
    translations: {
      es: { name: "El Santo (Puerto de Mogán)", description: "Cocina canaria moderna en el muelle viejo. Productos locales, recetas reinventadas. Mejor cena del sur sin ser caro.", tip: "Reserva para cenar con puesta de sol. Pide el atún rojo local y cualquier postre." },
      en: { name: "El Santo (Puerto de Mogán)", description: "Modern Canarian cuisine on the old dock. Local produce, reimagined recipes. Best dinner in the south without being pricey.", tip: "Book dinner at sunset. Order local bluefin tuna and any dessert." },
      de: { name: "El Santo (Puerto de Mogán)", description: "Moderne kanarische Küche am alten Hafen. Lokale Produkte, neu interpretiert. Bestes Abendessen im Süden ohne teuer zu sein.", tip: "Zum Sonnenuntergang reservieren. Lokalen Roten Thun bestellen und irgendein Dessert." },
      nl: { name: "El Santo (Puerto de Mogán)", description: "Moderne Canarische keuken aan de oude haven. Lokale producten, heruitgevonden recepten. Beste diner van het zuiden zonder duur te zijn.", tip: "Reserveer bij zonsondergang. Bestel lokale blauwvintonijn en welk dessert dan ook." },
      it: { name: "El Santo (Puerto de Mogán)", description: "Cucina canaria moderna al molo vecchio. Prodotti locali, ricette reinventate. Miglior cena del sud senza essere cara.", tip: "Prenota a cena al tramonto. Ordina il tonno rosso locale e qualsiasi dessert." },
      fr: { name: "El Santo (Puerto de Mogán)", description: "Cuisine canarienne moderne sur le vieux quai. Produits locaux, recettes réinventées. Meilleur dîner du sud sans être cher.", tip: "Réserve au coucher du soleil. Commande le thon rouge local et n'importe quel dessert." },
    },
  },

  // ========== CASITAS CANARIAS (4) ==========
  {
    slug: "casita-teror",
    category: "casita",
    island: "gran-canaria",
    lat: 28.0450, lng: -15.5500,
    imageUrl: "",
    externalUrl: "https://casitascanarias.com",
    isCasita: true,
    translations: {
      es: { name: "Casita rural en Teror", description: "Finca canaria tradicional a 15 min de Teror, con vistas al valle. Perfecta para 2-4 personas.", tip: "Parte de Casitas Canarias. Disponibilidad y reserva en casitascanarias.com." },
      en: { name: "Rural house in Teror", description: "Traditional Canarian finca 15 min from Teror, valley views. Perfect for 2-4 guests.", tip: "Part of Casitas Canarias. Check availability at casitascanarias.com." },
      de: { name: "Landhaus bei Teror", description: "Traditionelle kanarische Finca 15 Min. von Teror, Talblick. Ideal für 2-4 Personen.", tip: "Teil von Casitas Canarias. Verfügbarkeit auf casitascanarias.com." },
      nl: { name: "Landhuis bij Teror", description: "Traditionele Canarische finca 15 min van Teror, uitzicht op het dal. Ideaal voor 2-4 personen.", tip: "Onderdeel van Casitas Canarias. Beschikbaarheid op casitascanarias.com." },
      it: { name: "Casa rurale a Teror", description: "Finca canaria tradizionale a 15 min da Teror, vista sulla valle. Perfetta per 2-4 ospiti.", tip: "Parte di Casitas Canarias. Disponibilità su casitascanarias.com." },
      fr: { name: "Maison rurale près de Teror", description: "Finca canarienne traditionnelle à 15 min de Teror, vue vallée. Parfaite pour 2-4 personnes.", tip: "Fait partie de Casitas Canarias. Disponibilité sur casitascanarias.com." },
    },
  },
  {
    slug: "casita-aguimes",
    category: "casita",
    island: "gran-canaria",
    lat: 27.9047, lng: -15.4496,
    imageUrl: "",
    externalUrl: "https://casitascanarias.com",
    isCasita: true,
    translations: {
      es: { name: "Casita rural en Agüimes", description: "Casa canaria restaurada en piedra volcánica en el casco histórico. 20 min de la playa.", tip: "Parte de Casitas Canarias. Pueblo con encanto, muy tranquilo de noche." },
      en: { name: "Rural house in Agüimes", description: "Restored Canarian stone house in the historic centre. 20 min from the beach.", tip: "Part of Casitas Canarias. Charming village, very quiet at night." },
      de: { name: "Landhaus in Agüimes", description: "Restauriertes kanarisches Steinhaus in der Altstadt. 20 Min. vom Strand.", tip: "Teil von Casitas Canarias. Charmantes Dorf, nachts sehr ruhig." },
      nl: { name: "Landhuis in Agüimes", description: "Gerestaureerd Canarisch stenen huis in het historische centrum. 20 min van het strand.", tip: "Onderdeel van Casitas Canarias. Gezellig dorp, 's nachts heel rustig." },
      it: { name: "Casa rurale ad Agüimes", description: "Casa canaria restaurata in pietra vulcanica nel centro storico. 20 min dalla spiaggia.", tip: "Parte di Casitas Canarias. Paese con fascino, molto tranquillo la sera." },
      fr: { name: "Maison rurale à Agüimes", description: "Maison canarienne restaurée en pierre volcanique dans le centre historique. 20 min de la plage.", tip: "Fait partie de Casitas Canarias. Village de charme, très calme la nuit." },
    },
  },
  {
    slug: "casita-valsequillo",
    category: "casita",
    island: "gran-canaria",
    lat: 27.9940, lng: -15.4920,
    imageUrl: "",
    externalUrl: "https://casitascanarias.com",
    isCasita: true,
    translations: {
      es: { name: "Casita rural en Valsequillo", description: "Casa canaria con huerta propia en medio del campo. A 20 min de Las Palmas pero en otra dimensión.", tip: "Parte de Casitas Canarias. Perfecta si buscas silencio y senderismo cerca." },
      en: { name: "Rural house in Valsequillo", description: "Canarian house with its own vegetable garden, deep in the countryside. 20 min from Las Palmas but another world.", tip: "Part of Casitas Canarias. Perfect if you want silence and hiking nearby." },
      de: { name: "Landhaus in Valsequillo", description: "Kanarisches Haus mit eigenem Garten, mitten im Grünen. 20 Min. von Las Palmas, aber eine andere Welt.", tip: "Teil von Casitas Canarias. Ideal für Ruhe und Wandern." },
      nl: { name: "Landhuis in Valsequillo", description: "Canarisch huis met eigen moestuin, midden op het platteland. 20 min van Las Palmas, andere wereld.", tip: "Onderdeel van Casitas Canarias. Perfect voor stilte en wandelen." },
      it: { name: "Casa rurale a Valsequillo", description: "Casa canaria con orto in piena campagna. 20 min da Las Palmas ma un altro mondo.", tip: "Parte di Casitas Canarias. Perfetta per silenzio e trekking." },
      fr: { name: "Maison rurale à Valsequillo", description: "Maison canarienne avec potager, en pleine campagne. 20 min de Las Palmas, autre monde.", tip: "Fait partie de Casitas Canarias. Parfait pour le calme et la rando." },
    },
  },
  {
    slug: "casita-san-mateo",
    category: "casita",
    island: "gran-canaria",
    lat: 27.9990, lng: -15.5310,
    imageUrl: "",
    externalUrl: "https://casitascanarias.com",
    isCasita: true,
    translations: {
      es: { name: "Casita rural en Vega de San Mateo", description: "Casa con vistas a las cumbres en zona de viñedos. Mercado local los sábados a 5 min andando.", tip: "Parte de Casitas Canarias. Ideal base para explorar el centro de la isla." },
      en: { name: "Rural house in Vega de San Mateo", description: "House with mountain views in wine country. Local Saturday market 5 min walk away.", tip: "Part of Casitas Canarias. Ideal base to explore the island's interior." },
      de: { name: "Landhaus in Vega de San Mateo", description: "Haus mit Blick auf die Berge in Weingebiet. Lokaler Samstagsmarkt 5 Gehminuten entfernt.", tip: "Teil von Casitas Canarias. Ideale Basis, um das Inselinnere zu erkunden." },
      nl: { name: "Landhuis in Vega de San Mateo", description: "Huis met bergzicht in wijngebied. Lokale zaterdagmarkt op 5 min lopen.", tip: "Onderdeel van Casitas Canarias. Ideale uitvalsbasis voor het binnenland." },
      it: { name: "Casa rurale a Vega de San Mateo", description: "Casa con vista sulle cumbres in zona vinicola. Mercato del sabato a 5 min a piedi.", tip: "Parte di Casitas Canarias. Base ideale per esplorare l'interno dell'isola." },
      fr: { name: "Maison rurale à Vega de San Mateo", description: "Maison avec vue sur les sommets en zone viticole. Marché local du samedi à 5 min à pied.", tip: "Fait partie de Casitas Canarias. Base idéale pour explorer l'intérieur." },
    },
  },
];

// Combina los 37 del core + 63 extras = 100 sitios
export const places: Place[] = [...placesCore, ...placesExtra, ...placesActivities];

export function getPlaceBySlug(slug: string): Place | null {
  return places.find((p) => p.slug === slug) ?? null;
}

export function getPlacesByCategory(category: string | null) {
  if (!category || category === "all") return places;
  return places.filter((p) => p.category === category);
}

/**
 * Haversine distance entre dos coordenadas (km).
 */
export function distanceKm(a: Place, b: Place): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Retorna los N sitios más cercanos a uno dado (excluyéndolo a sí mismo).
 */
export function nearbyPlaces(place: Place, n = 3): Place[] {
  return places
    .filter((p) => p.slug !== place.slug && p.category !== "casita")
    .map((p) => ({ place: p, dist: distanceKm(place, p) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, n)
    .map((x) => x.place);
}
