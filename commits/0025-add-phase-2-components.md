---
number: 25
subject: "add-phase-2-components"
date: 2026-10-15T00:42:18+05:30
author: "punyprogrammer"
files: 29
insertions: 3737
deletions: 12
---

<!-- nav --> [← 0023](0023-add-input-and-input-groups.md) · [Index](README.md) · [0027 →](0027-add-phase-3-components.md)

# 0025 · add-phase-2-components

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 25 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0025-add-phase-2-components.md` |
| Parent | `7df41b2` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T00:42:18+05:30 |
| Branch | `feat/implement-phase-2-components` |
| Changes | 29 files · +3737 −12 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `avatar.tsx` | `AvatarFallbackProps`, `AvatarImageProps`, `AvatarProps`, `Avatar`, `AvatarBadge`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarImage`, `avatarVariants` |  |
| Added | `bar-meter.tsx` | `BarMeterItemProps`, `BarMeterLabelProps`, `BarMeterProps`, `BarMeterValueProps`, `BarMeter`, `BarMeterItem`, `BarMeterLabel`, `BarMeterValue`, `barMeterVariants` |  |
| Added | `calendar.tsx` | `DateRange`, `CalendarProps`, `Calendar`, `CalendarDayButton` |  |
| Added | `card.tsx` | `CardPartProps`, `CardProps`, `Card`, `CardAction`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `cardVariants` |  |
| Added | `dial.tsx` | `DialProps`, `Dial`, `dialVariants` |  |
| Added | `item.tsx` | `ItemMediaProps`, `ItemProps`, `Item`, `ItemActions`, `ItemContent`, `ItemDescription`, `ItemFooter`, `ItemGroup`, `ItemHeader`, `ItemMedia`, `ItemSeparator`, `ItemTitle`, `itemMediaVariants`, `itemVariants` |  |
| Added | `separator.tsx` | `SeparatorProps`, `Separator`, `separatorVariants` |  |
| Added | `tooltip.tsx` | `TooltipContentProps`, `TooltipProps`, `TooltipProviderProps`, `TooltipTriggerProps`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/avatar.test.tsx` | 7 |
| Added | `packages/ui/src/bar-meter.test.tsx` | 6 |
| Added | `packages/ui/src/calendar.test.tsx` | 9 |
| Added | `packages/ui/src/card.test.tsx` | 5 |
| Added | `packages/ui/src/dial.test.tsx` | 10 |
| Added | `packages/ui/src/item.test.tsx` | 6 |
| Added | `packages/ui/src/separator.test.tsx` | 6 |
| Added | `packages/ui/src/tooltip.test.tsx` | 5 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `avatar.stories.tsx` | Default, KitReplica, Sizes, WithBadge, Group |
| Added | `bar-meter.stories.tsx` | Default, KitReplica, Sizes, Storage |
| Added | `calendar.stories.tsx` | Default, KitReplica, InCard, Range, Dropdowns, DisabledDays |
| Added | `card.stories.tsx` | Default, KitReplica, Elevations, Sizes, Nested |
| Added | `dial.stories.tsx` | Default, KitReplica, Sizes, Thermostat, Disabled |
| Added | `item.stories.tsx` | Default, KitReplica, AsLinks, Variants, WithSeparators |
| Added | `separator.stories.tsx` | Default, KitReplica, Semantic, Vertical |
| Added | `tooltip.stories.tsx` | Default, Toolbar, Sides |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-phase-2-composites.md` | `@neomorphic-ui/react` minor | Add the Phase 2 composites: `Card`, `Item`, `Separator`, `Calendar`, `Dial`, `BarMeter`, `Avatar` and `Tooltip`, each at `@neomorphic-ui/react/<name>`. - `Card`: a panel raised out of the surface (or an `inset` well, or `flat`), sizes `sm`, `md`, `lg` setting `--card-spacing`; images at the top or bottom run edge to edge. Parts `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. - `Item`: list rows like the kit's credit-card list. `ItemGroup` gives list semantics; rows are `flat`, `raised` or `inset`, `sm` or `md`, and rise and press when rendered as a link or button. Parts `ItemMedia` (icon tile or image), `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, `ItemSeparator`. - `Separator`: a `solid` groove or a `perforated` tear line, horizontal or vertical; decorative by default, `decorative={false}` for `role="separator"`. - `Calendar`: a month grid on react-day-picker (new dependency; every DayPicker prop passes through), raised from the page like a `Surface`. Days lie flat and rise on hover, today sits in a sunken well with a dot, and the selection is raised and filled with `--calendar-fill`; ranges get a tinted band. Raised round nav buttons, month/year dropdowns as raised pills over native selects, `--cell-size` to resize. Also exports `CalendarDayButton` and the `DateRange` type. - `Dial`: a circular slider, a raised knob in a ring well with a 270° gradient arc (`--dial-fill`, `--dial-fill-start`). Drag around the ring or use arrows, Page Up/Down, Home and End; `min`, `max`, `step`, `largeStep`, controlled or uncontrolled, `onValueCommitted`, `name` for forms, sizes `sm`, `md`, `lg`. Children sit in the knob. - `BarMeter`: a row of vertical meters like the kit's weather week. Each `BarMeterItem` is a well with a raised gradient fill (`--bar-meter-fill`, `--bar-meter-fill-start`) and takes `format`; `BarMeterValue` above, `BarMeterLabel` below. Sizes `sm`, `md`, `lg`, or set `--bar-meter-height`. - `Avatar`: a raised frame around an image or fallback initials, `circle` or `rounded`, sizes `sm` to `xl`, with `AvatarBadge`, `AvatarGroup` and `AvatarGroupCount`. - `Tooltip`: a raised popup on any side of its trigger, with `TooltipProvider` for a shared delay. |

