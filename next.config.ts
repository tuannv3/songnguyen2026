import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default 1MB is too small for admin image uploads (hero slides, products, news).
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
