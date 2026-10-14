---
number: 23
subject: "add-input-and-input-groups"
date: 2026-10-15T00:25:52+05:30
author: "punyprogrammer"
files: 10
insertions: 1204
deletions: 3
---

<!-- nav --> [← 0021](0021-add-spinner-loader.md) · [Index](README.md) · [0025 →](0025-add-phase-2-components.md)

# 0023 · add-input-and-input-groups

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 23 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0023-add-input-and-input-groups.md` |
| Parent | `c7f5be4` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T00:25:52+05:30 |
| Branch | `feat/implement-input-and-input-groups` |
| Changes | 10 files · +1204 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `input-group.tsx` | `InputGroupAddonProps`, `InputGroupButtonProps`, `InputGroupInputProps`, `InputGroupProps`, `InputGroupTextareaProps`, `InputGroupTextProps`, `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`, `inputGroupAddonVariants`, `inputGroupVariants` |  |
| Added | `input.tsx` | `InputProps`, `Input`, `inputControlClassName`, `inputVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/input-group.test.tsx` | 8 |
| Added | `packages/ui/src/input.test.tsx` | 7 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `input-group.stories.tsx` | Default, KitReplica, WithText, Password, Sizes, BlockAddon, States |
| Added | `input.stories.tsx` | Default, KitReplica, Sizes, Shapes, States, Types |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-input-input-group.md` | `@neomorphic-ui/react` minor | Add `Input` (`@neomorphic-ui/react/input`) and `InputGroup` (`@neomorphic-ui/react/input-group`). - `Input`, built on Base UI so it joins a `Field`: a well pressed into the surface that deepens on focus, shallower when read-only, with an `aria-invalid` (or Field-invalid) ring. Sizes `sm`, `md`, `lg`; `shape` `rounded` (default, matching `Textarea` and `Select`) or `pill` (the kit's search field). `htmlSize` sets the native `size` attribute. - `InputGroup`: one well around a bare `InputGroupInput` or growing `InputGroupTextarea`, lit for the control's focus, invalid and disabled states; pressing anywhere in it focuses the control. `InputGroupAddon` places icons, `InputGroupText` or `InputGroupButton`s `inline-start`, `inline-end`, `block-start` or `block-end`. `InputGroupButton` fits the group's `size` and `shape` with a 4px inset, `ghost` by default or `default`/`primary` to rise out of the well like the kit's Subscribe button. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Input: Base UI `Input` (works in a `Field`), well that deepens on focus, shallower read-only, invalid ring, rounded/pill, sm/md/lg, `htmlSize`; 7 tests, 6 stories incl. kit search pill and native types
- [x] InputGroup: one well around a bare input or growing textarea, lit by the control's focus/invalid/disabled, press-to-focus; addons inline/block with icons, `InputGroupText`, `InputGroupButton` fitted to group size and shape (4px inset); 8 tests, 7 stories incl. kit search, Subscribe and chat composer

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/input-group.stories.tsx` | 345 | 0 |
| Added | `apps/storybook/stories/input.stories.tsx` | 168 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Added | `packages/ui/src/input-group.test.tsx` | 162 | 0 |
| Added | `packages/ui/src/input-group.tsx` | 332 | 0 |
| Added | `packages/ui/src/input.test.tsx` | 73 | 0 |
| Added | `packages/ui/src/input.tsx` | 101 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-input-input-group.md` | 8 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
