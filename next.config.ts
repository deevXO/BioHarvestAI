import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint for production build during hackathon demo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking for production build during hackathon demo
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
