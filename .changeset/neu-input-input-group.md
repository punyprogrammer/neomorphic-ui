---
"@neomorphic-react/ui": minor
---

Add `Input` (`@neomorphic-react/ui/input`) and `InputGroup` (`@neomorphic-react/ui/input-group`).

- `Input`, built on Base UI so it joins a `Field`: a well pressed into the surface that deepens on focus, shallower when read-only, with an `aria-invalid` (or Field-invalid) ring. Sizes `sm`, `md`, `lg`; `shape` `rounded` (default, matching `Textarea` and `Select`) or `pill` (the kit's search field). `htmlSize` sets the native `size` attribute.
- `InputGroup`: one well around a bare `InputGroupInput` or growing `InputGroupTextarea`, lit for the control's focus, invalid and disabled states; pressing anywhere in it focuses the control. `InputGroupAddon` places icons, `InputGroupText` or `InputGroupButton`s `inline-start`, `inline-end`, `block-start` or `block-end`. `InputGroupButton` fits the group's `size` and `shape` with a 4px inset, `ghost` by default or `default`/`primary` to rise out of the well like the kit's Subscribe button.
