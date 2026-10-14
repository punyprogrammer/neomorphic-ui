# Neomorphic UI Roadmap

React component library built on the same architecture as Keystone UI
(`../react`), styled from the Light Neomorphic UI Kit fork in Figma
(`VPwMxUooz8MVDV283LV5Rp`). See `AGENTS.md` for conventions.

**Legend:** `[x]` done · `[ ]` to do · ⛔ blocked

Every commit is documented in [`commits/`](commits/README.md), numbered in
order, so progress can be traced commit by commit.

## Design reference

The kit is drawn at 2x as flat layers (no Figma components). Halve every
measurement for web.

| Board | Node | Contents |
|---|---|---|
| Basic Components | `1:2` | Raised/inset states, buttons, badges, checkbox, radio, dots, stepper, select, textarea, search, switch, loader |
| Components 1 | `3:71` | Subscribe field, social toggles, calendar, weather bars, Touch ID and airplane tiles, progress |
| Components 2 | `3:731` | Music transport, sliders, volume dial, OFF/ON switch, travel cards, boarding ticket, credit cards, chat |

---

## Phase 0: Foundation

### Monorepo

- [x] pnpm + Turborepo workspace (`apps/*`, `packages/*`)
- [x] Biome via `ultracite`, shared `@neomorphic-ui/typescript-config`
- [x] `@neomorphic-ui/react` package: tsup build, subpath exports, Vitest + jsdom
- [x] Storybook 10 app on port 6007, theme background on canvas and docs
- [x] `AGENTS.md` with neomorphic rules
- [x] Git repository and first commit (`0001` initial-code-setup, pushed to `origin/main`)
- [x] Husky hooks (`prepare` script installs them on `pnpm install`)
- [x] Per-commit docs: `post-commit` hook writes `commits/NNNN-<subject>.md` and folds it into the same commit (`pnpm docs:commit --rev <sha>` to backfill)
- [x] Changesets for versioning: `pnpm changeset`, `pnpm version-packages`; private workspaces are never versioned; commit docs list changesets added/consumed and version bumps
- [x] lint-staged pre-commit hook (`ultracite fix` on staged JS/TS/JSON/CSS)
- [x] CI (`.github/workflows/ci.yml`): Biome check, then unit tests, Storybook interaction tests and full build in parallel
- [x] `pnpm add:component <Name>`: component (`useRender` + cva, both shadow slots), unit tests, story with a `play` check, `exports` + `tsup` entry
- [ ] Release workflow: Changesets version PR + npm publish (with "Publish to npm" below)

### Tokens (`theme.css`, `base.css`)

