---
"@neomorphic-ui/react": minor
---

Add `Badge` and `BadgeAnchor` (`@neomorphic-ui/react/badge`): a raised marker for counts, dots, and short labels. `count` with `max` (reads `99+`) hides at zero unless `showZero`; `dot` for a contentless marker. Variants `default` (raised), `inset`, and AA-paired fills `primary`, `destructive`, `success`, `warning`; sizes `sm`, `md`, `lg`. Inside a `BadgeAnchor`, `placement` pins the badge to a corner (`top-end`, `top-start`, `bottom-end`, `bottom-start`, following writing direction) and `overlap="circular"` moves it onto a round anchor's edge. Placed badges are `aria-hidden`; the anchored control carries the count in its name.
