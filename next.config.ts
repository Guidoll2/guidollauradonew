import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongodb'],
  turbopack: {
    // Empty config to silence the Turbopack warning
  }
};

export default nextConfig;
