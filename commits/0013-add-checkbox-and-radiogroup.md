---
number: 13
subject: "add-checkbox-and-radiogroup"
date: 2026-10-14T22:04:31+05:30
author: "punyprogrammer"
files: 10
insertions: 830
deletions: 3
---

<!-- nav --> [← 0011](0011-add-toggle-components.md) · [Index](README.md) · latest →

# 0013 · add-checkbox-and-radiogroup

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 13 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0013-add-checkbox-and-radiogroup.md` |
| Parent | `0725b3c` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T22:04:31+05:30 |
| Branch | `feat/implement-checkbox-and-radiogroup` |
| Changes | 10 files · +830 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `checkbox.tsx` | `CheckboxProps`, `Checkbox`, `checkboxIndicatorClassName`, `checkboxVariants` |  |
| Added | `radio-group.tsx` | `RadioGroupItemProps`, `RadioGroupProps`, `RadioGroup`, `RadioGroupItem` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/checkbox.test.tsx` | 10 |
| Added | `packages/ui/src/radio-group.test.tsx` | 7 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `checkbox.stories.tsx` | Default, KitReplica, States, Sizes, SelectAll, WithError |
| Added | `radio-group.stories.tsx` | Default, KitReplica, Keyboard, Sizes, Horizontal, Cards |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-checkbox-radio.md` | `@neomorphic-ui/react` minor | Add `Checkbox` (`@neomorphic-ui/react/checkbox`) and `RadioGroup` + `RadioGroupItem` (`@neomorphic-ui/react/radio-group`), following the kit: an empty control is a well pressed into the surface, a selected one rises out of it with a dark check or dot. - `Checkbox`: checked, unchecked and `indeterminate` (a dash, read as "mixed"; also when Base UI derives it for a parent box), `aria-invalid` ring, sizes `sm`, `md`, `lg`. A hidden native input submits with forms. - `RadioGroup`: arrow keys move the choice, a group-wide `size` that items can override, stacked by default (`className="flex gap-6"` for a row). |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Checkbox: empty well / raised with check, `indeterminate` dash, `aria-invalid` ring, sm/md/lg, native input for forms; 10 tests, 6 stories incl. kit pair and select-all
- [x] RadioGroup: empty round well / raised with dot, arrow-key choice, group `size`, stacked or row; 7 tests, 6 stories incl. kit pair and card options

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/checkbox.stories.tsx` | 222 | 0 |
| Added | `apps/storybook/stories/radio-group.stories.tsx` | 206 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Added | `packages/ui/src/checkbox.test.tsx` | 109 | 0 |
| Added | `packages/ui/src/checkbox.tsx` | 84 | 0 |
| Added | `packages/ui/src/radio-group.test.tsx` | 90 | 0 |
| Added | `packages/ui/src/radio-group.tsx` | 96 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-checkbox-radio.md` | 8 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
