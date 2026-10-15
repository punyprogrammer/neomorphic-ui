---
"@neomorphic-react/ui": minor
---

Add the Phase 4 layout and data components: `Resizable` (panels split by a groove handle with an optional raised grip; uses `react-resizable-panels`), `Carousel` (raised previous/next buttons and a `PageIndicator`, RTL-aware arrow keys; uses `embla-carousel-react`), `Sidebar` (sidebar, floating and inset variants that collapse off-canvas or to icons, a Sheet on small screens, ⌘B/Ctrl+B, menus whose active row presses in) and `Chart` (`ChartContainer` turns a config into colour, bar-fill and area-fade variables; raised `ChartTooltipContent` and `ChartLegendContent`; uses `recharts`). Each third-party library is only loaded from its component's subpath.
