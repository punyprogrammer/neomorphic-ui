import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const UI_SRC = fileURLToPath(
  new URL("../../../packages/ui/src", import.meta.url)
);
const BASE_UI_IMPORT = /from "(@base-ui\/react\/[\w-]+)"/g;

/**
 * Every Base UI entry the components import, as nested deps of the UI
 * package. Pre-bundled up front, so Vite doesn't discover one mid-run and
 * reload the page (which fails the Storybook tests on a cold cache).
 */
function baseUiEntries() {
  const entries = new Set<string>();
  for (const file of readdirSync(UI_SRC)) {
    if (file.endsWith(".tsx") && !file.endsWith(".test.tsx")) {
      const source = readFileSync(join(UI_SRC, file), "utf8");
      for (const [, entry] of source.matchAll(BASE_UI_IMPORT)) {
        entries.add(`@neomorphic-react/ui > ${entry}`);
      }
    }
  }
  return [...entries].sort();
}

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)", "../**/*.mdx"],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    check: true,
  },
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  docs: {
    defaultName: "Documentation",
  },

  viteFinal: async (viteConfig) => {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      optimizeDeps: {
        include: [
          "@tanstack/react-table",
          "class-variance-authority",
          "clsx",
          "lucide-react",
          "recharts",
          "shiki/core",
          "shiki/engine/javascript",
          "shiki/langs",
          "shiki/themes",
          "tailwind-merge",
          "@neomorphic-react/ui > embla-carousel-react",
          "@neomorphic-react/ui > react-resizable-panels",
          "@neomorphic-react/ui > recharts",
          ...baseUiEntries(),
        ],
      },
    });
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
