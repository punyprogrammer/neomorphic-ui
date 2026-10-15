---
"@neomorphic-react/ui": minor
---

Add `Slider` (`@neomorphic-react/ui/slider`) and `Progress` (`@neomorphic-react/ui/progress`).

- `Slider`, built on Base UI: the kit's music slider. A groove track, a fill that brightens toward the thumb (`--slider-fill`, default `--primary`), and a raised pill thumb with three grip grooves that sinks in while dragged. The thumb stays inside the track at both ends. An array value gives a range (one thumb each, named with `getAriaLabel`); `orientation="vertical"`; sizes `sm`, `md`, `lg`. `SliderLabel` and `SliderValue` go in `children`.
- `Progress`, built on Base UI: a well with a raised fill that darkens toward its start (`--progress-fill`, default `--primary`). `size="lg"` is the kit's deep bar, and `valueInside` prints the value in the fill, moving it just past the fill's end while there isn't room. `value={null}` sweeps an indeterminate fill (held still under reduced motion). `ProgressLabel` and `ProgressValue` go in `children`.
- New theme animation `--animate-neu-progress` (`animate-neu-progress`).
