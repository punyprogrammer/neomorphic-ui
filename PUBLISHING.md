# Publishing `@neomorphic-ui/react` to npm

A step-by-step plan for the first public release and the automated releases
after it. Work through the phases in order; each one ends in something you can
check before moving on.

**Legend:** `[x]` done · `[ ]` to do

## Where things stand

Checked on 15 Oct 2026:

| Item | State |
|---|---|
| Package name | `@neomorphic-ui/react` is not on npm yet, so it's free. The `@neomorphic-ui` scope still has to be created as an npm organisation |
| Version | `0.0.0`. The 19 pending changesets (all `minor` or `patch`) will bump it to **`0.1.0`** |
| Build | `tsup` writes ESM and type declarations to `dist/`, one entry per component; entries keep `"use client"` |
| Packed tarball | 220 KB (1.5 MB unpacked, 248 files). `pnpm pack` swaps the `exports` map to `dist/` through `publishConfig` and strips it, as intended |
| Release script | `pnpm release` builds the package and runs `changeset publish` |
| Changesets config | `access: "public"`, private workspaces never versioned |
| Dependencies | Runtime: Base UI, `cva`, `clsx`, `lucide-react`, `tailwind-merge`. Optional peers: `recharts`, `embla-carousel-react`, `react-resizable-panels`, `react-day-picker`, `shiki` (see Phase 1) |
| Missing | `LICENSE` file, package `README.md`, `repository`/`homepage`/`bugs`/`keywords` fields, a release workflow, an npm login on this machine |

---

## Phase 1: Decisions

Settle these first; several later steps depend on them.

