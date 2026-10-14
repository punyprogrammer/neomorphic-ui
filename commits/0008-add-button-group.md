---
number: 8
subject: "add-button-group"
date: 2026-10-14T21:39:45+05:30
author: "punyprogrammer"
files: 7
insertions: 562
deletions: 2
---

<!-- nav --> [← 0007](0007-add-badge.md) · [Index](README.md) · latest →

# 0008 · add-button-group

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 8 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0008-add-button-group.md` |
| Parent | `be91356` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T21:39:45+05:30 |
| Branch | `feat/add-button-group` |
| Changes | 7 files · +562 −2 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `button-group.tsx` | `ButtonGroupProps`, `ButtonGroupTextProps`, `ButtonGroup`, `ButtonGroupText`, `buttonGroupVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/button-group.test.tsx` | 10 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `button-group.stories.tsx` | Default, KitReplica, Stepper, Quantity, WithLabels, Pressed, Vertical, Sizes |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-button-group.md` | `@neomorphic-ui/react` minor | Add `ButtonGroup` and `ButtonGroupText` (`@neomorphic-ui/react/button-group`): joins `Button`s into one raised slab split by grooves, like the kit's ‹ › stepper. Segments rest flat in the slab and sink into it while held or `aria-pressed`; disabled segments keep their place. `orientation` (`horizontal`, `vertical`) and `shape` (`rounded`, `pill`) set the axis and outer corners, which the end segments follow. `ButtonGroupText` adds a non-interactive segment such as a "2 / 5" readout. The group is a `role="group"`, so label it. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] ButtonGroup: prev/next stepper as one raised slab with grooves, segments sink while pressed/`aria-pressed`, `ButtonGroupText` readout, horizontal/vertical, rounded/pill; 10 tests, 8 stories incl. kit replica and live pager

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/button-group.stories.tsx` | 326 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 5 | 0 |
| Added | `packages/ui/src/button-group.test.tsx` | 100 | 0 |
| Added | `packages/ui/src/button-group.tsx` | 123 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-button-group.md` | 5 | 0 |
| Modified | `ROADMAP.md` | 2 | 2 |
