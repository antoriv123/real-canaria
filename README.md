# Real Canaria

Web app multi-idioma que enseña a turistas qué visitar en Gran Canaria más allá de la playa. Mapa interactivo, 37 sitios curados, promoción de casas rurales de [Casitas Canarias](https://casitascanarias.com).

**Status**: MVP en prueba. Web-only por ahora; iOS nativo más adelante.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **MapLibre GL** + tiles de Carto Voyager (sin API key)
- **next-intl** con 6 idiomas: ES · EN · DE · NL · IT · FR
- Sin base de datos — DB mock in-memory para signup (se pierde al reiniciar el dev server)
- Imágenes de sitios descargadas de Wikimedia Commons a `/public/places/`

## Instalación

Requisitos: **Node.js 20+** y **npm**.

```bash
# 1. Clona el repo
git clone https://github.com/antoriv123/real-canaria.git
cd real-canaria

# 2. Instala dependencias
npm install

# 3. (Opcional) Re-descarga las 37 imágenes de sitios si no están
node scripts/download-place-images.mjs

# 4. Arranca el dev server
npm run dev
```

Abre **http://localhost:3000**. Idiomas disponibles en:

- `/es` → Español
- `/en` → English
- `/de` → Deutsch
- `/nl` → Nederlands
- `/it` → Italiano
- `/fr` → Français

## Estructura

```
src/
├── app/
│   ├── [locale]/              # Rutas por idioma
│   │   ├── page.tsx           # Home: hero + mapa + lista
│   │   ├── sitio/[slug]/      # Detalle de cada sitio
│   │   ├── plan/              # Plan personalizado post-signup
│   │   ├── sobre/             # Sobre nosotros
│   │   └── privacidad/        # Política RGPD
│   ├── api/
│   │   ├── signup/            # Captura nombre+email+fecha
│   │   └── session/           # Lee sesión via cookie
│   └── layout.tsx
├── components/
│   ├── map/MapView.tsx        # Mapa con MapLibre + pins teardrop
│   ├── places/                # Filtros, grid, tarjetas, imagen
│   ├── auth/SignupForm.tsx
│   └── layout/                # Navbar, Footer, LocaleSwitcher
├── data/
│   ├── places.ts              # 37 sitios con traducciones
│   └── place-images.ts        # Map slug → /places/{slug}.jpg
├── i18n/                      # Config de next-intl
├── lib/                       # db (mock), session, types, utils
├── messages/                  # Traducciones JSON por idioma
└── middleware.ts              # Routing i18n

public/
└── places/                    # 37 imágenes .jpg de cada sitio

scripts/
└── download-place-images.mjs  # Descarga imágenes de Wikimedia
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Dev server con HMR |
| `npm run build` | Build de producción |
| `npm start` | Arranca build de producción |
| `npm run lint` | ESLint |
| `node scripts/download-place-images.mjs` | Descarga las 37 imágenes (idempotente) |

## Añadir un sitio

1. Edita `src/data/places.ts` — añade un objeto con `slug`, `category`, `lat/lng` y traducciones a 6 idiomas.
2. Añade el slug a `src/data/place-images.ts` con la ruta `/places/{slug}.jpg`.
3. Edita `scripts/download-place-images.mjs` y añade la URL de la imagen.
4. Corre `node scripts/download-place-images.mjs` para descargar.

Si no hay imagen, se muestra un placeholder SVG con gradiente + ilustración de la categoría.

## Categorías de sitios

- `viewpoint` — miradores y naturaleza (verde)
- `village` — pueblos (marrón tierra)
- `museum` — museos y cultura (ink)
- `restaurant` — restaurantes (rojo terracota)
- `casita` — casas rurales de Casitas Canarias (mostaza)

## Branding

Paleta heredada de [casitascanarias.com](https://casitascanarias.com):

- Primary `#A22A1C` (rojo terracota corporativo)
- Accent `#05715E` (verde esmeralda)
- Warm `#E4AD13` (mostaza dorado)
- Bg `#FDFAF0` (crema)
- Surface `#FFFFFF`

Tipografía: **Inter** (body) + **Fraunces** (display).

## Créditos de imágenes

Todas las imágenes de sitios vienen de [Wikimedia Commons](https://commons.wikimedia.org) bajo licencia CC-BY-SA o dominio público. Para uso comercial/producción, añadir atribución por foto (campo `imageCredit` en `src/lib/types.ts` ya existe).

## Licencia

MIT.
