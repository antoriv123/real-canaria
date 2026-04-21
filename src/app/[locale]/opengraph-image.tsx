import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "Real Canaria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Paleta Casitas Canarias (duplicada aquí porque ImageResponse se ejecuta
// en Edge runtime y no tiene acceso a las variables CSS de globals.css).
const C = {
  bg: "#FDFAF0",
  primary: "#A22A1C",
  accent: "#05715E",
  warm: "#E4AD13",
  ink: "#1F1A15",
  inkMuted: "#5D5047",
} as const;

export default async function OpenGraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${C.bg} 0%, #F7EED8 100%)`,
          padding: "72px 80px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Esquina decorativa */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 360,
            height: 360,
            background: C.warm,
            opacity: 0.18,
            borderBottomLeftRadius: 360,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 280,
            height: 280,
            background: C.accent,
            opacity: 0.12,
            borderTopRightRadius: 280,
          }}
        />

        {/* Marca */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: C.ink }}>Real</span>
          <span style={{ color: C.primary }}>Canaria</span>
        </div>

        {/* Claim */}
        <div
          style={{
            marginTop: 70,
            color: C.ink,
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Subtítulo */}
        <div
          style={{
            marginTop: 28,
            color: C.inkMuted,
            fontSize: 28,
            lineHeight: 1.35,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: C.inkMuted,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: C.primary,
                display: "inline-block",
              }}
            />
            <span>Gran Canaria</span>
          </div>
          <div>
            <span style={{ color: C.warm, fontWeight: 600 }}>Casitas Canarias</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
