---
number: 34
subject: "initial-packaging"
date: 2026-10-15T14:31:58+05:30
author: "punyprogrammer"
files: 122
insertions: 1672
deletions: 1072
---

<!-- nav --> [← 0033](0033-add-optional-deps.md) · [Index](README.md) · [0034 →](0034-resolveconflict.md)

# 0034 · initial-packaging

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 34 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0034-initial-packaging.md` |
| Parent | `123ff05` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T14:31:58+05:30 |
| Branch | `feat/implement-component-wise-package` |
| Changes | 122 files · +1672 −1072 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `data-table.tsx` | `DataTableColumnHeaderProps`, `DataTableFilterProps`, `DataTablePaginationProps`, `DataTableProps`, `DataTableSelectAllProps`, `DataTableSelectRowProps`, `DataTableViewOptionsProps`, `UseDataTableOptions`, `DataTable`, `DataTableColumnHeader`, `DataTableFilter`, `DataTablePagination`, `DataTableSelectAll`, `DataTableSelectRow`, `DataTableViewOptions`, `useDataTable` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/data-table.test.tsx` | 6 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Modified | `accordion.stories.tsx` | no stories added or removed |
| Modified | `alert-dialog.stories.tsx` | no stories added or removed |
| Modified | `alert.stories.tsx` | no stories added or removed |
| Modified | `aspect-ratio.stories.tsx` | no stories added or removed |
| Modified | `attachment.stories.tsx` | no stories added or removed |
| Modified | `avatar.stories.tsx` | no stories added or removed |
| Modified | `badge.stories.tsx` | no stories added or removed |
| Modified | `bar-meter.stories.tsx` | no stories added or removed |
| Deleted | `data-table.stories.tsx` | Default, Empty |
| Modified | `breadcrumb.stories.tsx` | no stories added or removed |
| Modified | `bubble.stories.tsx` | no stories added or removed |
| Modified | `button-group.stories.tsx` | no stories added or removed |
| Modified | `button.stories.tsx` | no stories added or removed |
| Modified | `calendar.stories.tsx` | no stories added or removed |
| Modified | `card.stories.tsx` | no stories added or removed |
| Modified | `carousel.stories.tsx` | no stories added or removed |
| Modified | `chart.stories.tsx` | no stories added or removed |
| Modified | `checkbox.stories.tsx` | no stories added or removed |
| Modified | `chip.stories.tsx` | no stories added or removed |
| Modified | `code-block.stories.tsx` | no stories added or removed |
| Modified | `collapsible.stories.tsx` | no stories added or removed |
| Modified | `combobox.stories.tsx` | no stories added or removed |
| Modified | `command.stories.tsx` | no stories added or removed |
| Modified | `context-menu.stories.tsx` | no stories added or removed |
| Added | `data-table.stories.tsx` | Default, Empty |
| Modified | `date-picker.stories.tsx` | no stories added or removed |
| Modified | `dial.stories.tsx` | no stories added or removed |
| Modified | `dialog.stories.tsx` | no stories added or removed |
| Modified | `direction.stories.tsx` | no stories added or removed |
| Modified | `drawer.stories.tsx` | no stories added or removed |
| Modified | `dropdown-menu.stories.tsx` | no stories added or removed |
| Modified | `empty.stories.tsx` | no stories added or removed |
| Modified | `field.stories.tsx` | no stories added or removed |
| Modified | `foundations.stories.tsx` | no stories added or removed |
| Modified | `hover-card.stories.tsx` | no stories added or removed |
| Modified | `input-group.stories.tsx` | no stories added or removed |
| Modified | `input-otp.stories.tsx` | no stories added or removed |
| Modified | `input.stories.tsx` | no stories added or removed |
| Modified | `item.stories.tsx` | no stories added or removed |
| Modified | `kbd.stories.tsx` | no stories added or removed |
| Modified | `marker.stories.tsx` | no stories added or removed |
| Modified | `menubar.stories.tsx` | no stories added or removed |
| Modified | `message-scroller.stories.tsx` | no stories added or removed |
| Modified | `message.stories.tsx` | no stories added or removed |
| Modified | `native-select.stories.tsx` | no stories added or removed |
| Modified | `navigation-menu.stories.tsx` | no stories added or removed |
| Modified | `page-indicator.stories.tsx` | no stories added or removed |
| Modified | `pagination.stories.tsx` | no stories added or removed |
| Modified | `popover.stories.tsx` | no stories added or removed |
| Modified | `progress.stories.tsx` | no stories added or removed |
| Modified | `questionnaire.stories.tsx` | no stories added or removed |
| Modified | `radio-group.stories.tsx` | no stories added or removed |
| Modified | `resizable.stories.tsx` | no stories added or removed |
| Modified | `scroll-area.stories.tsx` | no stories added or removed |
| Modified | `select.stories.tsx` | no stories added or removed |
| Modified | `separator.stories.tsx` | no stories added or removed |
| Modified | `sheet.stories.tsx` | no stories added or removed |
| Modified | `sidebar.stories.tsx` | no stories added or removed |
| Modified | `skeleton.stories.tsx` | no stories added or removed |
| Modified | `slider.stories.tsx` | no stories added or removed |
| Modified | `spinner.stories.tsx` | no stories added or removed |
| Modified | `surface.stories.tsx` | no stories added or removed |
| Modified | `switch.stories.tsx` | no stories added or removed |
| Modified | `table.stories.tsx` | no stories added or removed |
| Modified | `tabs.stories.tsx` | no stories added or removed |
| Modified | `textarea.stories.tsx` | no stories added or removed |
| Modified | `toast.stories.tsx` | no stories added or removed |
| Modified | `toggle-group.stories.tsx` | no stories added or removed |
| Modified | `toggle.stories.tsx` | no stories added or removed |
| Modified | `tooltip.stories.tsx` | no stories added or removed |
| Modified | `trace.stories.tsx` | no stories added or removed |
| Modified | `typography.stories.tsx` | no stories added or removed |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-data-table.md` | `@neomorphic-react/ui` minor | Add Data Table (`@neomorphic-react/ui/data-table`): `useDataTable` plus `DataTable`, `DataTableColumnHeader`, `DataTableSelectAll`, `DataTableSelectRow`, `DataTableFilter`, `DataTableViewOptions` and `DataTablePagination`, built on `@tanstack/react-table` (a new optional peer dependency). The package now ships only `dist/` and the two stylesheets. |

## Dependencies and scripts

### `apps/storybook/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Removed | `@neomorphic-ui/react` | `workspace:*` | dependencies |
| Added | `@neomorphic-react/ui` | `workspace:*` | dependencies |
| Removed | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Changed | `storybook` | `pnpm --filter @neomorphic-react/storybook dev` | scripts |
| Changed | `release` | `turbo run build --filter=@neomorphic-react/ui && node scripts/check-pack.mjs && changeset publish` | scripts |
| Added | `check:pack` | `node scripts/check-pack.mjs` | scripts |

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Removed | `@neomorphic-ui/typescript-config` | `workspace:*` | devDependencies |
| Added | `@neomorphic-react/typescript-config` | `workspace:*` | devDependencies |
| Added | `@tanstack/react-table` | `^8.21.3` | devDependencies |
| Added | `@tanstack/react-table` | `^8.0.0` | peerDependencies |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Biome via `ultracite`, shared `@neomorphic-react/typescript-config`
- [x] `@neomorphic-react/ui` package: tsup build, subpath exports, Vitest + jsdom
- [x] New dependencies (each component on its own subpath so unused ones never ship): `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `recharts` (Chart), `@tanstack/react-table` (Data Table), `shiki` (optional highlighting for Code Block); all are optional peer dependencies of the package, installed only by apps that use those components
- [x] Data Table: `useDataTable` (sorting, filtering, pagination, selection and column visibility row models) and parts that draw it: raised `DataTable` with `aria-sort` headers, selected-row tint and an empty message; `DataTableColumnHeader` (ghost sort button, primary while sorted); `DataTableSelectAll`/`DataTableSelectRow` Checkboxes (indeterminate select-all); `DataTableFilter` Input; `DataTableViewOptions` column Dropdown Menu; `DataTablePagination` with ellipsis ranges and a live selection count; 6 tests, 2 stories (bookings example)
- [x] Code Block: inset code well, header with title and actions (copy with a "Copied" announcement, wrap toggle), floating actions shown on hover/focus, line numbers and `startLine`, wrap, highlighted/added/removed lines, `maxLines` with Show more/less, sm and destructive (error output) variants; highlighting in `useHighlightedCode` on its own subpath (`@neomorphic-react/ui/use-highlighted-code`; Shiki JS engine, core, languages and themes all loaded on first use; plain lines until ready); 7 tests, 5 stories
- [ ] Publish `@neomorphic-react/ui` to npm (step-by-step plan in [`PUBLISHING.md`](PUBLISHING.md))

## Changes by area

### apps/storybook · `@neomorphic-react/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/.storybook/main.ts` | 4 | 4 |
| Modified | `apps/storybook/.storybook/preview.css` | 2 | 2 |
| Modified | `apps/storybook/blocks/boarding-ticket.tsx` | 6 | 6 |
| Modified | `apps/storybook/blocks/chat-thread.tsx` | 11 | 11 |
| Deleted | `apps/storybook/blocks/data-table.tsx` | 0 | 547 |
| Modified | `apps/storybook/blocks/music-player.tsx` | 7 | 7 |
| Modified | `apps/storybook/blocks/newsletter-signup.tsx` | 4 | 4 |
| Modified | `apps/storybook/blocks/payment-methods.tsx` | 8 | 8 |
| Modified | `apps/storybook/blocks/settings-tiles.tsx` | 5 | 5 |
| Modified | `apps/storybook/blocks/travel-cards.tsx` | 7 | 7 |
| Modified | `apps/storybook/blocks/weather-widget.tsx` | 5 | 5 |
| Modified | `apps/storybook/package.json` | 3 | 3 |
| Modified | `apps/storybook/stories/accordion.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/alert-dialog.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/alert.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/aspect-ratio.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/attachment.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/avatar.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/badge.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/bar-meter.stories.tsx` | 3 | 3 |
| Deleted | `apps/storybook/stories/blocks/data-table.stories.tsx` | 0 | 127 |
| Modified | `apps/storybook/stories/breadcrumb.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/bubble.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/button-group.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/button.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/calendar.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/card.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/carousel.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/chart.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/checkbox.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/chip.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/code-block.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/collapsible.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/combobox.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/command.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/context-menu.stories.tsx` | 2 | 2 |
| Added | `apps/storybook/stories/data-table.stories.tsx` | 441 | 0 |
| Modified | `apps/storybook/stories/date-picker.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/dial.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/dialog.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/direction.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/drawer.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/dropdown-menu.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/empty.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/field.stories.tsx` | 10 | 10 |
| Modified | `apps/storybook/stories/foundations.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/hover-card.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input-group.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input-otp.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/input.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/item.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/kbd.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/marker.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/menubar.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/message-scroller.stories.tsx` | 7 | 7 |
| Modified | `apps/storybook/stories/message.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/native-select.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/navigation-menu.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/page-indicator.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/pagination.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/popover.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/progress.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/questionnaire.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/radio-group.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/resizable.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/scroll-area.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/select.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/separator.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/sheet.stories.tsx` | 5 | 5 |
| Modified | `apps/storybook/stories/sidebar.stories.tsx` | 7 | 7 |
| Modified | `apps/storybook/stories/skeleton.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/slider.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/spinner.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/surface.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/switch.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/table.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/tabs.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/textarea.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/toast.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/toggle-group.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/stories/toggle.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/tooltip.stories.tsx` | 3 | 3 |
| Modified | `apps/storybook/stories/trace.stories.tsx` | 4 | 4 |
| Modified | `apps/storybook/stories/typography.stories.tsx` | 2 | 2 |
| Modified | `apps/storybook/tsconfig.json` | 2 | 2 |
| Modified | `apps/storybook/vite.config.ts` | 1 | 1 |

### packages/typescript-config · `@neomorphic-react/typescript-config`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/typescript-config/package.json` | 1 | 1 |

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 13 | 6 |
| Added | `packages/ui/src/data-table.test.tsx` | 161 | 0 |
| Added | `packages/ui/src/data-table.tsx` | 562 | 0 |
| Modified | `packages/ui/tsconfig.json` | 1 | 1 |
| Modified | `packages/ui/tsup.config.ts` | 1 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `.changeset/README.md` | 1 | 1 |
| Modified | `.changeset/neu-badge.md` | 2 | 2 |
| Modified | `.changeset/neu-button-group.md` | 2 | 2 |
| Modified | `.changeset/neu-button-loading-name.md` | 1 | 1 |
| Modified | `.changeset/neu-button.md` | 2 | 2 |
| Modified | `.changeset/neu-checkbox-radio.md` | 2 | 2 |
| Modified | `.changeset/neu-chip.md` | 2 | 2 |
| Added | `.changeset/neu-data-table.md` | 5 | 0 |
| Modified | `.changeset/neu-input-input-group.md` | 2 | 2 |
| Modified | `.changeset/neu-optional-peer-dependencies.md` | 1 | 1 |
| Modified | `.changeset/neu-page-indicator-spinner.md` | 2 | 2 |
| Modified | `.changeset/neu-phase-2-composites.md` | 2 | 2 |
| Modified | `.changeset/neu-phase-4a-forms-text.md` | 1 | 1 |
| Modified | `.changeset/neu-phase-4b-disclosure-navigation.md` | 1 | 1 |
| Modified | `.changeset/neu-phase-4c-overlays.md` | 1 | 1 |
| Modified | `.changeset/neu-phase-4d-pickers.md` | 1 | 1 |
| Modified | `.changeset/neu-phase-4e-layout-data.md` | 1 | 1 |
| Modified | `.changeset/neu-phase-4f-conversation-ai.md` | 2 | 2 |
| Modified | `.changeset/neu-slider-progress.md` | 2 | 2 |
| Modified | `.changeset/neu-switch.md` | 2 | 2 |
| Modified | `.changeset/neu-textarea-select.md` | 2 | 2 |
| Modified | `.changeset/neu-toggle.md` | 2 | 2 |
| Modified | `.github/workflows/ci.yml` | 7 | 3 |
| Modified | `AGENTS.md` | 15 | 6 |
| Modified | `PUBLISHING.md` | 47 | 36 |
| Modified | `ROADMAP.md` | 8 | 7 |
| Modified | `package.json` | 3 | 2 |
| Modified | `pnpm-lock.yaml` | 6 | 3 |
| Modified | `scripts/add-component.mjs` | 2 | 2 |
| Added | `scripts/check-pack.mjs` | 68 | 0 |
