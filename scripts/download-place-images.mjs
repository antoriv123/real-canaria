#!/usr/bin/env node
/**
 * Descarga una foto real por cada slug en public/places/.
 * Corre: `node scripts/download-place-images.mjs`
 *
 * Usa Wikimedia Commons Special:FilePath (redirect al archivo real)
 * + User-Agent explícito como pide la policy de Wikimedia.
 * Sleep de 800ms entre requests para no hacer bursts.
 *
 * Si un slug falla, continúa con el siguiente. El componente PlaceImage ya
 * tiene fallback SVG si un archivo no existe.
 */

import { mkdir, writeFile, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "places");

const UA = "RealCanariaBot/1.0 (test project; contact: hola@tuapp.com)";
const SLEEP_MS = 800;

// Helper: URL a Special:FilePath de Wikimedia (redirecciona al archivo final)
function wmFile(filename) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=1200`;
}

// Orden: por categoría lógica (naturaleza → pueblos → museos → restaurantes → casitas)
const URLS = {
  // --- Miradores / naturaleza ---
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

  // --- Pueblos ---
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

  // --- Museos / cultura ---
  "jardin-canario": wmFile("Jardin Canario 1.jpg"),
  "museo-canario": wmFile("Museo Canario.JPG"),
  "casa-colon": wmFile("Casa de Colón, Museo, Las Palmas de Gran Canaria, España.jpg"),
  "cueva-pintada": wmFile("Cueva pintada grancanaria.jpg"),
  "cenobio-valeron": wmFile("Cenobio valeron cuevas.JPG"),
  "catedral-santa-ana": wmFile("Catedral de Santa Ana (Las Palmas de Gran Canaria).jpg"),

  // --- Restaurantes (fallback a la zona donde están) ---
  "tagoror-guayadeque": wmFile("Barranco de Guayadeque 2016 06.jpg"),
  "las-nasas-agaete": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "meson-la-silla": wmFile("Cave houses - Artenara - 01.jpg"),
  "la-vaca-azul": wmFile("Puerto de las Nieves - panoramio.jpg"),
  "el-santo": wmFile("Puerto de Mogán (Gran Canaria) (Spain) - 52038215123.jpg"),

  // --- Casitas rurales (fallback al pueblo donde están) ---
  "casita-teror": wmFile("Plaza de teror.JPG"),
  "casita-aguimes": wmFile("Iglesia de San Sebastián, en Agüimes (Las Palmas, España).jpg"),
  "casita-valsequillo": wmFile("Valsequillo de Gran Canaria.jpg"),
  "casita-san-mateo": wmFile("Vega de San Mateo.jpg"),
};

// URLs fallback si la primera falla (Special:FilePath es case-sensitive con el nombre)
const FALLBACKS = {
  "casita-valsequillo": wmFile("Plaza_de_teror.JPG"),         // si Valsequillo falla
  "casita-san-mateo": wmFile("Plaza_de_teror.JPG"),           // si San Mateo falla
  "catedral-santa-ana": wmFile("Columbus House-Vegueta-Las Palmas Gran Canaria.jpg"), // fallback Vegueta
  "jardin-canario": wmFile("Barranco de Guayadeque 2016 06.jpg"), // fallback naturaleza canaria
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadOne(slug, url, attempt = 1) {
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  // Skip if already present (idempotente)
  try {
    const s = await stat(outPath);
    if (s.size > 20_000) {
      console.log(`⊙ ${slug} ya existe (${Math.round(s.size / 1024)}kb), saltando`);
      return { ok: true, cached: true };
    }
  } catch {
    // no existe, continúa
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept": "image/*" },
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) {
      throw new Error(`response too small (${buf.length} bytes) — likely error page`);
    }

    await writeFile(outPath, buf);
    console.log(`✓ ${slug} (${Math.round(buf.length / 1024)}kb)`);
    return { ok: true };
  } catch (err) {
    if (attempt === 1 && FALLBACKS[slug]) {
      console.log(`⚠ ${slug} falló: ${err.message}. Reintentando con fallback...`);
      await sleep(SLEEP_MS);
      return downloadOne(slug, FALLBACKS[slug], 2);
    }
    console.error(`✗ ${slug}: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const entries = Object.entries(URLS);
  const results = { ok: 0, fail: 0, cached: 0 };

  console.log(`📥 Descargando ${entries.length} imágenes a ${OUT_DIR}\n`);

  for (const [slug, url] of entries) {
    const r = await downloadOne(slug, url);
    if (r.ok) {
      r.cached ? results.cached++ : results.ok++;
    } else {
      results.fail++;
    }
    await sleep(SLEEP_MS);
  }

  console.log(
    `\n📊 Resultado: ${results.ok} nuevas · ${results.cached} cacheadas · ${results.fail} fallidas`
  );
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
