@AGENTS.md

# Real Canaria — Reglas del proyecto

## Equipo

Dos desarrolladores trabajando exclusivamente con Claude Code:
- **Claudio** (@claudioriverorodriguez) — servidor de desarrollo en crr-server
- **Antonio** (@antoriv123) — creador del repo

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- MapLibre GL (mapa interactivo)
- next-intl (6 idiomas: es, en, de, nl, it, fr)
- DB: mock in-memory (sin persistencia real todavía)

## Reglas de git — OBLIGATORIAS

1. **NUNCA hacer push directo a `main`**. Siempre crear una rama y abrir PR.
2. Nombres de rama: `claudio/descripcion-corta` o `antonio/descripcion-corta`
3. Antes de empezar cualquier tarea: `git pull origin main` y crear rama desde main actualizado.
4. Commits pequeños y frecuentes. Mensaje en español, conciso.
5. Antes de abrir PR: `pnpm build` debe pasar sin errores.
6. No mergear tu propio PR sin que el otro lo haya visto (salvo hotfixes urgentes).

## Estructura del código

```
src/
├── app/[locale]/        → páginas (rutas)
├── components/          → componentes React
├── data/                → datos estáticos (places, routes, images)
├── i18n/                → config de internacionalización
├── lib/                 → utilidades, tipos, DB, sesión
├── messages/            → traducciones JSON (es, en, de, nl, it, fr)
└── middleware.ts        → routing i18n
public/places/           → imágenes de sitios
```

## Traducciones

- Toda cadena visible al usuario debe estar en los 6 archivos de `src/messages/`.
- NO hardcodear texto en componentes. Usar `useTranslations()`.
- Al añadir una key nueva, añadirla en los 6 idiomas.

## Antes de cada cambio

1. `git pull origin main`
2. `git checkout -b tu-nombre/descripcion`
3. Trabajar y hacer commits
4. `pnpm build` — debe compilar sin errores
5. `git push -u origin tu-nombre/descripcion`
6. Abrir PR en GitHub

## Deploy al servidor de desarrollo (crr-server)

El servidor de desarrollo está en el iMac de Claudio:
- **PM2 proceso**: `real-canaria` (puerto 3200)
- **URL LAN**: http://real-canaria.192.168.1.23.nip.io
- **URL externa**: ver tunnel activo de Cloudflare

Para desplegar (solo desde la máquina de Claudio):
```bash
ssh crr-remoto "cd /home/claudio/projects/real-canaria && git pull && pnpm install && pnpm build && pm2 restart real-canaria"
```

## Idioma

- Código y comentarios en inglés
- Commits y PRs en español
- Copy de la web: 6 idiomas via messages/

## Qué NO hacer

- No instalar dependencias nuevas sin consenso previo
- No modificar `next.config.ts`, `tsconfig.json` o `middleware.ts` sin avisar
- No borrar ni renombrar archivos de datos (`places.ts`, `routes.ts`) sin coordinarse
- No hacer `git push --force` bajo ningún concepto
