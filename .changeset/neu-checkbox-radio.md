---
"@neomorphic-react/ui": minor
---

Add `Checkbox` (`@neomorphic-react/ui/checkbox`) and `RadioGroup` + `RadioGroupItem` (`@neomorphic-react/ui/radio-group`), following the kit: an empty control is a well pressed into the surface, a selected one rises out of it with a dark check or dot.

- `Checkbox`: checked, unchecked and `indeterminate` (a dash, read as "mixed"; also when Base UI derives it for a parent box), `aria-invalid` ring, sizes `sm`, `md`, `lg`. A hidden native input submits with forms.
- `RadioGroup`: arrow keys move the choice, a group-wide `size` that items can override, stacked by default (`className="flex gap-6"` for a row).
