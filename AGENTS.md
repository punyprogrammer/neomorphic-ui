# AGENTS.md

Neomorphic UI is a React component library built on the same architecture as
the Keystone UI library in `../react`. Its conventions apply here unless this
file says otherwise: read `../react/AGENTS.md` and
`../react/.cursor/rules/{component-architecture,design-tokens}.mdc` before
adding a component.

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
  show a mark, and focus keeps Keystone's visible outline.
- **Light only for v1.** No `dark:` variants yet.
