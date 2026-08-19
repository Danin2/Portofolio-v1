import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Disable powered by header for security
  poweredByHeader: false,

  // Image optimization — serve WebP/AVIF automatically
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Limit device sizes to reduce number of generated variants
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Tree-shake large icon libraries — reduces bundle size by 200-400 KiB
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "three",
    ],
  },
};

export default nextConfig;
