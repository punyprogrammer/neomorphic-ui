import type { NextConfig } from "next";

import { BASE_PATH } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  transpilePackages: ["@neomorphic-react/ui"],
  // The `typecheck` task runs tsc; Next's own check doesn't support TypeScript 7.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
