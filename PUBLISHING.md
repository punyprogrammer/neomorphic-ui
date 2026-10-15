# Publishing `@neomorphic-react/ui` to npm

A step-by-step plan for the first public release and the automated releases
after it. Work through the phases in order; each one ends in something you can
check before moving on.

**Legend:** `[x]` done · `[ ]` to do

## Where things stand

Checked on 15 Oct 2026:


| Item              | State                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package name      | `@neomorphic-react/ui`. The `neomorphic-react` npm organisation exists (created 15 Oct 2026, no packages yet), so the name is reserved for you                                                                      |
| Version           | `0.0.0`. The single pending changeset (`.changeset/neu-initial-release.md`, `minor`) bumps it to `0.1.0`                                                                                                            |
| Build             | `tsup` writes ESM and type declarations to `dist/`, one entry per component; entries keep `"use client"`                                                                                                            |
| Packed tarball    | 119 KB (181 files): `dist/`, the two stylesheets, `package.json`, `README.md` and `LICENSE`. `pnpm pack` swaps the `exports` map to `dist/` through `publishConfig` and strips it, as intended                      |
| Release script    | `pnpm release` builds the package, runs `check:pack` and `lint:package`, then `changeset publish`                                                                                                                   |
| Changesets config | `access: "public"`, private workspaces never versioned                                                                                                                                                              |
| Dependencies      | Runtime: Base UI, `cva`, `clsx`, `lucide-react`, `tailwind-merge`. Optional peers: `recharts`, `embla-carousel-react`, `react-resizable-panels`, `react-day-picker`, `@tanstack/react-table`, `shiki` (see Phase 1) |
| Missing           | A release workflow, an npm login on this machine                                                                                                                                                                    |


---



## Phase 1: Decisions

Settle these first; several later steps depend on them.

- [x] **Scope and name.** The npm organisation is `neomorphic-react` and the
  package is `@neomorphic-react/ui` (`import { Button } from "@neomorphic-react/ui/button"`). The private workspaces use the same scope
  (`@neomorphic-react/storybook`, `@neomorphic-react/typescript-config`).
  The scope leaves room for later packages such as `@neomorphic-react/icons`.
- [x] **First version:** `0.1.0`**.** While on `0.x`, breaking changes are `minor`
  bumps, as `.changeset/README.md` already says.
- [x] **Heavy dependencies: optional peers.** `recharts`,
  `embla-carousel-react`, `react-resizable-panels`, `react-day-picker` and
  `@tanstack/react-table` are optional `peerDependencies` (like `shiki`), so installing the library no
  longer downloads them. An app installs only the ones its components need:

  | Component                                      | Install                     |
  | ---------------------------------------------- | --------------------------- |
  | Calendar, Date Picker                          | `react-day-picker@^10`      |
  | Carousel                                       | `embla-carousel-react@^8`   |
  | Chart                                          | `recharts@^3`               |
  | Data Table                                     | `@tanstack/react-table@^8`  |
  | Resizable                                      | `react-resizable-panels@^4` |
  | Code Block highlighting (`useHighlightedCode`) | `shiki@^4`                  |

  They stay in the package's `devDependencies` for its own build and tests, and
  in the Storybook app's `dependencies` (it renders every component). The build
  keeps them as external imports, so nothing is bundled.
- [x] **Node engines: kept at** `>=22`**.** `"engines": { "node": ">=22" }` stays
  as it is. Installs on Node 20 or older print an "unsupported engine" warning
  (and fail only where `engine-strict` is on), so say in the README that
  Node 22 or later is required.
- [x] **Changelog: one summary entry.** The 21 per-component changesets were
  replaced by `.changeset/neu-initial-release.md`, one `minor` changeset that
  summarises the first release: the component list by group, the CSS setup
  and the optional peers. The first `CHANGELOG.md` holds just that entry; the
  details live in Storybook. Changesets from here on are one per change again.



## Phase 2: Package hardening

All changes are in `packages/ui/`, unless noted.

- [x] Add metadata to `package.json`:
  ```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/punyprogrammer/neomorphic-ui.git",
    "directory": "packages/ui"
  },
  "homepage": "https://github.com/punyprogrammer/neomorphic-ui/tree/main/packages/ui#readme",
  "bugs": { "url": "https://github.com/punyprogrammer/neomorphic-ui/issues" },
  "keywords": ["react", "react-19", "components", "component-library", "design-system", "neumorphism", "neomorphic", "tailwindcss", "tailwindcss-v4", "base-ui"],
  "author": "Amardeep Ganguly"
  ```
  `repository` must match the GitHub repo exactly, or npm provenance (Phase 6)
  is rejected.
- [x] Add a `LICENSE` file (MIT, matching `"license": "MIT"`) at the repo root,
  and copy it into `packages/ui/` (npm only packs files inside the package
  folder; `LICENSE` there is included automatically). Keep the two copies
  identical.
