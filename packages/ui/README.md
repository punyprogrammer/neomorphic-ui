# @neomorphic-react/ui

[![npm version](https://img.shields.io/npm/v/@neomorphic-react/ui)](https://www.npmjs.com/package/@neomorphic-react/ui)
[![licence: MIT](https://img.shields.io/npm/l/@neomorphic-react/ui)](https://github.com/punyprogrammer/neomorphic-ui/blob/main/packages/ui/LICENSE)
[![CI](https://github.com/punyprogrammer/neomorphic-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/punyprogrammer/neomorphic-ui/actions/workflows/ci.yml)

Neumorphic React components: surfaces that rise out of the page or sink into
it, built on [Base UI](https://base-ui.com) and styled with
[Tailwind CSS v4](https://tailwindcss.com).

![A music player, a payment method picker and a weather widget built with @neomorphic-react/ui](https://raw.githubusercontent.com/punyprogrammer/neomorphic-ui/main/.github/assets/preview.png)

- **70 components**: buttons, inputs, menus, dialogs, date pickers,
  a data table, charts and chat parts for AI apps.
- **One import path per component**, so your app only bundles what it uses.
- **Accessible**: keyboard support and ARIA from Base UI, visible focus rings,
  colours that pass WCAG AA contrast, right-to-left layouts, and no motion
  when the user asks for reduced motion.
- **Themeable** with CSS variables: the surface colour, shadows, depth and
  radius.

## Requirements

- React 19 and React DOM 19
- Tailwind CSS v4
- Node.js 22 or later

## Install

```sh
pnpm add @neomorphic-react/ui
# or: npm install @neomorphic-react/ui
```

## Set up the styles

The components use Tailwind class names, so your Tailwind build has to scan
the package. In the stylesheet where you import Tailwind:

```css
@import "tailwindcss";
@import "@neomorphic-react/ui/base.css";
@import "@neomorphic-react/ui/theme.css";

@source "../node_modules/@neomorphic-react/ui/dist";
```

The `@source` path is relative to this CSS file; change it so it reaches your
`node_modules`. Without it, components render with no shadows or spacing.

- `base.css` holds the mechanics: shadow and radius scales, animations and
  the `neu-*` utilities.
- `theme.css` holds the default colours. Import it as is, or copy it into
  your own CSS and edit it.

The theme is designed for [Roboto](https://fonts.google.com/specimen/Roboto).
Load it (for example with `@fontsource/roboto`) and set the font:

```css
@theme {
  --font-sans: "Roboto", ui-sans-serif, system-ui, sans-serif;
}
```

Popups (menus, dialogs, tooltips) render in a portal at the end of `<body>`.
Give your app's root element `isolation: isolate` so they always stack above
the page.

## Use

Import each component from its own path:

```tsx
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";
import { Toaster, toast } from "@neomorphic-react/ui/toast";

export function Settings() {
  return (
    <>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what we send you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Label className="flex items-center justify-between">
            Weekly digest
            <Switch defaultChecked />
          </Label>
        </CardContent>
        <CardFooter>
          <Button onClick={() => toast.success("Saved")} variant="primary">
            Save
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}
```

Every entry starts with `"use client"`, so in the Next.js App Router you can
import components straight into Server Components.

## Optional dependencies

A few components wrap a third-party library. Those libraries are optional
peer dependencies: install one only if you use the component that needs it.

| Component | Install |
|---|---|
| Calendar, DatePicker | `react-day-picker@^10` |
| Carousel | `embla-carousel-react@^8` |
| Chart | `recharts@^3` |
| DataTable | `@tanstack/react-table@^8` |
| Resizable | `react-resizable-panels@^4` |
| Syntax highlighting in CodeBlock (`useHighlightedCode`) | `shiki@^4` |

Without `shiki`, `CodeBlock` still renders plain code.

## Theming

Override the tokens after importing `theme.css`:

```css
:root {
  --background: oklch(0.95 0.01 250); /* the shared surface colour */
  --primary: oklch(0.45 0.12 260);
  --neu-depth: 3px; /* deeper shadows everywhere */
  --radius: 1rem;
}
```

Neumorphism only works when every surface shares one colour, so keep
`--background`, `--card`, `--popover` and `--secondary` equal. Depth comes
from the `--neu-light` and `--neu-dark` shadows, not from fills.

## Components

| Group | Components |
|---|---|
| Actions and inputs | Button, ButtonGroup, Toggle, ToggleGroup, Input, InputGroup, InputOTP, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Dial, Label, Field |
| Display | Surface, Card, Item, Badge, Chip, Avatar, Separator, Kbd, Typography, Alert, Empty, Skeleton, Spinner, Progress, BarMeter, PageIndicator, AspectRatio, ScrollArea |
| Disclosure and navigation | Collapsible, Accordion, Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar |
| Overlays | Tooltip, Popover, HoverCard, Dialog, AlertDialog, Sheet, Drawer, DropdownMenu, ContextMenu, Toast |
| Pickers | Calendar, DatePicker, Combobox, Command |
| Layout and data | Table, DataTable, Resizable, Carousel, Chart |
| Conversation and AI | Bubble, Message, Marker, Attachment, Trace, CodeBlock, MessageScroller, Questionnaire |

The import path is the component name in kebab case:
`@neomorphic-react/ui/dropdown-menu`, `@neomorphic-react/ui/date-picker`.

## Documentation

Every component has a Storybook page with its props, variants and
accessibility notes. To browse it, clone the
[repository](https://github.com/punyprogrammer/neomorphic-ui) and run
`pnpm install && pnpm storybook`.

## Changelog

Release notes for every version are in
[CHANGELOG.md](https://github.com/punyprogrammer/neomorphic-ui/blob/main/packages/ui/CHANGELOG.md).

## Licence

[MIT](./LICENSE)
