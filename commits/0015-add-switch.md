---
number: 15
subject: "add-switch"
date: 2026-10-14T22:13:52+05:30
author: "punyprogrammer"
files: 8
insertions: 416
deletions: 5
---

<!-- nav --> [← 0013](0013-add-checkbox-and-radiogroup.md) · [Index](README.md) · [0017 →](0017-add-textarea-and-select.md)

# 0015 · add-switch

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 15 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0015-add-switch.md` |
| Parent | `80ba091` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T22:13:52+05:30 |
| Branch | `feat/implement-switch` |
| Changes | 8 files · +416 −5 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `switch.tsx` | `SwitchProps`, `Switch`, `switchThumbVariants`, `switchVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/switch.test.tsx` | 10 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `switch.stories.tsx` | Default, KitReplica, States, Sizes, RightToLeft, SettingsList |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-switch.md` | `@neomorphic-ui/react` minor | Add `Switch` (`@neomorphic-ui/react/switch`), the kit's on/off switch: off, the track is a well with a raised thumb at the start; on, it fills with `--primary` and the thumb slides to the end, mirrored in right-to-left layouts. Sizes `sm`, `md` (48 × 24, the kit's) and `lg`; `aria-invalid` ring; a hidden native input submits with forms. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Switch: well track off / dark `--primary` track on, raised thumb that slides (RTL-aware), sm/md/lg, `aria-invalid` ring, native input for forms; 10 tests, 6 stories incl. kit pair and settings card

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/.storybook/main.ts` | 28 | 3 |
| Added | `apps/storybook/stories/switch.stories.tsx` | 187 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 5 | 0 |
| Added | `packages/ui/src/switch.test.tsx` | 102 | 0 |
| Added | `packages/ui/src/switch.tsx` | 86 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-switch.md` | 5 | 0 |
| Modified | `ROADMAP.md` | 2 | 2 |
