# Design Spec — Real Canaria
Fecha: 2026-04-20
Basado en intake: `2026-04-20-real-canaria-intake.md`

## Visión

**Real Canaria** es una web multi-idioma que muestra a turistas extranjeros qué visitar en Canarias más allá de la playa. Mapa interactivo + lista curada de puntos de interés (miradores, museos, pueblos, restaurantes, casas rurales). V1 cubre solo Gran Canaria. Es una extensión promocional del negocio familiar Casitas Canarias.

**En una frase**: "La Canaria real para los que vienen en avión."

## Narrativa

Antonio es canario. Su familia lleva Casitas Canarias, alquiler rural en Gran Canaria. Ve que los turistas llegan, se quedan en la playa, y se van sin conocer nada del interior — ni los miradores, ni los pueblos, ni los restaurantes buenos. Real Canaria es la guía que él le daría a un amigo extranjero que viene por primera vez. Sin relleno, sin anuncios, en el idioma del visitante.

## Features V1 (MVP)

Priorizadas por impacto:

1. **Mapa interactivo Gran Canaria** (Mapbox GL) con pins por categoría. Click en pin → panel lateral con detalles del sitio.
2. **Lista filtrable** de puntos (toggle entre vista mapa / lista). Filtros por categoría.
3. **Sign-in ligero**: form con nombre + email + fecha de visita. Guarda en DB + cookie. Sin password, sin magic link (V1).
4. **"Mi plan"**: tras sign-in, página personalizada con recomendaciones según su fecha de visita (p.ej. si es verano, más miradores al amanecer; si es invierno, más rutas de laurisilva).
5. **i18n 6 idiomas**: ES, EN, DE, NL, IT, FR. Detección por browser + switcher manual en navbar.

### Lo que NO incluye V1

- Otras islas
- Reservas / compras
- Reviews de usuarios
- IA / chatbot
- Push / email marketing
- App móvil nativa
- Fotos propias (V1 usa Unsplash / Wikimedia Commons con atribución; V2 el cliente mete fotos propias)

## Tech stack

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSR bueno para SEO + file routing + Vercel |
| Styling | Tailwind CSS 4 | Rápido de iterar, mobile-first |
| Components | shadcn/ui + Radix | Accesible, sin lock-in |
| Animaciones | motion/react | FadeIn/stagger en landing y transiciones suaves |
| Iconos | lucide-react | Consistente, tree-shakeable |
| Mapa | **Mapbox GL JS** | Estilo custom con paleta Casitas. Free tier 50k loads/mes |
| Database | Neon (serverless PostgreSQL) | Scale to zero, free tier 512 MB |
| i18n | **next-intl** | Manejo robusto de 6 locales + SEO (rutas `/es`, `/en`, `/de`, etc.) |
| Forms | React Hook Form + Zod | Type-safe validación |
| Data fetching | SWR | Revalidación automática |
| Email (V2) | Resend | Solo si activamos magic link |
| Deploy | Vercel free tier | Zero-config, CDN global |
| Analytics | Vercel Analytics | 1 línea, free tier |
| Testing | Vitest | Tests de utilidades y validadores |

**Coste total V1**: €0/mes.

## Arquitectura

```
src/
├── app/
│   ├── [locale]/                       # Rutas localizadas (es|en|de|nl|it|fr)
│   │   ├── page.tsx                    # Home: mapa + lista + CTA sign-in
│   │   ├── layout.tsx                  # Layout con navbar + footer + LocaleSwitcher
│   │   ├── sitio/[slug]/page.tsx       # Página individual de cada punto (SEO)
│   │   ├── plan/page.tsx               # "Mi plan" personalizado post-signup
│   │   ├── sobre/page.tsx              # Quiénes somos (vínculo Casitas Canarias)
│   │   └── privacidad/page.tsx         # Política privacidad (RGPD)
│   ├── api/
│   │   ├── signup/route.ts             # Guarda nombre+email+fecha
│   │   ├── session/route.ts            # Lee cookie + devuelve user
│   │   ├── places/route.ts             # GET lista filtrable
│   │   └── places/[slug]/route.ts      # GET detalle
│   ├── globals.css                     # Design tokens (paleta Casitas)
│   └── layout.tsx                      # Root layout
├── components/
│   ├── map/
│   │   ├── MapView.tsx                 # Mapbox GL wrapper
│   │   ├── MapPin.tsx                  # Pin custom por categoría
│   │   └── PlaceCard.tsx               # Card lateral al click en pin
│   ├── places/
│   │   ├── PlaceList.tsx               # Lista filtrable
│   │   ├── PlaceFilters.tsx            # Chips de filtro por categoría
│   │   └── PlaceDetail.tsx             # Detalle completo (page)
│   ├── auth/
│   │   ├── SignupForm.tsx              # Form nombre+email+fecha
│   │   └── LocaleSwitcher.tsx          # Selector de idioma
│   ├── layout/
│   │   ├── Navbar.tsx                  # Fijo con logo + idioma + CTA
│   │   └── Footer.tsx                  # Links legales + Casitas Canarias
│   └── ui/                             # shadcn auto-generado
├── lib/
│   ├── db.ts                           # Conexión Neon
│   ├── session.ts                      # Cookie set/get (simple, sin JWT)
│   ├── places.ts                       # Queries de sitios
│   └── i18n.ts                         # Config next-intl
├── messages/                           # Archivos de traducciones next-intl
│   ├── es.json
│   ├── en.json
│   ├── de.json
│   ├── nl.json
│   ├── it.json
│   └── fr.json
├── data/
│   └── places-seed.ts                  # 20-30 puntos iniciales Gran Canaria
└── middleware.ts                        # next-intl routing middleware
```

