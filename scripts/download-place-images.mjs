#!/usr/bin/env node
/**
 * Descarga 1 foto real por cada slug en public/places/.
 * Corre: `node scripts/download-place-images.mjs`
 *
 * Usa Wikimedia Commons Special:FilePath + User-Agent.
 * Sleep entre requests. Idempotente (salta los ya descargados).
 */

import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "places");

const UA = "RealCanariaBot/1.0 (test project; contact: hola@tuapp.com)";
const SLEEP_MS = 500;

function wmFile(filename) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=1200`;
}

// ============================================================
// CORE (37 sitios originales)
// ============================================================
const CORE = {
  "roque-nublo": wmFile("Roque Nublo 2024-12-14.jpg"),
  "dunas-maspalomas": wmFile("Aerial view of the dunes and beach of Maspalomas, Canary Islands (52757630746).jpg"),
  "pico-nieves": wmFile("Pico de las Nieves 03.JPG"),
  "mirador-balcon": wmFile("03 Costa del Andén Verde, des del mirador del Balcón.jpg"),
  "roque-bentayga": wmFile("Bentayga4.jpg"),
  "caldera-bandama": wmFile("Bandama Caldera.jpg"),
  "playa-guigui": wmFile("Güigüi panorama.jpg"),
  "charco-azul": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "faro-maspalomas": wmFile("GC Faro de Maspalomas R06.jpg"),
  "barranco-guayadeque": wmFile("Barranco de Guayadeque 2016 06.jpg"),
  "degollada-becerra": wmFile("Gran Canaria, Caldera de Tejeda.jpg"),
  "vegueta": wmFile("Columbus House-Vegueta-Las Palmas Gran Canaria.jpg"),
  "puerto-mogan": wmFile("Puerto de Mogán (Gran Canaria) (Spain) - 52038215123.jpg"),
  "teror": wmFile("Plaza de teror.JPG"),
  "tejeda": wmFile("Gran Canaria, Caldera de Tejeda.jpg"),
  "agaete": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "fataga": wmFile("Fataga 2.jpg"),
  "arucas": wmFile("Gran Canaria-Arucas-02-Kathedrale San Juan Bautista-2015-gje.jpg"),
  "firgas": wmFile("Firgas centrum - popular water town - panoramio.jpg"),
  "artenara": wmFile("Cave houses - Artenara - 01.jpg"),
  "aguimes": wmFile("Iglesia de San Sebastián, en Agüimes (Las Palmas, España).jpg"),
  "galdar": wmFile("Gáldar, en Gran Canaria (Las Palmas, España).jpg"),
  "jardin-canario": wmFile("Jardin Canario 1.jpg"),
  "museo-canario": wmFile("Museo Canario.JPG"),
  "casa-colon": wmFile("Casa de Colón, Museo, Las Palmas de Gran Canaria, España.jpg"),
  "cueva-pintada": wmFile("Cueva pintada grancanaria.jpg"),
  "cenobio-valeron": wmFile("Cenobio valeron cuevas.JPG"),
  "catedral-santa-ana": wmFile("Catedral de Santa Ana (Las Palmas de Gran Canaria).jpg"),
  "tagoror-guayadeque": wmFile("Barranco de Guayadeque 2016 06.jpg"),
  "las-nasas-agaete": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "meson-la-silla": wmFile("Cave houses - Artenara - 01.jpg"),
  "la-vaca-azul": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "el-santo": wmFile("Puerto de Mogán (Gran Canaria) (Spain) - 52038215123.jpg"),
  "casita-teror": wmFile("Plaza de teror.JPG"),
  "casita-aguimes": wmFile("Iglesia de San Sebastián, en Agüimes (Las Palmas, España).jpg"),
  "casita-valsequillo": wmFile("Valsequillo de Gran Canaria.jpg"),
  "casita-san-mateo": wmFile("Vega de San Mateo.jpg"),
};

// ============================================================
// EXTRA (63 sitios nuevos)
// ============================================================
const EXTRA = {
  // Naturaleza (20)
  "cruz-tejeda": wmFile("Cruz de Tejeda 2017.jpg"),
  "pozo-nieves": wmFile("Pico de las Nieves 03.JPG"),
  "cuevas-cuatro-puertas": wmFile("Cuevas de los Cuatro Puertas.jpg"),
  "montana-arucas": wmFile("Montaña de Arucas.jpg"),
  "cueva-rey": wmFile("Cueva del Rey Artenara.jpg"),
  "playa-canteras": wmFile("Playa de las Canteras 2016.jpg"),
  "playa-confital": wmFile("El Confital.jpg"),
  "playa-veneguera": wmFile("Playa de Veneguera.jpg"),
  "playa-tauro": wmFile("Playa de Tauro.jpg"),
  "playa-tasartico": wmFile("Playa de Tasartico.jpg"),
  "playa-aguadulce": wmFile("Playa de Sardina del Norte.jpg"),
  "roque-saucillo": wmFile("Bentayga4.jpg"),
  "mirador-tirajanas": wmFile("Gran Canaria, Caldera de Tejeda.jpg"),
  "barranco-veneguera": wmFile("Playa de Veneguera.jpg"),
  "barranco-mogan": wmFile("Puerto de Mogán (Gran Canaria) (Spain) - 52038215123.jpg"),
  "tamadaba": wmFile("Pinar de Tamadaba.jpg"),
  "laurisilva-moya": wmFile("Doramas Tilos de Moya.jpg"),
  "cruz-hoya-plata": wmFile("Aerial view of the dunes and beach of Maspalomas, Canary Islands (52757630746).jpg"),
  "arinaga-volcano": wmFile("Montaña de Arinaga.jpg"),
  "roque-aguayro": wmFile("Bentayga4.jpg"),

  // Pueblos (17) — Fontanales first!
  "fontanales": wmFile("Fontanales - Gran Canaria.jpg"),
  "moya": wmFile("Moya (Gran Canaria).jpg"),
  "valleseco": wmFile("Valleseco iglesia de San Vicente Ferrer.jpg"),
  "valsequillo": wmFile("Valsequillo de Gran Canaria.jpg"),
  "san-mateo": wmFile("Vega de San Mateo.jpg"),
  "santa-brigida": wmFile("Santa Brigida - iglesia.jpg"),
  "ingenio": wmFile("Ingenio Las Palmas.jpg"),
  "guia": wmFile("Santa María de Guía iglesia.jpg"),
  "aldea-san-nicolas": wmFile("La Aldea de San Nicolás.jpg"),
  "mogan-pueblo": wmFile("Mogán - Gran Canaria.jpg"),
  "arinaga": wmFile("Arinaga.jpg"),
  "tamaraceite": wmFile("Tamaraceite Las Palmas.jpg"),
  "juncalillo": wmFile("Cave houses - Artenara - 01.jpg"),
  "puerto-rico": wmFile("Puerto Rico (Gran Canaria).jpg"),
  "vecindario": wmFile("Vecindario.jpg"),
  "telde": wmFile("Telde Gran Canaria.jpg"),
  "santa-lucia": wmFile("Santa Lucía de Tirajana.jpg"),

  // Cultura (10)
  "fortaleza-ansite": wmFile("Fortaleza de Ansite.jpg"),
  "caam": wmFile("CAAM Las Palmas.jpg"),
  "castillo-luz": wmFile("Castillo de la Luz Las Palmas.jpg"),
  "auditorio-kraus": wmFile("Auditorio Alfredo Kraus.jpg"),
  "casa-leon-castillo": wmFile("Casa-Museo León y Castillo.jpg"),
  "iglesia-santiago-galdar": wmFile("Gáldar, en Gran Canaria (Las Palmas, España).jpg"),
  "tumulo-guancha": wmFile("Tumulo de La Guancha.jpg"),
  "casa-tomas-morales": wmFile("Moya (Gran Canaria).jpg"),
  "parque-doramas": wmFile("Parque Doramas Las Palmas.jpg"),
  "cueva-candiles": wmFile("Cave houses - Artenara - 01.jpg"),

  // Restaurantes (10)
  "bevir": wmFile("Columbus House-Vegueta-Las Palmas Gran Canaria.jpg"),
  "pulperia-canarios": wmFile("Aerial view of the dunes and beach of Maspalomas, Canary Islands (52757630746).jpg"),
  "la-aquarela": wmFile("Playa de Tauro.jpg"),
  "muelle-arguineguin": wmFile("Puerto de Mogán (Gran Canaria) (Spain) - 52038215123.jpg"),
  "texeda": wmFile("Gran Canaria, Caldera de Tejeda.jpg"),
  "deliciosa-marta": wmFile("Columbus House-Vegueta-Las Palmas Gran Canaria.jpg"),
  "caseron-galdar": wmFile("Gáldar, en Gran Canaria (Las Palmas, España).jpg"),
  "cantina-firgas": wmFile("Firgas centrum - popular water town - panoramio.jpg"),
  "cho-zacarias": wmFile("Iglesia de San Sebastián, en Agüimes (Las Palmas, España).jpg"),
  "ribera-agaete": wmFile("Puerto de las Nieves - panoramio.jpg"),

  // Casitas (6)
  "casita-fontanales": wmFile("Fontanales - Gran Canaria.jpg"),
  "casita-moya": wmFile("Moya (Gran Canaria).jpg"),
  "casita-valleseco": wmFile("Valleseco iglesia de San Vicente Ferrer.jpg"),
  "casita-santa-brigida": wmFile("Santa Brigida - iglesia.jpg"),
  "casita-tejeda": wmFile("Gran Canaria, Caldera de Tejeda.jpg"),
  "casita-firgas": wmFile("Firgas centrum - popular water town - panoramio.jpg"),
};

// Fallback genérico (foto de Gran Canaria que siempre funciona)
const FALLBACK = wmFile("Gran Canaria, Caldera de Tejeda.jpg");

const URLS = { ...CORE, ...EXTRA };

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadOne(slug, url, attempt = 1) {
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  try {
    const s = await stat(outPath);
    if (s.size > 20_000) {
      console.log(`⊙ ${slug} cacheado (${Math.round(s.size / 1024)}kb)`);
      return { ok: true, cached: true };
    }
  } catch {}

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept": "image/*" },
      redirect: "follow",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error(`too small (${buf.length}b)`);

    await writeFile(outPath, buf);
    console.log(`✓ ${slug} (${Math.round(buf.length / 1024)}kb)`);
    return { ok: true };
  } catch (err) {
    if (attempt === 1) {
      console.log(`⚠ ${slug}: ${err.message} → fallback`);
      await sleep(SLEEP_MS);
      return downloadOne(slug, FALLBACK, 2);
    }
    console.error(`✗ ${slug}: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const entries = Object.entries(URLS);
  const res = { ok: 0, fail: 0, cached: 0 };

  console.log(`📥 ${entries.length} imágenes → ${OUT_DIR}\n`);

  for (const [slug, url] of entries) {
    const r = await downloadOne(slug, url);
    if (r.ok) r.cached ? res.cached++ : res.ok++;
    else res.fail++;
    await sleep(SLEEP_MS);
  }

  console.log(`\n📊 ${res.ok} nuevas · ${res.cached} cacheadas · ${res.fail} fallidas`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