- [x] Colours taken from the kit's layers: surface `#EDEEF2`, text `#575F6B`, dark "on" fill
- [x] Contrast verified against the surface: foreground 5.55:1, muted 4.77:1, primary 7.93:1
- [x] Radius scale from `--radius` (10px, matching the kit's 20px at 2x)
- [x] Raised shadow scale `shadow-neu-sm | shadow-neu | shadow-neu-lg` from `--neu-light`, `--neu-dark`, `--neu-depth`, using the kit's ratios
- [x] Inset shadow scale `inset-shadow-neu-sm | inset-shadow-neu | inset-shadow-neu-lg`
- [x] Two-layer `-flat` values so raised ↔ pressed transitions ease instead of snapping
- [x] `bg-neu-convex` utility for the kit's top-left-lit raised fill
- [x] Motion and z-index tokens, hover gating, reduced-motion rule
- [x] `--destructive` darkened to 5.26:1 (4.91:1 on the raised fill) so red text on a raised button passes AA
- [x] `tailwind-merge` resolves `shadow-neu-*`, `inset-shadow-neu-*` and `bg-neu-convex` overrides correctly
- [ ] Accent tokens for the kit's widget colours: purple (calendar), orange (music), magenta (progress), yellow → blue (weather)
- [ ] `--font-heading` falling back to `--font-sans` (kit uses Sofia Pro for headings, Roboto for controls)
- [ ] Document font handling in `theme.css` and `AGENTS.md`
- [ ] Dark neomorphic theme (out of scope for v1)

### Surface

- [x] `Surface` with `elevation` (raised, inset, flat), `depth` (sm, md, lg), `shape` (square, rounded, pill, circle), `render` prop
- [x] 18 unit tests
- [x] Stories: Default, Basic States (kit replica), Elevations, Depths, Press Transition, As Section
- [x] Foundations stories: Colors, Shadows, Radius
- [x] Visual check against the kit's Basic States at 1x
- [x] Run Storybook interaction tests (`play` functions) in CI

### Figma foundations

- [x] Inventory the fork's pages and extract exact shadows, fills, radii and fonts
- [ ] ⛔ `Foundations` page: colour, radius and depth variables with code syntax, raised/inset effect styles, specimens (blocked: Figma Starter plan MCP call limit)
- [ ] ⛔ `Surface` component set: Elevation × Shape variants

---

## Phase 1: Controls

Each component: source + tests in `packages/ui/src`, story in
`apps/storybook/stories`, exports in `package.json` and `tsup.config.ts`,
then a component set on the Figma `Components` page.

| Done | Component | Kit reference | Based on Keystone | Figma |
|---|---|---|---|---|
| [x] | Button: `icon` (any element) + `iconPosition` (start, end, top, bottom), icon tiles, pill/circle, default/primary/destructive/ghost, sm/md/lg, loading, `aria-pressed`; 28 tests, 10 stories incl. kit replica | Sign in, Share, icon buttons (`1:2`) | `button.tsx` | ⛔ |
| [x] | Badge: `count`/`max`/`showZero`, `dot`, raised/inset + token fills, sm/md/lg; `BadgeAnchor` + `placement` (4 logical corners) and `overlap="circular"`; 23 tests, 8 stories incl. kit replica | Bell "3", cart "17" (`1:2`) | `badge.tsx` | ⛔ |
| [ ] | Chip (new): icon + label status pill ("Paid", "Due soon"), `icon` + `iconPosition` like Button, raised/inset + token fills; later removable and selectable chips | None in kit (split from Badge) | `tag.tsx`, `tag-group.tsx` | [ ] |
| [ ] | ButtonGroup: prev/next stepper | ‹ › pair (`1:2`) | `button-group.tsx` | [ ] |
| [ ] | Toggle: round icon toggles, tile toggle | Heart/like/star/bookmark (`3:71`), airplane tile (`3:71`) | `toggle.tsx` | [ ] |
| [ ] | ToggleGroup: segmented control | OFF/ON, music transport (`3:731`) | `toggle-group.tsx` | [ ] |
| [ ] | Checkbox | Check / empty box (`1:2`) | `checkbox.tsx` | [ ] |
| [ ] | RadioGroup | Filled / empty circle (`1:2`) | `radio-group.tsx` | [ ] |
| [ ] | Switch | Off / on toggle (`1:2`) | `switch.tsx` | [ ] |
| [ ] | Input | Search pill (`1:2`) | `input.tsx` | [ ] |
| [ ] | InputGroup: addon icon, attached button | Search, Subscribe (`3:71`), chat composer (`3:731`) | `input-group.tsx` | [ ] |
| [ ] | Textarea | "Your message here…" (`1:2`) | `textarea.tsx` | [ ] |
| [ ] | Select | Select category (`1:2`) | `select.tsx` | [ ] |
| [ ] | Slider: grip thumb, gradient fill | Music sliders (`3:731`) | `slider.tsx` | [ ] |
| [ ] | Progress: inset track, gradient fill, label | Progress 40% (`3:71`) | `progress.tsx` | [ ] |
| [ ] | PageIndicator (new) | Three dots (`1:2`) | carousel dots | [ ] |
| [ ] | Spinner | Loader (`1:2`) | `spinner.tsx` | [ ] |

**Phase 1 progress: 2 / 17**

---

## Phase 2: Composites

| Done | Component | Kit reference | Based on Keystone | Figma |
|---|---|---|---|---|
| [ ] | Card | Info card, big info card, info box (`3:731`) | `card.tsx` | [ ] |
| [ ] | Item: list rows | Credit cards list (`3:731`) | `item.tsx` | [ ] |
| [ ] | Separator: solid, perforated | Boarding ticket tear line (`3:731`) | `separator.tsx` | [ ] |
| [ ] | Calendar: inset day rings, month nav | March 2020 (`3:71`) | `calendar.tsx` | [ ] |
| [ ] | Dial (new): circular value control with gradient arc | Volume knob 0–100 (`3:731`) | `circular-progress.tsx` | [ ] |
| [ ] | BarMeter (new): vertical inset bars | Weather week (`3:71`) | `progress.tsx` | [ ] |
| [ ] | Avatar | Info box thumbnail (`3:731`) | `avatar.tsx` | [ ] |
| [ ] | Tooltip | — | `tooltip.tsx` | [ ] |

**Phase 2 progress: 0 / 8**

---

## Phase 3: Blocks

Full compositions from the kit, built only from Phase 1–2 components.

| Done | Block | Kit reference | Figma |
|---|---|---|---|
| [ ] | Newsletter signup | Social: Subscribe (`3:71`) | [ ] |
| [ ] | Weather widget | Weather (`3:71`) | [ ] |
| [ ] | Biometric / settings tiles | Combined: Touch ID, airplane mode (`3:71`) | [ ] |
| [ ] | Music player | Music App (`3:731`) | [ ] |
| [ ] | Travel info cards | Info card, big info card, info box (`3:731`) | [ ] |
| [ ] | Boarding ticket | Boarding ticket (`3:731`) | [ ] |
| [ ] | Payment methods | Credit cards (`3:731`) | [ ] |
| [ ] | Chat thread + composer | Chat App (`3:731`) | [ ] |

**Phase 3 progress: 0 / 8**

---

## Later

- [ ] Decide on overlays not in the kit: Popover, DropdownMenu, Modal, Drawer, Toast, Alert
- [ ] Docs site (Fumadocs) with demos and LLMs.txt, as in `../react/apps/docs`
- [ ] shadcn-compatible registry
- [ ] Publish `@neomorphic-ui/react` to npm
- [ ] Figma Code Connect mappings (requires Figma Organization or Enterprise plan)
- [ ] Dark theme

## Blockers

| Blocker | Impact | Unblock by |
|---|---|---|
| Figma Starter plan MCP call limit reached | No Figma writes: Foundations page, component sets | Upgrade the team to Professional, or wait for the quota to reset |
