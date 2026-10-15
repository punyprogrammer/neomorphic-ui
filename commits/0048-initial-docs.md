---
number: 48
subject: "initial-docs"
date: 2026-10-16T02:16:33+05:30
author: "punyprogrammer"
files: 680
insertions: 50415
deletions: 90
---

<!-- nav --> [← 0046](0046-deploy-storybook-to-github-pages-and-finish-phase-7.md) · [Index](README.md) · latest →

# 0048 · initial-docs

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 48 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0048-initial-docs.md` |
| Parent | `72d9f38` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-16T02:16:33+05:30 |
| Branch | `feat/docs-site` |
| Changes | 680 files · +50415 −90 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Modified | `calendar.tsx` | `DateRange`, `CalendarProps`, `Calendar`, `CalendarDayButton` | API unchanged |

## Design tokens and CSS

### `apps/docs/app/globals.css`

- **Added:** `--font-sans`, `--font-mono`

### `apps/docs/app/themes.css`

- **Added:** `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--secondary`, `--secondary-foreground`, `--primary-foreground`, `--accent`, `--accent-foreground`, `--input`, `--ring`, `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--border`, `--neu-light`, `--neu-dark`, `--neu-depth`, `--neu-convex-from`, `--neu-convex-to`, `--neu-backdrop`, `--radius`, `--chart-1`, `--chart-2`, `--chart-3`, `--chart-4`, `--chart-5`

### `apps/showcase/src/app/globals.css`

- **Added:** `--font-sans`, `--font-mono`, `--font-display`
- **Added utilities:** `animate-eq`

### `apps/showcase/src/app/themes.css`

- **Added:** `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--secondary`, `--secondary-foreground`, `--primary-foreground`, `--accent`, `--accent-foreground`, `--input`, `--ring`, `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--border`, `--neu-light`, `--neu-dark`, `--neu-depth`, `--neu-convex-from`, `--neu-convex-to`, `--neu-backdrop`, `--radius`, `--font-sans`, `--chart-1`, `--chart-2`, `--chart-3`, `--chart-4`, `--chart-5`, `--font-display`, `--brass`, `--felt`, `--toggle-on`, `--font-mono`

## Dependencies and scripts

### `apps/docs/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@neomorphic-react/ui` | `workspace:*` | dependencies |
| Added | `@tanstack/react-table` | `^8.21.3` | dependencies |
| Added | `class-variance-authority` | `^0.7.1` | dependencies |
| Added | `clsx` | `^2.1.1` | dependencies |
| Added | `embla-carousel-react` | `^8.6.0` | dependencies |
| Added | `fumadocs-core` | `^16.17.3` | dependencies |
| Added | `fumadocs-mdx` | `^15.4.7` | dependencies |
| Added | `lucide-react` | `^1.57.0` | dependencies |
| Added | `next` | `^16.4.1` | dependencies |
| Added | `react` | `^19.3.0` | dependencies |
| Added | `react-day-picker` | `^10.0.2` | dependencies |
| Added | `react-dom` | `^19.3.0` | dependencies |
| Added | `react-resizable-panels` | `^4.14.5` | dependencies |
| Added | `recharts` | `^3.10.1` | dependencies |
| Added | `shiki` | `^4.5.0` | dependencies |
| Added | `tailwind-merge` | `^3.7.0` | dependencies |
| Added | `zod` | `^4.6.7` | dependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |
| Added | `@tailwindcss/postcss` | `^4.3.3` | devDependencies |
| Added | `@types/mdx` | `^2.0.14` | devDependencies |
| Added | `@types/node` | `^26.6.5` | devDependencies |
| Added | `@types/react` | `^19.3.0` | devDependencies |
| Added | `@types/react-dom` | `^19.3.0` | devDependencies |
| Added | `tailwindcss` | `^4.3.3` | devDependencies |
| Added | `typescript` | `^7.0.2` | devDependencies |
| Added | `dev` | `pnpm examples && next dev -p 4000` | scripts |
| Added | `build` | `pnpm examples && next build` | scripts |
| Added | `start` | `next start -p 4000` | scripts |
| Added | `examples` | `node scripts/build-examples.mjs` | scripts |
| Added | `postinstall` | `fumadocs-mdx` | scripts |
| Added | `typecheck` | `pnpm examples && fumadocs-mdx && tsc --noEmit` | scripts |
| Added | `clean` | `rm -rf .next .source .turbo node_modules` | scripts |

### `apps/showcase/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@neomorphic-react/ui` | `workspace:*` | dependencies |
| Added | `embla-carousel-react` | `^8.6.0` | dependencies |
| Added | `lucide-react` | `^1.57.0` | dependencies |
| Added | `next` | `^16.4.1` | dependencies |
| Added | `react` | `^19.3.0` | dependencies |
| Added | `react-dom` | `^19.3.0` | dependencies |
| Added | `recharts` | `^3.10.1` | dependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |
| Added | `@tailwindcss/postcss` | `^4.3.3` | devDependencies |
| Added | `@types/node` | `^26.6.5` | devDependencies |
| Added | `@types/react` | `^19.3.0` | devDependencies |
| Added | `@types/react-dom` | `^19.3.0` | devDependencies |
| Added | `tailwindcss` | `^4.3.3` | devDependencies |
| Added | `typescript` | `^7.0.2` | devDependencies |
| Added | `dev` | `next dev -p 3001` | scripts |
| Added | `build` | `next build` | scripts |
| Added | `start` | `next start -p 3001` | scripts |
| Added | `typecheck` | `tsc --noEmit` | scripts |
| Added | `clean` | `rm -rf .next .turbo node_modules` | scripts |

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `docs` | `pnpm --filter @neomorphic-react/docs dev` | scripts |
| Added | `showcase` | `pnpm --filter @neomorphic-react/showcase dev` | scripts |
| Added | `site` | `pnpm --parallel --filter @neomorphic-react/docs --filter @neomorphic-react/showcase dev` | scripts |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] D1: Foundation
- [ ] Docs site (Fumadocs) with demos and LLMs.txt: in progress, see [Docs site](#docs-site)
- [ ] D2: Composites, forms and text
- [ ] D3: Disclosure, navigation, overlays and pickers
- [ ] D4: Layout, data and AI
- [ ] D5: Ship

## Changes by area

### apps/docs · `@neomorphic-react/docs`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/docs/AGENTS.md` | 9 | 0 |
| Added | `apps/docs/app/(home)/layout.tsx` | 19 | 0 |
| Added | `apps/docs/app/(home)/page.tsx` | 206 | 0 |
| Added | `apps/docs/app/api/search/route.ts` | 6 | 0 |
| Added | `apps/docs/app/docs/[[...slug]]/page.tsx` | 116 | 0 |
| Added | `apps/docs/app/docs/layout.tsx` | 32 | 0 |
| Added | `apps/docs/app/globals.css` | 31 | 0 |
| Added | `apps/docs/app/icon.svg` | 15 | 0 |
| Added | `apps/docs/app/layout.tsx` | 74 | 0 |
| Added | `apps/docs/app/not-found.tsx` | 34 | 0 |
| Added | `apps/docs/app/robots.ts` | 9 | 0 |
| Added | `apps/docs/app/sitemap.ts` | 15 | 0 |
| Added | `apps/docs/app/themes.css` | 166 | 0 |
| Added | `apps/docs/components/blocks/boarding-ticket.tsx` | 213 | 0 |
| Added | `apps/docs/components/blocks/chat-thread.tsx` | 295 | 0 |
| Added | `apps/docs/components/blocks/images.ts` | 30 | 0 |
| Added | `apps/docs/components/blocks/music-player.tsx` | 209 | 0 |
| Added | `apps/docs/components/blocks/newsletter-signup.tsx` | 160 | 0 |
| Added | `apps/docs/components/blocks/payment-methods.tsx` | 230 | 0 |
| Added | `apps/docs/components/blocks/settings-tiles.tsx` | 163 | 0 |
| Added | `apps/docs/components/blocks/travel-cards.tsx` | 278 | 0 |
| Added | `apps/docs/components/blocks/weather-widget.tsx` | 177 | 0 |
| Added | `apps/docs/components/code-fence.tsx` | 84 | 0 |
| Added | `apps/docs/components/component-preview.tsx` | 78 | 0 |
| Added | `apps/docs/components/components-index.tsx` | 76 | 0 |
| Added | `apps/docs/components/docs-nav.tsx` | 52 | 0 |
| Added | `apps/docs/components/docs-pager.tsx` | 50 | 0 |
| Added | `apps/docs/components/docs-toc.tsx` | 50 | 0 |
| Added | `apps/docs/components/home-blocks.tsx` | 44 | 0 |
| Added | `apps/docs/components/icons.tsx` | 21 | 0 |
| Added | `apps/docs/components/install-command.tsx` | 107 | 0 |
| Added | `apps/docs/components/link-button.tsx` | 47 | 0 |
| Added | `apps/docs/components/main-nav.tsx` | 42 | 0 |
| Added | `apps/docs/components/mdx.tsx` | 226 | 0 |
| Added | `apps/docs/components/mobile-nav.tsx` | 56 | 0 |
| Added | `apps/docs/components/page-actions.tsx` | 38 | 0 |
| Added | `apps/docs/components/preview-tabs.tsx` | 60 | 0 |
| Added | `apps/docs/components/search.tsx` | 226 | 0 |
| Added | `apps/docs/components/site-footer.tsx` | 50 | 0 |
| Added | `apps/docs/components/site-header.tsx` | 44 | 0 |
| Added | `apps/docs/components/theme-picker.tsx` | 54 | 0 |
| Added | `apps/docs/components/theme-presets.tsx` | 179 | 0 |
| Added | `apps/docs/content/docs/components/accordion.mdx` | 144 | 0 |
| Added | `apps/docs/content/docs/components/alert-dialog.mdx` | 140 | 0 |
| Added | `apps/docs/content/docs/components/alert.mdx` | 111 | 0 |
| Added | `apps/docs/content/docs/components/aspect-ratio.mdx` | 69 | 0 |
| Added | `apps/docs/content/docs/components/attachment.mdx` | 169 | 0 |
| Added | `apps/docs/content/docs/components/avatar.mdx` | 127 | 0 |
| Added | `apps/docs/content/docs/components/badge.mdx` | 127 | 0 |
| Added | `apps/docs/content/docs/components/bar-meter.mdx` | 132 | 0 |
| Added | `apps/docs/content/docs/components/breadcrumb.mdx` | 118 | 0 |
| Added | `apps/docs/content/docs/components/bubble.mdx` | 129 | 0 |
| Added | `apps/docs/content/docs/components/button-group.mdx` | 113 | 0 |
| Added | `apps/docs/content/docs/components/button.mdx` | 125 | 0 |
| Added | `apps/docs/content/docs/components/calendar.mdx` | 133 | 0 |
| Added | `apps/docs/content/docs/components/card.mdx` | 126 | 0 |
| Added | `apps/docs/content/docs/components/carousel.mdx` | 146 | 0 |
| Added | `apps/docs/content/docs/components/chart.mdx` | 174 | 0 |
| Added | `apps/docs/content/docs/components/checkbox.mdx` | 118 | 0 |
| Added | `apps/docs/content/docs/components/chip.mdx` | 93 | 0 |
| Added | `apps/docs/content/docs/components/code-block.mdx` | 180 | 0 |
| Added | `apps/docs/content/docs/components/collapsible.mdx` | 113 | 0 |
| Added | `apps/docs/content/docs/components/combobox.mdx` | 196 | 0 |
| Added | `apps/docs/content/docs/components/command.mdx` | 166 | 0 |
| Added | `apps/docs/content/docs/components/context-menu.mdx` | 117 | 0 |
| Added | `apps/docs/content/docs/components/data-table.mdx` | 179 | 0 |
| Added | `apps/docs/content/docs/components/date-picker.mdx` | 155 | 0 |
| Added | `apps/docs/content/docs/components/dial.mdx` | 120 | 0 |
| Added | `apps/docs/content/docs/components/dialog.mdx` | 146 | 0 |
| Added | `apps/docs/content/docs/components/drawer.mdx` | 129 | 0 |
| Added | `apps/docs/content/docs/components/dropdown-menu.mdx` | 183 | 0 |
| Added | `apps/docs/content/docs/components/empty.mdx` | 112 | 0 |
| Added | `apps/docs/content/docs/components/field.mdx` | 172 | 0 |
| Added | `apps/docs/content/docs/components/hover-card.mdx` | 98 | 0 |
| Added | `apps/docs/content/docs/components/index.mdx` | 8 | 0 |
| Added | `apps/docs/content/docs/components/input-group.mdx` | 159 | 0 |
| Added | `apps/docs/content/docs/components/input-otp.mdx` | 136 | 0 |
| Added | `apps/docs/content/docs/components/input.mdx` | 113 | 0 |
| Added | `apps/docs/content/docs/components/item.mdx` | 145 | 0 |
| Added | `apps/docs/content/docs/components/kbd.mdx` | 90 | 0 |
| Added | `apps/docs/content/docs/components/label.mdx` | 80 | 0 |
| Added | `apps/docs/content/docs/components/marker.mdx` | 96 | 0 |
| Added | `apps/docs/content/docs/components/menubar.mdx` | 185 | 0 |
| Added | `apps/docs/content/docs/components/message-scroller.mdx` | 179 | 0 |
| Added | `apps/docs/content/docs/components/message.mdx` | 110 | 0 |
| Added | `apps/docs/content/docs/components/meta.json` | 4 | 0 |
| Added | `apps/docs/content/docs/components/native-select.mdx` | 104 | 0 |
| Added | `apps/docs/content/docs/components/navigation-menu.mdx` | 148 | 0 |
| Added | `apps/docs/content/docs/components/page-indicator.mdx` | 110 | 0 |
| Added | `apps/docs/content/docs/components/pagination.mdx` | 131 | 0 |
| Added | `apps/docs/content/docs/components/popover.mdx` | 129 | 0 |
| Added | `apps/docs/content/docs/components/progress.mdx` | 124 | 0 |
| Added | `apps/docs/content/docs/components/questionnaire.mdx` | 219 | 0 |
| Added | `apps/docs/content/docs/components/radio-group.mdx` | 114 | 0 |
| Added | `apps/docs/content/docs/components/resizable.mdx` | 133 | 0 |
| Added | `apps/docs/content/docs/components/scroll-area.mdx` | 99 | 0 |
| Added | `apps/docs/content/docs/components/select.mdx` | 167 | 0 |
| Added | `apps/docs/content/docs/components/separator.mdx` | 82 | 0 |
| Added | `apps/docs/content/docs/components/sheet.mdx` | 126 | 0 |
| Added | `apps/docs/content/docs/components/sidebar.mdx` | 253 | 0 |
| Added | `apps/docs/content/docs/components/skeleton.mdx` | 74 | 0 |
| Added | `apps/docs/content/docs/components/slider.mdx` | 137 | 0 |
| Added | `apps/docs/content/docs/components/spinner.mdx` | 89 | 0 |
| Added | `apps/docs/content/docs/components/surface.mdx` | 91 | 0 |
| Added | `apps/docs/content/docs/components/switch.mdx` | 105 | 0 |
| Added | `apps/docs/content/docs/components/table.mdx` | 121 | 0 |
| Added | `apps/docs/content/docs/components/tabs.mdx` | 143 | 0 |
| Added | `apps/docs/content/docs/components/textarea.mdx` | 85 | 0 |
| Added | `apps/docs/content/docs/components/toast.mdx` | 138 | 0 |
| Added | `apps/docs/content/docs/components/toggle-group.mdx` | 120 | 0 |
| Added | `apps/docs/content/docs/components/toggle.mdx` | 130 | 0 |
| Added | `apps/docs/content/docs/components/tooltip.mdx` | 126 | 0 |
| Added | `apps/docs/content/docs/components/trace.mdx` | 126 | 0 |
| Added | `apps/docs/content/docs/components/typography.mdx` | 113 | 0 |
| Added | `apps/docs/content/docs/index.mdx` | 54 | 0 |
| Added | `apps/docs/content/docs/installation.mdx` | 156 | 0 |
| Added | `apps/docs/content/docs/meta.json` | 10 | 0 |
| Added | `apps/docs/content/docs/theming.mdx` | 147 | 0 |
| Added | `apps/docs/examples/accordion-controlled.tsx` | 57 | 0 |
| Added | `apps/docs/examples/accordion-demo.tsx` | 41 | 0 |
| Added | `apps/docs/examples/accordion-disabled.tsx` | 27 | 0 |
| Added | `apps/docs/examples/accordion-flat.tsx` | 52 | 0 |
| Added | `apps/docs/examples/accordion-in-context.tsx` | 86 | 0 |
| Added | `apps/docs/examples/accordion-multiple.tsx` | 39 | 0 |
| Added | `apps/docs/examples/alert-action.tsx` | 23 | 0 |
| Added | `apps/docs/examples/alert-content.tsx` | 34 | 0 |
| Added | `apps/docs/examples/alert-demo.tsx` | 20 | 0 |
| Added | `apps/docs/examples/alert-dialog-async.tsx` | 64 | 0 |
| Added | `apps/docs/examples/alert-dialog-demo.tsx` | 37 | 0 |
| Added | `apps/docs/examples/alert-dialog-in-context.tsx` | 98 | 0 |
| Added | `apps/docs/examples/alert-dialog-small.tsx` | 41 | 0 |
| Added | `apps/docs/examples/alert-in-context.tsx` | 59 | 0 |
| Added | `apps/docs/examples/alert-urgent.tsx` | 31 | 0 |
| Added | `apps/docs/examples/alert-variants.tsx` | 48 | 0 |
| Added | `apps/docs/examples/aspect-ratio-content.tsx` | 24 | 0 |
| Added | `apps/docs/examples/aspect-ratio-crop.tsx` | 16 | 0 |
| Added | `apps/docs/examples/aspect-ratio-demo.tsx` | 16 | 0 |
| Added | `apps/docs/examples/aspect-ratio-in-context.tsx` | 56 | 0 |
| Added | `apps/docs/examples/aspect-ratio-ratios.tsx` | 29 | 0 |
| Added | `apps/docs/examples/attachment-demo.tsx` | 32 | 0 |
| Added | `apps/docs/examples/attachment-in-context.tsx` | 97 | 0 |
| Added | `apps/docs/examples/attachment-sizes.tsx` | 32 | 0 |
| Added | `apps/docs/examples/attachment-states.tsx` | 75 | 0 |
| Added | `apps/docs/examples/attachment-thumbnails.tsx` | 60 | 0 |
| Added | `apps/docs/examples/attachment-upload.tsx` | 91 | 0 |
| Added | `apps/docs/examples/avatar-badge.tsx` | 38 | 0 |
| Added | `apps/docs/examples/avatar-demo.tsx` | 28 | 0 |
| Added | `apps/docs/examples/avatar-group.tsx` | 40 | 0 |
| Added | `apps/docs/examples/avatar-in-context.tsx` | 87 | 0 |
| Added | `apps/docs/examples/avatar-shapes.tsx` | 37 | 0 |
| Added | `apps/docs/examples/avatar-sizes.tsx` | 30 | 0 |
| Added | `apps/docs/examples/badge-counts.tsx` | 26 | 0 |
| Added | `apps/docs/examples/badge-demo.tsx` | 29 | 0 |
| Added | `apps/docs/examples/badge-dots.tsx` | 28 | 0 |
| Added | `apps/docs/examples/badge-in-button.tsx` | 20 | 0 |
| Added | `apps/docs/examples/badge-in-context.tsx` | 61 | 0 |
| Added | `apps/docs/examples/badge-live.tsx` | 41 | 0 |
| Added | `apps/docs/examples/badge-placements.tsx` | 70 | 0 |
| Added | `apps/docs/examples/badge-sizes.tsx` | 22 | 0 |
| Added | `apps/docs/examples/badge-variants.tsx` | 16 | 0 |
| Added | `apps/docs/examples/bar-meter-colors.tsx` | 53 | 0 |
| Added | `apps/docs/examples/bar-meter-demo.tsx` | 33 | 0 |
| Added | `apps/docs/examples/bar-meter-format.tsx` | 42 | 0 |
| Added | `apps/docs/examples/bar-meter-height.tsx` | 32 | 0 |
| Added | `apps/docs/examples/bar-meter-in-context.tsx` | 75 | 0 |
| Added | `apps/docs/examples/bar-meter-sizes.tsx` | 31 | 0 |
| Added | `apps/docs/examples/breadcrumb-collapsed.tsx` | 60 | 0 |
| Added | `apps/docs/examples/breadcrumb-demo.tsx` | 30 | 0 |
| Added | `apps/docs/examples/breadcrumb-icon.tsx` | 33 | 0 |
| Added | `apps/docs/examples/breadcrumb-in-context.tsx` | 52 | 0 |
| Added | `apps/docs/examples/breadcrumb-separator.tsx` | 35 | 0 |
| Added | `apps/docs/examples/bubble-demo.tsx` | 18 | 0 |
| Added | `apps/docs/examples/bubble-group.tsx` | 30 | 0 |
| Added | `apps/docs/examples/bubble-in-context.tsx` | 75 | 0 |
| Added | `apps/docs/examples/bubble-reactions.tsx` | 31 | 0 |
| Added | `apps/docs/examples/bubble-suggestions.tsx` | 44 | 0 |
| Added | `apps/docs/examples/bubble-variants.tsx` | 29 | 0 |
| Added | `apps/docs/examples/button-as-link.tsx` | 13 | 0 |
| Added | `apps/docs/examples/button-colors.tsx` | 32 | 0 |
| Added | `apps/docs/examples/button-demo.tsx` | 13 | 0 |
| Added | `apps/docs/examples/button-group-demo.tsx` | 36 | 0 |
| Added | `apps/docs/examples/button-group-in-context.tsx` | 84 | 0 |
| Added | `apps/docs/examples/button-group-pressed.tsx` | 36 | 0 |
| Added | `apps/docs/examples/button-group-shapes.tsx` | 24 | 0 |
| Added | `apps/docs/examples/button-group-sizes.tsx` | 24 | 0 |
| Added | `apps/docs/examples/button-group-text.tsx` | 33 | 0 |
| Added | `apps/docs/examples/button-group-vertical.tsx` | 20 | 0 |
| Added | `apps/docs/examples/button-icon-only.tsx` | 34 | 0 |
| Added | `apps/docs/examples/button-icon-positions.tsx` | 21 | 0 |
| Added | `apps/docs/examples/button-sizes.tsx` | 18 | 0 |
| Added | `apps/docs/examples/button-states.tsx` | 27 | 0 |
| Added | `apps/docs/examples/button-variants.tsx` | 19 | 0 |
| Added | `apps/docs/examples/calendar-colors.tsx` | 22 | 0 |
| Added | `apps/docs/examples/calendar-custom-days.tsx` | 38 | 0 |
| Added | `apps/docs/examples/calendar-demo.tsx` | 17 | 0 |
| Added | `apps/docs/examples/calendar-disabled.tsx` | 16 | 0 |
| Added | `apps/docs/examples/calendar-dropdowns.tsx` | 20 | 0 |
| Added | `apps/docs/examples/calendar-in-context.tsx` | 53 | 0 |
| Added | `apps/docs/examples/calendar-range.tsx` | 21 | 0 |
| Added | `apps/docs/examples/card-demo.tsx` | 28 | 0 |
| Added | `apps/docs/examples/card-elevations.tsx` | 29 | 0 |
| Added | `apps/docs/examples/card-image.tsx` | 48 | 0 |
| Added | `apps/docs/examples/card-in-context.tsx` | 62 | 0 |
| Added | `apps/docs/examples/card-nested.tsx` | 37 | 0 |
| Added | `apps/docs/examples/card-sizes.tsx` | 34 | 0 |
| Added | `apps/docs/examples/carousel-demo.tsx` | 40 | 0 |
| Added | `apps/docs/examples/carousel-in-context.tsx` | 90 | 0 |
| Added | `apps/docs/examples/carousel-several.tsx` | 47 | 0 |
| Added | `apps/docs/examples/carousel-thumbnails.tsx` | 70 | 0 |
| Added | `apps/docs/examples/carousel-vertical.tsx` | 52 | 0 |
| Added | `apps/docs/examples/chart-area.tsx` | 72 | 0 |
| Added | `apps/docs/examples/chart-demo.tsx` | 61 | 0 |
| Added | `apps/docs/examples/chart-in-context.tsx` | 85 | 0 |
| Added | `apps/docs/examples/chart-line.tsx` | 75 | 0 |
| Added | `apps/docs/examples/chart-pie.tsx` | 70 | 0 |
| Added | `apps/docs/examples/chart-tooltip.tsx` | 72 | 0 |
| Added | `apps/docs/examples/checkbox-demo.tsx` | 19 | 0 |
| Added | `apps/docs/examples/checkbox-field.tsx` | 57 | 0 |
| Added | `apps/docs/examples/checkbox-in-context.tsx` | 73 | 0 |
| Added | `apps/docs/examples/checkbox-select-all.tsx` | 44 | 0 |
| Added | `apps/docs/examples/checkbox-sizes.tsx` | 23 | 0 |
| Added | `apps/docs/examples/checkbox-states.tsx` | 35 | 0 |
| Added | `apps/docs/examples/chip-demo.tsx` | 20 | 0 |
| Added | `apps/docs/examples/chip-icon-positions.tsx` | 34 | 0 |
| Added | `apps/docs/examples/chip-in-context.tsx` | 58 | 0 |
| Added | `apps/docs/examples/chip-live-status.tsx` | 36 | 0 |
| Added | `apps/docs/examples/chip-sizes.tsx` | 20 | 0 |
| Added | `apps/docs/examples/chip-variants.tsx` | 32 | 0 |
| Added | `apps/docs/examples/code-block-demo.tsx` | 40 | 0 |
| Added | `apps/docs/examples/code-block-diff.tsx` | 31 | 0 |
| Added | `apps/docs/examples/code-block-highlighting.tsx` | 39 | 0 |
| Added | `apps/docs/examples/code-block-in-context.tsx` | 76 | 0 |
| Added | `apps/docs/examples/code-block-long.tsx` | 39 | 0 |
| Added | `apps/docs/examples/code-block-output.tsx` | 46 | 0 |
| Added | `apps/docs/examples/collapsible-button-trigger.tsx` | 44 | 0 |
| Added | `apps/docs/examples/collapsible-controlled.tsx` | 41 | 0 |
| Added | `apps/docs/examples/collapsible-demo.tsx` | 25 | 0 |
| Added | `apps/docs/examples/collapsible-find-in-page.tsx` | 25 | 0 |
| Added | `apps/docs/examples/collapsible-in-context.tsx` | 74 | 0 |
| Added | `apps/docs/examples/combobox-demo.tsx` | 47 | 0 |
| Added | `apps/docs/examples/combobox-groups.tsx` | 65 | 0 |
| Added | `apps/docs/examples/combobox-in-context.tsx` | 101 | 0 |
| Added | `apps/docs/examples/combobox-multiple.tsx` | 60 | 0 |
| Added | `apps/docs/examples/combobox-searchable-select.tsx` | 54 | 0 |
| Added | `apps/docs/examples/combobox-sizes.tsx` | 48 | 0 |
| Added | `apps/docs/examples/combobox-states.tsx` | 59 | 0 |
| Added | `apps/docs/examples/command-demo.tsx` | 34 | 0 |
| Added | `apps/docs/examples/command-dialog.tsx` | 56 | 0 |
| Added | `apps/docs/examples/command-filter.tsx` | 61 | 0 |
| Added | `apps/docs/examples/command-groups.tsx` | 80 | 0 |
| Added | `apps/docs/examples/command-in-context.tsx` | 70 | 0 |
| Added | `apps/docs/examples/context-menu-checkboxes.tsx` | 55 | 0 |
| Added | `apps/docs/examples/context-menu-demo.tsx` | 37 | 0 |
| Added | `apps/docs/examples/context-menu-in-context.tsx` | 120 | 0 |
| Added | `apps/docs/examples/context-menu-submenu.tsx` | 52 | 0 |
| Added | `apps/docs/examples/data-table-columns.tsx` | 71 | 0 |
| Added | `apps/docs/examples/data-table-demo.tsx` | 53 | 0 |
| Added | `apps/docs/examples/data-table-filter.tsx` | 47 | 0 |
| Added | `apps/docs/examples/data-table-in-context.tsx` | 125 | 0 |
| Added | `apps/docs/examples/data-table-pagination.tsx` | 51 | 0 |
| Added | `apps/docs/examples/data-table-selection.tsx` | 56 | 0 |
| Added | `apps/docs/examples/date-picker-demo.tsx` | 13 | 0 |
| Added | `apps/docs/examples/date-picker-format.tsx` | 41 | 0 |
| Added | `apps/docs/examples/date-picker-in-context.tsx` | 87 | 0 |
| Added | `apps/docs/examples/date-picker-input.tsx` | 27 | 0 |
| Added | `apps/docs/examples/date-picker-presets.tsx` | 34 | 0 |
| Added | `apps/docs/examples/date-picker-range.tsx` | 47 | 0 |
| Added | `apps/docs/examples/date-picker-sizes.tsx` | 19 | 0 |
| Added | `apps/docs/examples/dial-colors.tsx` | 20 | 0 |
| Added | `apps/docs/examples/dial-committed.tsx` | 26 | 0 |
| Added | `apps/docs/examples/dial-demo.tsx` | 14 | 0 |
| Added | `apps/docs/examples/dial-disabled.tsx` | 11 | 0 |
| Added | `apps/docs/examples/dial-in-context.tsx` | 53 | 0 |
| Added | `apps/docs/examples/dial-range.tsx` | 26 | 0 |
| Added | `apps/docs/examples/dial-sizes.tsx` | 20 | 0 |
| Added | `apps/docs/examples/dialog-close-buttons.tsx` | 42 | 0 |
| Added | `apps/docs/examples/dialog-demo.tsx` | 45 | 0 |
| Added | `apps/docs/examples/dialog-in-context.tsx` | 95 | 0 |
| Added | `apps/docs/examples/dialog-scrolling.tsx` | 53 | 0 |
| Added | `apps/docs/examples/dialog-sizes.tsx` | 40 | 0 |
| Added | `apps/docs/examples/drawer-controlled.tsx` | 81 | 0 |
| Added | `apps/docs/examples/drawer-demo.tsx` | 39 | 0 |
| Added | `apps/docs/examples/drawer-directions.tsx` | 41 | 0 |
| Added | `apps/docs/examples/drawer-in-context.tsx` | 119 | 0 |
| Added | `apps/docs/examples/drawer-snap-points.tsx` | 48 | 0 |
| Added | `apps/docs/examples/dropdown-menu-checkboxes.tsx` | 71 | 0 |
| Added | `apps/docs/examples/dropdown-menu-demo.tsx` | 42 | 0 |
| Added | `apps/docs/examples/dropdown-menu-groups.tsx` | 61 | 0 |
| Added | `apps/docs/examples/dropdown-menu-in-context.tsx` | 120 | 0 |
| Added | `apps/docs/examples/dropdown-menu-placement.tsx` | 33 | 0 |
| Added | `apps/docs/examples/dropdown-menu-submenu.tsx` | 71 | 0 |
| Added | `apps/docs/examples/empty-actions.tsx` | 35 | 0 |
| Added | `apps/docs/examples/empty-avatars.tsx` | 45 | 0 |
| Added | `apps/docs/examples/empty-demo.tsx` | 33 | 0 |
| Added | `apps/docs/examples/empty-in-context.tsx` | 89 | 0 |
| Added | `apps/docs/examples/empty-inset.tsx` | 31 | 0 |
| Added | `apps/docs/examples/field-choice-cards.tsx` | 45 | 0 |
| Added | `apps/docs/examples/field-controls.tsx` | 60 | 0 |
| Added | `apps/docs/examples/field-demo.tsx` | 18 | 0 |
| Added | `apps/docs/examples/field-errors.tsx` | 43 | 0 |
| Added | `apps/docs/examples/field-in-context.tsx` | 94 | 0 |
| Added | `apps/docs/examples/field-orientation.tsx` | 37 | 0 |
| Added | `apps/docs/examples/field-validation.tsx` | 33 | 0 |
| Added | `apps/docs/examples/hover-card-delay.tsx` | 35 | 0 |
| Added | `apps/docs/examples/hover-card-demo.tsx` | 32 | 0 |
| Added | `apps/docs/examples/hover-card-in-context.tsx` | 70 | 0 |
| Added | `apps/docs/examples/hover-card-placement.tsx` | 26 | 0 |
| Added | `apps/docs/examples/input-demo.tsx` | 18 | 0 |
| Added | `apps/docs/examples/input-group-buttons.tsx` | 78 | 0 |
| Added | `apps/docs/examples/input-group-demo.tsx` | 38 | 0 |
| Added | `apps/docs/examples/input-group-in-context.tsx` | 81 | 0 |
| Added | `apps/docs/examples/input-group-sizes.tsx` | 37 | 0 |
| Added | `apps/docs/examples/input-group-states.tsx` | 39 | 0 |
| Added | `apps/docs/examples/input-group-text.tsx` | 47 | 0 |
| Added | `apps/docs/examples/input-group-textarea.tsx` | 37 | 0 |
| Added | `apps/docs/examples/input-in-context.tsx` | 52 | 0 |
| Added | `apps/docs/examples/input-otp-demo.tsx` | 30 | 0 |
| Added | `apps/docs/examples/input-otp-field.tsx` | 48 | 0 |
| Added | `apps/docs/examples/input-otp-in-context.tsx` | 86 | 0 |
| Added | `apps/docs/examples/input-otp-sizes.tsx` | 26 | 0 |
| Added | `apps/docs/examples/input-otp-validation-type.tsx` | 46 | 0 |
| Added | `apps/docs/examples/input-shapes.tsx` | 17 | 0 |
| Added | `apps/docs/examples/input-sizes.tsx` | 13 | 0 |
| Added | `apps/docs/examples/input-states.tsx` | 28 | 0 |
| Added | `apps/docs/examples/input-types.tsx` | 27 | 0 |
| Added | `apps/docs/examples/input-validation.tsx` | 23 | 0 |
| Added | `apps/docs/examples/introduction-demo.tsx` | 59 | 0 |
| Added | `apps/docs/examples/item-demo.tsx` | 29 | 0 |
| Added | `apps/docs/examples/item-header-footer.tsx` | 50 | 0 |
| Added | `apps/docs/examples/item-in-context.tsx` | 82 | 0 |
| Added | `apps/docs/examples/item-links.tsx` | 41 | 0 |
| Added | `apps/docs/examples/item-media.tsx` | 49 | 0 |
| Added | `apps/docs/examples/item-sizes.tsx` | 28 | 0 |
| Added | `apps/docs/examples/item-variants.tsx` | 50 | 0 |
| Added | `apps/docs/examples/kbd-demo.tsx` | 20 | 0 |
| Added | `apps/docs/examples/kbd-groups.tsx` | 35 | 0 |
| Added | `apps/docs/examples/kbd-in-context.tsx` | 74 | 0 |
| Added | `apps/docs/examples/kbd-inline.tsx` | 18 | 0 |
| Added | `apps/docs/examples/kbd-sizes.tsx` | 18 | 0 |
| Added | `apps/docs/examples/kbd-tooltip.tsx` | 39 | 0 |
| Added | `apps/docs/examples/label-demo.tsx` | 13 | 0 |
| Added | `apps/docs/examples/label-disabled.tsx` | 22 | 0 |
| Added | `apps/docs/examples/label-icons.tsx` | 31 | 0 |
| Added | `apps/docs/examples/label-in-context.tsx` | 66 | 0 |
| Added | `apps/docs/examples/label-wrapping.tsx` | 31 | 0 |
| Added | `apps/docs/examples/marker-demo.tsx` | 15 | 0 |
| Added | `apps/docs/examples/marker-icons-links.tsx` | 28 | 0 |
| Added | `apps/docs/examples/marker-in-context.tsx` | 59 | 0 |
| Added | `apps/docs/examples/marker-status.tsx` | 36 | 0 |
| Added | `apps/docs/examples/marker-variants.tsx` | 19 | 0 |
| Added | `apps/docs/examples/menubar-checkbox-radio.tsx` | 63 | 0 |
| Added | `apps/docs/examples/menubar-demo.tsx` | 49 | 0 |
| Added | `apps/docs/examples/menubar-in-context.tsx` | 93 | 0 |
| Added | `apps/docs/examples/menubar-items.tsx` | 51 | 0 |
| Added | `apps/docs/examples/menubar-submenus.tsx` | 53 | 0 |
| Added | `apps/docs/examples/message-align.tsx` | 46 | 0 |
| Added | `apps/docs/examples/message-assistant.tsx` | 56 | 0 |
| Added | `apps/docs/examples/message-demo.tsx` | 35 | 0 |
| Added | `apps/docs/examples/message-group.tsx` | 42 | 0 |
| Added | `apps/docs/examples/message-in-context.tsx` | 94 | 0 |
| Added | `apps/docs/examples/message-scroller-demo.tsx` | 61 | 0 |
| Added | `apps/docs/examples/message-scroller-history.tsx` | 91 | 0 |
| Added | `apps/docs/examples/message-scroller-in-context.tsx` | 125 | 0 |
| Added | `apps/docs/examples/message-scroller-jump.tsx` | 92 | 0 |
| Added | `apps/docs/examples/message-scroller-positions.tsx` | 93 | 0 |
| Added | `apps/docs/examples/message-scroller-streaming.tsx` | 102 | 0 |
| Added | `apps/docs/examples/native-select-demo.tsx` | 21 | 0 |
| Added | `apps/docs/examples/native-select-field.tsx` | 33 | 0 |
| Added | `apps/docs/examples/native-select-groups.tsx` | 34 | 0 |
| Added | `apps/docs/examples/native-select-in-context.tsx` | 101 | 0 |
| Added | `apps/docs/examples/native-select-sizes.tsx` | 27 | 0 |
| Added | `apps/docs/examples/native-select-states.tsx` | 46 | 0 |
| Added | `apps/docs/examples/navigation-menu-active.tsx` | 69 | 0 |
| Added | `apps/docs/examples/navigation-menu-demo.tsx` | 50 | 0 |
| Added | `apps/docs/examples/navigation-menu-in-context.tsx` | 88 | 0 |
| Added | `apps/docs/examples/navigation-menu-panels.tsx` | 77 | 0 |
| Added | `apps/docs/examples/page-indicator-colors.tsx` | 20 | 0 |
| Added | `apps/docs/examples/page-indicator-demo.tsx` | 16 | 0 |
| Added | `apps/docs/examples/page-indicator-onboarding.tsx` | 51 | 0 |
| Added | `apps/docs/examples/page-indicator-passive.tsx` | 7 | 0 |
| Added | `apps/docs/examples/page-indicator-sizes.tsx` | 15 | 0 |
| Added | `apps/docs/examples/page-indicator-vertical.tsx` | 25 | 0 |
| Added | `apps/docs/examples/pagination-controlled.tsx` | 66 | 0 |
| Added | `apps/docs/examples/pagination-demo.tsx` | 40 | 0 |
| Added | `apps/docs/examples/pagination-in-context.tsx` | 101 | 0 |
| Added | `apps/docs/examples/pagination-labels.tsx` | 28 | 0 |
| Added | `apps/docs/examples/pagination-sizes.tsx` | 45 | 0 |
| Added | `apps/docs/examples/popover-controlled.tsx` | 60 | 0 |
| Added | `apps/docs/examples/popover-demo.tsx` | 31 | 0 |
| Added | `apps/docs/examples/popover-form.tsx` | 49 | 0 |
| Added | `apps/docs/examples/popover-in-context.tsx` | 72 | 0 |
| Added | `apps/docs/examples/popover-placement.tsx` | 34 | 0 |
| Added | `apps/docs/examples/progress-demo.tsx` | 18 | 0 |
| Added | `apps/docs/examples/progress-in-context.tsx` | 72 | 0 |
| Added | `apps/docs/examples/progress-indeterminate.tsx` | 14 | 0 |
| Added | `apps/docs/examples/progress-sizes.tsx` | 24 | 0 |
| Added | `apps/docs/examples/progress-steps.tsx` | 36 | 0 |
| Added | `apps/docs/examples/progress-value-inside.tsx` | 22 | 0 |
| Added | `apps/docs/examples/questionnaire-choices.tsx` | 62 | 0 |
| Added | `apps/docs/examples/questionnaire-conditional.tsx` | 63 | 0 |
| Added | `apps/docs/examples/questionnaire-demo.tsx` | 44 | 0 |
| Added | `apps/docs/examples/questionnaire-in-context.tsx` | 107 | 0 |
| Added | `apps/docs/examples/questionnaire-resume.tsx` | 75 | 0 |
| Added | `apps/docs/examples/questionnaire-shortcuts.tsx` | 61 | 0 |
| Added | `apps/docs/examples/questionnaire-validation.tsx` | 65 | 0 |
| Added | `apps/docs/examples/radio-group-cards.tsx` | 51 | 0 |
| Added | `apps/docs/examples/radio-group-demo.tsx` | 32 | 0 |
| Added | `apps/docs/examples/radio-group-field.tsx` | 36 | 0 |
| Added | `apps/docs/examples/radio-group-horizontal.tsx` | 32 | 0 |
| Added | `apps/docs/examples/radio-group-in-context.tsx` | 68 | 0 |
| Added | `apps/docs/examples/radio-group-sizes.tsx` | 38 | 0 |
| Added | `apps/docs/examples/resizable-collapsible.tsx` | 63 | 0 |
| Added | `apps/docs/examples/resizable-demo.tsx` | 31 | 0 |
| Added | `apps/docs/examples/resizable-in-context.tsx` | 90 | 0 |
| Added | `apps/docs/examples/resizable-nested.tsx` | 35 | 0 |
| Added | `apps/docs/examples/resizable-sizes.tsx` | 67 | 0 |
| Added | `apps/docs/examples/resizable-vertical.tsx` | 34 | 0 |
| Added | `apps/docs/examples/scroll-area-both.tsx` | 60 | 0 |
| Added | `apps/docs/examples/scroll-area-demo.tsx` | 25 | 0 |
| Added | `apps/docs/examples/scroll-area-fade.tsx` | 38 | 0 |
| Added | `apps/docs/examples/scroll-area-horizontal.tsx` | 38 | 0 |
| Added | `apps/docs/examples/scroll-area-in-context.tsx` | 79 | 0 |
| Added | `apps/docs/examples/select-align-item.tsx` | 39 | 0 |
| Added | `apps/docs/examples/select-demo.tsx` | 39 | 0 |
| Added | `apps/docs/examples/select-groups.tsx` | 64 | 0 |
| Added | `apps/docs/examples/select-in-context.tsx` | 77 | 0 |
| Added | `apps/docs/examples/select-sizes.tsx` | 43 | 0 |
| Added | `apps/docs/examples/select-states.tsx` | 73 | 0 |
| Added | `apps/docs/examples/separator-demo.tsx` | 24 | 0 |
| Added | `apps/docs/examples/separator-in-context.tsx` | 57 | 0 |
| Added | `apps/docs/examples/separator-perforated.tsx` | 26 | 0 |
| Added | `apps/docs/examples/separator-semantic.tsx` | 23 | 0 |
| Added | `apps/docs/examples/separator-vertical.tsx` | 28 | 0 |
| Added | `apps/docs/examples/sheet-demo.tsx` | 42 | 0 |
| Added | `apps/docs/examples/sheet-in-context.tsx` | 100 | 0 |
| Added | `apps/docs/examples/sheet-sides.tsx` | 33 | 0 |
| Added | `apps/docs/examples/sheet-sizes.tsx` | 39 | 0 |
| Added | `apps/docs/examples/sidebar-actions.tsx` | 98 | 0 |
| Added | `apps/docs/examples/sidebar-collapsible.tsx` | 88 | 0 |
| Added | `apps/docs/examples/sidebar-demo.tsx` | 60 | 0 |
| Added | `apps/docs/examples/sidebar-in-context.tsx` | 103 | 0 |
| Added | `apps/docs/examples/sidebar-loading.tsx` | 35 | 0 |
| Added | `apps/docs/examples/sidebar-submenus.tsx` | 86 | 0 |
| Added | `apps/docs/examples/sidebar-variants.tsx` | 89 | 0 |
| Added | `apps/docs/examples/skeleton-card.tsx` | 26 | 0 |
| Added | `apps/docs/examples/skeleton-demo.tsx` | 19 | 0 |
| Added | `apps/docs/examples/skeleton-in-context.tsx` | 82 | 0 |
| Added | `apps/docs/examples/skeleton-shapes.tsx` | 13 | 0 |
| Added | `apps/docs/examples/slider-colors.tsx` | 33 | 0 |
| Added | `apps/docs/examples/slider-demo.tsx` | 14 | 0 |
| Added | `apps/docs/examples/slider-in-context.tsx` | 84 | 0 |
| Added | `apps/docs/examples/slider-range.tsx` | 22 | 0 |
| Added | `apps/docs/examples/slider-sizes.tsx` | 22 | 0 |
| Added | `apps/docs/examples/slider-states.tsx` | 22 | 0 |
| Added | `apps/docs/examples/slider-vertical.tsx` | 29 | 0 |
| Added | `apps/docs/examples/spinner-colors.tsx` | 13 | 0 |
| Added | `apps/docs/examples/spinner-demo.tsx` | 7 | 0 |
| Added | `apps/docs/examples/spinner-in-context.tsx` | 21 | 0 |
| Added | `apps/docs/examples/spinner-placeholder.tsx` | 15 | 0 |
| Added | `apps/docs/examples/spinner-sizes.tsx` | 15 | 0 |
| Added | `apps/docs/examples/surface-demo.tsx` | 18 | 0 |
| Added | `apps/docs/examples/surface-depths.tsx` | 26 | 0 |
| Added | `apps/docs/examples/surface-elevations.tsx` | 21 | 0 |
| Added | `apps/docs/examples/surface-in-context.tsx` | 54 | 0 |
| Added | `apps/docs/examples/surface-render.tsx` | 34 | 0 |
| Added | `apps/docs/examples/surface-shapes.tsx` | 20 | 0 |
| Added | `apps/docs/examples/switch-demo.tsx` | 19 | 0 |
| Added | `apps/docs/examples/switch-field.tsx` | 33 | 0 |
| Added | `apps/docs/examples/switch-in-context.tsx` | 53 | 0 |
| Added | `apps/docs/examples/switch-sizes.tsx` | 23 | 0 |
| Added | `apps/docs/examples/switch-states.tsx` | 35 | 0 |
| Added | `apps/docs/examples/table-demo.tsx` | 44 | 0 |
| Added | `apps/docs/examples/table-footer.tsx` | 63 | 0 |
| Added | `apps/docs/examples/table-in-context.tsx` | 113 | 0 |
| Added | `apps/docs/examples/table-selection.tsx` | 73 | 0 |
| Added | `apps/docs/examples/table-sticky-header.tsx` | 57 | 0 |
| Added | `apps/docs/examples/table-variants.tsx` | 47 | 0 |
| Added | `apps/docs/examples/tabs-activate-on-focus.tsx` | 23 | 0 |
| Added | `apps/docs/examples/tabs-demo.tsx` | 36 | 0 |
| Added | `apps/docs/examples/tabs-icons.tsx` | 33 | 0 |
| Added | `apps/docs/examples/tabs-in-context.tsx` | 80 | 0 |
| Added | `apps/docs/examples/tabs-line.tsx` | 31 | 0 |
| Added | `apps/docs/examples/tabs-vertical.tsx` | 57 | 0 |
| Added | `apps/docs/examples/textarea-auto-resize.tsx` | 18 | 0 |
| Added | `apps/docs/examples/textarea-counter.tsx` | 32 | 0 |
| Added | `apps/docs/examples/textarea-demo.tsx` | 16 | 0 |
| Added | `apps/docs/examples/textarea-field.tsx` | 26 | 0 |
| Added | `apps/docs/examples/textarea-in-context.tsx` | 58 | 0 |
| Added | `apps/docs/examples/textarea-states.tsx` | 45 | 0 |
| Added | `apps/docs/examples/toast-action.tsx` | 31 | 0 |
| Added | `apps/docs/examples/toast-demo.tsx` | 19 | 0 |
| Added | `apps/docs/examples/toast-in-context.tsx` | 56 | 0 |
| Added | `apps/docs/examples/toast-promise.tsx` | 30 | 0 |
| Added | `apps/docs/examples/toast-types.tsx` | 55 | 0 |
| Added | `apps/docs/examples/toast-update.tsx` | 23 | 0 |
| Added | `apps/docs/examples/toggle-colors.tsx` | 37 | 0 |
| Added | `apps/docs/examples/toggle-controlled.tsx` | 31 | 0 |
| Added | `apps/docs/examples/toggle-demo.tsx` | 36 | 0 |
| Added | `apps/docs/examples/toggle-disabled.tsx` | 17 | 0 |
| Added | `apps/docs/examples/toggle-group-demo.tsx` | 23 | 0 |
| Added | `apps/docs/examples/toggle-group-disabled.tsx` | 35 | 0 |
| Added | `apps/docs/examples/toggle-group-in-context.tsx` | 55 | 0 |
| Added | `apps/docs/examples/toggle-group-multiple.tsx` | 23 | 0 |
| Added | `apps/docs/examples/toggle-group-required.tsx` | 31 | 0 |
| Added | `apps/docs/examples/toggle-group-shape-orientation.tsx` | 40 | 0 |
| Added | `apps/docs/examples/toggle-group-sizes.tsx` | 33 | 0 |
| Added | `apps/docs/examples/toggle-icon-fill.tsx` | 17 | 0 |
| Added | `apps/docs/examples/toggle-in-context.tsx` | 55 | 0 |
| Added | `apps/docs/examples/toggle-shapes.tsx` | 29 | 0 |
| Added | `apps/docs/examples/toggle-sizes.tsx` | 33 | 0 |
| Added | `apps/docs/examples/toggle-with-text.tsx` | 27 | 0 |
| Added | `apps/docs/examples/tooltip-demo.tsx` | 20 | 0 |
| Added | `apps/docs/examples/tooltip-in-context.tsx` | 80 | 0 |
| Added | `apps/docs/examples/tooltip-provider.tsx` | 37 | 0 |
| Added | `apps/docs/examples/tooltip-shortcut.tsx` | 27 | 0 |
| Added | `apps/docs/examples/tooltip-sides.tsx` | 23 | 0 |
| Added | `apps/docs/examples/trace-actions.tsx` | 47 | 0 |
| Added | `apps/docs/examples/trace-collapsible.tsx` | 55 | 0 |
| Added | `apps/docs/examples/trace-demo.tsx` | 37 | 0 |
| Added | `apps/docs/examples/trace-in-context.tsx` | 90 | 0 |
| Added | `apps/docs/examples/trace-statuses.tsx` | 44 | 0 |
| Added | `apps/docs/examples/typography-blocks.tsx` | 28 | 0 |
| Added | `apps/docs/examples/typography-demo.tsx` | 29 | 0 |
| Added | `apps/docs/examples/typography-headings.tsx` | 19 | 0 |
| Added | `apps/docs/examples/typography-in-context.tsx` | 49 | 0 |
| Added | `apps/docs/examples/typography-render.tsx` | 21 | 0 |
| Added | `apps/docs/examples/typography-text.tsx` | 28 | 0 |
| Added | `apps/docs/lib/components.ts` | 498 | 0 |
| Added | `apps/docs/lib/highlight.ts` | 88 | 0 |
| Added | `apps/docs/lib/nav.ts` | 61 | 0 |
| Added | `apps/docs/lib/showcase.ts` | 148 | 0 |
| Added | `apps/docs/lib/site.ts` | 28 | 0 |
| Added | `apps/docs/lib/source.ts` | 9 | 0 |
| Added | `apps/docs/next.config.mjs` | 24 | 0 |
| Added | `apps/docs/package.json` | 44 | 0 |
| Added | `apps/docs/postcss.config.mjs` | 5 | 0 |
| Added | `apps/docs/public/showcase/chat.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/checkout.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/dashboard.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/fitness.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/piano.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/podcasts.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/shop.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/smart-home.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/social.jpg` | binary | binary |
| Added | `apps/docs/public/showcase/theming.jpg` | binary | binary |
| Added | `apps/docs/scripts/build-examples.mjs` | 36 | 0 |
| Added | `apps/docs/source.config.ts` | 60 | 0 |
| Added | `apps/docs/tsconfig.json` | 19 | 0 |

