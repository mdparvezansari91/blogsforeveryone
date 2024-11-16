import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**', // Allows any path
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // Allows any path
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Allows any path
      },
    ],
  },
  // Add any other Next.js configuration options here
};

export default nextConfig;