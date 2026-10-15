#!/usr/bin/env node
/**
 * Checks what `npm publish` would ship for @neomorphic-react/ui.
 *
 * Usage (after `pnpm build`):
 *   pnpm check:pack
 *
 * Fails when the tarball holds anything outside the allowlist (Storybook
 * blocks, stories, tests, component sources) or when a `publishConfig.exports`
 * target is missing from it.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const UI_DIR = fileURLToPath(new URL("../packages/ui", import.meta.url));

const ALLOWED = [
  /^package\.json$/,
  /^(README|LICENSE|CHANGELOG)(\.md)?$/,
  /^dist\/[^/]+\.(js|d\.ts|css)$/,
  /^src\/[^/]+\.css$/,
];
const FORBIDDEN = /(^|\/)blocks\/|\.stories\.|\.test\.|(^|\/)test\//;
const LEADING_DOT_SLASH = /^\.\//;

const [report] = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: UI_DIR,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  })
);
const files = report.files.map((file) => file.path);
const shipped = new Set(files);

const problems = [];
for (const path of files) {
  if (FORBIDDEN.test(path) || !ALLOWED.some((rule) => rule.test(path))) {
    problems.push(`not allowed in the package: ${path}`);
  }
}

const manifest = JSON.parse(readFileSync(join(UI_DIR, "package.json"), "utf8"));
for (const [subpath, target] of Object.entries(
  manifest.publishConfig.exports
)) {
  const paths = typeof target === "string" ? [target] : Object.values(target);
  for (const path of paths) {
    if (!shipped.has(path.replace(LEADING_DOT_SLASH, ""))) {
      problems.push(`export "${subpath}" points at a missing file: ${path}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`check-pack: ${problems.length} problem(s)\n`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  console.error("\nRun `pnpm build` first if dist files are missing.");
  process.exit(1);
}

console.log(
  `check-pack: ${files.length} files, ${Object.keys(manifest.publishConfig.exports).length} exports, nothing extra.`
);
