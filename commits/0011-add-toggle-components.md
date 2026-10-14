---
number: 11
subject: "add-toggle-components"
date: 2026-10-14T21:53:31+05:30
author: "punyprogrammer"
files: 12
insertions: 994
deletions: 15
---

<!-- nav --> [← 0008](0008-add-button-group.md) · [Index](README.md) · [0013 →](0013-add-checkbox-and-radiogroup.md)

# 0011 · add-toggle-components

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 11 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0011-add-toggle-components.md` |
| Parent | `ef8cc25` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T21:53:31+05:30 |
| Branch | `feat/implement-toggle-group` |
| Changes | 12 files · +994 −15 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Modified | `button-group.tsx` | `ButtonGroupProps`, `ButtonGroupTextProps`, `ButtonGroup`, `ButtonGroupText`, `buttonGroupVariants` | API unchanged |
| Added | `toggle-group.tsx` | `ToggleGroupItemProps`, `ToggleGroupProps`, `ToggleGroup`, `ToggleGroupItem` |  |
| Added | `toggle.tsx` | `ToggleProps`, `ToggleVariantsProps`, `Toggle`, `toggleVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Modified | `packages/ui/src/button-group.test.tsx` | 10 → 10 |
| Added | `packages/ui/src/toggle-group.test.tsx` | 8 |
| Added | `packages/ui/src/toggle.test.tsx` | 10 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `toggle-group.stories.tsx` | Default, KitReplica, Keyboard, Multiple, Sizes, ShapeAndOrientation |
| Added | `toggle.stories.tsx` | Default, KitReplica, States, Sizes, WithLabels, TileToggle |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-toggle.md` | `@neomorphic-ui/react` minor | Add `Toggle` (`@neomorphic-ui/react/toggle`) and `ToggleGroup` + `ToggleGroupItem` (`@neomorphic-ui/react/toggle-group`). - `Toggle`: a two-state button, raised when off and pressed into the surface when on. Pressed content takes `--toggle-on` (set on the toggle or any ancestor, default `--primary`); `iconFill` turns an outline icon solid while on. Sizes `sm`, `md`, `lg`; `shape` `pill` (icon-only is a circle, like the kit's social toggles) or `rounded` for tiles. - `ToggleGroup`: a segmented control on the `ButtonGroup` slab, with arrow-key focus, single or `multiple` selection, `orientation`, `shape`, and a group-wide `size`. - `ButtonGroup` now flattens `Toggle` segments as well as `Button`s, and its segment rules are literal classes so Tailwind always generates them. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Toggle: raised off / pressed-in on, `--toggle-on` colour, `iconFill`, round icon toggles and rounded tiles, sm/md/lg; 10 tests, 6 stories incl. kit social row and airplane tile
- [x] ToggleGroup: segmented control on the ButtonGroup slab, arrow-key focus, single/`multiple`, horizontal/vertical, rounded/pill, group `size`; 8 tests, 6 stories incl. kit OFF/ON and transport

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/toggle-group.stories.tsx` | 296 | 0 |
| Added | `apps/storybook/stories/toggle.stories.tsx` | 291 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Modified | `packages/ui/src/button-group.test.tsx` | 1 | 3 |
| Modified | `packages/ui/src/button-group.tsx` | 8 | 9 |
| Added | `packages/ui/src/toggle-group.test.tsx` | 95 | 0 |
| Added | `packages/ui/src/toggle-group.tsx` | 79 | 0 |
| Added | `packages/ui/src/toggle.test.tsx` | 100 | 0 |
| Added | `packages/ui/src/toggle.tsx` | 100 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-toggle.md` | 9 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
