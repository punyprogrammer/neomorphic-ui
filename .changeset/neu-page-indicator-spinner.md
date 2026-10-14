---
"@neomorphic-ui/react": minor
---

Add `PageIndicator` (`@neomorphic-ui/react/page-indicator`) and `Spinner` (`@neomorphic-ui/react/spinner`).

- `PageIndicator`: the kit's three dots. The other pages are wells; the current one (`value`, from 0) rises out of the surface filled with `--page-indicator-fill` (default `--primary`). Passive by default, as an image named "Page 2 of 3". With `onValueChange`, the dots become page buttons in a group, with `aria-current`, a single tab stop, arrow keys (mirrored in right-to-left layouts), Home and End. Every dot sits in a target of at least 24px. `getAriaLabel` renames pages; `orientation` (`horizontal`, `vertical`); sizes `sm`, `md`, `lg`.
- `Spinner`: the kit's loader, a ring-shaped groove around a raised hub with an arc running around it (`--spinner-fill`, default `--primary`). A `role="status"` named "Loading" (override with `aria-label`); with `aria-hidden` it is decoration only. Held still under reduced motion. Sizes `sm` (24px), `md` (40px), `lg` (64px).
