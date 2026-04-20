import Link from "next/link";
import { Compass } from "lucide-react";

/**
 * Global 404 — no locale context available aquí, usa ES por defecto.
 * Para 404s dentro de rutas [locale], Next usa not-found.tsx localizado si existe.
 */
export default function NotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          background: "#FDFAF0",
          fontFamily: "'Inter', system-ui, sans-serif",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 400, textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#A22A1C",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Compass size={32} />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#393E47", marginBottom: 8 }}>
            Página no encontrada · Page not found
          </h1>
          <p style={{ color: "#6B7076", marginBottom: 24 }}>
            Este sitio no existe o ha cambiado de sitio.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#A22A1C",
              color: "white",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
