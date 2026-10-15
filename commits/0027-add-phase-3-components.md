---
number: 27
subject: "add-phase-3-components"
date: 2026-10-15T10:01:51+05:30
author: "punyprogrammer"
files: 26
insertions: 2403
deletions: 17
---

<!-- nav --> [← 0025](0025-add-phase-2-components.md) · [Index](README.md) · [0029 →](0029-add-chip.md)

# 0027 · add-phase-3-components

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 27 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0027-add-phase-3-components.md` |
| Parent | `d5817f4` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T10:01:51+05:30 |
| Branch | `feat/implement-phase-3-composed` |
| Changes | 26 files · +2403 −17 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Modified | `button.tsx` | `ButtonProps`, `ButtonVariantsProps`, `Button`, `buttonVariants` | API unchanged |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Modified | `packages/ui/src/button.test.tsx` | 21 → 21 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `boarding-ticket.stories.tsx` | Default, Business |
| Added | `chat-thread.stories.tsx` | Default, Empty |
| Added | `music-player.stories.tsx` | Default, Playing |
| Added | `newsletter-signup.stories.tsx` | Default, Sending |
| Added | `payment-methods.stories.tsx` | Default, Paying |
| Added | `settings-tiles.stories.tsx` | Default, AllOff |
| Added | `travel-cards.stories.tsx` | Default |
| Added | `weather-widget.stories.tsx` | Default, Winter |
| Modified | `dial.stories.tsx` | no stories added or removed |
| Modified | `select.stories.tsx` | no stories added or removed |
| Modified | `tooltip.stories.tsx` | no stories added or removed |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-button-loading-name.md` | `@neomorphic-ui/react` patch | Fix `Button` losing its accessible name while `isLoading`: the label under the spinner is now transparent instead of `visibility: hidden`, so screen readers still announce "Subscribe, busy" rather than an unnamed button. The button keeps its size and look. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Newsletter signup: pill `InputGroup` with Mail addon and raised Subscribe button, email validation with a described error, `ToggleGroup` topic chips, loading button (field read-only, not greyed), success status; 2 stories
- [x] Weather widget: big temperature, °C/°F `ToggleGroup`, inset conditions strip (`dl` with separators), week of highs as a yellow → blue `BarMeter` with unit-aware values; 2 stories incl. sub-zero week
- [x] Biometric / settings tiles: Touch ID, airplane, Wi-Fi and Bluetooth `Toggle` tiles with tone colours and status text (airplane turns the radios off), brightness `Slider`, Night shift `Switch`; 2 stories
- [x] Music player: round art in a raised frame, per-track like `Toggle`, seek `Slider` with elapsed and remaining time, prev/next buttons around a play `Toggle` that drives a timer (advances at track end), volume `Dial`; 2 stories
- [x] Travel info cards: info card (photo, rating, price, Save toggle), big info card (trip summary, traveller `AvatarGroup`, Book now → Booked), info boxes as raised `Item`s with framed thumbnails; 1 story
- [x] Boarding ticket: route with dashed flight path, details `dl`, perforated tear line with inset punched notches, barcode drawn from the booking, Add to wallet → status; 2 stories
- [x] Payment methods: saved cards as a `RadioGroup` of raised label rows (chosen row presses in), radios named by card and described by expiry, Expires soon `Badge`, total, Save as default `Checkbox`, Pay button naming the card with loading and paid states; 2 stories
- [x] Chat thread + composer: contact header with status badge and `Tooltip` call buttons, focusable `role="log"` thread with raised incoming and primary outgoing bubbles, pill `InputGroupTextarea` composer (Enter sends, Shift+Enter new line), typing indicator and simulated reply; 2 stories

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/.storybook/preview.css` | 1 | 0 |
| Added | `apps/storybook/blocks/boarding-ticket.tsx` | 211 | 0 |
| Added | `apps/storybook/blocks/chat-thread.tsx` | 283 | 0 |
| Added | `apps/storybook/blocks/images.ts` | 30 | 0 |
| Added | `apps/storybook/blocks/music-player.tsx` | 207 | 0 |
| Added | `apps/storybook/blocks/newsletter-signup.tsx` | 158 | 0 |
| Added | `apps/storybook/blocks/payment-methods.tsx` | 228 | 0 |
| Added | `apps/storybook/blocks/settings-tiles.tsx` | 161 | 0 |
| Added | `apps/storybook/blocks/travel-cards.tsx` | 276 | 0 |
| Added | `apps/storybook/blocks/weather-widget.tsx` | 175 | 0 |
| Added | `apps/storybook/stories/blocks/boarding-ticket.stories.tsx` | 76 | 0 |
| Added | `apps/storybook/stories/blocks/chat-thread.stories.tsx` | 85 | 0 |
| Added | `apps/storybook/stories/blocks/music-player.stories.tsx` | 73 | 0 |
| Added | `apps/storybook/stories/blocks/newsletter-signup.stories.tsx` | 88 | 0 |
| Added | `apps/storybook/stories/blocks/payment-methods.stories.tsx` | 92 | 0 |
| Added | `apps/storybook/stories/blocks/settings-tiles.stories.tsx` | 80 | 0 |
| Added | `apps/storybook/stories/blocks/travel-cards.stories.tsx` | 57 | 0 |
| Added | `apps/storybook/stories/blocks/weather-widget.stories.tsx` | 73 | 0 |
| Modified | `apps/storybook/stories/dial.stories.tsx` | 3 | 1 |
| Modified | `apps/storybook/stories/select.stories.tsx` | 15 | 2 |
| Modified | `apps/storybook/stories/tooltip.stories.tsx` | 4 | 2 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/src/button.test.tsx` | 4 | 0 |
| Modified | `packages/ui/src/button.tsx` | 3 | 1 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-button-loading-name.md` | 5 | 0 |
| Modified | `AGENTS.md` | 2 | 0 |
| Modified | `ROADMAP.md` | 13 | 11 |
