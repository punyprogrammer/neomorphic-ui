---
number: 17
subject: "add-textarea-and-select"
date: 2026-10-14T22:45:17+05:30
author: "punyprogrammer"
files: 10
insertions: 1115
deletions: 3
---

<!-- nav --> [← 0015](0015-add-switch.md) · [Index](README.md) · [0019 →](0019-add-progress-slider.md)

# 0017 · add-textarea-and-select

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 17 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0017-add-textarea-and-select.md` |
| Parent | `f49299a` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T22:45:17+05:30 |
| Branch | `feat/implement-textarea-and-select` |
| Changes | 10 files · +1115 −3 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `select.tsx` | `SelectContentProps`, `SelectGroupLabelProps`, `SelectGroupProps`, `SelectItemProps`, `SelectLabelProps`, `SelectSeparatorProps`, `SelectTriggerProps`, `SelectValueProps`, `Select`, `SelectContent`, `SelectGroup`, `SelectGroupLabel`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `selectTriggerVariants` |  |
| Added | `textarea.tsx` | `TextareaProps`, `Textarea`, `textareaVariants` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/select.test.tsx` | 8 |
| Added | `packages/ui/src/textarea.test.tsx` | 8 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `select.stories.tsx` | Default, KitReplica, Keyboard, Sizes, Groups, States |
| Added | `textarea.stories.tsx` | Default, KitReplica, States, AutoResize, WithCounter |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-textarea-select.md` | `@neomorphic-ui/react` minor | Add `Textarea` (`@neomorphic-ui/react/textarea`) and `Select` (`@neomorphic-ui/react/select`). - `Textarea`: the kit's message field, a well that deepens on focus. Resizes vertically, or grows with its text when `autoResize` (`field-sizing`). `aria-invalid` ring, shallower well when read-only. - `Select`, built on Base UI: `SelectTrigger` is the kit's raised, uppercase "SELECT CATEGORY" with a solid caret, pressed in while open (sizes `sm`, `md`, `lg`). `SelectContent` is a raised card whose highlighted item sinks in; the chosen item carries a check. Plus `SelectValue` (with `placeholder`), `SelectLabel` (wired to the trigger), `SelectItem`, `SelectGroup`, `SelectGroupLabel` and a grooved `SelectSeparator`; long lists scroll. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Textarea: well that deepens on focus, `autoResize` (`field-sizing`), invalid/read-only/disabled; 8 tests, 5 stories incl. kit field and live counter
- [x] Select: raised uppercase trigger with solid caret, pressed while open, raised popup with sunken highlight and check, label/groups/separator, sm/md/lg; 8 tests, 6 stories incl. kit trigger and grouped time zones

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/storybook/stories/select.stories.tsx` | 314 | 0 |
| Added | `apps/storybook/stories/textarea.stories.tsx` | 183 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 10 | 0 |
| Added | `packages/ui/src/select.test.tsx` | 148 | 0 |
| Added | `packages/ui/src/select.tsx` | 308 | 0 |
| Added | `packages/ui/src/textarea.test.tsx` | 78 | 0 |
| Added | `packages/ui/src/textarea.tsx` | 61 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 2 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-textarea-select.md` | 8 | 0 |
| Modified | `ROADMAP.md` | 3 | 3 |
