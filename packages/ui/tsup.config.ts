import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/badge.tsx",
    "src/button-group.tsx",
    "src/button.tsx",
    "src/checkbox.tsx",
    "src/radio-group.tsx",
    "src/select.tsx",
    "src/surface.tsx",
    "src/switch.tsx",
    "src/textarea.tsx",
    "src/toggle-group.tsx",
    "src/toggle.tsx",
    "src/utils.ts",
  ],
  format: ["esm"],
  // tsup's dts step needs the TypeScript JS API, which TS 7 doesn't ship, so
  // this package pins `typescript` to the @typescript/typescript6 bridge.
  // tsup injects `baseUrl`, which TS 6 flags as deprecated.
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  clean: true,
  external: ["react"],
  ...options,
}));
