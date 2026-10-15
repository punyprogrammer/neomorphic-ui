#!/usr/bin/env node
/**
 * Lints @neomorphic-react/ui the way npm consumers will see it.
 *
 * Usage (after `pnpm build`):
 *   pnpm lint:package
 *
 * Packs the package with pnpm (so `publishConfig.exports` replaces `exports`,
 * as on publish), then runs:
 *   publint  broken exports, files missing from the tarball, side effects
 *   attw     every subpath resolves to JavaScript and types under `node16`
 *            (ESM) and `bundler` resolution; the stylesheets have no types
 *            and are skipped
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const UI_DIR = join(ROOT, "packages/ui");
const BIN = join(ROOT, "node_modules/.bin");

const run = (command, args, cwd = UI_DIR) =>
  execFileSync(command, args, { cwd, stdio: "inherit" });

const packDir = mkdtempSync(join(tmpdir(), "neomorphic-pack-"));
try {
  run(join(BIN, "publint"), ["--pack", "pnpm", "--strict"]);

  execFileSync("pnpm", ["pack", "--pack-destination", packDir], {
    cwd: UI_DIR,
    stdio: "ignore",
  });
  const [tarball] = readdirSync(packDir);
  run(join(BIN, "attw"), [
    join(packDir, tarball),
    "--profile",
    "esm-only",
    "--exclude-entrypoints",
    "base.css",
    "theme.css",
    "--format",
    "table",
  ]);
} catch {
  process.exitCode = 1;
} finally {
  rmSync(packDir, { force: true, recursive: true });
}
