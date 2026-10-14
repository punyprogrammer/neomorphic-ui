---
number: 7
subject: "add-badge"
date: 2026-10-14T21:28:31+05:30
author: "punyprogrammer"
files: 8
insertions: 715
deletions: 4
---

<!-- nav --> [← 0004](0004-add-button.md) · [Index](README.md) · latest →

# 0007 · add-badge

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 7 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0007-add-badge.md` |
| Parent | `dc74e69` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T21:28:31+05:30 |
| Branch | `feat/implement-badge-comment` |
| Changes | 8 files · +715 −4 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `badge.tsx` | `BadgeAnchorProps`, `BadgeProps`, `Badge`, `BadgeAnchor`, `badgeVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/badge.test.tsx` | 19 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `badge.stories.tsx` | Default, KitReplica, Variants, Sizes, Counts, Placements, InButton, Live |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-badge.md` | `@neomorphic-ui/react` minor | Add `Badge` and `BadgeAnchor` (`@neomorphic-ui/react/badge`): a raised marker for counts, dots, and short labels. `count` with `max` (reads `99+`) hides at zero unless `showZero`; `dot` for a contentless marker. Variants `default` (raised), `inset`, and AA-paired fills `primary`, `destructive`, `success`, `warning`; sizes `sm`, `md`, `lg`. Inside a `BadgeAnchor`, `placement` pins the badge to a corner (`top-end`, `top-start`, `bottom-end`, `bottom-start`, following writing direction) and `overlap="circular"` moves it onto a round anchor's edge. Placed badges are `aria-hidden`; the anchored control carries the count in its name. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Badge: `count`/`max`/`showZero`, `dot`, raised/inset + token fills, sm/md/lg; `BadgeAnchor` + `placement` (4 logical corners) and `overlap="circular"`; 23 tests, 8 stories incl. kit replica
- [ ] Chip (new): icon + label status pill ("Paid", "Due soon"), `icon` + `iconPosition` like Button, raised/inset + token fills; later removable and selectable chips

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/badge.stories.tsx` | 293 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 5 | 0 |
| Added | `packages/ui/src/badge.test.tsx` | 189 | 0 |
| Added | `packages/ui/src/badge.tsx` | 205 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 6 | 1 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-badge.md` | 5 | 0 |
| Modified | `ROADMAP.md` | 3 | 2 |
| Modified | `scripts/add-component.mjs` | 9 | 1 |
