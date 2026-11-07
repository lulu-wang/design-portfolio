import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "**/data/notes.json"],
      };
    }
    return config;
  },
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
