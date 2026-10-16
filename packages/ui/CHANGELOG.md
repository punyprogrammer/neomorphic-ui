# @neomorphic-react/ui

## 0.1.2

### Patch Changes

- 957fe6c: Link the deployed Storybook from the README.

## 0.1.1

### Patch Changes

- 42b1372: Add npm version, licence and CI badges to the README, and link the changelog from it.

## 0.1.0

### Minor Changes

- 18a7faa: First public release: 70 neumorphic React 19 components for Tailwind CSS v4, built on Base UI. Each component has its own subpath (`import { Button } from "@neomorphic-react/ui/button"`), so an app only bundles what it imports. Import `@neomorphic-react/ui/base.css` and `@neomorphic-react/ui/theme.css` in your Tailwind stylesheet. Surfaces rise out of the page or sink into it, focus rings are visible, the components support right-to-left layouts, and motion stops when the user asks for reduced motion.
  
  - **Actions and inputs:** Button, ButtonGroup, Toggle, ToggleGroup, Input, InputGroup, InputOTP, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Dial, Label, Field.
  - **Display:** Surface, Card, Item, Badge, Chip, Avatar, Separator, Kbd, Typography, Alert, Empty, Skeleton, Spinner, Progress, BarMeter, PageIndicator, AspectRatio, ScrollArea.
  - **Disclosure and navigation:** Collapsible, Accordion, Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar.
  - **Overlays:** Tooltip, Popover, HoverCard, Dialog, AlertDialog, Sheet, Drawer, DropdownMenu, ContextMenu, Toast.
  - **Pickers:** Calendar, DatePicker and DateRangePicker, Combobox, Command (with a ⌘K `CommandDialog`).
  - **Layout and data:** Table, DataTable, Resizable, Carousel, Chart.
  - **Conversation and AI:** Bubble, Message, Marker, Attachment, Trace, CodeBlock, MessageScroller, Questionnaire.
  - **Utilities:** `DirectionProvider`/`useDirection`, `useHighlightedCode`, `cn`.
  
  These optional peer dependencies are needed only by the components that use them:
  
  - `react-day-picker@^10` for Calendar and DatePicker
  - `embla-carousel-react@^8` for Carousel
  - `recharts@^3` for Chart
  - `react-resizable-panels@^4` for Resizable
  - `@tanstack/react-table@^8` for DataTable
  - `shiki@^4` for code highlighting with `useHighlightedCode`
