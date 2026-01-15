import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ajouter le support pour les fichiers TTF
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
