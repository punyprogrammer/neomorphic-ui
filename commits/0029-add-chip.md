---
number: 29
subject: "add-chip"
date: 2026-10-15T10:15:25+05:30
author: "punyprogrammer"
files: 8
insertions: 498
deletions: 3
---

<!-- nav --> [← 0027](0027-add-phase-3-components.md) · [Index](README.md) · [0031 →](0031-add-phase-4-components.md)

# 0029 · add-chip

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 29 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0029-add-chip.md` |
| Parent | `15ecce3` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T10:15:25+05:30 |
| Branch | `feat/implement-chip` |
| Changes | 8 files · +498 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `chip.tsx` | `ChipProps`, `Chip`, `chipVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/chip.test.tsx` | 9 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Modified | `badge.stories.tsx` | no stories added or removed |
| Added | `chip.stories.tsx` | Default, Variants, Sizes, IconPositions, InvoiceList, LiveStatus |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-chip.md` | `@neomorphic-ui/react` minor | Add `Chip` (`@neomorphic-ui/react/chip`): a status pill with an optional icon and a short label, such as "Paid" or "Due soon". `icon` takes any element and is decorative; `iconPosition` (`start`, `end`) follows the writing direction. Variants `default` (raised), `inset`, and token fills `primary`, `destructive`, `success`, `warning` paired with their `-foreground`; sizes `sm`, `md`, `lg`. Renders a `<span>`; `render` swaps the element (e.g. `<li>`). `Badge` stays for counts and dots. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Chip (new): icon + label status pill ("Paid", "Due soon"), decorative `icon` + `iconPosition` (start/end, RTL-aware) like Button, raised/inset + token fills with paired foregrounds, sm/md/lg, `render` (e.g. `<li>`); 15 tests, 6 stories incl. invoice list and live status. Removable and selectable chips still to come

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/stories/badge.stories.tsx` | 1 | 1 |
| Added | `apps/storybook/stories/chip.stories.tsx` | 239 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 5 | 0 |
| Added | `packages/ui/src/chip.test.tsx` | 115 | 0 |
| Added | `packages/ui/src/chip.tsx` | 130 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-chip.md` | 5 | 0 |
| Modified | `ROADMAP.md` | 2 | 2 |
