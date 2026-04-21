"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Place, PlaceCategory } from "@/lib/types";
import type { Locale } from "@/i18n/config";

// Colores de pin — heredados de Casitas Canarias
const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  viewpoint: "#05715E",
  village: "#7D6B3D",
  museum: "#393E47",
  restaurant: "#A22A1C",
  casita: "#E4AD13",
  activity: "#D97706",
};

// SVG teardrop pin — 24x32, compacto y limpio tipo Google Maps
function pinSvg(color: string, isCasita = false): string {
  const size = isCasita ? 30 : 26;
  const scale = isCasita ? 1.15 : 1;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${size * 0.75}" height="${size}" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35)); cursor: pointer;">
      <path d="M12 0.5 C6 0.5 0.5 5.5 0.5 12 C0.5 19 12 31 12 31 C12 31 23.5 19 23.5 12 C23.5 5.5 18 0.5 12 0.5 Z" fill="${color}" stroke="white" stroke-width="${isCasita ? 1.5 : 1.2}"/>
      <circle cx="12" cy="12" r="${isCasita ? 4.5 : 4}" fill="white"/>
    </svg>
  `;
}

interface Props {
  places: Place[];
  highlight?: string | null;
}

export function MapView({ places, highlight }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, { remove: () => void; getElement: () => HTMLElement }>>({});
  const locale = useLocale() as Locale;
  const t = useTranslations("place");
  const [error, setError] = useState<string | null>(null);
  const seeMoreText = t("seeMore");

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    async function init() {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");
      if (cancelled) return;

      // Bounding box de Gran Canaria con margen generoso
      // [SW lng, SW lat] → [NE lng, NE lat]
      const GRAN_CANARIA_BOUNDS: [[number, number], [number, number]] = [
        [-16.20, 27.45], // SW — ~30 km al SO de la isla (océano)
        [-15.05, 28.45], // NE — ~30 km al NE de la isla (océano)
      ];

      const instance = new maplibregl.Map({
        container: containerRef.current!,
        style: {
          version: 8,
          sources: {
            "carto-voyager": {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
            },
          },
          layers: [{ id: "carto", type: "raster", source: "carto-voyager" }],
        },
        center: [-15.58, 27.96],
        zoom: 9.3,
        minZoom: 8.6,                    // permite ver la isla con océano alrededor
        maxZoom: 16,                     // zoom detalle calle
        maxBounds: GRAN_CANARIA_BOUNDS,  // no moverse fuera de Gran Canaria
        dragRotate: false,               // quitar rotación 3D (mapa fijo)
        pitchWithRotate: false,
        touchZoomRotate: true,
      });
      // Desactivar rotación táctil pero mantener zoom con pinza
      instance.touchZoomRotate.disableRotation();

      instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      places.forEach((place) => {
        // IMPORTANTE: MapLibre controla `transform` del elemento raíz para posicionarlo.
        // Si aplico scale() al raíz, machaco el translate() del mapa y el pin se desplaza.
        // Solución: wrapper interno donde aplico scale sin tocar el raíz.
        const el = document.createElement("div");
        const inner = document.createElement("div");
        inner.innerHTML = pinSvg(CATEGORY_COLORS[place.category], place.isCasita);
        inner.dataset.pinInner = "1";
        inner.style.cssText = `
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: transform 0.15s ease-out;
          transform-origin: bottom center;
          cursor: pointer;
          will-change: transform;
        `;
        el.appendChild(inner);
        el.style.cursor = "pointer";
        inner.addEventListener("mouseenter", () => (inner.style.transform = "scale(1.2)"));
        inner.addEventListener("mouseleave", () => (inner.style.transform = "scale(1)"));

        const t = place.translations[locale];
        const safeName = t.name.replace(/</g, "&lt;");
        const safeDesc = t.description.slice(0, 140).replace(/</g, "&lt;");
        const popup = new maplibregl.Popup({ offset: 28, closeButton: false, maxWidth: "280px" })
          .setHTML(`
            <div style="padding: 12px;">
              <div style="font-size: 10px; text-transform: uppercase; color: ${CATEGORY_COLORS[place.category]}; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 4px;">${place.category}</div>
              <div style="font-family: 'Fraunces', Georgia, serif; font-weight: 600; font-size: 15px; color: #393E47; margin-bottom: 4px; line-height: 1.25;">${safeName}</div>
              <div style="font-size: 12px; color: #6B7076; line-height: 1.4; margin-bottom: 8px;">${safeDesc}${t.description.length > 140 ? "…" : ""}</div>
              <a href="/${locale}/sitio/${place.slug}" style="color: #A22A1C; font-size: 12px; font-weight: 600; text-decoration: none;">${seeMoreText} →</a>
            </div>
          `);

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([place.lng, place.lat])
          .setPopup(popup)
          .addTo(instance);

        markersRef.current[place.slug] = marker;
      });

      map = instance;
      mapRef.current = map;
    }

    init().catch((err) => {
      console.error("[map]", err);
      setError(err instanceof Error ? err.message : "Map init failed");
    });

    return () => {
      cancelled = true;
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
      map?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(places.map((p) => p.slug)), locale, seeMoreText]);

  useEffect(() => {
    if (!mapRef.current) return;
    // Modificar solo el inner wrapper — el elemento raíz lo controla MapLibre
    Object.entries(markersRef.current).forEach(([slug, m]) => {
      const root = m.getElement();
      root.style.zIndex = slug === highlight ? "10" : "";
      const inner = root.querySelector('[data-pin-inner="1"]') as HTMLElement | null;
      if (inner) {
        inner.style.transform = slug === highlight ? "scale(1.3)" : "scale(1)";
      }
    });
    if (!highlight) return;
    const place = places.find((p) => p.slug === highlight);
    if (!place) return;
    mapRef.current.flyTo({ center: [place.lng, place.lat], zoom: 11, duration: 700 });
  }, [highlight, places]);

  if (error) {
    return (
      <div className="aspect-[4/3] sm:aspect-[16/9] w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-center text-center p-8">
        <p className="text-sm text-[var(--color-ink-muted)]">Map error: {error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="aspect-[4/3] sm:aspect-[16/9] w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
    />
  );
}
