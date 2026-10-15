---
"@neomorphic-ui/react": minor
---

Add the Phase 4 form and text components, each on its own subpath: `Label`, `Field` (with `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend` and `FieldSeparator`; a `FieldLabel` wrapped around a `Field` makes a raised choice card that presses in when checked), `NativeSelect`, `InputOTP`, `Kbd` and `KbdGroup`, the `Typography*` parts (`TypographyH1`–`H4`, paragraph, lead, blockquote, list, inline code and more), `Alert` (default, info, success, warning and destructive; `role="status"` unless urgent), `Empty`, `Skeleton`, `AspectRatio`, `DirectionProvider`/`useDirection`, and `ScrollArea` (groove track with a raised thumb). Adds the shared theme pieces later groups use: the `neu-shimmer` and `neu-shimmer-text` utilities (static under reduced motion), the `--neu-backdrop` overlay tint and the `--chart-1`…`--chart-5` tokens.
