import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/surface.tsx", "src/utils.ts"],
  format: ["esm"],
  // tsup's dts step needs the TypeScript JS API, which TS 7 doesn't ship, so
  // this package pins `typescript` to the @typescript/typescript6 bridge.
  // tsup injects `baseUrl`, which TS 6 flags as deprecated.
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  clean: true,
  external: ["react"],
  ...options,
}));
