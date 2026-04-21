"use client";

import Image from "next/image";
import { useState } from "react";
import type { PlaceCategory } from "@/lib/types";

interface Props {
  slug: string;
  name: string;
  category: PlaceCategory;
  imageUrl?: string;
  isCasita?: boolean;
  priority?: boolean;
  className?: string;
}

// Paleta por categoría (hereda de Casitas Canarias)
const CATEGORY_THEME: Record<PlaceCategory, { from: string; to: string; accent: string }> = {
  viewpoint: { from: "#05715E", to: "#1E4D47", accent: "#8FCFB9" },
  village: { from: "#7D6B3D", to: "#4A3E22", accent: "#D4C28A" },
  museum: { from: "#393E47", to: "#1E2128", accent: "#8B93A1" },
  restaurant: { from: "#A22A1C", to: "#6B1B12", accent: "#F5A89C" },
  casita: { from: "#E4AD13", to: "#8F6A0A", accent: "#FDE5A6" },
  activity: { from: "#D97706", to: "#7C3F05", accent: "#FDBA74" },
};

function Illustration({ category, color }: { category: PlaceCategory; color: string }) {
  switch (category) {
    case "viewpoint":
      return (
        <g>
          <path d="M0,320 L120,180 L200,240 L300,120 L400,200 L500,160 L600,220 L600,400 L0,400 Z" fill={color} opacity="0.35" />
          <path d="M0,340 L80,240 L180,300 L280,220 L380,280 L480,240 L600,300 L600,400 L0,400 Z" fill={color} opacity="0.55" />
          <circle cx="480" cy="90" r="32" fill={color} opacity="0.3" />
        </g>
      );
    case "village":
      return (
        <g>
          <rect x="120" y="220" width="90" height="100" fill={color} opacity="0.4" />
          <path d="M120,220 L165,175 L210,220 Z" fill={color} opacity="0.5" />
          <rect x="230" y="200" width="110" height="120" fill={color} opacity="0.45" />
          <path d="M230,200 L285,150 L340,200 Z" fill={color} opacity="0.55" />
          <rect x="360" y="230" width="80" height="90" fill={color} opacity="0.4" />
          <path d="M360,230 L400,195 L440,230 Z" fill={color} opacity="0.5" />
        </g>
      );
    case "museum":
      return (
        <g>
          <rect x="130" y="120" width="340" height="20" fill={color} opacity="0.4" />
          <path d="M130,120 L300,70 L470,120 Z" fill={color} opacity="0.5" />
          <rect x="160" y="145" width="25" height="180" fill={color} opacity="0.45" />
          <rect x="215" y="145" width="25" height="180" fill={color} opacity="0.45" />
          <rect x="270" y="145" width="25" height="180" fill={color} opacity="0.45" />
          <rect x="325" y="145" width="25" height="180" fill={color} opacity="0.45" />
          <rect x="380" y="145" width="25" height="180" fill={color} opacity="0.45" />
          <rect x="435" y="145" width="25" height="180" fill={color} opacity="0.45" />
        </g>
      );
    case "restaurant":
      return (
        <g>
          <circle cx="300" cy="200" r="110" fill={color} opacity="0.45" />
          <circle cx="300" cy="200" r="80" fill={color} opacity="0.6" />
          <rect x="180" y="140" width="6" height="140" fill={color} opacity="0.7" />
          <rect x="414" y="140" width="6" height="140" fill={color} opacity="0.7" />
          <ellipse cx="417" cy="140" rx="18" ry="22" fill={color} opacity="0.7" />
        </g>
      );
    case "casita":
      return (
        <g>
          <rect x="180" y="200" width="240" height="140" fill={color} opacity="0.45" />
          <path d="M160,200 L300,110 L440,200 Z" fill={color} opacity="0.55" />
          <rect x="275" y="260" width="50" height="80" fill={color} opacity="0.7" />
          <rect x="210" y="235" width="40" height="40" fill={color} opacity="0.65" />
          <rect x="350" y="235" width="40" height="40" fill={color} opacity="0.65" />
        </g>
      );
    case "activity":
      return (
        <g>
          {/* Ticket/rectángulo con bordes perforados */}
          <rect x="150" y="150" width="300" height="150" rx="14" fill={color} opacity="0.45" />
          <circle cx="150" cy="225" r="14" fill="#FDFAF0" opacity="0.85" />
          <circle cx="450" cy="225" r="14" fill="#FDFAF0" opacity="0.85" />
          <line x1="300" y1="160" x2="300" y2="290" stroke={color} strokeWidth="4" strokeDasharray="8 6" opacity="0.7" />
          {/* Montaña + sol simbólicos al fondo */}
          <circle cx="500" cy="90" r="24" fill={color} opacity="0.5" />
          <path d="M0,360 L140,240 L240,320 L360,220 L500,330 L600,260 L600,400 L0,400 Z" fill={color} opacity="0.3" />
        </g>
      );
  }
}

export function PlaceImage({
  slug, name, category, imageUrl, isCasita, priority, className = "",
}: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = CATEGORY_THEME[category];
  const showRealImage = imageUrl && !imgFailed;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
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
          </defs>
          <rect width="600" height="400" fill={`url(#grad-${slug})`} />
          <Illustration category={category} color={theme.accent} />
        </svg>
      )}

      {/* Overlay de degradado abajo para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

      {/* Nombre overlay */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5 pointer-events-none">
        <h3
          className="font-[var(--font-display)] font-semibold text-white text-lg sm:text-xl leading-tight line-clamp-2"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.65)" }}
        >
          {name}
        </h3>
      </div>

      {isCasita && (
        <span className="absolute top-3 left-3 bg-[var(--color-warm)] text-[#2A1E00] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide shadow">
          Casitas Canarias
        </span>
      )}
    </div>
  );
}
