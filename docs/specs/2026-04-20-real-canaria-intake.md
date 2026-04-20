# Intake — Real Canaria
Fecha: 2026-04-20

## 1. Producto y problema
- **Qué hace**: app web que muestra a turistas extranjeros qué visitar en Canarias — mapa interactivo con monumentos, miradores, museos, restaurantes de referencia y pueblos con encanto. Las casas rurales de Casitas Canarias aparecen también como puntos en el mapa.
- **Avatar**: turista extranjero 25-55 años, en viaje corto de 7-14 días, habla inglés/alemán/holandés/italiano/francés. Abre el móvil en el hotel el primer día y quiere saber qué hacer más allá de la playa.
- **Problema**: sale del alojamiento sin idea de qué visitar; termina repitiendo playa porque la info está dispersa y en español.
- **Status quo**: TikTok (información fragmentada) + Google/Safari (resultados poco curados, en ES).
- **Referencia**: ninguna visual. MVP de prueba.

## 2. Stack y alcance
- **Plataformas V1**: Web (responsive, mobile-first). iOS nativo (Capacitor) si funciona.
- **Idiomas V1**: 6 — ES, EN, DE, NL, IT, FR (los 5 mercados top de turismo canario + ES base).
- **Features V1**:
  1. Mapa interactivo de Gran Canaria con pins por categoría
  2. Lista filtrable de puntos (categorías: miradores, museos, pueblos, restaurantes, casas rurales de Casitas Canarias)
  3. Sign-in ligero (nombre + email + fecha de visita)
  4. Vista "Plan para tu visita" — puntos recomendados según la fecha que indicó
  5. Selector de idioma + detección automática por browser
- **No V1**:
  - Otras islas (Tenerife, Lanzarote, Fuerteventura, La Palma, El Hierro, La Gomera)
  - Reservas o compras dentro de la app
  - Reviews de usuarios (contenido 100% curado)
  - IA / chatbot
  - Push notifications
  - Email marketing
  - iOS nativo (Fase 2 si el test funciona)

## 3. Monetización
- **Modelo**: Free 100%. La app es **promoción de Casitas Canarias** — no genera revenue directo. Las casas rurales de Casitas aparecen como pins especiales en el mapa y en la sección "dónde dormir".
- **Pricing**: n/a
- **Trial**: n/a
- **App Store**: no V1

## 4. Branding
- **Nombre**: Real Canaria (working name — "la Canaria real, no solo playa")
- **Dominio**: sin dominio propio de momento. Deploy en `realcanaria.vercel.app` (Vercel free). Si funciona, se mueve a subdominio de casitascanarias.com (ej: `visita.casitascanarias.com` o `real.casitascanarias.com`).
- **Paleta**: hereda de Casitas Canarias (verde natural + beige tierra + blanco suave + gris carbón).
- **Personalidad**: "guía local auténtico, no agencia de turismo". Cálido y accesible, pero sin ser hortera.
- **Prohibidos**: azul+amarillo genérico de turismo, morado, gradientes en texto.
- **Voz**: tú, casual, directo. Ejemplos: "No te quedes solo en la playa", "Esto es lo que no sale en las guías".

## 5. Integraciones
- **IA**: no V1. Contenido curado manualmente (empezamos con ~20-30 puntos de Gran Canaria).
- **Apple Sign In**: no aplica (web, no App Store V1).
- **Push**: no.
- **Email transaccional**: solo magic link si confirmamos esa decisión (ver §Decisiones). Resend free tier (100 emails/día) cubre MVP sobradamente.
- **Import datos**: no. Puntos se meten vía seed script / admin view.
- **Biometría**: no.

## 6. Timeline y recursos
- **Beta**: MVP funcional en ~1-2 semanas de trabajo.
- **Lanzamiento público**: sin fecha. Si el test funciona, se mueve al dominio oficial.
- **Presupuesto**: **€0**. Todo en tier gratuito (Vercel + Neon + Mapbox + Resend).
- **Equipo**: Antonio solo + Claude Code.
- **Apple Developer**: no aplica V1.

## Decisiones tomadas durante intake
- **Sign-in sin auth real** (cambio sobre el plan inicial): el usuario mete `nombre + email + fecha de visita` en un form, se guarda en DB + cookie de sesión. Si vuelve y mete mismo email, recupera sus datos. Razón: MVP de prueba, no hay datos sensibles, el "login" es más una captura de lead + personalización que un login real. Magic link queda reservado para V2 si hay valor.
- **Stack mapa**: **Mapbox GL JS** (free tier 50k loads/mes) con estilo custom en paleta Casitas.
- **i18n**: `next-intl` (robusto con 6 idiomas, mejor que JSON propio).
- **Hosting**: Vercel free tier + `realcanaria.vercel.app` subdomain.
- **DB**: Neon PostgreSQL free tier (512 MB, suficiente para ~10k usuarios + puntos).

## Decisiones pendientes
- [ ] Logo: wordmark bicolor "Real Canaria" o solo tipográfico
- [ ] Lista inicial de 20-30 puntos Gran Canaria (Antonio la proporciona o Claude la curatea desde fuentes públicas)
- [ ] ¿El email se valida (magic link V2) o basta con captura simple V1?
