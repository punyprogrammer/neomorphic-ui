---
number: 40
subject: "add-release-workflow"
date: 2026-10-15T15:00:15+05:30
author: "punyprogrammer"
files: 6
insertions: 128
deletions: 85
---

<!-- nav --> [← 0039](0039-sync-with-remote.md) · [Index](README.md) · [0041 →](0041-add-readme-badges-and-changelog-link.md)

# 0040 · add-release-workflow

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 40 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0040-add-release-workflow.md` |
| Parent | `cda2300` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T15:00:15+05:30 |
| Branch | `main` |
| Changes | 6 files · +128 −85 |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Consumed | `neu-initial-release.md` | `@neomorphic-react/ui` minor | First public release: 70 neumorphic React 19 components for Tailwind CSS v4, built on Base UI. Each component has its own subpath (`import { Button } from "@neomorphic-react/ui/button"`), so an app only bundles what it imports. Import `@neomorphic-react/ui/base.css` and `@neomorphic-react/ui/theme.css` in your Tailwind stylesheet. Surfaces rise out of the page or sink into it, focus rings are visible, the components support right-to-left layouts, and motion stops when the user asks for reduced motion. - **Actions and inputs:** Button, ButtonGroup, Toggle, ToggleGroup, Input, InputGroup, InputOTP, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Dial, Label, Field. - **Display:** Surface, Card, Item, Badge, Chip, Avatar, Separator, Kbd, Typography, Alert, Empty, Skeleton, Spinner, Progress, BarMeter, PageIndicator, AspectRatio, ScrollArea. - **Disclosure and navigation:** Collapsible, Accordion, Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar. - **Overlays:** Tooltip, Popover, HoverCard, Dialog, AlertDialog, Sheet, Drawer, DropdownMenu, ContextMenu, Toast. - **Pickers:** Calendar, DatePicker and DateRangePicker, Combobox, Command (with a ⌘K `CommandDialog`). - **Layout and data:** Table, DataTable, Resizable, Carousel, Chart. - **Conversation and AI:** Bubble, Message, Marker, Attachment, Trace, CodeBlock, MessageScroller, Questionnaire. - **Utilities:** `DirectionProvider`/`useDirection`, `useHighlightedCode`, `cn`. These optional peer dependencies are needed only by the components that use them: - `react-day-picker@^10` for Calendar and DatePicker - `embla-carousel-react@^8` for Carousel - `recharts@^3` for Chart - `react-resizable-panels@^4` for Resizable - `@tanstack/react-table@^8` for DataTable - `shiki@^4` for code highlighting with `useHighlightedCode` |

### Package versions

| Package | Version |
| --- | --- |
| `@neomorphic-react/ui` | `0.0.0` → `0.1.0` |

## Changes by area

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `packages/ui/CHANGELOG.md` | 25 | 0 |
| Modified | `packages/ui/package.json` | 1 | 1 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Deleted | `.changeset/neu-initial-release.md` | 0 | 23 |
| Added | `.github/workflows/release.yml` | 63 | 0 |
| Modified | `AGENTS.md` | 2 | 0 |
| Modified | `PUBLISHING.md` | 37 | 61 |
