---
"@neomorphic-ui/react": minor
---

Add the Phase 2 composites: `Card`, `Item`, `Separator`, `Calendar`, `Dial`, `BarMeter`, `Avatar` and `Tooltip`, each at `@neomorphic-ui/react/<name>`.

- `Card`: a panel raised out of the surface (or an `inset` well, or `flat`), sizes `sm`, `md`, `lg` setting `--card-spacing`; images at the top or bottom run edge to edge. Parts `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`.
- `Item`: list rows like the kit's credit-card list. `ItemGroup` gives list semantics; rows are `flat`, `raised` or `inset`, `sm` or `md`, and rise and press when rendered as a link or button. Parts `ItemMedia` (icon tile or image), `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, `ItemSeparator`.
- `Separator`: a `solid` groove or a `perforated` tear line, horizontal or vertical; decorative by default, `decorative={false}` for `role="separator"`.
- `Calendar`: a month grid on react-day-picker (new dependency; every DayPicker prop passes through), raised from the page like a `Surface`. Days lie flat and rise on hover, today sits in a sunken well with a dot, and the selection is raised and filled with `--calendar-fill`; ranges get a tinted band. Raised round nav buttons, month/year dropdowns as raised pills over native selects, `--cell-size` to resize. Also exports `CalendarDayButton` and the `DateRange` type.
- `Dial`: a circular slider, a raised knob in a ring well with a 270° gradient arc (`--dial-fill`, `--dial-fill-start`). Drag around the ring or use arrows, Page Up/Down, Home and End; `min`, `max`, `step`, `largeStep`, controlled or uncontrolled, `onValueCommitted`, `name` for forms, sizes `sm`, `md`, `lg`. Children sit in the knob.
- `BarMeter`: a row of vertical meters like the kit's weather week. Each `BarMeterItem` is a well with a raised gradient fill (`--bar-meter-fill`, `--bar-meter-fill-start`) and takes `format`; `BarMeterValue` above, `BarMeterLabel` below. Sizes `sm`, `md`, `lg`, or set `--bar-meter-height`.
- `Avatar`: a raised frame around an image or fallback initials, `circle` or `rounded`, sizes `sm` to `xl`, with `AvatarBadge`, `AvatarGroup` and `AvatarGroupCount`.
- `Tooltip`: a raised popup on any side of its trigger, with `TooltipProvider` for a shared delay.
