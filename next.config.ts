import type { NextConfig } from "next";

// Site 100 % statique : aucun serveur, aucune base de données.
// `npm run build` génère le dossier /out à déposer sur n'importe quel hébergeur.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { agentUpgrade: "security" },
};

export default nextConfig;
