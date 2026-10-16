---
number: 55
subject: "add-responsiveness"
date: 2026-10-16T22:42:02+05:30
author: "punyprogrammer"
files: 31
insertions: 652
deletions: 457
---

<!-- nav --> [← 0054](0054-update-doc-design.md) · [Index](README.md) · [0056 →](0056-add-storybook-readme.md)

# 0055 · add-responsiveness

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 55 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0055-add-responsiveness.md` |
| Parent | `74aa2f5` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-16T22:42:02+05:30 |
| Branch | `main` |
| Changes | 31 files · +652 −457 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Modified | `bar-meter.tsx` | `BarMeterItemProps`, `BarMeterLabelProps`, `BarMeterProps`, `BarMeterValueProps`, `BarMeter`, `BarMeterItem`, `BarMeterLabel`, `BarMeterValue`, `barMeterVariants` | API unchanged |
| Modified | `card.tsx` | `CardPartProps`, `CardProps`, `Card`, `CardAction`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `cardVariants` | API unchanged |
| Modified | `dial.tsx` | `DialProps`, `Dial`, `dialVariants` | API unchanged |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Modified | `packages/ui/src/card.test.tsx` | 5 → 5 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Changes by area

### apps/docs · `@neomorphic-react/docs`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/docs/app/(home)/page.tsx` | 6 | 4 |
| Modified | `apps/docs/app/layout.tsx` | 1 | 1 |
| Modified | `apps/docs/components/blocks/meeting-hub.tsx` | 1 | 1 |
| Modified | `apps/docs/components/blocks/mindfulness-demo.tsx` | 230 | 216 |
| Modified | `apps/docs/components/blocks/smart-home-demo.tsx` | 164 | 154 |
| Modified | `apps/docs/components/home-blocks.tsx` | 130 | 11 |

### apps/showcase · `@neomorphic-react/showcase`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/showcase/src/app/chat/chat-app.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/checkout/checkout.tsx` | 6 | 4 |
| Modified | `apps/showcase/src/app/checkout/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/credits/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/dashboard/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/dashboard/sales-dashboard.tsx` | 5 | 2 |
| Modified | `apps/showcase/src/app/fitness/fitness-app.tsx` | 3 | 2 |
| Modified | `apps/showcase/src/app/fitness/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/layout.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/piano/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/piano/piano-app.tsx` | 2 | 2 |
| Modified | `apps/showcase/src/app/shop/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/shop/storefront.tsx` | 34 | 22 |
| Modified | `apps/showcase/src/app/smart-home/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/smart-home/smart-home.tsx` | 9 | 7 |
| Modified | `apps/showcase/src/app/social/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/social/social-feed.tsx` | 30 | 7 |
| Modified | `apps/showcase/src/app/theming/page.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/app/theming/theme-studio.tsx` | 1 | 1 |
| Modified | `apps/showcase/src/components/page-header.tsx` | 9 | 5 |

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/src/bar-meter.tsx` | 1 | 1 |
| Modified | `packages/ui/src/card.test.tsx` | 1 | 1 |
| Modified | `packages/ui/src/card.tsx` | 6 | 3 |
| Modified | `packages/ui/src/dial.tsx` | 1 | 1 |
