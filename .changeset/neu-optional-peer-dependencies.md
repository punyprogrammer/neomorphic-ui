---
"@neomorphic-react/ui": patch
---

Make `recharts`, `embla-carousel-react`, `react-resizable-panels` and `react-day-picker` optional peer dependencies, so installing the library no longer downloads them. Install the ones your components need: `react-day-picker@^10` for `Calendar` and `DatePicker`, `embla-carousel-react@^8` for `Carousel`, `recharts@^3` for `Chart`, and `react-resizable-panels@^4` for `Resizable` (plus `shiki@^4` for `useHighlightedCode`, as before).
