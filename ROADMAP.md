# Neomorphic UI Roadmap

React component library built on Base UI and Tailwind CSS v4, styled from
the Light Neomorphic UI Kit fork in Figma (`VPwMxUooz8MVDV283LV5Rp`). See `AGENTS.md` for conventions.

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
- [ ] Release workflow: Changesets version PR + npm publish (Phase 6 of [`PUBLISHING.md`](PUBLISHING.md))

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

| Done | Component | Kit reference | Figma |
|---|---|---|---|
| [x] | Button: `icon` (any element) + `iconPosition` (start, end, top, bottom), icon tiles, pill/circle, default/primary/destructive/ghost, sm/md/lg, loading, `aria-pressed`; 28 tests, 10 stories incl. kit replica | Sign in, Share, icon buttons (`1:2`) | ⛔ |
| [x] | Badge: `count`/`max`/`showZero`, `dot`, raised/inset + token fills, sm/md/lg; `BadgeAnchor` + `placement` (4 logical corners) and `overlap="circular"`; 23 tests, 8 stories incl. kit replica | Bell "3", cart "17" (`1:2`) | ⛔ |
| [x] | Chip (new): icon + label status pill ("Paid", "Due soon"), decorative `icon` + `iconPosition` (start/end, RTL-aware) like Button, raised/inset + token fills with paired foregrounds, sm/md/lg, `render` (e.g. `<li>`); 15 tests, 6 stories incl. invoice list and live status. Removable and selectable chips still to come | None in kit (split from Badge) | ⛔ |
| [x] | ButtonGroup: prev/next stepper as one raised slab with grooves, segments sink while pressed/`aria-pressed`, `ButtonGroupText` readout, horizontal/vertical, rounded/pill; 10 tests, 8 stories incl. kit replica and live pager | ‹ › pair (`1:2`) | ⛔ |
| [x] | Toggle: raised off / pressed-in on, `--toggle-on` colour, `iconFill`, round icon toggles and rounded tiles, sm/md/lg; 10 tests, 6 stories incl. kit social row and airplane tile | Heart/like/star/bookmark (`3:71`), airplane tile (`3:71`) | ⛔ |
| [x] | ToggleGroup: segmented control on the ButtonGroup slab, arrow-key focus, single/`multiple`, horizontal/vertical, rounded/pill, group `size`; 8 tests, 6 stories incl. kit OFF/ON and transport | OFF/ON, music transport (`3:731`) | ⛔ |
| [x] | Checkbox: empty well / raised with check, `indeterminate` dash, `aria-invalid` ring, sm/md/lg, native input for forms; 10 tests, 6 stories incl. kit pair and select-all | Check / empty box (`1:2`) | ⛔ |
| [x] | RadioGroup: empty round well / raised with dot, arrow-key choice, group `size`, stacked or row; 7 tests, 6 stories incl. kit pair and card options | Filled / empty circle (`1:2`) | ⛔ |
| [x] | Switch: well track off / dark `--primary` track on, raised thumb that slides (RTL-aware), sm/md/lg, `aria-invalid` ring, native input for forms; 10 tests, 6 stories incl. kit pair and settings card | Off / on toggle (`1:2`) | ⛔ |
| [x] | Input: Base UI `Input` (works in a `Field`), well that deepens on focus, shallower read-only, invalid ring, rounded/pill, sm/md/lg, `htmlSize`; 7 tests, 6 stories incl. kit search pill and native types | Search pill (`1:2`) | ⛔ |
| [x] | InputGroup: one well around a bare input or growing textarea, lit by the control's focus/invalid/disabled, press-to-focus; addons inline/block with icons, `InputGroupText`, `InputGroupButton` fitted to group size and shape (4px inset); 8 tests, 7 stories incl. kit search, Subscribe and chat composer | Search, Subscribe (`3:71`), chat composer (`3:731`) | ⛔ |
| [x] | Textarea: well that deepens on focus, `autoResize` (`field-sizing`), invalid/read-only/disabled; 8 tests, 5 stories incl. kit field and live counter | "Your message here…" (`1:2`) | ⛔ |
| [x] | Select: raised uppercase trigger with solid caret, pressed while open, raised popup with sunken highlight and check, label/groups/separator, sm/md/lg; 8 tests, 6 stories incl. kit trigger and grouped time zones | Select category (`1:2`) | ⛔ |
| [x] | Slider: groove track, `--slider-fill` gradient, raised pill thumb with grip grooves that sinks while dragged, edge-aligned, ranges, vertical, `SliderLabel`/`SliderValue`, sm/md/lg; 10 tests, 7 stories incl. kit music sliders and equaliser | Music sliders (`3:731`) | ⛔ |
| [x] | Progress: well track with raised `--progress-fill` gradient, `valueInside` (steps past the fill when it won't fit), indeterminate sweep, `ProgressLabel`/`ProgressValue`, sm/md/lg; 8 tests, 6 stories incl. kit PROGRESS card | Progress 40% (`3:71`) | ⛔ |
| [x] | PageIndicator (new): well dots with a raised `--page-indicator-fill` current dot, passive image or page buttons (`onValueChange`) with `aria-current`, roving focus, arrows/Home/End (RTL-aware), 24px targets, horizontal/vertical, sm/md/lg; 9 tests, 6 stories incl. kit dots and onboarding card | Three dots (`1:2`) | ⛔ |
| [x] | Spinner: ring groove around a raised hub with a `--spinner-fill` arc, `role="status"` (decorative when `aria-hidden`), still under reduced motion, sm/md/lg; 7 tests, 5 stories incl. kit loader and loading card | Loader (`1:2`) | ⛔ |

**Phase 1 progress: 17 / 17**

---

## Phase 2: Composites

| Done | Component | Kit reference | Figma |
|---|---|---|---|
| [x] | Card: raised/inset/flat panel, sm/md/lg spacing via `--card-spacing`, edge-to-edge images, `CardHeader`/`Title`/`Description`/`Action`/`Content`/`Footer`, `render` for links; 7 tests, 5 stories incl. kit travel card and nested wells | Info card, big info card, info box (`3:731`) | ⛔ |
| [x] | Item: list rows in an `ItemGroup` (list semantics), flat/raised/inset, sm/md, links and buttons rise and press, `ItemMedia` icon tile/image, `ItemContent`/`Title`/`Description`/`Actions`/`Header`/`Footer`, `ItemSeparator`; 6 tests, 5 stories incl. kit credit-card list | Credit cards list (`3:731`) | ⛔ |
| [x] | Separator: solid groove (dark line + light edge) or perforated tear line, horizontal/vertical, decorative by default or semantic `role="separator"`; 6 tests, 4 stories incl. kit boarding pass | Boarding ticket tear line (`3:731`) | ⛔ |
| [x] | Calendar: react-day-picker month grid raised like a `Surface`, flat days that rise on hover, today in a sunken well with a dot, raised `--calendar-fill` selection, tinted range band, raised round nav, month/year pills over native selects, `--cell-size`; 9 tests, 6 stories incl. kit March 2020 card | March 2020 (`3:71`) | ⛔ |
| [x] | Dial (new): circular `role="slider"`, raised knob in a ring well with a 270° `--dial-fill` gradient arc and indicator dot, drag around the ring (dead centre, gap holds the nearer end), arrows/Page/Home/End, `step`, controlled or not, `name` for forms, sm/md/lg; 10 tests, 5 stories incl. kit volume knob and thermostat | Volume knob 0–100 (`3:731`) | ⛔ |
| [x] | BarMeter (new): row of vertical meters, each a well with a raised `--bar-meter-fill` gradient rising from its foot, `BarMeterValue` above and `BarMeterLabel` below, `format`, sm/md/lg and `--bar-meter-height`; 6 tests, 4 stories incl. kit weather week | Weather week (`3:71`) | ⛔ |
| [x] | Avatar: raised frame around image or fallback initials, circle/rounded, sm/md/lg/xl, `AvatarBadge` status dot, overlapping `AvatarGroup` with `AvatarGroupCount`; 7 tests, 5 stories incl. kit info box thumbnail | Info box thumbnail (`3:731`) | ⛔ |
| [x] | Tooltip: raised popup above the trigger (all four sides), `TooltipProvider` shared delay, scale/fade in, `--z-tooltip`; 5 tests, 3 stories incl. icon toolbar | — | ⛔ |

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

## Phase 4: shadcn parity

The rest of the shadcn catalogue, scoped against its docs (parts, props and
behaviour) and given the neomorphic treatment. The kit has no frames for most
of these, so depth follows the existing rules: popups and panels raised like
`Select`/`Tooltip`, fields and tracks sunk like `Input`, active states pressed
in **and** marked by colour or an icon. Already shipped and skipped here:
Avatar, Badge, Button, Button Group, Calendar, Card, Checkbox, Input, Input
Group, Item, Progress, Radio Group, Select, Separator, Slider, Spinner,
Switch, Textarea, Toggle, Toggle Group, Tooltip.

Groups are in build order: each one only needs components from earlier
groups or earlier phases.

### Shared prerequisites

- [x] `popupVariants`: one raised popup style (surface, `shadow-neu-lg`, radius, scale/fade in/out) pulled out of `Select` and `Tooltip` and reused by every overlay and picker below (internal `popup.ts`: popup, item, label, separator and backdrop classes; `Select` now uses it)
- [x] Backdrop: `--neu-backdrop` (surface tint + light blur) for Dialog, Alert Dialog, Sheet and Drawer; `--z-*` tokens already exist in `base.css`
- [x] `animate-neu-shimmer` utility for loading text and placeholders (Skeleton, Attachment, Trace, Marker), static under `prefers-reduced-motion` (`neu-shimmer` for surfaces, `neu-shimmer-text` for text)
- [x] Chart tokens `--chart-1`…`--chart-5`, folded into the Phase 0 accent tokens (each at least 3:1 against the surface)
- [x] New dependencies (each component on its own subpath so unused ones never ship): `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `recharts` (Chart), `@tanstack/react-table` (Data Table block only), `shiki` (optional highlighting for Code Block); all except `@tanstack/react-table` are optional peer dependencies of the package, installed only by apps that use those components
- [x] Keep the "no Radix" rule: use Base UI Autocomplete instead of `cmdk`, Base UI Drawer instead of `vaul`, Base UI Toast instead of `sonner`

### 4a: Forms and text

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Label: styled `<label>`, disabled/invalid states follow the control (`peer`/`group` data attributes); `labelClassName` exported; tested with Field, `PlainLabel` story | native | ⛔ |
| [x] | Field: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`/`FieldLegend`, `FieldSeparator`, vertical/horizontal/responsive; wires `aria-describedby`/`aria-invalid` into Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider. `FieldLabel` around a `Field` makes a raised choice card that presses in when checked; `FieldError` shows given `errors` or children without waiting for native validity; label and description fall back to plain elements outside a `Field`; 8 tests, 5 stories | Base UI Field, Fieldset | ⛔ |
| [x] | Native Select: native `<select>` in an Input-style well with a caret icon, sm/md/lg, `NativeSelectOption`/`OptGroup`; 4 tests, 3 stories | native | ⛔ |
| [x] | Input OTP: slots as small wells, active slot sinks deeper with a caret, `InputOTPGroup`/`Separator`, digits/alphanumeric pattern, paste fills all slots, sm/md/lg; 4 tests, 3 stories | Base UI OTP Field | ⛔ |
| [x] | Kbd: static raised key cap, `KbdGroup` for chords, sm/md; 3 tests, 2 stories | native | ⛔ |
| [x] | Typography: `h1`–`h4`, paragraph, lead, large, small, muted, blockquote (inset well with a primary rule), list, inline code (inset); headings use `--font-heading` when set; every part takes `render`; 4 tests, 2 stories | native | ⛔ |
| [x] | Alert: inset well with a coloured rule and icon, `AlertTitle`/`AlertDescription`/`AlertAction`, default/info/success/warning/destructive, `role="status"` by default and `role="alert"` only for urgent messages; 4 tests, 3 stories | native | ⛔ |
| [x] | Empty: centred empty state with a raised icon tile (or Avatar), `EmptyHeader`/`Media`/`Title`/`Description`/`Content` for actions, flat or inset; 3 tests, 2 stories | native | ⛔ |
| [x] | Skeleton: inset placeholder with the shared shimmer, line/circle/rect presets, `aria-hidden`; 2 tests, 2 stories | native | ⛔ |
| [x] | Aspect Ratio: `aspect-ratio` wrapper for images and video in Card, Carousel and Attachment; 2 tests, 2 stories | native | ⛔ |
| [x] | Direction: `DirectionProvider`/`useDirection` re-export; Slider, Dial, Page Indicator, Chip and Carousel read it for RTL; 2 tests, 1 story (RTL slider) | Base UI Direction Provider | ⛔ |
| [x] | Scroll Area: groove track with a raised pill thumb that appears on hover/scroll, vertical/horizontal/both, optional edge fade, focusable viewport when it overflows; 2 tests, 2 stories | Base UI Scroll Area | ⛔ |

**4a progress: 12 / 12**

### 4b: Disclosure and navigation

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Collapsible: trigger with a rotating chevron (`CollapsibleIndicator`), animated height via `--collapsible-panel-height`, `keepMounted`, `hiddenUntilFound`; 3 tests, 2 stories | Base UI Collapsible | ⛔ |
| [x] | Accordion: items as raised panels, open trigger presses in and its chevron turns over in the primary colour, single/multiple, disabled items, `flat` variant with grooves for use in a Card; headers sit in the Tab order (Base UI 1.9 dropped arrow-key roving per the APG update); 5 tests, 4 stories | Base UI Accordion | ⛔ |
| [x] | Tabs: tab list as a Toggle Group-style slab, a well slides under the active tab (Base UI Indicator), which also takes `--tabs-active` colour and weight, `line` variant with a primary bar, horizontal/vertical, `TabsContent` panels; 5 tests, 4 stories | Base UI Tabs | ⛔ |
| [x] | Breadcrumb: `nav` > `ol`, custom separators, `BreadcrumbEllipsis` (collapsed items in a Dropdown Menu once 4c lands), current page pressed in with `aria-current="page"`, `render` for router links; 6 tests, 3 stories | native | ⛔ |
| [x] | Pagination: raised page buttons, current page pressed in and primary with `aria-current="page"`, previous/next, ellipsis, sm/md, `render` for router links; 5 tests, 2 stories | native + Button | ⛔ |
| [x] | Table: rows split by grooves, uppercase muted header over a groove (no well: per-cell wells seam), `TableCaption`/`Footer`, sticky header, flat/raised/inset container, selected rows (`aria-selected`) take a primary tint and a leading bar; 6 tests, 3 stories | native | ⛔ |

**4b progress: 6 / 6**

### 4c: Overlays

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Popover: raised popup (no arrow, like Tooltip), `side`/`align`/`sideOffset`, `PopoverHeader`/`Title`/`Description`/`Close`, focus moves in and returns, `--z-popover`; 3 tests, 2 stories | Base UI Popover | ⛔ |
| [x] | Hover Card: raised preview card on hover/focus, `delay`/`closeDelay` on the trigger (rendered as a primary link); 2 tests, 1 story | Base UI Preview Card | ⛔ |
| [x] | Dialog: raised panel over a blurred backdrop, sm/md/lg, `DialogHeader`/`Title`/`Description`/`Body`/`Footer`/`Close`, X button (`showCloseButton`), focus trap, `DialogBody` scrolls; 4 tests, 2 stories | Base UI Dialog | ⛔ |
| [x] | Alert Dialog: needs an explicit choice (no outside dismiss), default/sm sizes (sm centres and splits the footer), raised `AlertDialogMedia` tile, `AlertDialogAction`/`Cancel` as Buttons (destructive via `variant`); 4 tests, 2 stories | Base UI Alert Dialog | ⛔ |
| [x] | Sheet: Dialog sliding in from top/bottom/start/end/left/right (start/end follow RTL), sm–xl widths, only the inner edge rounded; 3 tests, 2 stories | Base UI Dialog | ⛔ |
| [x] | Drawer: `direction` top/bottom/left/right, raised grip on bottom drawers, swipe to dismiss (backdrop fades with swipe progress), snap points; 3 tests, 3 stories | Base UI Drawer | ⛔ |
| [x] | Dropdown Menu: raised popup, highlighted item sinks, checkbox/radio items with primary marks (radio closes on click), labels, groove separators, submenus, plain-text shortcuts, destructive items; parts shared with Context Menu and Menubar via `menu-parts.tsx`; 6 tests, 2 stories | Base UI Menu | ⛔ |
| [x] | Context Menu: same item parts as Dropdown Menu, opened on right-click/long-press; 1 test, 1 story | Base UI Context Menu | ⛔ |
| [x] | Menubar: raised slab of menu triggers, open trigger pressed in and primary, arrow keys move between menus; 2 tests, 1 story | Base UI Menubar | ⛔ |
| [x] | Navigation Menu: site nav with a raised viewport panel that resizes and slides between triggers, open trigger pressed in, links sink on hover, `data-active` link primary, `navigationMenuTriggerStyle()`, `render` for router links; 3 tests, 1 story | Base UI Navigation Menu | ⛔ |
| [x] | Toast: stacked raised toasts with coloured icons (Alert colours), title/description/action/close, swipe to dismiss, `Toaster` (position, limit, duration) + `toast()` with `.success`/`.info`/`.warning`/`.error`/`.loading`/`.promise`/`.dismiss`, `--z-toast`; 5 tests, 3 stories | Base UI Toast | ⛔ |

**4c progress: 11 / 11**

### 4d: Pickers

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Combobox: `ComboboxInput` in an `InputGroup` well with chevron and clear buttons, raised filtered list (highlight sinks, chosen row checked and primary), groups with `ComboboxCollection`, `ComboboxEmpty`, `multiple` values as raised `ComboboxChip`s in a `ComboboxChips` well (`useComboboxAnchor`), `ComboboxTrigger` for a searchable select; 7 tests, 4 stories | Base UI Combobox | ⛔ |
| [x] | Command: always-open search list (`CommandInput`/`List`/`Group` with `heading`/`Collection`/`Item`/`Empty`/`Separator`/`Shortcut`), first match stays highlighted, running an item keeps the query, `CommandDialog` for a ⌘K palette (bare inside the raised dialog); 5 tests, 2 stories | Base UI Autocomplete + Dialog | ⛔ |
| [x] | Date Picker: `DatePicker` (closes on pick) and `DateRangePicker` (two months, stays open) behind a raised field trigger, `presets` column (matching one pressed in), `DatePickerInput` typed date in a well that syncs with the Calendar both ways and flags unparseable text on blur, `formatDate`/`parseDate`, `name` adds a `yyyy-mm-dd` hidden input; 5 tests, 4 stories | Calendar + Popover | ⛔ |

**4d progress: 3 / 3**

### 4e: Layout and data

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Resizable: panel groups split by a groove handle (primary while hovered, focused or dragged) with an optional raised grip that presses in while dragged, keyboard resize, horizontal/vertical, sizes as pixels (numbers) or percentages (strings); 2 tests, 2 stories | `react-resizable-panels` v4 | ⛔ |
| [x] | Carousel: track with raised round previous/next buttons and a `PageIndicator` (`CarouselIndicator`), horizontal/vertical, `opts` (loop, align) and `plugins` (autoplay off unless added), `gap`, arrow keys (RTL-aware), `onSlideChange`/`setApi`, labelled `region` with `aria-roledescription` carousel/slide, viewport padding so raised slides' shadows aren't clipped; 3 tests, 3 stories | `embla-carousel-react` | ⛔ |
| [x] | Sidebar: raised side panel (`sidebar`/`floating`/`inset` variants, left/right), `SidebarProvider` (⌘B/Ctrl+B, `sidebar_state` cookie, controlled `open`), collapses `offcanvas` or to `icon`s with labels in tooltips, Sheet below `md`, header/footer/content/groups with label and action, menus with badge (inset pill), hover-only actions, sub-menus off a groove (wrap in Collapsible), rows rise on hover and the active row presses in, rail, skeleton rows; 6 tests, 5 stories | Sheet, Tooltip, Skeleton, Separator, Input | ⛔ |
| [x] | Data Table: block in `apps/storybook/blocks/data-table.tsx` (like shadcn's guide, not a package component): raised Table, sortable ghost-button headers with `aria-sort`, passenger filter Input, column visibility Dropdown Menu, row selection Checkboxes with an indeterminate select-all, status Chips, row action menus, Pagination rendered as buttons; 2 stories | `@tanstack/react-table` + Table | ⛔ |
| [x] | Chart: `ChartContainer` turns `ChartConfig` into `--color-*`, `--fill-*` (BarMeter gradient, darker at the base) and `--area-*` (fading) variables and styles axes, grid and cursor for the surface; small raised `ChartTooltipContent` (dot/line/dashed indicator, `hideLabel`/`hideIndicator`, `formatter`, `nameKey`/`labelKey`), `ChartLegendContent`; 4 tests, 6 stories (area, bar, line, pie, radar, radial) | `recharts` v3 | ⛔ |

**4e progress: 5 / 5**

### 4f: Conversation and AI

Once this group lands, rebuild the Phase 3 chat thread block on Bubble,
Message, Marker and Message Scroller.

| Done | Component | Built on | Figma |
|---|---|---|---|
| [x] | Bubble: chat bubble, default (primary)/secondary (raised)/muted (inset)/tinted/outline/ghost (no padding, full width)/destructive (inset with a red tint), `align` start/end tucks in the corner nearest the speaker, max 80% width, `BubbleContent` with `render`, `BubbleReactions` (raised pill on the top or bottom edge, `role="img"` with a label), `BubbleGroup`; 4 tests, 4 stories | native | ⛔ |
| [x] | Message: chat row layout with `MessageAvatar` (bottom-aligned, lifted above a footer), `MessageHeader`/`Content`/`Footer` (actions, status; flush with ghost bubbles), `align` mirrors the row, `MessageGroup`; 2 tests, 3 stories | Avatar, Bubble | ⛔ |
| [x] | Marker: inline status or note in a thread, default/border/separator (groove lines, no `role="separator"`), `MarkerIcon` (`aria-hidden`), `role="status"` with Spinner while streaming, `shimmer` on the text, `render` for a link or button; 3 tests, 3 stories | Separator, Spinner | ⛔ |
| [x] | Attachment: raised file tile (idle sits in a well), idle/uploading/processing/error/done (errors stated in the description, shimmering title while busy), default/sm/xs, horizontal/vertical, icon or image media (dimmed until done), `AttachmentProgress`, corner actions, full-card `AttachmentTrigger` that presses the tile in, `AttachmentGroup` scroll row with snapping; uses native overflow rather than Scroll Area so the tiles' shadows aren't clipped; 4 tests, 5 stories | Progress, Button | ⛔ |
| [x] | Trace: agent step list, `TraceLine` with running/pending/error status, icon, truncating title (shimmers while running), description, `TraceCollapsible` with a turning chevron and detail under a groove; 2 tests, 1 story | Collapsible, Spinner | ⛔ |
| [x] | Code Block: inset code well, header with title and actions (copy with a "Copied" announcement, wrap toggle), floating actions shown on hover/focus, line numbers and `startLine`, wrap, highlighted/added/removed lines, `maxLines` with Show more/less, sm and destructive (error output) variants; highlighting in `useHighlightedCode` on its own subpath (`@neomorphic-ui/react/use-highlighted-code`; Shiki JS engine, core, languages and themes all loaded on first use; plain lines until ready); 7 tests, 5 stories | native, optional `shiki` peer | ⛔ |
| [x] | Message Scroller: chat scroll viewport (focusable "Messages" region, hidden until positioned) that opens at the latest turn (`last-anchor`/`end`/`start`), follows streamed output only while at the live edge (`autoScroll`), stops on wheel/touch/keyboard/scrollbar/selection, settles new `scrollAnchor` rows near the top with a peek of the row before, keeps position when history is prepended, `scrollToMessage`/`scrollToEnd`/`scrollToStart` via `useMessageScroller`, jump-to-latest raised button (inert while not needed), `role="log"`; headless scroll controller written here instead of Scroll Area (native scrolling keeps the spacer and anchoring maths simple); 5 tests, 3 stories | native, Button | ⛔ |
| [x] | Questionnaire: multi-step form, one question per step as a fieldset, raised choice cards (radio or checkbox), freeform Input that replaces a single choice, Progress ("Question n of total"), previous/skip/next/submit, number-key shortcuts with Kbd hints, required and custom validation (announced, focus moves to the first choice), conditional (`when`) and resumable (`defaultValues`/`defaultActiveItem`) steps, Enter in a text answer moves on; headless state written here (shadcn uses `@shadcn/react`); 5 tests, 3 stories | Field, Radio Group, Checkbox, Progress, Kbd | ⛔ |

The Phase 3 chat thread block now uses Bubble, Message, Marker (the "Today" separator and the typing status) and Message Scroller, which opens at the latest message and keeps a sent message in view while the reply arrives.

**4f progress: 8 / 8**

**Phase 4 progress: 45 / 45**

---

## Later

- [x] Decide on overlays not in the kit: Popover, DropdownMenu, Modal, Drawer, Toast, Alert (planned in Phase 4)
- [ ] Docs site (Fumadocs) with demos and LLMs.txt
- [ ] shadcn-compatible registry
- [ ] Publish `@neomorphic-ui/react` to npm (step-by-step plan in [`PUBLISHING.md`](PUBLISHING.md))
- [ ] Figma Code Connect mappings (requires Figma Organization or Enterprise plan)
- [ ] Dark theme

## Blockers

| Blocker | Impact | Unblock by |
|---|---|---|
| Figma Starter plan MCP call limit reached | No Figma writes: Foundations page, component sets | Upgrade the team to Professional, or wait for the quota to reset |
