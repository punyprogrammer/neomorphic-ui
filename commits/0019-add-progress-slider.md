---
number: 19
subject: "add-progress-slider"
date: 2026-10-14T23:46:41+05:30
author: "punyprogrammer"
files: 11
insertions: 964
deletions: 3
---

<!-- nav --> [← 0017](0017-add-textarea-and-select.md) · [Index](README.md) · [0021 →](0021-add-spinner-loader.md)

# 0019 · add-progress-slider

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 19 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0019-add-progress-slider.md` |
| Parent | `d0478d1` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T23:46:41+05:30 |
| Branch | `feat/implement-slider-progress` |
| Changes | 11 files · +964 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `progress.tsx` | `ProgressLabelProps`, `ProgressProps`, `ProgressValueProps`, `Progress`, `ProgressLabel`, `ProgressValue`, `progressTrackVariants` |  |
| Added | `slider.tsx` | `SliderLabelProps`, `SliderProps`, `SliderValueProps`, `Slider`, `SliderLabel`, `SliderValue`, `sliderControlVariants`, `sliderThumbVariants`, `sliderTrackVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/progress.test.tsx` | 8 |
| Added | `packages/ui/src/slider.test.tsx` | 10 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `progress.stories.tsx` | Default, KitReplica, ValueInside, Sizes, Indeterminate, Steps |
| Added | `slider.stories.tsx` | Default, KitReplica, Ends, Range, Vertical, Sizes, States |

## Design tokens and CSS

### `packages/ui/src/base.css`

- **Added:** `--animate-neu-progress`

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-slider-progress.md` | `@neomorphic-ui/react` minor | Add `Slider` (`@neomorphic-ui/react/slider`) and `Progress` (`@neomorphic-ui/react/progress`). - `Slider`, built on Base UI: the kit's music slider. A groove track, a fill that brightens toward the thumb (`--slider-fill`, default `--primary`), and a raised pill thumb with three grip grooves that sinks in while dragged. The thumb stays inside the track at both ends. An array value gives a range (one thumb each, named with `getAriaLabel`); `orientation="vertical"`; sizes `sm`, `md`, `lg`. `SliderLabel` and `SliderValue` go in `children`. - `Progress`, built on Base UI: a well with a raised fill that darkens toward its start (`--progress-fill`, default `--primary`). `size="lg"` is the kit's deep bar, and `valueInside` prints the value in the fill, moving it just past the fill's end while there isn't room. `value={null}` sweeps an indeterminate fill (held still under reduced motion). `ProgressLabel` and `ProgressValue` go in `children`. - New theme animation `--animate-neu-progress` (`animate-neu-progress`). |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Slider: groove track, `--slider-fill` gradient, raised pill thumb with grip grooves that sinks while dragged, edge-aligned, ranges, vertical, `SliderLabel`/`SliderValue`, sm/md/lg; 10 tests, 7 stories incl. kit music sliders and equaliser
- [x] Progress: well track with raised `--progress-fill` gradient, `valueInside` (steps past the fill when it won't fit), indeterminate sweep, `ProgressLabel`/`ProgressValue`, sm/md/lg; 8 tests, 6 stories incl. kit PROGRESS card

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/progress.stories.tsx` | 177 | 0 |
| Added | `apps/storybook/stories/slider.stories.tsx` | 218 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Modified | `packages/ui/src/base.css` | 13 | 0 |
| Added | `packages/ui/src/progress.test.tsx` | 83 | 0 |
| Added | `packages/ui/src/progress.tsx` | 122 | 0 |
| Added | `packages/ui/src/slider.test.tsx` | 127 | 0 |
| Added | `packages/ui/src/slider.tsx` | 200 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-slider-progress.md` | 9 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
