#!/usr/bin/env node
/**
 * Scaffolds a new @neomorphic-ui/react component.
 *
 * Usage:
 *   pnpm add:component ToggleGroup
 *   pnpm add:component toggle-group
 *
 * Creates:
 *   packages/ui/src/<name>.tsx                  component (useRender + cva)
 *   packages/ui/src/<name>.test.tsx             unit tests
 *   apps/storybook/stories/<name>.stories.tsx   story with a play check
 * Updates:
 *   packages/ui/package.json                    exports + publishConfig.exports
 *   packages/ui/tsup.config.ts                  entryPoints
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const UI_DIR = join(ROOT, "packages/ui");
const STORIES_DIR = join(ROOT, "apps/storybook/stories");
const PACKAGE = "@neomorphic-ui/react";

const CAMEL_BOUNDARY_RE = /([a-z0-9])([A-Z])/g;
const SEPARATOR_RE = /[\s_]+/g;
const KEBAB_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const ENTRY_POINTS_RE = /entryPoints:\s*\[([^\]]*)\]/;
const QUOTED_RE = /"([^"]+)"/g;
const RESERVED = new Set(["utils", "base", "theme", "index"]);

// ---------------------------------------------------------------------------
// names
// ---------------------------------------------------------------------------

function toKebabCase(str) {
  return str
    .trim()
    .replace(CAMEL_BOUNDARY_RE, "$1-$2")
    .replace(SEPARATOR_RE, "-")
    .toLowerCase();
}

function toPascalCase(kebab) {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function toCamelCase(kebab) {
  const pascal = toPascalCase(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function validate(kebab) {
  if (!KEBAB_RE.test(kebab)) {
    fail(
      `Invalid component name "${kebab}". Use letters, numbers and hyphens, starting with a letter.`
    );
  }
  if (RESERVED.has(kebab)) {
    fail(`"${kebab}" is reserved for a non-component entry.`);
  }
  for (const path of [
    join(UI_DIR, "src", `${kebab}.tsx`),
    join(STORIES_DIR, `${kebab}.stories.tsx`),
  ]) {
    if (existsSync(path)) {
      fail(`${relative(ROOT, path)} already exists.`);
    }
  }
}

// ---------------------------------------------------------------------------
// templates
// ---------------------------------------------------------------------------

function componentTemplate({ pascal, camel, kebab }) {
  return `"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Set BOTH shadow slots on every variant (\`-flat\` in the unused one) so
// transitions between raised and inset interpolate instead of snapping.
const ${camel}Variants = cva(
  "inset-shadow-neu-flat bg-neu-convex text-foreground shadow-neu transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
  {
    variants: {
      size: {
        sm: "rounded-sm p-2 text-sm",
        md: "rounded-lg p-4",
        lg: "rounded-xl p-6 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// ${pascal}
// ---------------------------------------------------------------------------

interface ${pascal}Props
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof ${camel}Variants> {
  /**
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

function ${pascal}({ className, size = "md", render, ...props }: ${pascal}Props) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn(${camel}Variants({ size }), className) },
      props
    ),
    state: { slot: "${kebab}", size },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ${pascal}Props };
export { ${pascal}, ${camel}Variants };
`;
}

function testTemplate({ pascal, kebab }) {
  return `import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ${pascal} } from "./${kebab}";

describe("${pascal}", () => {
  it("renders children in a div by default", () => {
    render(<${pascal} data-testid="${kebab}">Content</${pascal}>);
    const el = screen.getByTestId("${kebab}");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("Content");
  });

  it("exposes its parts API through data attributes", () => {
    render(<${pascal} data-testid="${kebab}" />);
    const el = screen.getByTestId("${kebab}");
    expect(el).toHaveAttribute("data-slot", "${kebab}");
    expect(el).toHaveAttribute("data-size", "md");
  });

  it("sets both shadow slots", () => {
    render(<${pascal} data-testid="${kebab}" />);
    expect(screen.getByTestId("${kebab}")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat"
    );
  });

  it("lets className override variant classes", () => {
    render(<${pascal} className="shadow-neu-lg" data-testid="${kebab}" />);
    const el = screen.getByTestId("${kebab}");
    expect(el).toHaveClass("shadow-neu-lg");
    expect(el).not.toHaveClass("shadow-neu");
  });

  it("renders as another element through the render prop", () => {
    render(<${pascal} data-testid="${kebab}" render={<section />} />);
    expect(screen.getByTestId("${kebab}").tagName).toBe("SECTION");
  });
});
`;
}

function storyTemplate({ pascal, kebab }) {
  return `import { ${pascal} } from "${PACKAGE}/${kebab}";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Components/${pascal}",
  component: ${pascal},
  parameters: {
    docs: {
      description: {
        component: \`
TODO: what ${pascal} is for, and which part of the kit it comes from.

\\\`\\\`\\\`tsx
import { ${pascal} } from "${PACKAGE}/${kebab}";

<${pascal}>Content</${pascal}>
\\\`\\\`\\\`
\`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof ${pascal}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <${pascal} {...args}>${pascal}</${pascal}>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('[data-slot="${kebab}"]');
    await expect(el).toBeInTheDocument();
    await expect(getComputedStyle(el as Element).boxShadow).not.toBe("none");
  },
};
`;
}

// ---------------------------------------------------------------------------
// registrations
// ---------------------------------------------------------------------------

// Components first (alphabetical), then utils, then stylesheets.
function rank(key) {
  if (key.endsWith(".css")) {
    return 2;
  }
  return key === "./utils" ? 1 : 0;
}

function sortExports(exports) {
  return Object.fromEntries(
    Object.entries(exports).sort(
      ([a], [b]) => rank(a) - rank(b) || a.localeCompare(b)
    )
  );
}

function addPackageExports(kebab) {
  const path = join(UI_DIR, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf8"));
  const key = `./${kebab}`;
  pkg.exports = sortExports({ ...pkg.exports, [key]: `./src/${kebab}.tsx` });
  if (pkg.publishConfig?.exports) {
    pkg.publishConfig.exports = sortExports({
      ...pkg.publishConfig.exports,
      [key]: { types: `./dist/${kebab}.d.ts`, default: `./dist/${kebab}.js` },
    });
  }
  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`);
  return path;
}

function addTsupEntry(kebab) {
  const path = join(UI_DIR, "tsup.config.ts");
  const source = readFileSync(path, "utf8");
  const match = source.match(ENTRY_POINTS_RE);
  if (!match) {
    fail("Could not find `entryPoints: [...]` in packages/ui/tsup.config.ts.");
  }
  const entries = new Set([...match[1].matchAll(QUOTED_RE)].map((m) => m[1]));
  entries.add(`src/${kebab}.tsx`);
  const sorted = [...entries].sort(
    (a, b) =>
      Number(a.endsWith(".ts")) - Number(b.endsWith(".ts")) ||
      a.localeCompare(b)
  );
  const list = sorted.map((e) => `"${e}"`).join(", ");
  writeFileSync(path, source.replace(match[0], `entryPoints: [${list}]`));
  return path;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function main() {
  const rawName = process.argv[2];
  if (!rawName) {
    console.log(`Usage: pnpm add:component <ComponentName>

Examples:
  pnpm add:component ToggleGroup
  pnpm add:component toggle-group`);
    process.exit(1);
  }

  const kebab = toKebabCase(rawName);
  validate(kebab);
  const names = {
    kebab,
    pascal: toPascalCase(kebab),
    camel: toCamelCase(kebab),
  };

  const created = [
    [join(UI_DIR, "src", `${kebab}.tsx`), componentTemplate(names)],
    [join(UI_DIR, "src", `${kebab}.test.tsx`), testTemplate(names)],
    [join(STORIES_DIR, `${kebab}.stories.tsx`), storyTemplate(names)],
  ].map(([path, contents]) => {
    writeFileSync(path, contents);
    return path;
  });
  const updated = [addPackageExports(kebab), addTsupEntry(kebab)];

  // Let Biome own formatting and class order, so templates and the edited
  // configs always match `pnpm check`.
  try {
    execFileSync(
      join(ROOT, "node_modules/.bin/biome"),
      ["check", "--write", ...created, ...updated],
      { cwd: ROOT, stdio: "ignore" }
    );
  } catch {
    console.warn("Biome reported issues; run `pnpm check` to see them.");
  }

  const show = (p) => `  ✓ ${relative(ROOT, p)}`;
  console.log(`
Scaffolded ${names.pascal} (${kebab})

Created:
${created.map(show).join("\n")}

Updated:
${updated.map(show).join("\n")}

Next:
  1. Build it from the kit board in AGENTS.md (halve the 2x measurements)
  2. pnpm dev --filter=@neomorphic-ui/storybook   → http://localhost:6007
  3. pnpm test --filter=${PACKAGE}
  4. pnpm changeset   (minor: new component)
`);
}

main();
