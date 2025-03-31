/** @type {import('next').NextConfig} */

const env = process.env.NODE_ENV;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: env === "development" ? undefined : "/sap-btp-ai-best-practices",
  basePath: env === "development" ? undefined : "/sap-btp-ai-best-practices",
  distDir: "../docs"
};

module.exports = nextConfig;
