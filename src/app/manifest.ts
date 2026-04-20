import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Real Canaria",
    short_name: "Canaria",
    description: "La Canaria que no sale en las guías",
    start_url: "/en",
    display: "standalone",
    background_color: "#FDFAF0",
    theme_color: "#A22A1C",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