- [ ] **Scope.** Create the `neomorphic-ui` organisation on npm (free for
  public packages). If the name is taken, pick another scope now: every import
  in the stories, blocks, docs and changesets uses `@neomorphic-ui/react`.
  (An unrelated, unscoped package called `neomorphic-ui` already exists; it
  doesn't block the scope, but the similar name may confuse people searching.)
- [ ] **First version.** `0.1.0` (what the changesets produce) is recommended.
  While on `0.x`, breaking changes are `minor` bumps, as `.changeset/README.md`
  already says.
- [x] **Heavy dependencies: optional peers.** `recharts`,
  `embla-carousel-react`, `react-resizable-panels` and `react-day-picker` are
  optional `peerDependencies` (like `shiki`), so installing the library no
  longer downloads them. An app installs only the ones its components need:

  | Component | Install |
  |---|---|
  | Calendar, Date Picker | `react-day-picker@^10` |
  | Carousel | `embla-carousel-react@^8` |
  | Chart | `recharts@^3` |
  | Resizable | `react-resizable-panels@^4` |
  | Code Block highlighting (`useHighlightedCode`) | `shiki@^4` |

  They stay in the package's `devDependencies` for its own build and tests, and
  in the Storybook app's `dependencies` (it renders every component). The build
  keeps them as external imports, so nothing is bundled.
- [ ] **Node engines.** `"engines": { "node": ">=22" }` makes npm warn anyone
  installing on Node 20. The library runs in the browser through a bundler, so
  drop the field or relax it to `>=20`.
- [ ] **Changelog.** The first `CHANGELOG.md` will list all 19 changesets.
  Either keep them (full history) or replace them with one `minor` changeset
  summarising the first release.

## Phase 2: Package hardening

All changes are in `packages/ui/`, unless noted.

- [ ] Add metadata to `package.json`:

  ```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/punyprogrammer/neomorphic-ui.git",
    "directory": "packages/ui"
  },
  "homepage": "https://github.com/punyprogrammer/neomorphic-ui#readme",
  "bugs": "https://github.com/punyprogrammer/neomorphic-ui/issues",
  "keywords": ["react", "components", "neumorphism", "neomorphic", "tailwindcss", "base-ui", "design-system"],
  "author": "Amardeep Ganguly"
  ```

  `repository` must match the GitHub repo exactly, or npm provenance (Phase 6)
  is rejected.
- [ ] Add a `LICENSE` file (MIT, matching `"license": "MIT"`) at the repo root,
  and copy it into `packages/ui/` (npm only packs files inside the package
  folder; `LICENSE` there is included automatically).
- [ ] Mark the stylesheets as side effects. With `"sideEffects": false`, a
  bundler such as webpack can drop `import "@neomorphic-ui/react/base.css"`
  when it's imported from JavaScript:

  ```json
  "sideEffects": ["**/*.css"]
  ```

- [ ] Ship only what consumers need. `files` currently packs all 72 `.tsx`
  sources (640 KB) because the CSS lives in `src/`. Narrow it to:

  ```json
  "files": ["dist", "src/*.css"]
  ```

- [x] Move the heavy dependencies to optional peers (Phase 1).
- [ ] Apply the Phase 1 choice for `engines`.
- [ ] Write `packages/ui/README.md` (it becomes the npm page). Include:
  - what the library is, with a screenshot
  - install: `pnpm add @neomorphic-ui/react`, with React 19 as a peer
  - the Tailwind v4 setup (below), which is the step people will miss
  - one usage example and a link to Storybook (Phase 7)
  - the optional peers table from Phase 1: which components need which extra
    package
  - the font: the theme expects Roboto (or your own `--font-sans`)

  Tailwind setup for the README. The components ship Tailwind class names, so
  the app's Tailwind build has to scan the package:

  ```css
  @import "tailwindcss";
  @import "@neomorphic-ui/react/base.css";
  @import "@neomorphic-ui/react/theme.css";

  @source "../node_modules/@neomorphic-ui/react/dist";
  ```

  The `@source` path is relative to that CSS file; adjust it to reach
  `node_modules`.
- [ ] Lint the package the way npm consumers will see it:

  ```sh
  cd packages/ui
  pnpm build
  pnpm dlx publint
  pnpm dlx @arethetypeswrong/cli --pack . --profile esm-only
  ```

  `publint` catches broken `exports`, files missing from the tarball and
  side-effect mistakes; `attw` checks every subpath resolves to types under
  `node16` and `bundler` resolution. Fix everything they report.
- [ ] Add both checks to the `build` job in `.github/workflows/ci.yml`, so
  later changes can't break the published shape.

## Phase 3: Smoke-test the tarball

Install the real tarball into fresh apps before anything goes to npm.

- [ ] Pack it:

  ```sh
  cd packages/ui && pnpm build && pnpm pack --pack-destination /tmp/neu
  ```

- [ ] **Vite + React 19 + Tailwind v4 app** (outside this repo):
  `pnpm add /tmp/neu/neomorphic-ui-react-0.0.0.tgz`, add the CSS from Phase 2,
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
  `embla-carousel-react`, `react-resizable-panels` or `react-day-picker`, and
  `pnpm install` prints no missing-peer warnings for them. Importing
  `@neomorphic-ui/react/chart` without `recharts` fails at build time with an
  unresolved-import error naming `recharts`; installing it fixes the build.
- [ ] Optional dry run of the full flow: publish a prerelease to a throwaway
  tag (`pnpm changeset pre enter next`, version, publish, `pnpm changeset pre
  exit`) and install `@neomorphic-ui/react@next`. Skip if the tarball tests
  pass.

## Phase 4: npm account

- [ ] Sign in to [npmjs.com](https://www.npmjs.com) and turn on two-factor
  authentication (required to publish).
- [ ] Create the organisation from Phase 1 (**Add organization**, free plan).
- [ ] Log in locally: `npm login`, then `npm whoami` to confirm.

## Phase 5: First release (manual)

The first publish is done from your machine: npm only lets you attach a
trusted publisher (Phase 6) to a package that already exists.

- [ ] On an up-to-date `main` with CI green:

  ```sh
  pnpm version-packages     # 0.0.0 → 0.1.0, writes CHANGELOG.md, removes the changesets
  pnpm install              # refresh the lockfile
  git add -A && git commit -m "Version packages"
  ```

  Commit this on its own, as `.changeset/README.md` asks; the `post-commit`
  hook writes its commit doc.
- [ ] Publish:

  ```sh
  pnpm release              # builds, then changeset publish (asks for your 2FA code)
  git push --follow-tags
  ```

  `changeset publish` creates the `@neomorphic-ui/react@0.1.0` git tag; pushing
  it lets you draft a GitHub release from it.
- [ ] Verify:
  - [npmjs.com/package/@neomorphic-ui/react](https://www.npmjs.com/package/@neomorphic-ui/react)
    shows `0.1.0`, the README and the files list
  - `npm view @neomorphic-ui/react` lists the peer dependencies
  - `pnpm add @neomorphic-ui/react` in the Phase 3 Vite app works from the
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
  a granular access token on npm (publish rights for `@neomorphic-ui/react`
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
  `@neomorphic-ui/react` to npm" under Later.
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
