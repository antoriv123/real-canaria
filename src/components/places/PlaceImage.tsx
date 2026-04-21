"use client";

import Image from "next/image";
import { useState } from "react";
import type { PlaceCategory } from "@/lib/types";
import { Mountain, Home, Landmark, UtensilsCrossed, Bed, Ticket } from "lucide-react";

interface Props {
  slug: string;
  name: string;
  category: PlaceCategory;
  imageUrl?: string;
  isCasita?: boolean;
  priority?: boolean;
  className?: string;
}

// Paleta suave por categoría (tonos tierra/natural para que no chillen vs. el
// contenido real). Cada entrada define from/to para un gradiente diagonal y
// un tono de acento sutil para la "textura" del fondo.
const CATEGORY_THEME: Record<
  PlaceCategory,
  { from: string; to: string; icon: typeof Mountain }
> = {
  viewpoint: { from: "#E3EFEB", to: "#CFE0DA", icon: Mountain },
  village: { from: "#EDE7D6", to: "#DCD3BC", icon: Home },
  museum: { from: "#E2E4E8", to: "#CBCED5", icon: Landmark },
  restaurant: { from: "#F2DCD6", to: "#E5C1B7", icon: UtensilsCrossed },
  casita: { from: "#F6E7BF", to: "#EDD48F", icon: Bed },
  activity: { from: "#F4E0C6", to: "#E8C894", icon: Ticket },
};

// Stroke color por categoría — un tono más oscuro del mismo gradiente para el
// icono, que queda discreto.
const ICON_STROKE: Record<PlaceCategory, string> = {
  viewpoint: "#4C8474",
  village: "#8B7A4F",
  museum: "#5F6470",
  restaurant: "#9E5545",
  casita: "#9A7520",
  activity: "#A87530",
};

export function PlaceImage({
  slug,
  name,
  category,
  imageUrl,
  isCasita,
  priority,
  className = "",
}: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = CATEGORY_THEME[category];
  const showRealImage = imageUrl && !imgFailed;
  const Icon = theme.icon;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--color-surface-muted)] ${className}`}>
      {showRealImage ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgFailed(true)}
          priority={priority}
        />
      ) : (
        <>
          <svg
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label={name}
          >
            <defs>
              <linearGradient id={`grad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.from} />
                <stop offset="100%" stopColor={theme.to} />
              </linearGradient>
              <pattern
                id={`dots-${slug}`}
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill={ICON_STROKE[category]} opacity="0.08" />
              </pattern>
            </defs>
            <rect width="600" height="400" fill={`url(#grad-${slug})`} />
            <rect width="600" height="400" fill={`url(#dots-${slug})`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon
              size={72}
              strokeWidth={1.25}
              className="opacity-35"
              style={{ color: ICON_STROKE[category] }}
            />
          </div>
        </>
      )}

      {isCasita && (
        <span className="absolute top-3 left-3 bg-[var(--color-warm)] text-[#2A1E00] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide shadow">
          Casitas Canarias
        </span>
      )}
    </div>
  );
}
