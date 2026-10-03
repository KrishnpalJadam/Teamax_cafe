export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TeaMax Café",
    short_name: "TeaMax",
    description: "Tea, coffee, fresh juices, shakes, ice creams and café favourites.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8EE",
    theme_color: "#263C3D",
    icons: [
      {
        src: "/images/logo.webp",
        sizes: "192x192",
        type: "image/webp"
      }
    ]
  };
}