- [x] Mark the stylesheets as side effects. With `"sideEffects": false`, a
  bundler such as webpack can drop `import "@neomorphic-react/ui/base.css"`
  when it's imported from JavaScript:
  ```json
  "sideEffects": ["**/*.css"]
  ```

- [x] Ship only what consumers need. `files` is narrowed to:
  ```json
  "files": ["dist", "src/*.css"]
  ```
  The Storybook blocks (Music Player, Payment Methods, Newsletter Signup and
  the rest) live in `apps/storybook/blocks/`, outside the package, and never
  ship. `pnpm check:pack` (`scripts/check-pack.mjs`) dry-runs `npm pack` and
  fails on any file outside `dist/*.{js,d.ts,css}`, `src/*.css`,
  `package.json`, `README`, `LICENSE` and `CHANGELOG`, on any `blocks/`,
  story or test path, and on a `publishConfig.exports` target missing from
  the tarball. It runs in the CI `build` job and in `pnpm release`.

- [x] Move the heavy dependencies to optional peers (Phase 1).
- [x] Keep `engines` at `node >=22` (Phase 1; no change needed).
- [x] Write `packages/ui/README.md` (it becomes the npm page). Include:
  - what the library is, with a screenshot (`.github/assets/preview.png`,
  linked by its `raw.githubusercontent.com` URL because npm doesn't show
  relative images; it appears once the file is on `main`)
  - install: `pnpm add @neomorphic-react/ui`, with React 19 as a peer and
  Node 22 or later
  - the Tailwind v4 setup (below), which is the step people will miss
  - one usage example and a link to Storybook (for now, how to run it
  locally; switch to the deployed URL in Phase 7)
  - the optional peers table from Phase 1: which components need which extra
  package
  - the font: the theme expects Roboto (or your own `--font-sans`)
  Tailwind setup for the README. The components ship Tailwind class names, so
  the app's Tailwind build has to scan the package:
  ```css
  @import "tailwindcss";
  @import "@neomorphic-react/ui/base.css";
  @import "@neomorphic-react/ui/theme.css";

  @source "../node_modules/@neomorphic-react/ui/dist";
  ```
  The `@source` path is relative to that CSS file; adjust it to reach
  `node_modules`.
- [x] Lint the package the way npm consumers will see it:
  ```sh
  pnpm build
  pnpm lint:package
  ```
  `scripts/lint-package.mjs` packs with pnpm (so `publishConfig.exports`
  applies, as on publish), then runs `publint --strict` (broken `exports`,
  files missing from the tarball, side-effect mistakes) and `attw --profile esm-only` (every subpath resolves to JavaScript and types under `node16`
  and `bundler` resolution). Both are pinned root devDependencies. First run:
  publint "All good!", attw clean; the CommonJS `require` cases it lists are
  ignored by the ESM-only profile, and the two stylesheets are skipped
  because they have no types.
- [x] Add both checks to the `build` job in `.github/workflows/ci.yml`, so
  later changes can't break the published shape. `pnpm release` runs them
  too.



## Phase 3: Smoke-test the tarball

Install the real tarball into fresh apps before anything goes to npm.

- [ ] Pack it:
  ```sh
  cd packages/ui && pnpm build && pnpm pack --pack-destination /tmp/neu
  ```

- [ ] **Vite + React 19 + Tailwind v4 app** (outside this repo):
  `pnpm add /tmp/neu/neomorphic-react-ui-0.0.0.tgz`, add the CSS from Phase 2,
  then render a Button, a Dialog, a Select and a Toast. Check:
  - the raised and inset shadows appear (if they don't, the `@source` line is
  wrong)
  - popups open above the page, and focus moves into a Dialog and back
  - TypeScript autocompletes props from the subpath imports
  - `pnpm build` succeeds, and the bundle only includes the components you
  imported (no `recharts` unless you used Chart)
- [ ] **Next.js App Router app**: import components from a Server Component
  page. They must work without the page adding `"use client"` (the entries
  already declare it).
- [ ] Without `shiki` installed, `CodeBlock` must still render plain code; with
  it installed, `useHighlightedCode` must highlight.
- [ ] Optional peers: a fresh install pulls in none of `recharts`,
  `embla-carousel-react`, `react-resizable-panels`, `react-day-picker` or
  `@tanstack/react-table`, and
  `pnpm install` prints no missing-peer warnings for them. Importing
  `@neomorphic-react/ui/chart` without `recharts` fails at build time with an
  unresolved-import error naming `recharts`; installing it fixes the build.
- [ ] Optional dry run of the full flow: publish a prerelease to a throwaway
  tag (`pnpm changeset pre enter next`, version, publish, `pnpm changeset pre exit`) and install `@neomorphic-react/ui@next`. Skip if the tarball tests
  pass.



## Phase 4: npm account

