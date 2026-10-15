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
| [x] | Chip (new): icon + label status pill ("Paid", "Due soon"), decorative `icon` + `iconPosition` (start/end, RTL-aware) like Button, raised/inset + token fills with paired foregrounds, sm/md/lg, `render` (e.g. `<li>`); 15 tests, 6 stories incl. invoice list and live status. Removable and selectable chips still to come | None in kit (split from Badge) | `tag.tsx`, `tag-group.tsx` | ⛔ |
| [x] | ButtonGroup: prev/next stepper as one raised slab with grooves, segments sink while pressed/`aria-pressed`, `ButtonGroupText` readout, horizontal/vertical, rounded/pill; 10 tests, 8 stories incl. kit replica and live pager | ‹ › pair (`1:2`) | `button-group.tsx` | ⛔ |
| [x] | Toggle: raised off / pressed-in on, `--toggle-on` colour, `iconFill`, round icon toggles and rounded tiles, sm/md/lg; 10 tests, 6 stories incl. kit social row and airplane tile | Heart/like/star/bookmark (`3:71`), airplane tile (`3:71`) | `toggle.tsx` | ⛔ |
| [x] | ToggleGroup: segmented control on the ButtonGroup slab, arrow-key focus, single/`multiple`, horizontal/vertical, rounded/pill, group `size`; 8 tests, 6 stories incl. kit OFF/ON and transport | OFF/ON, music transport (`3:731`) | `toggle-group.tsx` | ⛔ |
| [x] | Checkbox: empty well / raised with check, `indeterminate` dash, `aria-invalid` ring, sm/md/lg, native input for forms; 10 tests, 6 stories incl. kit pair and select-all | Check / empty box (`1:2`) | `checkbox.tsx` | ⛔ |
| [x] | RadioGroup: empty round well / raised with dot, arrow-key choice, group `size`, stacked or row; 7 tests, 6 stories incl. kit pair and card options | Filled / empty circle (`1:2`) | `radio-group.tsx` | ⛔ |
| [x] | Switch: well track off / dark `--primary` track on, raised thumb that slides (RTL-aware), sm/md/lg, `aria-invalid` ring, native input for forms; 10 tests, 6 stories incl. kit pair and settings card | Off / on toggle (`1:2`) | `switch.tsx` | ⛔ |
| [x] | Input: Base UI `Input` (works in a `Field`), well that deepens on focus, shallower read-only, invalid ring, rounded/pill, sm/md/lg, `htmlSize`; 7 tests, 6 stories incl. kit search pill and native types | Search pill (`1:2`) | `input.tsx` | ⛔ |
| [x] | InputGroup: one well around a bare input or growing textarea, lit by the control's focus/invalid/disabled, press-to-focus; addons inline/block with icons, `InputGroupText`, `InputGroupButton` fitted to group size and shape (4px inset); 8 tests, 7 stories incl. kit search, Subscribe and chat composer | Search, Subscribe (`3:71`), chat composer (`3:731`) | `input-group.tsx` | ⛔ |
| [x] | Textarea: well that deepens on focus, `autoResize` (`field-sizing`), invalid/read-only/disabled; 8 tests, 5 stories incl. kit field and live counter | "Your message here…" (`1:2`) | `textarea.tsx` | ⛔ |
| [x] | Select: raised uppercase trigger with solid caret, pressed while open, raised popup with sunken highlight and check, label/groups/separator, sm/md/lg; 8 tests, 6 stories incl. kit trigger and grouped time zones | Select category (`1:2`) | `select.tsx` | ⛔ |
| [x] | Slider: groove track, `--slider-fill` gradient, raised pill thumb with grip grooves that sinks while dragged, edge-aligned, ranges, vertical, `SliderLabel`/`SliderValue`, sm/md/lg; 10 tests, 7 stories incl. kit music sliders and equaliser | Music sliders (`3:731`) | `slider.tsx` | ⛔ |
| [x] | Progress: well track with raised `--progress-fill` gradient, `valueInside` (steps past the fill when it won't fit), indeterminate sweep, `ProgressLabel`/`ProgressValue`, sm/md/lg; 8 tests, 6 stories incl. kit PROGRESS card | Progress 40% (`3:71`) | `progress.tsx` | ⛔ |
| [x] | PageIndicator (new): well dots with a raised `--page-indicator-fill` current dot, passive image or page buttons (`onValueChange`) with `aria-current`, roving focus, arrows/Home/End (RTL-aware), 24px targets, horizontal/vertical, sm/md/lg; 9 tests, 6 stories incl. kit dots and onboarding card | Three dots (`1:2`) | carousel dots | ⛔ |
| [x] | Spinner: ring groove around a raised hub with a `--spinner-fill` arc, `role="status"` (decorative when `aria-hidden`), still under reduced motion, sm/md/lg; 7 tests, 5 stories incl. kit loader and loading card | Loader (`1:2`) | `spinner.tsx` | ⛔ |

**Phase 1 progress: 17 / 17**

---

## Phase 2: Composites

| Done | Component | Kit reference | Based on Keystone | Figma |
|---|---|---|---|---|
| [x] | Card: raised/inset/flat panel, sm/md/lg spacing via `--card-spacing`, edge-to-edge images, `CardHeader`/`Title`/`Description`/`Action`/`Content`/`Footer`, `render` for links; 7 tests, 5 stories incl. kit travel card and nested wells | Info card, big info card, info box (`3:731`) | `card.tsx` | ⛔ |
| [x] | Item: list rows in an `ItemGroup` (list semantics), flat/raised/inset, sm/md, links and buttons rise and press, `ItemMedia` icon tile/image, `ItemContent`/`Title`/`Description`/`Actions`/`Header`/`Footer`, `ItemSeparator`; 6 tests, 5 stories incl. kit credit-card list | Credit cards list (`3:731`) | `item.tsx` | ⛔ |
| [x] | Separator: solid groove (dark line + light edge) or perforated tear line, horizontal/vertical, decorative by default or semantic `role="separator"`; 6 tests, 4 stories incl. kit boarding pass | Boarding ticket tear line (`3:731`) | `separator.tsx` | ⛔ |
| [x] | Calendar: react-day-picker month grid raised like a `Surface`, flat days that rise on hover, today in a sunken well with a dot, raised `--calendar-fill` selection, tinted range band, raised round nav, month/year pills over native selects, `--cell-size`; 9 tests, 6 stories incl. kit March 2020 card | March 2020 (`3:71`) | `calendar.tsx` | ⛔ |
| [x] | Dial (new): circular `role="slider"`, raised knob in a ring well with a 270° `--dial-fill` gradient arc and indicator dot, drag around the ring (dead centre, gap holds the nearer end), arrows/Page/Home/End, `step`, controlled or not, `name` for forms, sm/md/lg; 10 tests, 5 stories incl. kit volume knob and thermostat | Volume knob 0–100 (`3:731`) | `circular-progress.tsx` | ⛔ |
| [x] | BarMeter (new): row of vertical meters, each a well with a raised `--bar-meter-fill` gradient rising from its foot, `BarMeterValue` above and `BarMeterLabel` below, `format`, sm/md/lg and `--bar-meter-height`; 6 tests, 4 stories incl. kit weather week | Weather week (`3:71`) | `progress.tsx` | ⛔ |
| [x] | Avatar: raised frame around image or fallback initials, circle/rounded, sm/md/lg/xl, `AvatarBadge` status dot, overlapping `AvatarGroup` with `AvatarGroupCount`; 7 tests, 5 stories incl. kit info box thumbnail | Info box thumbnail (`3:731`) | `avatar.tsx` | ⛔ |
| [x] | Tooltip: raised popup above the trigger (all four sides), `TooltipProvider` shared delay, scale/fade in, `--z-tooltip`; 5 tests, 3 stories incl. icon toolbar | — | `tooltip.tsx` | ⛔ |

**Phase 2 progress: 8 / 8**

---

## Phase 3: Blocks

Full compositions from the kit, built only from Phase 1–2 components. Each
block lives in `apps/storybook/blocks/` (copy-paste source until the registry
lands) with its stories under `Blocks/` in Storybook.

| Done | Block | Kit reference | Figma |
|---|---|---|---|
| [x] | Newsletter signup: pill `InputGroup` with Mail addon and raised Subscribe button, email validation with a described error, `ToggleGroup` topic chips, loading button (field read-only, not greyed), success status; 2 stories | Social: Subscribe (`3:71`) | ⛔ |
| [x] | Weather widget: big temperature, °C/°F `ToggleGroup`, inset conditions strip (`dl` with separators), week of highs as a yellow → blue `BarMeter` with unit-aware values; 2 stories incl. sub-zero week | Weather (`3:71`) | ⛔ |
| [x] | Biometric / settings tiles: Touch ID, airplane, Wi-Fi and Bluetooth `Toggle` tiles with tone colours and status text (airplane turns the radios off), brightness `Slider`, Night shift `Switch`; 2 stories | Combined: Touch ID, airplane mode (`3:71`) | ⛔ |
| [x] | Music player: round art in a raised frame, per-track like `Toggle`, seek `Slider` with elapsed and remaining time, prev/next buttons around a play `Toggle` that drives a timer (advances at track end), volume `Dial`; 2 stories | Music App (`3:731`) | ⛔ |
| [x] | Travel info cards: info card (photo, rating, price, Save toggle), big info card (trip summary, traveller `AvatarGroup`, Book now → Booked), info boxes as raised `Item`s with framed thumbnails; 1 story | Info card, big info card, info box (`3:731`) | ⛔ |
| [x] | Boarding ticket: route with dashed flight path, details `dl`, perforated tear line with inset punched notches, barcode drawn from the booking, Add to wallet → status; 2 stories | Boarding ticket (`3:731`) | ⛔ |
| [x] | Payment methods: saved cards as a `RadioGroup` of raised label rows (chosen row presses in), radios named by card and described by expiry, Expires soon `Badge`, total, Save as default `Checkbox`, Pay button naming the card with loading and paid states; 2 stories | Credit cards (`3:731`) | ⛔ |
| [x] | Chat thread + composer: contact header with status badge and `Tooltip` call buttons, focusable `role="log"` thread with raised incoming and primary outgoing bubbles, pill `InputGroupTextarea` composer (Enter sends, Shift+Enter new line), typing indicator and simulated reply; 2 stories | Chat App (`3:731`) | ⛔ |

**Phase 3 progress: 8 / 8**

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
