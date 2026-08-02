import type { NextConfig } from "next";

// GitHub Pages serves this repo at /3droomportfolio/, so production
// builds need the basePath — but keep it off for `next dev` so local
// dev still works at the site root.
const repoName = "3droomportfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