### apps/showcase · `@neomorphic-react/showcase`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `apps/showcase/AGENTS.md` | 9 | 0 |
| Added | `apps/showcase/README.md` | 49 | 0 |
| Added | `apps/showcase/next.config.ts` | 15 | 0 |
| Added | `apps/showcase/package.json` | 31 | 0 |
| Added | `apps/showcase/postcss.config.mjs` | 5 | 0 |
| Added | `apps/showcase/public/images/fitness/run.jpg` | binary | binary |
| Added | `apps/showcase/public/images/fitness/strength.jpg` | binary | binary |
| Added | `apps/showcase/public/images/fitness/swim.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/armchair.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/bedroom-calm.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/bedroom.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/gallery-wall.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/kitchen.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/living-room.jpg` | binary | binary |
| Added | `apps/showcase/public/images/interiors/white-sofa.jpg` | binary | binary |
| Added | `apps/showcase/public/images/music/piano.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/amara.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/amardeep.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/david.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/elena.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/hana.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/kenji.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/lucia.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/marcus.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/mira.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/noor.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/ola.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/priya.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/sofia.jpg` | binary | binary |
| Added | `apps/showcase/public/images/people/theo.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/after-hours.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/bloom.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/blueprint.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/dune.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/field-notes.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/groove-theory.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/headroom.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/margins.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/slow-signal.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/small-hours.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/static.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/tidewater.jpg` | binary | binary |
| Added | `apps/showcase/public/images/podcasts/wavelength.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/bowl.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/bud-vase.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/candle.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/cushions.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/desk-lamp.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/knit-throw.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/lounge-chair.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/mug.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/planter.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/table-plant.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/task-lamp.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/tea-set.jpg` | binary | binary |
| Added | `apps/showcase/public/images/products/twin-vases.jpg` | binary | binary |
| Added | `apps/showcase/public/images/scenes/market-basket.jpg` | binary | binary |
| Added | `apps/showcase/public/images/scenes/ridge-sunrise.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/chat.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/checkout.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/dashboard.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/fitness.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/piano.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/podcasts.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/shop.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/smart-home.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/social.jpg` | binary | binary |
| Added | `apps/showcase/public/screenshots/theming.jpg` | binary | binary |
| Added | `apps/showcase/src/app/chat/chat-app.tsx` | 590 | 0 |
| Added | `apps/showcase/src/app/chat/chat-state.tsx` | 468 | 0 |
| Added | `apps/showcase/src/app/chat/checkin.tsx` | 166 | 0 |
| Added | `apps/showcase/src/app/chat/composer.tsx` | 312 | 0 |
| Added | `apps/showcase/src/app/chat/history.tsx` | 341 | 0 |
| Added | `apps/showcase/src/app/chat/page.tsx` | 9 | 0 |
| Added | `apps/showcase/src/app/chat/rename-dialog.tsx` | 87 | 0 |
| Added | `apps/showcase/src/app/chat/session-panel.tsx` | 495 | 0 |
| Added | `apps/showcase/src/app/chat/transcript.tsx` | 609 | 0 |
| Added | `apps/showcase/src/app/chat/welcome.tsx` | 98 | 0 |
| Added | `apps/showcase/src/app/checkout/checkout.tsx` | 546 | 0 |
| Added | `apps/showcase/src/app/checkout/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/credits/page.tsx` | 53 | 0 |
| Added | `apps/showcase/src/app/dashboard/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/dashboard/sales-dashboard.tsx` | 575 | 0 |
| Added | `apps/showcase/src/app/fitness/fitness-app.tsx` | 483 | 0 |
| Added | `apps/showcase/src/app/fitness/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/fonts.ts` | 120 | 0 |
| Added | `apps/showcase/src/app/globals.css` | 41 | 0 |
| Added | `apps/showcase/src/app/layout.tsx` | 31 | 0 |
| Added | `apps/showcase/src/app/page.tsx` | 167 | 0 |
| Added | `apps/showcase/src/app/piano/engine.ts` | 434 | 0 |
| Added | `apps/showcase/src/app/piano/keyboard.tsx` | 169 | 0 |
| Added | `apps/showcase/src/app/piano/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/piano/piano-app.tsx` | 856 | 0 |
| Added | `apps/showcase/src/app/podcasts/bits.tsx` | 94 | 0 |
| Added | `apps/showcase/src/app/podcasts/library.tsx` | 397 | 0 |
| Added | `apps/showcase/src/app/podcasts/main-view.tsx` | 685 | 0 |
| Added | `apps/showcase/src/app/podcasts/page.tsx` | 9 | 0 |
| Added | `apps/showcase/src/app/podcasts/player-bar.tsx` | 428 | 0 |
| Added | `apps/showcase/src/app/podcasts/player-context.tsx` | 238 | 0 |
| Added | `apps/showcase/src/app/podcasts/podcast-app.tsx` | 107 | 0 |
| Added | `apps/showcase/src/app/podcasts/show-view.tsx` | 441 | 0 |
| Added | `apps/showcase/src/app/podcasts/side-panel.tsx` | 358 | 0 |
| Added | `apps/showcase/src/app/shop/page.tsx` | 17 | 0 |
| Added | `apps/showcase/src/app/shop/storefront.tsx` | 1275 | 0 |
| Added | `apps/showcase/src/app/smart-home/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/smart-home/smart-home.tsx` | 464 | 0 |
| Added | `apps/showcase/src/app/social/page.tsx` | 16 | 0 |
| Added | `apps/showcase/src/app/social/social-feed.tsx` | 481 | 0 |
| Added | `apps/showcase/src/app/themes.css` | 233 | 0 |
| Added | `apps/showcase/src/app/theming/page.tsx` | 13 | 0 |
| Added | `apps/showcase/src/app/theming/theme-studio.tsx` | 582 | 0 |
| Added | `apps/showcase/src/components/page-header.tsx` | 37 | 0 |
| Added | `apps/showcase/src/lib/base-path.ts` | 10 | 0 |
| Added | `apps/showcase/src/lib/catalog.ts` | 168 | 0 |
| Added | `apps/showcase/src/lib/chat.ts` | 660 | 0 |
| Added | `apps/showcase/src/lib/contrast.ts` | 41 | 0 |
| Added | `apps/showcase/src/lib/photo-credits.json` | 320 | 0 |
| Added | `apps/showcase/src/lib/photos.ts` | 86 | 0 |
| Added | `apps/showcase/src/lib/piano.ts` | 192 | 0 |
| Added | `apps/showcase/src/lib/podcasts.ts` | 581 | 0 |
| Added | `apps/showcase/src/lib/routes.ts` | 108 | 0 |
| Added | `apps/showcase/tsconfig.json` | 19 | 0 |

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/src/calendar.tsx` | 4 | 2 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `.gitignore` | 5 | 0 |
| Modified | `AGENTS.md` | 9 | 0 |
| Added | `DEPLOYMENT.md` | 195 | 0 |
| Modified | `ROADMAP.md` | 19 | 1 |
| Modified | `biome.jsonc` | 61 | 2 |
| Modified | `package.json` | 3 | 0 |
| Modified | `pnpm-lock.yaml` | 2126 | 84 |
| Modified | `turbo.json` | 6 | 1 |
