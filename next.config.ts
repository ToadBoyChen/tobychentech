import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Album Art
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;