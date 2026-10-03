import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cafe-blueprint-magic.lovable.app",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
