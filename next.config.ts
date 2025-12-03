import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
