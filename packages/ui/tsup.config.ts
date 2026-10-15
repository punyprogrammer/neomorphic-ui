import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/avatar.tsx",
    "src/badge.tsx",
    "src/bar-meter.tsx",
    "src/button-group.tsx",
    "src/button.tsx",
    "src/calendar.tsx",
    "src/card.tsx",
    "src/checkbox.tsx",
    "src/chip.tsx",
    "src/dial.tsx",
    "src/input-group.tsx",
    "src/input.tsx",
    "src/item.tsx",
    "src/page-indicator.tsx",
    "src/progress.tsx",
    "src/radio-group.tsx",
    "src/select.tsx",
    "src/separator.tsx",
    "src/slider.tsx",
    "src/spinner.tsx",
    "src/surface.tsx",
    "src/switch.tsx",
    "src/textarea.tsx",
    "src/toggle-group.tsx",
    "src/toggle.tsx",
    "src/tooltip.tsx",
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
