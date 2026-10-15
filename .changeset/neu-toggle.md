---
"@neomorphic-react/ui": minor
---

Add `Toggle` (`@neomorphic-react/ui/toggle`) and `ToggleGroup` + `ToggleGroupItem` (`@neomorphic-react/ui/toggle-group`).

- `Toggle`: a two-state button, raised when off and pressed into the surface when on. Pressed content takes `--toggle-on` (set on the toggle or any ancestor, default `--primary`); `iconFill` turns an outline icon solid while on. Sizes `sm`, `md`, `lg`; `shape` `pill` (icon-only is a circle, like the kit's social toggles) or `rounded` for tiles.
- `ToggleGroup`: a segmented control on the `ButtonGroup` slab, with arrow-key focus, single or `multiple` selection, `orientation`, `shape`, and a group-wide `size`.
- `ButtonGroup` now flattens `Toggle` segments as well as `Button`s, and its segment rules are literal classes so Tailwind always generates them.
