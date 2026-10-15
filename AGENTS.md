# AGENTS.md

Neomorphic UI is a React component library: unstyled `@base-ui/react`
primitives given a neomorphic treatment with Tailwind CSS v4. Read the
component and neomorphic rules below before adding a component.

The repo is self-contained: code, comments and docs never mention or point
to other libraries' source or other local repositories. Explain a decision
in place instead of citing where it came from.

Design reference: the Light Neomorphic UI Kit fork in Figma
(`VPwMxUooz8MVDV283LV5Rp`). The kit is drawn at 2x, as flat layers rather
than Figma components, on three boards: `Basic Components` (`1:2`),
`Components 1` (`3:71`: social, calendar, weather, combined widgets) and
`Components 2` (`3:731`: music, travel and chat apps). Halve every
measurement for web. Components use Roboto; the kit's Sofia Pro headings
have no open licence. Built components are pushed back to the same file on
`Foundations` and `Components` pages.

## Stack

pnpm + Turborepo, React 19, Tailwind CSS v4, `@base-ui/react` 1.9 (never
Radix), CVA, Storybook 10, Vitest, Biome via `ultracite`, `lucide-react` icons.

```bash
pnpm install
pnpm storybook                             # Storybook on port 6007
pnpm build
pnpm test --filter=@neomorphic-ui/react    # unit tests (Vitest + jsdom)
pnpm check                                 # Biome
```

## Structure

```
apps/storybook/            stories, one file per component
  blocks/                  Phase 3 blocks composed only from library components;
                           their stories are in stories/blocks/ (Blocks/…)
packages/ui/src/           @neomorphic-ui/react, one flat .tsx per component
  base.css                 library mechanism: shadow + radius scales, motion
  theme.css                default consumer-owned tokens
packages/typescript-config/
scripts/add-component.mjs  pnpm add:component scaffolder
scripts/commit-docs.mjs    per-commit doc generator (run by .husky/post-commit)
.changeset/                pending version bumps for @neomorphic-ui/react
.github/workflows/ci.yml   check → unit tests, Storybook tests, build
commits/                   generated, one NNNN-<subject>.md per commit; do not edit by hand
```

Every commit gets a doc in `commits/`, numbered by its position in history and
amended into the same commit. Write a commit body (not just `-m "subject"`) to
record the why; it is quoted at the top of the doc. Backfill or regenerate with
`pnpm docs:commit --rev <sha>` or `--all`.

Adding a component: `pnpm add:component <Name>` creates the component, its test
and its story, and registers it in `package.json` `exports` +
`publishConfig.exports` and `tsup.config.ts` `entryPoints`. Then add a
changeset (`pnpm changeset`, `minor` for a new component).

Hooks: `pre-commit` runs `ultracite fix` on staged files (lint-staged);
`post-commit` writes the commit doc. CI runs `check`, then unit tests,
Storybook interaction tests and `build`.

## Component rules

- **Flat, single-file components.** Every component is one `.tsx` in
  `packages/ui/src/`: types, variants, context and parts together. The only
  subfolder is `test/` (shared setup). Tests sit beside the file
  (`button.test.tsx`).
- **No barrel.** Each file is its own entry point. Inside the package, import
  siblings relatively (`import { cn } from "./utils"`); consumers import
  subpaths (`@neomorphic-ui/react/button`).
- **File layout.** `"use client"`, external imports, sibling imports, then
  sections split by `// ----` divider comments (variants, context, each part),
  and named exports at the bottom: `export type { … }; export { … };`.
- **React 19.** No `forwardRef`: take `ref` as a prop.
- **Primitives.** `@base-ui/react` only, never Radix. Use `useRender` +
  `mergeProps` so parts accept a `render` prop; state passed to `useRender`
  becomes `data-*` attributes.
- **Variants.** `cva` for variants, `cn` (clsx + tailwind-merge) to merge the
  consumer's `className` last.
- **`data-slot` on every part,** in kebab case (`card-header`), so parents and
  consumers can target parts. Size and orientation are exposed as
  `data-size` / `data-orientation`; named groups use the component name
  (`group/card`).
- **JSDoc on every exported part,** describing behaviour and accessibility,
  not implementation.
- **Hover is gated.** `base.css` redefines `hover:` behind
  `@media (hover: hover)`. Never write `:hover` inside an arbitrary selector
  (`[&>a:hover]:…`); split it (`[&>a]:hover:…`) so the gate applies.
- **Assert computed styles in Storybook, not jsdom.** The unit-test setup
  loads no CSS, so `getComputedStyle` measures nothing there. Unit tests check
  behaviour, ARIA, `data-slot` and events; anything that depends on which CSS
  rule wins goes in a story's `play` function, which runs in real Chromium.

## Neomorphic rules

- **One surface colour.** Components use `bg-background`, or `bg-neu-convex`
  (the kit's subtle top-left-lit gradient) when raised. Depth comes from
  shadows, never from a different fill. `--card`, `--popover` and
  `--secondary` alias `--background` for that reason.
- **Elevation utilities.** Raised: `shadow-neu-sm | shadow-neu | shadow-neu-lg`.
  Pressed in: `inset-shadow-neu-sm | inset-shadow-neu | inset-shadow-neu-lg`.
  All derive from `--neu-light`, `--neu-dark` and `--neu-depth`; never write a
  literal box-shadow.
- **Always set both slots.** Pair a raised utility with `inset-shadow-neu-flat`
  and an inset one with `shadow-neu-flat`. Every value has two layers so
  raised ↔ pressed transitions interpolate; `shadow-none` makes them snap.
- **State needs more than depth.** Shadow edges do not reach WCAG 1.4.11's 3:1,
  so checked, selected and on states also change colour (`bg-primary`) or
  show a mark, and focus always shows a visible outline
  (`focus-visible:outline-2 focus-visible:outline-ring/50
  focus-visible:outline-offset-2`).
- **Invalid and disabled.** Invalid controls get
  `aria-invalid:ring-1 aria-invalid:ring-destructive/70`; disabled ones drop
  to `opacity-50` with `cursor-not-allowed` (raised buttons also go flat).
- **Light only for v1.** No `dark:` variants yet.
