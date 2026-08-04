import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
