---
number: 1
subject: "initial-code-setup"
date: 2026-10-14T17:27:26+05:30
author: "punyprogrammer"
files: 34
insertions: 7076
deletions: 0
---

<!-- nav --> ← first commit · [Index](README.md) · [0002 →](0002-add-commit-doc.md)

# 0001 · initial-code-setup

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 1 |
| Commit | `353b3d8` |
| Parent | none (root commit) |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T17:27:26+05:30 |
| Changes | 34 files · +7076 −0 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `surface.tsx` | `SurfaceProps`, `Surface`, `surfaceVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/surface.test.tsx` | 12 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `foundations.stories.tsx` | Colors, Shadows, Radius |
| Added | `surface.stories.tsx` | Default, BasicStates, Elevations, Depths, PressTransition, AsSection |

## Design tokens and CSS

### `apps/storybook/.storybook/preview.css`

- **Added:** `--font-sans`

### `packages/ui/src/base.css`

- **Added:** `--ease-out`, `--ease-in-out`, `--duration-fast`, `--duration-base`, `--duration-slow`, `--z-sticky`, `--z-drawer`, `--z-modal`, `--z-dropdown`, `--z-popover`, `--z-tooltip`, `--z-toast`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-3xl`, `--radius-4xl`, `--shadow-neu-flat`, `--shadow-neu-sm`, `--shadow-neu`, `--shadow-neu-lg`, `--inset-shadow-neu-flat`, `--inset-shadow-neu-sm`, `--inset-shadow-neu`, `--inset-shadow-neu-lg`
- **Added utilities:** `bg-neu-convex`

### `packages/ui/src/theme.css`

- **Added:** `--color-background`, `--color-foreground`, `--color-card`, `--color-card-foreground`, `--color-popover`, `--color-popover-foreground`, `--color-primary`, `--color-primary-foreground`, `--color-secondary`, `--color-secondary-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-accent`, `--color-accent-foreground`, `--color-destructive`, `--color-destructive-foreground`, `--color-success`, `--color-success-foreground`, `--color-warning`, `--color-warning-foreground`, `--color-border`, `--color-input`, `--color-ring`, `--color-neu-light`, `--color-neu-dark`, `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--success`, `--success-foreground`, `--warning`, `--warning-foreground`, `--border`, `--input`, `--ring`, `--radius`, `--neu-light`, `--neu-dark`, `--neu-depth`, `--neu-convex-from`, `--neu-convex-to`

## Dependencies and scripts

### `apps/storybook/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@neomorphic-ui/react` | `workspace:*` | dependencies |
| Added | `class-variance-authority` | `^0.7.1` | dependencies |
| Added | `clsx` | `^2.1.1` | dependencies |
| Added | `lucide-react` | `^1.55.0` | dependencies |
| Added | `react` | `^19.3.0` | dependencies |
| Added | `react-dom` | `^19.3.0` | dependencies |
| Added | `tailwind-merge` | `^3.7.0` | dependencies |
| Added | `tailwindcss` | `^4.3.3` | dependencies |
| Added | `@fontsource/roboto` | `^5.3.0` | devDependencies |
| Added | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@storybook/addon-docs` | `^10.6.1` | devDependencies |
| Added | `@storybook/addon-vitest` | `^10.6.1` | devDependencies |
| Added | `@storybook/react` | `^10.6.1` | devDependencies |
| Added | `@storybook/react-vite` | `^10.6.1` | devDependencies |
| Added | `@tailwindcss/vite` | `4.3.3` | devDependencies |
| Added | `@types/react` | `^19.3.0` | devDependencies |
| Added | `@types/react-dom` | `^19.3.0` | devDependencies |
| Added | `@vitejs/plugin-react` | `^6.1.2` | devDependencies |
| Added | `@vitest/browser-playwright` | `^5.0.3` | devDependencies |
| Added | `playwright` | `^1.64.0` | devDependencies |
| Added | `storybook` | `^10.6.1` | devDependencies |
| Added | `typescript` | `^7.0.2` | devDependencies |
| Added | `vite` | `^8.3.4` | devDependencies |
| Added | `vitest` | `^5.0.3` | devDependencies |
| Added | `dev` | `storybook dev -p 6007` | scripts |
| Added | `build` | `storybook build` | scripts |
| Added | `clean` | `rm -rf .turbo && rm -rf node_modules` | scripts |
| Added | `test` | `vitest run` | scripts |

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@biomejs/biome` | `2.5.15` | devDependencies |
| Added | `turbo` | `^2.11.7` | devDependencies |
| Added | `ultracite` | `7.12.4` | devDependencies |
| Added | `build` | `turbo run build` | scripts |
| Added | `dev` | `turbo run dev` | scripts |
| Added | `clean` | `turbo run clean && rm -rf node_modules` | scripts |
| Added | `test` | `turbo run test` | scripts |
| Added | `check` | `ultracite check` | scripts |
| Added | `fix` | `ultracite fix` | scripts |

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@base-ui/react` | `1.9.0` | dependencies |
| Added | `class-variance-authority` | `^0.7.1` | dependencies |
| Added | `clsx` | `^2.1.1` | dependencies |
| Added | `lucide-react` | `^1.55.0` | dependencies |
| Added | `tailwind-merge` | `^3.7.0` | dependencies |
| Added | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@testing-library/jest-dom` | `^7.0.1` | devDependencies |
| Added | `@testing-library/react` | `^16.3.3` | devDependencies |
| Added | `@testing-library/user-event` | `^14.6.7` | devDependencies |
| Added | `@types/react` | `^19.3.0` | devDependencies |
| Added | `@types/react-dom` | `^19.3.0` | devDependencies |
| Added | `@vitejs/plugin-react` | `^6.1.2` | devDependencies |
| Added | `jsdom` | `^30.1.2` | devDependencies |
| Added | `react` | `^19.3.0` | devDependencies |
| Added | `react-dom` | `^19.3.0` | devDependencies |
| Added | `tsup` | `^8.5.1` | devDependencies |
| Added | `typescript` | `npm:@typescript/typescript6@^6.0.2` | devDependencies |
| Added | `vitest` | `^5.0.3` | devDependencies |
| Added | `react` | `^19.2.0` | peerDependencies |
| Added | `react-dom` | `^19.2.0` | peerDependencies |
| Added | `build` | `tsup` | scripts |
| Added | `dev` | `tsup --watch` | scripts |
| Added | `clean` | `rm -rf .turbo node_modules dist` | scripts |
| Added | `test` | `vitest run` | scripts |
| Added | `test:watch` | `vitest` | scripts |

## Roadmap

Checklist as first written in `ROADMAP.md`.

- [x] pnpm + Turborepo workspace (`apps/*`, `packages/*`)
- [x] Biome via `ultracite`, shared `@neomorphic-ui/typescript-config`
- [x] `@neomorphic-ui/react` package: tsup build, subpath exports, Vitest + jsdom
- [x] Storybook 10 app on port 6007, theme background on canvas and docs
- [x] `AGENTS.md` with neomorphic rules
- [x] Colours taken from the kit's layers: surface `#EDEEF2`, text `#575F6B`, dark "on" fill
- [x] Contrast verified against the surface: foreground 5.55:1, muted 4.77:1, primary 7.93:1
- [x] Radius scale from `--radius` (10px, matching the kit's 20px at 2x)
- [x] Raised shadow scale `shadow-neu-sm | shadow-neu | shadow-neu-lg` from `--neu-light`, `--neu-dark`, `--neu-depth`, using the kit's ratios
- [x] Inset shadow scale `inset-shadow-neu-sm | inset-shadow-neu | inset-shadow-neu-lg`
- [x] Two-layer `-flat` values so raised ↔ pressed transitions ease instead of snapping
- [x] `bg-neu-convex` utility for the kit's top-left-lit raised fill
- [x] Motion and z-index tokens, hover gating, reduced-motion rule
- [x] `tailwind-merge` resolves `shadow-neu-*`, `inset-shadow-neu-*` and `bg-neu-convex` overrides correctly
- [x] `Surface` with `elevation` (raised, inset, flat), `depth` (sm, md, lg), `shape` (square, rounded, pill, circle), `render` prop
- [x] 18 unit tests
- [x] Stories: Default, Basic States (kit replica), Elevations, Depths, Press Transition, As Section
- [x] Foundations stories: Colors, Shadows, Radius
- [x] Visual check against the kit's Basic States at 1x
- [x] Inventory the fork's pages and extract exact shadows, fills, radii and fonts
- [ ] Git repository and first commit
- [ ] Changesets for versioning
- [ ] Husky + lint-staged pre-commit hooks
- [ ] CI: install, `check`, `test`, `build`
- [ ] `add:component` scaffolding script
- [ ] Accent tokens for the kit's widget colours: purple (calendar), orange (music), magenta (progress), yellow → blue (weather)
- [ ] `--font-heading` falling back to `--font-sans` (kit uses Sofia Pro for headings, Roboto for controls)
- [ ] Document font handling in `theme.css` and `AGENTS.md`
- [ ] Dark neomorphic theme (out of scope for v1)
- [ ] Run Storybook interaction tests (`play` functions) in CI
- [ ] ⛔ `Foundations` page: colour, radius and depth variables with code syntax, raised/inset effect styles, specimens (blocked: Figma Starter plan MCP call limit)
- [ ] ⛔ `Surface` component set: Elevation × Shape variants
- [ ] Decide on overlays not in the kit: Popover, DropdownMenu, Modal, Drawer, Toast, Alert
- [ ] Docs site (Fumadocs) with demos and LLMs.txt
- [ ] shadcn-compatible registry
- [ ] Publish `@neomorphic-ui/react` to npm
- [ ] Figma Code Connect mappings (requires Figma Organization or Enterprise plan)
- [ ] Dark theme
- [ ] Button: text, icon, leading/trailing icon, pill
- [ ] Badge: count overlay on icon button
- [ ] ButtonGroup: prev/next stepper
- [ ] Toggle: round icon toggles, tile toggle
- [ ] ToggleGroup: segmented control
- [ ] Checkbox
- [ ] RadioGroup
- [ ] Switch
- [ ] Input
- [ ] InputGroup: addon icon, attached button
- [ ] Textarea
- [ ] Select
- [ ] Slider: grip thumb, gradient fill
- [ ] Progress: inset track, gradient fill, label
- [ ] PageIndicator (new)
- [ ] Spinner
- [ ] Card
- [ ] Item: list rows
- [ ] Separator: solid, perforated
- [ ] Calendar: inset day rings, month nav
- [ ] Dial (new): circular value control with gradient arc
- [ ] BarMeter (new): vertical inset bars
- [ ] Avatar
- [ ] Tooltip
- [ ] Newsletter signup
- [ ] Weather widget
- [ ] Biometric / settings tiles
- [ ] Music player
- [ ] Travel info cards
- [ ] Boarding ticket
- [ ] Payment methods
- [ ] Chat thread + composer

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/.storybook/main.ts` | 44 | 0 |
| Added | `apps/storybook/.storybook/preview.css` | 24 | 0 |
| Added | `apps/storybook/.storybook/preview.tsx` | 20 | 0 |
| Added | `apps/storybook/.storybook/vitest.setup.ts` | 4 | 0 |
| Added | `apps/storybook/package.json` | 40 | 0 |
| Added | `apps/storybook/stories/foundations.stories.tsx` | 95 | 0 |
| Added | `apps/storybook/stories/surface.stories.tsx` | 165 | 0 |
| Added | `apps/storybook/tsconfig.json` | 12 | 0 |
| Added | `apps/storybook/vite.config.ts` | 18 | 0 |
| Added | `apps/storybook/vitest.config.ts` | 39 | 0 |

### packages/typescript-config · `@neomorphic-ui/typescript-config`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `packages/typescript-config/base.json` | 21 | 0 |
| Added | `packages/typescript-config/package.json` | 6 | 0 |
| Added | `packages/typescript-config/react-app.json` | 16 | 0 |
| Added | `packages/typescript-config/react-library.json` | 15 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `packages/ui/package.json` | 72 | 0 |
| Added | `packages/ui/postcss.config.mjs` | 7 | 0 |
| Added | `packages/ui/src/base.css` | 129 | 0 |
| Added | `packages/ui/src/surface.test.tsx` | 111 | 0 |
| Added | `packages/ui/src/surface.tsx` | 103 | 0 |
| Added | `packages/ui/src/test/setup.ts` | 86 | 0 |
| Added | `packages/ui/src/theme.css` | 92 | 0 |
| Added | `packages/ui/src/utils.ts` | 6 | 0 |
| Added | `packages/ui/tsconfig.json` | 8 | 0 |
| Added | `packages/ui/tsup.config.ts` | 13 | 0 |
| Added | `packages/ui/vitest.config.ts` | 11 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.gitignore` | 11 | 0 |
| Added | `.npmrc` | 2 | 0 |
| Added | `AGENTS.md` | 61 | 0 |
| Added | `ROADMAP.md` | 148 | 0 |
| Added | `biome.jsonc` | 89 | 0 |
| Added | `package.json` | 18 | 0 |
| Added | `pnpm-lock.yaml` | 5559 | 0 |
| Added | `pnpm-workspace.yaml` | 6 | 0 |
| Added | `turbo.json` | 25 | 0 |
