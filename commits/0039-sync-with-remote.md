---
number: 39
subject: "sync-with-remote"
date: 2026-10-15T14:45:01+05:30
author: "punyprogrammer"
files: 127
insertions: 2392
deletions: 1224
---

<!-- nav --> [← 0035](0035-setup-npm-packaging.md) · [Index](README.md) · latest →

# 0039 · sync-with-remote

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 39 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0039-sync-with-remote.md` |
| Parent | `1458893` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T14:45:01+05:30 |
| Branch | `main` |
| Type | merge commit (diff against first parent) |
| Changes | 127 files · +2392 −1224 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `data-table.tsx` | `DataTableColumnHeaderProps`, `DataTableFilterProps`, `DataTablePaginationProps`, `DataTableProps`, `DataTableSelectAllProps`, `DataTableSelectRowProps`, `DataTableViewOptionsProps`, `UseDataTableOptions`, `DataTable`, `DataTableColumnHeader`, `DataTableFilter`, `DataTablePagination`, `DataTableSelectAll`, `DataTableSelectRow`, `DataTableViewOptions`, `useDataTable` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/data-table.test.tsx` | 6 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Modified | `accordion.stories.tsx` | no stories added or removed |
| Modified | `alert-dialog.stories.tsx` | no stories added or removed |
| Modified | `alert.stories.tsx` | no stories added or removed |
| Modified | `aspect-ratio.stories.tsx` | no stories added or removed |
| Modified | `attachment.stories.tsx` | no stories added or removed |
| Modified | `avatar.stories.tsx` | no stories added or removed |
| Modified | `badge.stories.tsx` | no stories added or removed |
| Modified | `bar-meter.stories.tsx` | no stories added or removed |
| Deleted | `data-table.stories.tsx` | Default, Empty |
| Modified | `breadcrumb.stories.tsx` | no stories added or removed |
| Modified | `bubble.stories.tsx` | no stories added or removed |
| Modified | `button-group.stories.tsx` | no stories added or removed |
| Modified | `button.stories.tsx` | no stories added or removed |
| Modified | `calendar.stories.tsx` | no stories added or removed |
| Modified | `card.stories.tsx` | no stories added or removed |
| Modified | `carousel.stories.tsx` | no stories added or removed |
| Modified | `chart.stories.tsx` | no stories added or removed |
| Modified | `checkbox.stories.tsx` | no stories added or removed |
| Modified | `chip.stories.tsx` | no stories added or removed |
| Modified | `code-block.stories.tsx` | no stories added or removed |
| Modified | `collapsible.stories.tsx` | no stories added or removed |
| Modified | `combobox.stories.tsx` | no stories added or removed |
| Modified | `command.stories.tsx` | no stories added or removed |
| Modified | `context-menu.stories.tsx` | no stories added or removed |
| Added | `data-table.stories.tsx` | Default, Empty |
| Modified | `date-picker.stories.tsx` | no stories added or removed |
| Modified | `dial.stories.tsx` | no stories added or removed |
| Modified | `dialog.stories.tsx` | no stories added or removed |
| Modified | `direction.stories.tsx` | no stories added or removed |
| Modified | `drawer.stories.tsx` | no stories added or removed |
| Modified | `dropdown-menu.stories.tsx` | no stories added or removed |
| Modified | `empty.stories.tsx` | no stories added or removed |
| Modified | `field.stories.tsx` | no stories added or removed |
| Modified | `foundations.stories.tsx` | no stories added or removed |
| Modified | `hover-card.stories.tsx` | no stories added or removed |
| Modified | `input-group.stories.tsx` | no stories added or removed |
| Modified | `input-otp.stories.tsx` | no stories added or removed |
| Modified | `input.stories.tsx` | no stories added or removed |
| Modified | `item.stories.tsx` | no stories added or removed |
| Modified | `kbd.stories.tsx` | no stories added or removed |
| Modified | `marker.stories.tsx` | no stories added or removed |
| Modified | `menubar.stories.tsx` | no stories added or removed |
| Modified | `message-scroller.stories.tsx` | no stories added or removed |
| Modified | `message.stories.tsx` | no stories added or removed |
| Modified | `native-select.stories.tsx` | no stories added or removed |
| Modified | `navigation-menu.stories.tsx` | no stories added or removed |
| Modified | `page-indicator.stories.tsx` | no stories added or removed |
| Modified | `pagination.stories.tsx` | no stories added or removed |
| Modified | `popover.stories.tsx` | no stories added or removed |
| Modified | `progress.stories.tsx` | no stories added or removed |
| Modified | `questionnaire.stories.tsx` | no stories added or removed |
| Modified | `radio-group.stories.tsx` | no stories added or removed |
| Modified | `resizable.stories.tsx` | no stories added or removed |
| Modified | `scroll-area.stories.tsx` | no stories added or removed |
| Modified | `select.stories.tsx` | no stories added or removed |
| Modified | `separator.stories.tsx` | no stories added or removed |
| Modified | `sheet.stories.tsx` | no stories added or removed |
| Modified | `sidebar.stories.tsx` | no stories added or removed |
| Modified | `skeleton.stories.tsx` | no stories added or removed |
| Modified | `slider.stories.tsx` | no stories added or removed |
| Modified | `spinner.stories.tsx` | no stories added or removed |
| Modified | `surface.stories.tsx` | no stories added or removed |
| Modified | `switch.stories.tsx` | no stories added or removed |
| Modified | `table.stories.tsx` | no stories added or removed |
| Modified | `tabs.stories.tsx` | no stories added or removed |
| Modified | `textarea.stories.tsx` | no stories added or removed |
| Modified | `toast.stories.tsx` | no stories added or removed |
| Modified | `toggle-group.stories.tsx` | no stories added or removed |
| Modified | `toggle.stories.tsx` | no stories added or removed |
| Modified | `tooltip.stories.tsx` | no stories added or removed |
| Modified | `trace.stories.tsx` | no stories added or removed |
| Modified | `typography.stories.tsx` | no stories added or removed |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Consumed | `neu-badge.md` | `@neomorphic-ui/react` minor | Add `Badge` and `BadgeAnchor` (`@neomorphic-ui/react/badge`): a raised marker for counts, dots, and short labels. `count` with `max` (reads `99+`) hides at zero unless `showZero`; `dot` for a contentless marker. Variants `default` (raised), `inset`, and AA-paired fills `primary`, `destructive`, `success`, `warning`; sizes `sm`, `md`, `lg`. Inside a `BadgeAnchor`, `placement` pins the badge to a corner (`top-end`, `top-start`, `bottom-end`, `bottom-start`, following writing direction) and `overlap="circular"` moves it onto a round anchor's edge. Placed badges are `aria-hidden`; the anchored control carries the count in its name. |
| Consumed | `neu-button-group.md` | `@neomorphic-ui/react` minor | Add `ButtonGroup` and `ButtonGroupText` (`@neomorphic-ui/react/button-group`): joins `Button`s into one raised slab split by grooves, like the kit's ‹ › stepper. Segments rest flat in the slab and sink into it while held or `aria-pressed`; disabled segments keep their place. `orientation` (`horizontal`, `vertical`) and `shape` (`rounded`, `pill`) set the axis and outer corners, which the end segments follow. `ButtonGroupText` adds a non-interactive segment such as a "2 / 5" readout. The group is a `role="group"`, so label it. |
| Consumed | `neu-button-loading-name.md` | `@neomorphic-ui/react` patch | Fix `Button` losing its accessible name while `isLoading`: the label under the spinner is now transparent instead of `visibility: hidden`, so screen readers still announce "Subscribe, busy" rather than an unnamed button. The button keeps its size and look. |
| Consumed | `neu-button.md` | `@neomorphic-ui/react` minor | Add `Button` (`@neomorphic-ui/react/button`): raised at rest, pressed while held or `aria-pressed`, flat when disabled. Takes any icon element through `icon`, placed with `iconPosition` (`start`, `end`, `top`, `bottom`); with no children it becomes an icon tile (`shape="pill"` for a circle). Variants `default`, `primary`, `destructive`, `ghost`; sizes `sm`, `md`, `lg`; `isLoading` keeps focus and the raised look. `buttonVariants` styles links. Darkens `--destructive` to `oklch(0.52 0.2 27.325)` so red text passes AA on raised surfaces. |
| Consumed | `neu-checkbox-radio.md` | `@neomorphic-ui/react` minor | Add `Checkbox` (`@neomorphic-ui/react/checkbox`) and `RadioGroup` + `RadioGroupItem` (`@neomorphic-ui/react/radio-group`), following the kit: an empty control is a well pressed into the surface, a selected one rises out of it with a dark check or dot. - `Checkbox`: checked, unchecked and `indeterminate` (a dash, read as "mixed"; also when Base UI derives it for a parent box), `aria-invalid` ring, sizes `sm`, `md`, `lg`. A hidden native input submits with forms. - `RadioGroup`: arrow keys move the choice, a group-wide `size` that items can override, stacked by default (`className="flex gap-6"` for a row). |
| Consumed | `neu-chip.md` | `@neomorphic-ui/react` minor | Add `Chip` (`@neomorphic-ui/react/chip`): a status pill with an optional icon and a short label, such as "Paid" or "Due soon". `icon` takes any element and is decorative; `iconPosition` (`start`, `end`) follows the writing direction. Variants `default` (raised), `inset`, and token fills `primary`, `destructive`, `success`, `warning` paired with their `-foreground`; sizes `sm`, `md`, `lg`. Renders a `<span>`; `render` swaps the element (e.g. `<li>`). `Badge` stays for counts and dots. |
| Added | `neu-initial-release.md` | `@neomorphic-react/ui` minor | First public release: 70 neumorphic React 19 components for Tailwind CSS v4, built on Base UI. Each component has its own subpath (`import { Button } from "@neomorphic-react/ui/button"`), so an app only bundles what it imports. Import `@neomorphic-react/ui/base.css` and `@neomorphic-react/ui/theme.css` in your Tailwind stylesheet. Surfaces rise out of the page or sink into it, focus rings are visible, the components support right-to-left layouts, and motion stops when the user asks for reduced motion. - **Actions and inputs:** Button, ButtonGroup, Toggle, ToggleGroup, Input, InputGroup, InputOTP, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Dial, Label, Field. - **Display:** Surface, Card, Item, Badge, Chip, Avatar, Separator, Kbd, Typography, Alert, Empty, Skeleton, Spinner, Progress, BarMeter, PageIndicator, AspectRatio, ScrollArea. - **Disclosure and navigation:** Collapsible, Accordion, Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar. - **Overlays:** Tooltip, Popover, HoverCard, Dialog, AlertDialog, Sheet, Drawer, DropdownMenu, ContextMenu, Toast. - **Pickers:** Calendar, DatePicker and DateRangePicker, Combobox, Command (with a ⌘K `CommandDialog`). - **Layout and data:** Table, DataTable, Resizable, Carousel, Chart. - **Conversation and AI:** Bubble, Message, Marker, Attachment, Trace, CodeBlock, MessageScroller, Questionnaire. - **Utilities:** `DirectionProvider`/`useDirection`, `useHighlightedCode`, `cn`. These optional peer dependencies are needed only by the components that use them: - `react-day-picker@^10` for Calendar and DatePicker - `embla-carousel-react@^8` for Carousel - `recharts@^3` for Chart - `react-resizable-panels@^4` for Resizable - `@tanstack/react-table@^8` for DataTable - `shiki@^4` for code highlighting with `useHighlightedCode` |
| Consumed | `neu-input-input-group.md` | `@neomorphic-ui/react` minor | Add `Input` (`@neomorphic-ui/react/input`) and `InputGroup` (`@neomorphic-ui/react/input-group`). - `Input`, built on Base UI so it joins a `Field`: a well pressed into the surface that deepens on focus, shallower when read-only, with an `aria-invalid` (or Field-invalid) ring. Sizes `sm`, `md`, `lg`; `shape` `rounded` (default, matching `Textarea` and `Select`) or `pill` (the kit's search field). `htmlSize` sets the native `size` attribute. - `InputGroup`: one well around a bare `InputGroupInput` or growing `InputGroupTextarea`, lit for the control's focus, invalid and disabled states; pressing anywhere in it focuses the control. `InputGroupAddon` places icons, `InputGroupText` or `InputGroupButton`s `inline-start`, `inline-end`, `block-start` or `block-end`. `InputGroupButton` fits the group's `size` and `shape` with a 4px inset, `ghost` by default or `default`/`primary` to rise out of the well like the kit's Subscribe button. |
| Consumed | `neu-optional-peer-dependencies.md` | `@neomorphic-ui/react` patch | Make `recharts`, `embla-carousel-react`, `react-resizable-panels` and `react-day-picker` optional peer dependencies, so installing the library no longer downloads them. Install the ones your components need: `react-day-picker@^10` for `Calendar` and `DatePicker`, `embla-carousel-react@^8` for `Carousel`, `recharts@^3` for `Chart`, and `react-resizable-panels@^4` for `Resizable` (plus `shiki@^4` for `useHighlightedCode`, as before). |
| Consumed | `neu-page-indicator-spinner.md` | `@neomorphic-ui/react` minor | Add `PageIndicator` (`@neomorphic-ui/react/page-indicator`) and `Spinner` (`@neomorphic-ui/react/spinner`). - `PageIndicator`: the kit's three dots. The other pages are wells; the current one (`value`, from 0) rises out of the surface filled with `--page-indicator-fill` (default `--primary`). Passive by default, as an image named "Page 2 of 3". With `onValueChange`, the dots become page buttons in a group, with `aria-current`, a single tab stop, arrow keys (mirrored in right-to-left layouts), Home and End. Every dot sits in a target of at least 24px. `getAriaLabel` renames pages; `orientation` (`horizontal`, `vertical`); sizes `sm`, `md`, `lg`. - `Spinner`: the kit's loader, a ring-shaped groove around a raised hub with an arc running around it (`--spinner-fill`, default `--primary`). A `role="status"` named "Loading" (override with `aria-label`); with `aria-hidden` it is decoration only. Held still under reduced motion. Sizes `sm` (24px), `md` (40px), `lg` (64px). |
| Consumed | `neu-phase-2-composites.md` | `@neomorphic-ui/react` minor | Add the Phase 2 composites: `Card`, `Item`, `Separator`, `Calendar`, `Dial`, `BarMeter`, `Avatar` and `Tooltip`, each at `@neomorphic-ui/react/<name>`. - `Card`: a panel raised out of the surface (or an `inset` well, or `flat`), sizes `sm`, `md`, `lg` setting `--card-spacing`; images at the top or bottom run edge to edge. Parts `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. - `Item`: list rows like the kit's credit-card list. `ItemGroup` gives list semantics; rows are `flat`, `raised` or `inset`, `sm` or `md`, and rise and press when rendered as a link or button. Parts `ItemMedia` (icon tile or image), `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, `ItemSeparator`. - `Separator`: a `solid` groove or a `perforated` tear line, horizontal or vertical; decorative by default, `decorative={false}` for `role="separator"`. - `Calendar`: a month grid on react-day-picker (new dependency; every DayPicker prop passes through), raised from the page like a `Surface`. Days lie flat and rise on hover, today sits in a sunken well with a dot, and the selection is raised and filled with `--calendar-fill`; ranges get a tinted band. Raised round nav buttons, month/year dropdowns as raised pills over native selects, `--cell-size` to resize. Also exports `CalendarDayButton` and the `DateRange` type. - `Dial`: a circular slider, a raised knob in a ring well with a 270° gradient arc (`--dial-fill`, `--dial-fill-start`). Drag around the ring or use arrows, Page Up/Down, Home and End; `min`, `max`, `step`, `largeStep`, controlled or uncontrolled, `onValueCommitted`, `name` for forms, sizes `sm`, `md`, `lg`. Children sit in the knob. - `BarMeter`: a row of vertical meters like the kit's weather week. Each `BarMeterItem` is a well with a raised gradient fill (`--bar-meter-fill`, `--bar-meter-fill-start`) and takes `format`; `BarMeterValue` above, `BarMeterLabel` below. Sizes `sm`, `md`, `lg`, or set `--bar-meter-height`. - `Avatar`: a raised frame around an image or fallback initials, `circle` or `rounded`, sizes `sm` to `xl`, with `AvatarBadge`, `AvatarGroup` and `AvatarGroupCount`. - `Tooltip`: a raised popup on any side of its trigger, with `TooltipProvider` for a shared delay. |
| Consumed | `neu-phase-4a-forms-text.md` | `@neomorphic-ui/react` minor | Add the Phase 4 form and text components, each on its own subpath: `Label`, `Field` (with `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend` and `FieldSeparator`; a `FieldLabel` wrapped around a `Field` makes a raised choice card that presses in when checked), `NativeSelect`, `InputOTP`, `Kbd` and `KbdGroup`, the `Typography*` parts (`TypographyH1`–`H4`, paragraph, lead, blockquote, list, inline code and more), `Alert` (default, info, success, warning and destructive; `role="status"` unless urgent), `Empty`, `Skeleton`, `AspectRatio`, `DirectionProvider`/`useDirection`, and `ScrollArea` (groove track with a raised thumb). Adds the shared theme pieces later groups use: the `neu-shimmer` and `neu-shimmer-text` utilities (static under reduced motion), the `--neu-backdrop` overlay tint and the `--chart-1`…`--chart-5` tokens. |
| Consumed | `neu-phase-4b-disclosure-navigation.md` | `@neomorphic-ui/react` minor | Add the Phase 4 disclosure and navigation components: `Collapsible` (rotating `CollapsibleIndicator`, animated height), `Accordion` (raised panels whose open trigger presses in; `flat` variant with grooves for use inside a Card), `Tabs` (a well slides under the active tab; `line` variant), `Breadcrumb` (current page pressed in with `aria-current="page"`), `Pagination` (raised page buttons, current one pressed in and primary) and `Table` (rows split by grooves, sticky header, flat, raised or inset container, tinted selected rows). Links take `render` for router components. |
| Consumed | `neu-phase-4c-overlays.md` | `@neomorphic-ui/react` minor | Add the Phase 4 overlays, all sharing one raised popup style (which `Select` now uses too): `Popover`, `HoverCard`, `Dialog` (blurred backdrop, sm/md/lg, scrolling `DialogBody`), `AlertDialog` (no outside dismiss), `Sheet` (slides in from any edge; start/end follow RTL), `Drawer` (swipe to dismiss, snap points), `DropdownMenu`, `ContextMenu` and `Menubar` (checkbox and radio items, submenus, shortcuts, destructive items), `NavigationMenu` (a viewport panel that resizes between triggers) and `Toast` (`Toaster` plus `toast()` with `.success`, `.info`, `.warning`, `.error`, `.loading` and `.promise`). Built on Base UI, so no Radix, `cmdk`, `vaul` or `sonner`. |
| Consumed | `neu-phase-4d-pickers.md` | `@neomorphic-ui/react` minor | Add the Phase 4 pickers: `Combobox` (an input in an `InputGroup` well with a filtered raised list, groups, and `multiple` values as raised chips), `Command` (an always-open search list, plus `CommandDialog` for a ⌘K palette, built on Base UI Autocomplete) and `DatePicker`/`DateRangePicker` (a Calendar behind a raised field trigger, with presets, a typed `DatePickerInput` that syncs both ways, and a hidden `yyyy-mm-dd` input when given a `name`). |
| Consumed | `neu-phase-4e-layout-data.md` | `@neomorphic-ui/react` minor | Add the Phase 4 layout and data components: `Resizable` (panels split by a groove handle with an optional raised grip; uses `react-resizable-panels`), `Carousel` (raised previous/next buttons and a `PageIndicator`, RTL-aware arrow keys; uses `embla-carousel-react`), `Sidebar` (sidebar, floating and inset variants that collapse off-canvas or to icons, a Sheet on small screens, ⌘B/Ctrl+B, menus whose active row presses in) and `Chart` (`ChartContainer` turns a config into colour, bar-fill and area-fade variables; raised `ChartTooltipContent` and `ChartLegendContent`; uses `recharts`). Each third-party library is only loaded from its component's subpath. |
| Consumed | `neu-phase-4f-conversation-ai.md` | `@neomorphic-ui/react` minor | Add the Phase 4 conversation and AI components: `Bubble` (primary, raised, inset, tinted, outline, ghost and destructive chat bubbles, with `BubbleReactions`), `Message` (row layout with avatar, header and footer), `Marker` (inline status or "Today" separator, optional shimmer), `Attachment` (raised file tile with uploading, processing, error and done states, and a snapping `AttachmentGroup` row), `Trace` (agent steps with running, pending and error status and collapsible detail), `CodeBlock` (inset well with copy and wrap actions, line numbers, diff lines and Show more), `MessageScroller` (opens at the latest turn, follows streamed output only at the live edge, anchors new questions near the top, keeps place when history is prepended, and offers a jump-to-latest button) and `Questionnaire` (one question per step, choice cards with number-key shortcuts, validation, conditional and resumable steps). Syntax highlighting is opt-in through `useHighlightedCode` (`@neomorphic-ui/react/use-highlighted-code`), which loads `shiki`, a new optional peer dependency, on first use. |
| Consumed | `neu-slider-progress.md` | `@neomorphic-ui/react` minor | Add `Slider` (`@neomorphic-ui/react/slider`) and `Progress` (`@neomorphic-ui/react/progress`). - `Slider`, built on Base UI: the kit's music slider. A groove track, a fill that brightens toward the thumb (`--slider-fill`, default `--primary`), and a raised pill thumb with three grip grooves that sinks in while dragged. The thumb stays inside the track at both ends. An array value gives a range (one thumb each, named with `getAriaLabel`); `orientation="vertical"`; sizes `sm`, `md`, `lg`. `SliderLabel` and `SliderValue` go in `children`. - `Progress`, built on Base UI: a well with a raised fill that darkens toward its start (`--progress-fill`, default `--primary`). `size="lg"` is the kit's deep bar, and `valueInside` prints the value in the fill, moving it just past the fill's end while there isn't room. `value={null}` sweeps an indeterminate fill (held still under reduced motion). `ProgressLabel` and `ProgressValue` go in `children`. - New theme animation `--animate-neu-progress` (`animate-neu-progress`). |
| Consumed | `neu-switch.md` | `@neomorphic-ui/react` minor | Add `Switch` (`@neomorphic-ui/react/switch`), the kit's on/off switch: off, the track is a well with a raised thumb at the start; on, it fills with `--primary` and the thumb slides to the end, mirrored in right-to-left layouts. Sizes `sm`, `md` (48 × 24, the kit's) and `lg`; `aria-invalid` ring; a hidden native input submits with forms. |
| Consumed | `neu-textarea-select.md` | `@neomorphic-ui/react` minor | Add `Textarea` (`@neomorphic-ui/react/textarea`) and `Select` (`@neomorphic-ui/react/select`). - `Textarea`: the kit's message field, a well that deepens on focus. Resizes vertically, or grows with its text when `autoResize` (`field-sizing`). `aria-invalid` ring, shallower well when read-only. - `Select`, built on Base UI: `SelectTrigger` is the kit's raised, uppercase "SELECT CATEGORY" with a solid caret, pressed in while open (sizes `sm`, `md`, `lg`). `SelectContent` is a raised card whose highlighted item sinks in; the chosen item carries a check. Plus `SelectValue` (with `placeholder`), `SelectLabel` (wired to the trigger), `SelectItem`, `SelectGroup`, `SelectGroupLabel` and a grooved `SelectSeparator`; long lists scroll. |
| Consumed | `neu-toggle.md` | `@neomorphic-ui/react` minor | Add `Toggle` (`@neomorphic-ui/react/toggle`) and `ToggleGroup` + `ToggleGroupItem` (`@neomorphic-ui/react/toggle-group`). - `Toggle`: a two-state button, raised when off and pressed into the surface when on. Pressed content takes `--toggle-on` (set on the toggle or any ancestor, default `--primary`); `iconFill` turns an outline icon solid while on. Sizes `sm`, `md`, `lg`; `shape` `pill` (icon-only is a circle, like the kit's social toggles) or `rounded` for tiles. - `ToggleGroup`: a segmented control on the `ButtonGroup` slab, with arrow-key focus, single or `multiple` selection, `orientation`, `shape`, and a group-wide `size`. - `ButtonGroup` now flattens `Toggle` segments as well as `Button`s, and its segment rules are literal classes so Tailwind always generates them. |

## Dependencies and scripts

### `apps/storybook/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Removed | `@neomorphic-ui/react` | `workspace:*` | dependencies |
| Added | `@neomorphic-react/ui` | `workspace:*` | dependencies |
| Removed | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@arethetypeswrong/cli` | `^0.18.5` | devDependencies |
| Added | `publint` | `^0.3.25` | devDependencies |
| Changed | `storybook` | `pnpm --filter @neomorphic-react/storybook dev` | scripts |
| Changed | `release` | `turbo run build --filter=@neomorphic-react/ui && node scripts/check-pack.mjs && node scripts/lint-package.mjs && changeset publish` | scripts |
| Added | `check:pack` | `node scripts/check-pack.mjs` | scripts |
| Added | `lint:package` | `node scripts/lint-package.mjs` | scripts |

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Removed | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |
| Added | `@tanstack/react-table` | `^8.21.3` | devDependencies |
| Added | `@tanstack/react-table` | `^8.0.0` | peerDependencies |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Biome via `ultracite`, shared `@neomorphic-react/typescript-config`
- [x] `@neomorphic-react/ui` package: tsup build, subpath exports, Vitest + jsdom
- [x] New dependencies (each component on its own subpath so unused ones never ship): `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `recharts` (Chart), `@tanstack/react-table` (Data Table), `shiki` (optional highlighting for Code Block); all are optional peer dependencies of the package, installed only by apps that use those components
- [x] Data Table: `useDataTable` (sorting, filtering, pagination, selection and column visibility row models) and parts that draw it: raised `DataTable` with `aria-sort` headers, selected-row tint and an empty message; `DataTableColumnHeader` (ghost sort button, primary while sorted); `DataTableSelectAll`/`DataTableSelectRow` Checkboxes (indeterminate select-all); `DataTableFilter` Input; `DataTableViewOptions` column Dropdown Menu; `DataTablePagination` with ellipsis ranges and a live selection count; 6 tests, 2 stories (bookings example)
- [x] Code Block: inset code well, header with title and actions (copy with a "Copied" announcement, wrap toggle), floating actions shown on hover/focus, line numbers and `startLine`, wrap, highlighted/added/removed lines, `maxLines` with Show more/less, sm and destructive (error output) variants; highlighting in `useHighlightedCode` on its own subpath (`@neomorphic-react/ui/use-highlighted-code`; Shiki JS engine, core, languages and themes all loaded on first use; plain lines until ready); 7 tests, 5 stories
- [ ] Publish `@neomorphic-react/ui` to npm (step-by-step plan in [`PUBLISHING.md`](PUBLISHING.md))

## Changes by area

### apps/storybook · `@neomorphic-react/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/.storybook/main.ts` | 4 | 4 |
| Modified | `apps/storybook/.storybook/preview.css` | 2 | 2 |
| Modified | `apps/storybook/blocks/boarding-ticket.tsx` | 6 | 6 |
| Modified | `apps/storybook/blocks/chat-thread.tsx` | 11 | 11 |
| Deleted | `apps/storybook/blocks/data-table.tsx` | 0 | 547 |
| Modified | `apps/storybook/blocks/music-player.tsx` | 7 | 7 |
| Modified | `apps/storybook/blocks/newsletter-signup.tsx` | 4 | 4 |
| Modified | `apps/storybook/blocks/payment-methods.tsx` | 8 | 8 |
| Modified | `apps/storybook/blocks/settings-tiles.tsx` | 5 | 5 |
| Modified | `apps/storybook/blocks/travel-cards.tsx` | 7 | 7 |
| Modified | `apps/storybook/blocks/weather-widget.tsx` | 5 | 5 |
| Modified | `apps/storybook/package.json` | 3 | 3 |
| Modified | `apps/storybook/stories/accordion.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/alert-dialog.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/alert.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/aspect-ratio.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/attachment.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/avatar.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/badge.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/bar-meter.stories.tsx` | 3 | 3 |
| Deleted | `apps/storybook/stories/blocks/data-table.stories.tsx` | 0 | 127 |
| Modified | `apps/storybook/stories/breadcrumb.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/bubble.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/button-group.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/button.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/calendar.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/card.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/carousel.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/chart.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/checkbox.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/chip.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/code-block.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/collapsible.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/combobox.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/command.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/context-menu.stories.tsx` | 2 | 2 |
| Added | `apps/storybook/stories/data-table.stories.tsx` | 441 | 0 |
| Modified | `apps/storybook/stories/date-picker.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/dial.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/dialog.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/direction.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/drawer.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/dropdown-menu.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/empty.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/field.stories.tsx` | 10 | 10 |
| Modified | `apps/storybook/stories/foundations.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/hover-card.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input-group.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input-otp.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/item.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/kbd.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/marker.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/menubar.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/message-scroller.stories.tsx` | 7 | 7 |
| Modified | `apps/storybook/stories/message.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/native-select.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/navigation-menu.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/page-indicator.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/pagination.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/popover.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/progress.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/questionnaire.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/radio-group.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/resizable.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/scroll-area.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/select.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/separator.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/sheet.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/sidebar.stories.tsx` | 7 | 7 |
| Modified | `apps/storybook/stories/skeleton.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/slider.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/spinner.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/surface.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/switch.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/table.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/tabs.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/textarea.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/toast.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/toggle-group.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/toggle.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/tooltip.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/trace.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/typography.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/tsconfig.json` | 2 | 2 |
| Modified | `apps/storybook/vite.config.ts` | 1 | 1 |

### packages/typescript-config · `@neomorphic-react/typescript-config`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/typescript-config/package.json` | 1 | 1 |

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `packages/ui/LICENSE` | 21 | 0 |
| Added | `packages/ui/README.md` | 169 | 0 |
| Modified | `packages/ui/package.json` | 38 | 7 |
| Added | `packages/ui/src/data-table.test.tsx` | 161 | 0 |
| Added | `packages/ui/src/data-table.tsx` | 562 | 0 |
| Modified | `packages/ui/tsconfig.json` | 1 | 1 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `.changeset/README.md` | 1 | 1 |
| Deleted | `.changeset/neu-badge.md` | 0 | 5 |
| Deleted | `.changeset/neu-button-group.md` | 0 | 5 |
| Deleted | `.changeset/neu-button-loading-name.md` | 0 | 5 |
| Deleted | `.changeset/neu-button.md` | 0 | 5 |
| Deleted | `.changeset/neu-checkbox-radio.md` | 0 | 8 |
| Deleted | `.changeset/neu-chip.md` | 0 | 5 |
| Added | `.changeset/neu-initial-release.md` | 23 | 0 |
| Deleted | `.changeset/neu-input-input-group.md` | 0 | 8 |
| Deleted | `.changeset/neu-optional-peer-dependencies.md` | 0 | 5 |
| Deleted | `.changeset/neu-page-indicator-spinner.md` | 0 | 8 |
| Deleted | `.changeset/neu-phase-2-composites.md` | 0 | 14 |
| Deleted | `.changeset/neu-phase-4a-forms-text.md` | 0 | 5 |
| Deleted | `.changeset/neu-phase-4b-disclosure-navigation.md` | 0 | 5 |
| Deleted | `.changeset/neu-phase-4c-overlays.md` | 0 | 5 |
| Deleted | `.changeset/neu-phase-4d-pickers.md` | 0 | 5 |
| Deleted | `.changeset/neu-phase-4e-layout-data.md` | 0 | 5 |
| Deleted | `.changeset/neu-phase-4f-conversation-ai.md` | 0 | 5 |
| Deleted | `.changeset/neu-slider-progress.md` | 0 | 9 |
| Deleted | `.changeset/neu-switch.md` | 0 | 5 |
| Deleted | `.changeset/neu-textarea-select.md` | 0 | 8 |
| Deleted | `.changeset/neu-toggle.md` | 0 | 9 |
| Added | `.github/assets/preview.png` | binary | binary |
| Modified | `.github/workflows/ci.yml` | 11 | 3 |
| Modified | `AGENTS.md` | 18 | 6 |
| Added | `LICENSE` | 21 | 0 |
| Modified | `PUBLISHING.md` | 109 | 90 |
| Modified | `ROADMAP.md` | 8 | 7 |
| Modified | `package.json` | 6 | 2 |
| Modified | `pnpm-lock.yaml` | 382 | 4 |
| Modified | `scripts/add-component.mjs` | 2 | 2 |
| Added | `scripts/check-pack.mjs` | 68 | 0 |
| Added | `scripts/lint-package.mjs` | 51 | 0 |
