---
number: 33
subject: "add-optional-deps"
date: 2026-10-15T12:07:19+05:30
author: "punyprogrammer"
files: 8
insertions: 496
deletions: 117
---

<!-- nav --> [← 0031](0031-add-phase-4-components.md) · [Index](README.md) · latest →

# 0033 · add-optional-deps

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 33 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0033-add-optional-deps.md` |
| Parent | `a7667a5` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T12:07:19+05:30 |
| Branch | `main` |
| Changes | 8 files · +496 −117 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Modified | `card.tsx` | `CardPartProps`, `CardProps`, `Card`, `CardAction`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `cardVariants` | API unchanged |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-optional-peer-dependencies.md` | `@neomorphic-ui/react` patch | Make `recharts`, `embla-carousel-react`, `react-resizable-panels` and `react-day-picker` optional peer dependencies, so installing the library no longer downloads them. Install the ones your components need: `react-day-picker@^10` for `Calendar` and `DatePicker`, `embla-carousel-react@^8` for `Carousel`, `recharts@^3` for `Chart`, and `react-resizable-panels@^4` for `Resizable` (plus `shiki@^4` for `useHighlightedCode`, as before). |

## Dependencies and scripts

### `apps/storybook/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `embla-carousel-react` | `^8.6.0` | dependencies |
| Added | `react-day-picker` | `^10.0.2` | dependencies |
| Added | `react-resizable-panels` | `^4.14.5` | dependencies |

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Removed | `embla-carousel-react` | `^8.6.0` | dependencies |
| Removed | `react-day-picker` | `^10.0.2` | dependencies |
| Removed | `react-resizable-panels` | `^4.14.5` | dependencies |
| Removed | `recharts` | `^3.10.1` | dependencies |
| Added | `embla-carousel-react` | `^8.6.0` | devDependencies |
| Added | `react-day-picker` | `^10.0.2` | devDependencies |
| Added | `react-resizable-panels` | `^4.14.5` | devDependencies |
| Added | `recharts` | `^3.10.1` | devDependencies |
| Added | `embla-carousel-react` | `^8.0.0` | peerDependencies |
| Added | `react-day-picker` | `^10.0.0` | peerDependencies |
| Added | `react-resizable-panels` | `^4.0.0` | peerDependencies |
| Added | `recharts` | `^3.0.0` | peerDependencies |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] New dependencies (each component on its own subpath so unused ones never ship): `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `recharts` (Chart), `@tanstack/react-table` (Data Table block only), `shiki` (optional highlighting for Code Block); all except `@tanstack/react-table` are optional peer dependencies of the package, installed only by apps that use those components
- [x] Button: `icon` (any element) + `iconPosition` (start, end, top, bottom), icon tiles, pill/circle, default/primary/destructive/ghost, sm/md/lg, loading, `aria-pressed`; 28 tests, 10 stories incl. kit replica
- [x] Badge: `count`/`max`/`showZero`, `dot`, raised/inset + token fills, sm/md/lg; `BadgeAnchor` + `placement` (4 logical corners) and `overlap="circular"`; 23 tests, 8 stories incl. kit replica
- [x] Chip (new): icon + label status pill ("Paid", "Due soon"), decorative `icon` + `iconPosition` (start/end, RTL-aware) like Button, raised/inset + token fills with paired foregrounds, sm/md/lg, `render` (e.g. `<li>`); 15 tests, 6 stories incl. invoice list and live status. Removable and selectable chips still to come
- [x] ButtonGroup: prev/next stepper as one raised slab with grooves, segments sink while pressed/`aria-pressed`, `ButtonGroupText` readout, horizontal/vertical, rounded/pill; 10 tests, 8 stories incl. kit replica and live pager
- [x] Toggle: raised off / pressed-in on, `--toggle-on` colour, `iconFill`, round icon toggles and rounded tiles, sm/md/lg; 10 tests, 6 stories incl. kit social row and airplane tile
- [x] ToggleGroup: segmented control on the ButtonGroup slab, arrow-key focus, single/`multiple`, horizontal/vertical, rounded/pill, group `size`; 8 tests, 6 stories incl. kit OFF/ON and transport
- [x] Checkbox: empty well / raised with check, `indeterminate` dash, `aria-invalid` ring, sm/md/lg, native input for forms; 10 tests, 6 stories incl. kit pair and select-all
- [x] RadioGroup: empty round well / raised with dot, arrow-key choice, group `size`, stacked or row; 7 tests, 6 stories incl. kit pair and card options
- [x] Switch: well track off / dark `--primary` track on, raised thumb that slides (RTL-aware), sm/md/lg, `aria-invalid` ring, native input for forms; 10 tests, 6 stories incl. kit pair and settings card
- [x] Input: Base UI `Input` (works in a `Field`), well that deepens on focus, shallower read-only, invalid ring, rounded/pill, sm/md/lg, `htmlSize`; 7 tests, 6 stories incl. kit search pill and native types
- [x] InputGroup: one well around a bare input or growing textarea, lit by the control's focus/invalid/disabled, press-to-focus; addons inline/block with icons, `InputGroupText`, `InputGroupButton` fitted to group size and shape (4px inset); 8 tests, 7 stories incl. kit search, Subscribe and chat composer
- [x] Textarea: well that deepens on focus, `autoResize` (`field-sizing`), invalid/read-only/disabled; 8 tests, 5 stories incl. kit field and live counter
- [x] Select: raised uppercase trigger with solid caret, pressed while open, raised popup with sunken highlight and check, label/groups/separator, sm/md/lg; 8 tests, 6 stories incl. kit trigger and grouped time zones
- [x] Slider: groove track, `--slider-fill` gradient, raised pill thumb with grip grooves that sinks while dragged, edge-aligned, ranges, vertical, `SliderLabel`/`SliderValue`, sm/md/lg; 10 tests, 7 stories incl. kit music sliders and equaliser
- [x] Progress: well track with raised `--progress-fill` gradient, `valueInside` (steps past the fill when it won't fit), indeterminate sweep, `ProgressLabel`/`ProgressValue`, sm/md/lg; 8 tests, 6 stories incl. kit PROGRESS card
- [x] PageIndicator (new): well dots with a raised `--page-indicator-fill` current dot, passive image or page buttons (`onValueChange`) with `aria-current`, roving focus, arrows/Home/End (RTL-aware), 24px targets, horizontal/vertical, sm/md/lg; 9 tests, 6 stories incl. kit dots and onboarding card
- [x] Spinner: ring groove around a raised hub with a `--spinner-fill` arc, `role="status"` (decorative when `aria-hidden`), still under reduced motion, sm/md/lg; 7 tests, 5 stories incl. kit loader and loading card
- [x] Card: raised/inset/flat panel, sm/md/lg spacing via `--card-spacing`, edge-to-edge images, `CardHeader`/`Title`/`Description`/`Action`/`Content`/`Footer`, `render` for links; 7 tests, 5 stories incl. kit travel card and nested wells
- [x] Item: list rows in an `ItemGroup` (list semantics), flat/raised/inset, sm/md, links and buttons rise and press, `ItemMedia` icon tile/image, `ItemContent`/`Title`/`Description`/`Actions`/`Header`/`Footer`, `ItemSeparator`; 6 tests, 5 stories incl. kit credit-card list
- [x] Separator: solid groove (dark line + light edge) or perforated tear line, horizontal/vertical, decorative by default or semantic `role="separator"`; 6 tests, 4 stories incl. kit boarding pass
- [x] Calendar: react-day-picker month grid raised like a `Surface`, flat days that rise on hover, today in a sunken well with a dot, raised `--calendar-fill` selection, tinted range band, raised round nav, month/year pills over native selects, `--cell-size`; 9 tests, 6 stories incl. kit March 2020 card
- [x] Dial (new): circular `role="slider"`, raised knob in a ring well with a 270° `--dial-fill` gradient arc and indicator dot, drag around the ring (dead centre, gap holds the nearer end), arrows/Page/Home/End, `step`, controlled or not, `name` for forms, sm/md/lg; 10 tests, 5 stories incl. kit volume knob and thermostat
- [x] BarMeter (new): row of vertical meters, each a well with a raised `--bar-meter-fill` gradient rising from its foot, `BarMeterValue` above and `BarMeterLabel` below, `format`, sm/md/lg and `--bar-meter-height`; 6 tests, 4 stories incl. kit weather week
- [x] Avatar: raised frame around image or fallback initials, circle/rounded, sm/md/lg/xl, `AvatarBadge` status dot, overlapping `AvatarGroup` with `AvatarGroupCount`; 7 tests, 5 stories incl. kit info box thumbnail
- [x] Tooltip: raised popup above the trigger (all four sides), `TooltipProvider` shared delay, scale/fade in, `--z-tooltip`; 5 tests, 3 stories incl. icon toolbar
- [x] Label: styled `<label>`, disabled/invalid states follow the control (`peer`/`group` data attributes); `labelClassName` exported; tested with Field, `PlainLabel` story
- [x] Field: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`/`FieldLegend`, `FieldSeparator`, vertical/horizontal/responsive; wires `aria-describedby`/`aria-invalid` into Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider. `FieldLabel` around a `Field` makes a raised choice card that presses in when checked; `FieldError` shows given `errors` or children without waiting for native validity; label and description fall back to plain elements outside a `Field`; 8 tests, 5 stories
- [x] Native Select: native `<select>` in an Input-style well with a caret icon, sm/md/lg, `NativeSelectOption`/`OptGroup`; 4 tests, 3 stories
- [x] Input OTP: slots as small wells, active slot sinks deeper with a caret, `InputOTPGroup`/`Separator`, digits/alphanumeric pattern, paste fills all slots, sm/md/lg; 4 tests, 3 stories
- [x] Kbd: static raised key cap, `KbdGroup` for chords, sm/md; 3 tests, 2 stories
- [x] Typography: `h1`–`h4`, paragraph, lead, large, small, muted, blockquote (inset well with a primary rule), list, inline code (inset); headings use `--font-heading` when set; every part takes `render`; 4 tests, 2 stories
- [x] Alert: inset well with a coloured rule and icon, `AlertTitle`/`AlertDescription`/`AlertAction`, default/info/success/warning/destructive, `role="status"` by default and `role="alert"` only for urgent messages; 4 tests, 3 stories
- [x] Empty: centred empty state with a raised icon tile (or Avatar), `EmptyHeader`/`Media`/`Title`/`Description`/`Content` for actions, flat or inset; 3 tests, 2 stories
- [x] Skeleton: inset placeholder with the shared shimmer, line/circle/rect presets, `aria-hidden`; 2 tests, 2 stories
- [x] Aspect Ratio: `aspect-ratio` wrapper for images and video in Card, Carousel and Attachment; 2 tests, 2 stories
- [x] Direction: `DirectionProvider`/`useDirection` re-export; Slider, Dial, Page Indicator, Chip and Carousel read it for RTL; 2 tests, 1 story (RTL slider)
- [x] Scroll Area: groove track with a raised pill thumb that appears on hover/scroll, vertical/horizontal/both, optional edge fade, focusable viewport when it overflows; 2 tests, 2 stories
- [x] Collapsible: trigger with a rotating chevron (`CollapsibleIndicator`), animated height via `--collapsible-panel-height`, `keepMounted`, `hiddenUntilFound`; 3 tests, 2 stories
- [x] Accordion: items as raised panels, open trigger presses in and its chevron turns over in the primary colour, single/multiple, disabled items, `flat` variant with grooves for use in a Card; headers sit in the Tab order (Base UI 1.9 dropped arrow-key roving per the APG update); 5 tests, 4 stories
- [x] Tabs: tab list as a Toggle Group-style slab, a well slides under the active tab (Base UI Indicator), which also takes `--tabs-active` colour and weight, `line` variant with a primary bar, horizontal/vertical, `TabsContent` panels; 5 tests, 4 stories
- [x] Breadcrumb: `nav` > `ol`, custom separators, `BreadcrumbEllipsis` (collapsed items in a Dropdown Menu once 4c lands), current page pressed in with `aria-current="page"`, `render` for router links; 6 tests, 3 stories
- [x] Pagination: raised page buttons, current page pressed in and primary with `aria-current="page"`, previous/next, ellipsis, sm/md, `render` for router links; 5 tests, 2 stories
- [x] Table: rows split by grooves, uppercase muted header over a groove (no well: per-cell wells seam), `TableCaption`/`Footer`, sticky header, flat/raised/inset container, selected rows (`aria-selected`) take a primary tint and a leading bar; 6 tests, 3 stories
- [x] Popover: raised popup (no arrow, like Tooltip), `side`/`align`/`sideOffset`, `PopoverHeader`/`Title`/`Description`/`Close`, focus moves in and returns, `--z-popover`; 3 tests, 2 stories
- [x] Hover Card: raised preview card on hover/focus, `delay`/`closeDelay` on the trigger (rendered as a primary link); 2 tests, 1 story
- [x] Dialog: raised panel over a blurred backdrop, sm/md/lg, `DialogHeader`/`Title`/`Description`/`Body`/`Footer`/`Close`, X button (`showCloseButton`), focus trap, `DialogBody` scrolls; 4 tests, 2 stories
- [x] Alert Dialog: needs an explicit choice (no outside dismiss), default/sm sizes (sm centres and splits the footer), raised `AlertDialogMedia` tile, `AlertDialogAction`/`Cancel` as Buttons (destructive via `variant`); 4 tests, 2 stories
- [x] Sheet: Dialog sliding in from top/bottom/start/end/left/right (start/end follow RTL), sm–xl widths, only the inner edge rounded; 3 tests, 2 stories
- [x] Drawer: `direction` top/bottom/left/right, raised grip on bottom drawers, swipe to dismiss (backdrop fades with swipe progress), snap points; 3 tests, 3 stories
- [x] Dropdown Menu: raised popup, highlighted item sinks, checkbox/radio items with primary marks (radio closes on click), labels, groove separators, submenus, plain-text shortcuts, destructive items; parts shared with Context Menu and Menubar via `menu-parts.tsx`; 6 tests, 2 stories
- [x] Context Menu: same item parts as Dropdown Menu, opened on right-click/long-press; 1 test, 1 story
- [x] Menubar: raised slab of menu triggers, open trigger pressed in and primary, arrow keys move between menus; 2 tests, 1 story
- [x] Navigation Menu: site nav with a raised viewport panel that resizes and slides between triggers, open trigger pressed in, links sink on hover, `data-active` link primary, `navigationMenuTriggerStyle()`, `render` for router links; 3 tests, 1 story
- [x] Toast: stacked raised toasts with coloured icons (Alert colours), title/description/action/close, swipe to dismiss, `Toaster` (position, limit, duration) + `toast()` with `.success`/`.info`/`.warning`/`.error`/`.loading`/`.promise`/`.dismiss`, `--z-toast`; 5 tests, 3 stories
- [x] Combobox: `ComboboxInput` in an `InputGroup` well with chevron and clear buttons, raised filtered list (highlight sinks, chosen row checked and primary), groups with `ComboboxCollection`, `ComboboxEmpty`, `multiple` values as raised `ComboboxChip`s in a `ComboboxChips` well (`useComboboxAnchor`), `ComboboxTrigger` for a searchable select; 7 tests, 4 stories
- [x] Command: always-open search list (`CommandInput`/`List`/`Group` with `heading`/`Collection`/`Item`/`Empty`/`Separator`/`Shortcut`), first match stays highlighted, running an item keeps the query, `CommandDialog` for a ⌘K palette (bare inside the raised dialog); 5 tests, 2 stories
- [x] Date Picker: `DatePicker` (closes on pick) and `DateRangePicker` (two months, stays open) behind a raised field trigger, `presets` column (matching one pressed in), `DatePickerInput` typed date in a well that syncs with the Calendar both ways and flags unparseable text on blur, `formatDate`/`parseDate`, `name` adds a `yyyy-mm-dd` hidden input; 5 tests, 4 stories
- [x] Resizable: panel groups split by a groove handle (primary while hovered, focused or dragged) with an optional raised grip that presses in while dragged, keyboard resize, horizontal/vertical, sizes as pixels (numbers) or percentages (strings); 2 tests, 2 stories
- [x] Carousel: track with raised round previous/next buttons and a `PageIndicator` (`CarouselIndicator`), horizontal/vertical, `opts` (loop, align) and `plugins` (autoplay off unless added), `gap`, arrow keys (RTL-aware), `onSlideChange`/`setApi`, labelled `region` with `aria-roledescription` carousel/slide, viewport padding so raised slides' shadows aren't clipped; 3 tests, 3 stories
- [x] Sidebar: raised side panel (`sidebar`/`floating`/`inset` variants, left/right), `SidebarProvider` (⌘B/Ctrl+B, `sidebar_state` cookie, controlled `open`), collapses `offcanvas` or to `icon`s with labels in tooltips, Sheet below `md`, header/footer/content/groups with label and action, menus with badge (inset pill), hover-only actions, sub-menus off a groove (wrap in Collapsible), rows rise on hover and the active row presses in, rail, skeleton rows; 6 tests, 5 stories
- [x] Data Table: block in `apps/storybook/blocks/data-table.tsx` (like shadcn's guide, not a package component): raised Table, sortable ghost-button headers with `aria-sort`, passenger filter Input, column visibility Dropdown Menu, row selection Checkboxes with an indeterminate select-all, status Chips, row action menus, Pagination rendered as buttons; 2 stories
- [x] Chart: `ChartContainer` turns `ChartConfig` into `--color-*`, `--fill-*` (BarMeter gradient, darker at the base) and `--area-*` (fading) variables and styles axes, grid and cursor for the surface; small raised `ChartTooltipContent` (dot/line/dashed indicator, `hideLabel`/`hideIndicator`, `formatter`, `nameKey`/`labelKey`), `ChartLegendContent`; 4 tests, 6 stories (area, bar, line, pie, radar, radial)
- [x] Bubble: chat bubble, default (primary)/secondary (raised)/muted (inset)/tinted/outline/ghost (no padding, full width)/destructive (inset with a red tint), `align` start/end tucks in the corner nearest the speaker, max 80% width, `BubbleContent` with `render`, `BubbleReactions` (raised pill on the top or bottom edge, `role="img"` with a label), `BubbleGroup`; 4 tests, 4 stories
- [x] Message: chat row layout with `MessageAvatar` (bottom-aligned, lifted above a footer), `MessageHeader`/`Content`/`Footer` (actions, status; flush with ghost bubbles), `align` mirrors the row, `MessageGroup`; 2 tests, 3 stories
- [x] Marker: inline status or note in a thread, default/border/separator (groove lines, no `role="separator"`), `MarkerIcon` (`aria-hidden`), `role="status"` with Spinner while streaming, `shimmer` on the text, `render` for a link or button; 3 tests, 3 stories
- [x] Attachment: raised file tile (idle sits in a well), idle/uploading/processing/error/done (errors stated in the description, shimmering title while busy), default/sm/xs, horizontal/vertical, icon or image media (dimmed until done), `AttachmentProgress`, corner actions, full-card `AttachmentTrigger` that presses the tile in, `AttachmentGroup` scroll row with snapping; uses native overflow rather than Scroll Area so the tiles' shadows aren't clipped; 4 tests, 5 stories
- [x] Trace: agent step list, `TraceLine` with running/pending/error status, icon, truncating title (shimmers while running), description, `TraceCollapsible` with a turning chevron and detail under a groove; 2 tests, 1 story
- [x] Code Block: inset code well, header with title and actions (copy with a "Copied" announcement, wrap toggle), floating actions shown on hover/focus, line numbers and `startLine`, wrap, highlighted/added/removed lines, `maxLines` with Show more/less, sm and destructive (error output) variants; highlighting in `useHighlightedCode` on its own subpath (`@neomorphic-ui/react/use-highlighted-code`; Shiki JS engine, core, languages and themes all loaded on first use; plain lines until ready); 7 tests, 5 stories
- [x] Message Scroller: chat scroll viewport (focusable "Messages" region, hidden until positioned) that opens at the latest turn (`last-anchor`/`end`/`start`), follows streamed output only while at the live edge (`autoScroll`), stops on wheel/touch/keyboard/scrollbar/selection, settles new `scrollAnchor` rows near the top with a peek of the row before, keeps position when history is prepended, `scrollToMessage`/`scrollToEnd`/`scrollToStart` via `useMessageScroller`, jump-to-latest raised button (inert while not needed), `role="log"`; headless scroll controller written here instead of Scroll Area (native scrolling keeps the spacer and anchoring maths simple); 5 tests, 3 stories
- [x] Questionnaire: multi-step form, one question per step as a fieldset, raised choice cards (radio or checkbox), freeform Input that replaces a single choice, Progress ("Question n of total"), previous/skip/next/submit, number-key shortcuts with Kbd hints, required and custom validation (announced, focus moves to the first choice), conditional (`when`) and resumable (`defaultValues`/`defaultActiveItem`) steps, Enter in a text answer moves on; headless state written here (shadcn uses `@shadcn/react`); 5 tests, 3 stories
- [ ] Release workflow: Changesets version PR + npm publish (Phase 6 of [`PUBLISHING.md`](PUBLISHING.md))
- [ ] Docs site (Fumadocs) with demos and LLMs.txt
- [ ] Publish `@neomorphic-ui/react` to npm (step-by-step plan in [`PUBLISHING.md`](PUBLISHING.md))

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/package.json` | 3 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 20 | 4 |
| Modified | `packages/ui/src/card.tsx` | 3 | 2 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-optional-peer-dependencies.md` | 5 | 0 |
| Modified | `AGENTS.md` | 45 | 6 |
| Added | `PUBLISHING.md` | 307 | 0 |
| Modified | `ROADMAP.md` | 92 | 93 |
| Modified | `pnpm-lock.yaml` | 21 | 12 |