- [x] Sign in to [npmjs.com](https://www.npmjs.com) and turn on two-factor
  authentication (required to publish).
- [x] Create the organisation from Phase 1: `neomorphic-react`, free plan.
- [x] Log in locally: `npm login`, then `npm whoami` to confirm.



## Phase 5: First release (manual)

The first publish is done from your machine: npm only lets you attach a
trusted publisher (Phase 6) to a package that already exists.

- [x] On an up-to-date `main` with CI green:
  ```sh
  pnpm version-packages     # 0.0.0 → 0.1.0, writes CHANGELOG.md, removes the changesets
  pnpm install              # refresh the lockfile
  git add -A && git commit -m "Version packages"
  ```
  Commit this on its own, as `.changeset/README.md` asks; the `post-commit`
  hook writes its commit doc.
- [x] Publish:
  ```sh
  pnpm release              # builds, then changeset publish (asks for your 2FA code)
  git push --follow-tags
  ```
  `changeset publish` creates the `@neomorphic-react/ui@0.1.0` git tag; pushing
  it lets you draft a GitHub release from it.
- [ ] Verify:
  - [x] [npmjs.com/package/@neomorphic-react/ui](https://www.npmjs.com/package/@neomorphic-react/ui)
  shows `0.1.0`, the README and the files list. A brand-new package takes a
  few minutes to process: until then the registry answers 404 (even to the
  owner) and the website shows an empty page. `0.1.0` was published at
  14:35 on 15 Oct 2026 and served from 14:40.
  - [x] `npm view @neomorphic-react/ui` lists the peer dependencies
  - [ ] `pnpm add @neomorphic-react/ui` in the Phase 3 Vite app works from the
  registry

If something is wrong, publish a fixed `0.1.1`. `npm unpublish` is only
allowed within 72 hours, and the version number can never be reused.

## Phase 6: Automated releases

From here on, merging to `main` handles versioning and publishing.

- [ ] On npmjs.com, open the package's **Settings → Trusted publishing**. Add
  GitHub Actions with owner `punyprogrammer`, repository `neomorphic-ui` and
  workflow `release.yml`. Publishing then needs no npm token, and each version
  gets a provenance badge linking it to the commit and workflow that built it.
- [ ] Add `.github/workflows/release.yml`:
  ```yaml
  name: Release

  on:
    push:
      branches:
        - main

  concurrency: ${{ github.workflow }}-${{ github.ref }}

  env:
    HUSKY: "0"

  permissions:
    contents: write        # push the version commit and tags
    pull-requests: write   # open the "Version packages" PR
    id-token: write        # npm trusted publishing and provenance

  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4

        - uses: pnpm/action-setup@v4

        - uses: actions/setup-node@v4
          with:
            node-version: 22
            cache: "pnpm"
            registry-url: "https://registry.npmjs.org"

        # Trusted publishing needs npm 11.5.1 or later.
        - run: npm install -g npm@latest

        - run: pnpm install --frozen-lockfile

        - uses: changesets/action@v1
          with:
            version: pnpm version-packages
            publish: pnpm release
            commit: "Version packages"
            title: "Version packages"
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```
  If your version of `changesets/action` still insists on an `NPM_TOKEN`, create
  a granular access token on npm (publish rights for `@neomorphic-react/ui`
  only, with an expiry date), store it as the `NPM_TOKEN` repository secret,
  and pass it in `env`.
- [ ] In GitHub **Settings → Actions → General**, allow GitHub Actions to
  create pull requests.
- [ ] How it works from then on:
  1. Each feature PR includes a changeset (`pnpm changeset`).
  2. When it merges, the workflow opens or updates a **Version packages** PR
    that bumps the version and the changelog.
  3. Merging that PR publishes the new version and creates the tag and GitHub
    release.
- [ ] Commit docs: the hooks don't run on the runner (`HUSKY: "0"`), so the
  version commit has no `commits/NNNN-*.md`. Backfill it with
  `pnpm docs:commit --rev <sha>`, or accept the gap for release commits.
- [ ] Add a CI check that fails a PR touching `packages/ui/src` without a
  changeset: `pnpm changeset status --since=origin/main`.



## Phase 7: After the first release

- [ ] Deploy Storybook (GitHub Pages from the `build` job, or Chromatic) and
  link it from the README and the repo description.
- [ ] Add npm version and licence badges to the README.
- [ ] Update the ROADMAP: tick "Release workflow" in Phase 0 and "Publish
  `@neomorphic-react/ui` to npm" under Later.
- [ ] Announce: GitHub release notes for `0.1.0` summarising Phases 1–4.
- [ ] Next on the ROADMAP: the docs site and the shadcn-compatible registry,
  both easier once the package is installable.

---



## Release checklist (every release)

- [ ] CI green on `main`
- [ ] Every user-facing change has a changeset
- [ ] Version PR reviewed: version bump and changelog read correctly
- [ ] After publishing: npm shows the new version with provenance; a fresh
  install renders correctly