### Database schema

```sql
-- Usuarios (sin password — captura ligera)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  visit_date DATE NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- Sitios
CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,  -- 'viewpoint' | 'museum' | 'village' | 'restaurant' | 'casita'
  island TEXT NOT NULL DEFAULT 'gran-canaria',
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  image_credit TEXT,                    -- atribución Wikimedia / Unsplash
  external_url TEXT,                    -- link oficial del sitio (web, Google Maps)
  is_casita BOOLEAN DEFAULT FALSE,      -- true si es Casitas Canarias
  featured BOOLEAN DEFAULT FALSE,       -- destacado en home
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_island ON places(island);

-- Traducciones por sitio (1 fila por sitio × idioma)
CREATE TABLE place_translations (
  id SERIAL PRIMARY KEY,
  place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,            -- ~300 caracteres
  tip TEXT,                             -- consejo local corto
  UNIQUE(place_id, locale)
);
CREATE INDEX idx_translations_place_locale ON place_translations(place_id, locale);
```

**Nota sobre RGPD**: email + nombre + fecha de visita son datos personales. Incluir política de privacidad mínima, checkbox de consentimiento en el form, y endpoint `/api/account/delete` (por email) para ejercer derecho de supresión.

## Seguridad V1

- [ ] Email validation (regex + sanitize)
- [ ] Honeypot en form de signup (anti-bot)
- [ ] Rate limit en /api/signup (5/min por IP)
- [ ] Cookie httpOnly + secure + sameSite=lax
- [ ] Sin info sensible → sin JWT, sin password
- [ ] CSP + security headers en next.config
- [ ] Política de privacidad visible antes del signup
- [ ] Checkbox explícito "Acepto el tratamiento de mis datos"
- [ ] Endpoint delete por email (derecho supresión RGPD)

## Monetización

Ninguna directa. Real Canaria es **promoción para Casitas Canarias**:
- Casas rurales aparecen como pins especiales en el mapa
- Footer con link prominente a casitascanarias.com
- CTA sutil en "Mi plan": "¿Dónde te alojas? Tenemos casas rurales con vistas así ↓"
- Métrica de éxito no es revenue, es **tráfico enviado a Casitas Canarias** + engagement (tiempo en mapa, puntos guardados).

## Marketing

No hay campaña activa V1 — es test silencioso. Si funciona:
- Canal 1: QR en las casas de Casitas Canarias (huéspedes actuales lo prueban)
- Canal 2: SEO multiidioma — rutas `/en/place/[slug]`, `/de/sehenswertes/[slug]` etc.
- Canal 3: Pinterest (alto tráfico de planificadores de viaje)

## Timeline

Fase 3 — Setup (1 día)
Fase 4 — Home + mapa + lista (2-3 días)
Fase 5 — Sign-in + plan personalizado (1 día)
Fase 6 — i18n 6 idiomas + seed de 20-30 puntos con traducciones (2 días)
Fase 7 — Polish + deploy (1 día)

**Total estimado**: ~7-8 días de trabajo real.

## Referencias visuales

- **casitascanarias.com** — paleta y tono base (verde + beige + blanco, rústico-premium)
- **airbnb.com/s/Gran-Canaria** — interacción mapa+lista con filtros
- **atlasobscura.com** — curación de contenido + tarjetas de sitios con tip local
- **visittenerife.com** — referencia de qué NO hacer (demasiado corporativo)

## Decisiones de diseño heredadas del intake

1. **Sin auth real**: form captura datos, cookie mantiene sesión, volver con mismo email recupera.
2. **Mapbox sobre Google Maps**: custom styling con paleta Casitas.
3. **next-intl sobre JSON propio**: escala a 6 idiomas con SEO.
4. **Coste €0**: todo en free tier.
5. **Contenido curado manualmente**: sin IA, sin reviews de usuarios.
6. **Solo Gran Canaria V1**: otras islas después de validar.

## KPIs V1 (qué mediremos)

- Signups únicos / semana
- Clicks en pins del mapa
- Clicks en "Casitas Canarias" (footer + pins de casas)
- Idioma más usado
- Tasa de retorno (vuelven a entrar en su fecha de visita)

## Riesgos conocidos

- **Mapbox free tier**: 50k loads/mes. Si explota de tráfico, hay que cambiar a MapLibre self-hosted.
- **Neon free tier**: 512 MB. Suficiente para 50k-100k usuarios + 500 puntos.
- **Traducciones a 6 idiomas**: la calidad importa. V1 usa ChatGPT / DeepL para primer draft, revisión manual de ES/EN (los que Antonio puede controlar). DE/NL/IT/FR con confianza razonable de ChatGPT.
- **Contenido Gran Canaria** desactualizado: el cliente (familia Casitas) revisa los 20-30 puntos antes de launch.
