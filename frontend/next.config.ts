import type { NextConfig } from "next";

// Force env vars into client bundle explicitly (Turbopack sometimes misses .env.local)
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
