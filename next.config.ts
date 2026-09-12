import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/prototypes/meeting-decision-extractor",
        destination: "/prototypes/opal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