## Dependencies and scripts

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `react-day-picker` | `^10.0.2` | dependencies |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Card: raised/inset/flat panel, sm/md/lg spacing via `--card-spacing`, edge-to-edge images, `CardHeader`/`Title`/`Description`/`Action`/`Content`/`Footer`, `render` for links; 7 tests, 5 stories incl. kit travel card and nested wells
- [x] Item: list rows in an `ItemGroup` (list semantics), flat/raised/inset, sm/md, links and buttons rise and press, `ItemMedia` icon tile/image, `ItemContent`/`Title`/`Description`/`Actions`/`Header`/`Footer`, `ItemSeparator`; 6 tests, 5 stories incl. kit credit-card list
- [x] Separator: solid groove (dark line + light edge) or perforated tear line, horizontal/vertical, decorative by default or semantic `role="separator"`; 6 tests, 4 stories incl. kit boarding pass
- [x] Calendar: react-day-picker month grid raised like a `Surface`, flat days that rise on hover, today in a sunken well with a dot, raised `--calendar-fill` selection, tinted range band, raised round nav, month/year pills over native selects, `--cell-size`; 9 tests, 6 stories incl. kit March 2020 card
- [x] Dial (new): circular `role="slider"`, raised knob in a ring well with a 270° `--dial-fill` gradient arc and indicator dot, drag around the ring (dead centre, gap holds the nearer end), arrows/Page/Home/End, `step`, controlled or not, `name` for forms, sm/md/lg; 10 tests, 5 stories incl. kit volume knob and thermostat
- [x] BarMeter (new): row of vertical meters, each a well with a raised `--bar-meter-fill` gradient rising from its foot, `BarMeterValue` above and `BarMeterLabel` below, `format`, sm/md/lg and `--bar-meter-height`; 6 tests, 4 stories incl. kit weather week
- [x] Avatar: raised frame around image or fallback initials, circle/rounded, sm/md/lg/xl, `AvatarBadge` status dot, overlapping `AvatarGroup` with `AvatarGroupCount`; 7 tests, 5 stories incl. kit info box thumbnail
- [x] Tooltip: raised popup above the trigger (all four sides), `TooltipProvider` shared delay, scale/fade in, `--z-tooltip`; 5 tests, 3 stories incl. icon toolbar

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/avatar.stories.tsx` | 154 | 0 |
| Added | `apps/storybook/stories/bar-meter.stories.tsx` | 172 | 0 |
| Added | `apps/storybook/stories/calendar.stories.tsx` | 165 | 0 |
| Added | `apps/storybook/stories/card.stories.tsx` | 190 | 0 |
| Added | `apps/storybook/stories/dial.stories.tsx` | 139 | 0 |
| Added | `apps/storybook/stories/item.stories.tsx` | 228 | 0 |
| Added | `apps/storybook/stories/separator.stories.tsx` | 115 | 0 |
| Added | `apps/storybook/stories/tooltip.stories.tsx` | 116 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 41 | 0 |
| Added | `packages/ui/src/avatar.test.tsx` | 106 | 0 |
| Added | `packages/ui/src/avatar.tsx` | 171 | 0 |
| Added | `packages/ui/src/bar-meter.test.tsx` | 91 | 0 |
| Added | `packages/ui/src/bar-meter.tsx` | 162 | 0 |
| Added | `packages/ui/src/calendar.test.tsx` | 145 | 0 |
| Added | `packages/ui/src/calendar.tsx` | 251 | 0 |
| Added | `packages/ui/src/card.test.tsx` | 79 | 0 |
| Added | `packages/ui/src/card.tsx` | 171 | 0 |
| Added | `packages/ui/src/dial.test.tsx` | 155 | 0 |
| Added | `packages/ui/src/dial.tsx` | 330 | 0 |
| Added | `packages/ui/src/item.test.tsx` | 97 | 0 |
| Added | `packages/ui/src/item.tsx` | 259 | 0 |
| Added | `packages/ui/src/separator.test.tsx` | 54 | 0 |
| Added | `packages/ui/src/separator.tsx` | 106 | 0 |
| Added | `packages/ui/src/tooltip.test.tsx` | 71 | 0 |
| Added | `packages/ui/src/tooltip.tsx` | 102 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 8 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-phase-2-composites.md` | 14 | 0 |
| Modified | `ROADMAP.md` | 10 | 10 |
| Modified | `pnpm-lock.yaml` | 35 | 2 |
