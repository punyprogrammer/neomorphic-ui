---
number: 4
subject: "add-button"
date: 2026-10-14T18:41:21+05:30
author: "punyprogrammer"
files: 13
insertions: 977
deletions: 24
---

<!-- nav --> [← 0003](0003-add-changeset-ci-cd.md) · [Index](README.md) · [0007 →](0007-add-badge.md)

# 0004 · add-button

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 4 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0004-add-button.md` |
| Parent | `be97de5` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T18:41:21+05:30 |
| Branch | `feat/implement-buttons` |
| Changes | 13 files · +977 −24 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `button.tsx` | `ButtonProps`, `ButtonVariantsProps`, `Button`, `buttonVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/button.test.tsx` | 21 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `button.stories.tsx` | Default, KitReplica, Variants, ColorTokens, Sizes, IconPositions, IconOnly, AnyIcon, States, FullWidth, AsLink |
| Modified | `foundations.stories.tsx` | no stories added or removed |

## Design tokens and CSS

### `packages/ui/src/theme.css`

- **Changed** `--destructive`: `oklch(0.577 0.245 27.325)` → `oklch(0.52 0.2 27.325)`

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-button.md` | `@neomorphic-ui/react` minor | Add `Button` (`@neomorphic-ui/react/button`): raised at rest, pressed while held or `aria-pressed`, flat when disabled. Takes any icon element through `icon`, placed with `iconPosition` (`start`, `end`, `top`, `bottom`); with no children it becomes an icon tile (`shape="pill"` for a circle). Variants `default`, `primary`, `destructive`, `ghost`; sizes `sm`, `md`, `lg`; `isLoading` keeps focus and the raised look. `buttonVariants` styles links. Darkens `--destructive` to `oklch(0.52 0.2 27.325)` so red text passes AA on raised surfaces. |

## Dependencies and scripts

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `storybook` | `pnpm --filter @neomorphic-ui/storybook dev` | scripts |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] `--destructive` darkened to 5.26:1 (4.91:1 on the raised fill) so red text on a raised button passes AA
- [x] Button: `icon` (any element) + `iconPosition` (start, end, top, bottom), icon tiles, pill/circle, default/primary/destructive/ghost, sm/md/lg, loading, `aria-pressed`; 28 tests, 10 stories incl. kit replica

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/button.stories.tsx` | 492 | 0 |
| Modified | `apps/storybook/stories/foundations.stories.tsx` | 44 | 17 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 5 | 0 |
| Modified | `packages/ui/src/base.css` | 4 | 1 |
| Added | `packages/ui/src/button.test.tsx` | 203 | 0 |
| Added | `packages/ui/src/button.tsx` | 214 | 0 |
| Modified | `packages/ui/src/theme.css` | 4 | 2 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 1 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-button.md` | 5 | 0 |
| Modified | `AGENTS.md` | 1 | 1 |
| Modified | `ROADMAP.md` | 2 | 1 |
| Modified | `package.json` | 1 | 0 |
| Modified | `scripts/add-component.mjs` | 1 | 1 |
