import { createMDX } from "fumadocs-mdx/next";

// The showcase is its own Next.js app (apps/showcase) with basePath
// "/showcase". In production, set SHOWCASE_URL to its deployment.
// On Vercel, never fall back to localhost — that rewrites to a private
// address and returns DNS_HOSTNAME_RESOLVED_PRIVATE.
const showcaseUrl =
  process.env.SHOWCASE_URL ??
  (process.env.VERCEL
    ? "https://neomorphic-showcase.vercel.app"
    : "http://localhost:3001");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@neomorphic-react/ui"],
  // The `typecheck` task runs tsc; Next's own check doesn't support TypeScript 7.
  typescript: { ignoreBuildErrors: true },
  // Rewrites run after public files, so the screenshots in public/showcase
  // are still served from here.
  rewrites: async () => [
    { source: "/showcase", destination: `${showcaseUrl}/showcase` },
    {
      source: "/showcase/:path+",
      destination: `${showcaseUrl}/showcase/:path+`,
    },
  ],
};

export default createMDX()(config);
