---
number: 21
subject: "add-spinner-loader"
date: 2026-10-15T00:10:28+05:30
author: "punyprogrammer"
files: 10
insertions: 902
deletions: 3
---

<!-- nav --> [← 0019](0019-add-progress-slider.md) · [Index](README.md) · latest →

# 0021 · add-spinner-loader

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 21 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0021-add-spinner-loader.md` |
| Parent | `40e716f` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T00:10:28+05:30 |
| Branch | `feat/implement-page-indicator-spinner` |
| Changes | 10 files · +902 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `page-indicator.tsx` | `PageIndicatorProps`, `PageIndicator`, `pageIndicatorDotVariants`, `pageIndicatorItemVariants`, `pageIndicatorVariants` |  |
| Added | `spinner.tsx` | `SpinnerProps`, `Spinner`, `spinnerVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/page-indicator.test.tsx` | 9 |
| Added | `packages/ui/src/spinner.test.tsx` | 7 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `page-indicator.stories.tsx` | Default, KitReplica, Onboarding, Sizes, Vertical, CustomFill |
| Added | `spinner.stories.tsx` | Default, KitReplica, Sizes, CustomFill, InCard |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-page-indicator-spinner.md` | `@neomorphic-ui/react` minor | Add `PageIndicator` (`@neomorphic-ui/react/page-indicator`) and `Spinner` (`@neomorphic-ui/react/spinner`). - `PageIndicator`: the kit's three dots. The other pages are wells; the current one (`value`, from 0) rises out of the surface filled with `--page-indicator-fill` (default `--primary`). Passive by default, as an image named "Page 2 of 3". With `onValueChange`, the dots become page buttons in a group, with `aria-current`, a single tab stop, arrow keys (mirrored in right-to-left layouts), Home and End. Every dot sits in a target of at least 24px. `getAriaLabel` renames pages; `orientation` (`horizontal`, `vertical`); sizes `sm`, `md`, `lg`. - `Spinner`: the kit's loader, a ring-shaped groove around a raised hub with an arc running around it (`--spinner-fill`, default `--primary`). A `role="status"` named "Loading" (override with `aria-label`); with `aria-hidden` it is decoration only. Held still under reduced motion. Sizes `sm` (24px), `md` (40px), `lg` (64px). |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] PageIndicator (new): well dots with a raised `--page-indicator-fill` current dot, passive image or page buttons (`onValueChange`) with `aria-current`, roving focus, arrows/Home/End (RTL-aware), 24px targets, horizontal/vertical, sm/md/lg; 9 tests, 6 stories incl. kit dots and onboarding card
- [x] Spinner: ring groove around a raised hub with a `--spinner-fill` arc, `role="status"` (decorative when `aria-hidden`), still under reduced motion, sm/md/lg; 7 tests, 5 stories incl. kit loader and loading card

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/page-indicator.stories.tsx` | 201 | 0 |
| Added | `apps/storybook/stories/spinner.stories.tsx` | 104 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Added | `packages/ui/src/page-indicator.test.tsx` | 145 | 0 |
| Added | `packages/ui/src/page-indicator.tsx` | 255 | 0 |
| Added | `packages/ui/src/spinner.test.tsx` | 72 | 0 |
| Added | `packages/ui/src/spinner.tsx` | 102 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-page-indicator-spinner.md` | 8 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
