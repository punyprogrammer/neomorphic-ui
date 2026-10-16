# neomorphic-ui

[![npm version](https://img.shields.io/npm/v/@neomorphic-react/ui)](https://www.npmjs.com/package/@neomorphic-react/ui)
[![Docs](https://img.shields.io/badge/docs-live-0ea5e9)](https://neomorphic-ui.vercel.app)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://punyprogrammer.github.io/neomorphic-ui/)
[![CI](https://github.com/punyprogrammer/neomorphic-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/punyprogrammer/neomorphic-ui/actions/workflows/ci.yml)
[![licence: MIT](https://img.shields.io/npm/l/@neomorphic-react/ui)](./LICENSE)

Neumorphic React components that rise out of the page or sink into it — built on
[Base UI](https://base-ui.com) and [Tailwind CSS v4](https://tailwindcss.com).

## Links

| | |
| --- | --- |
| **npm** | [`@neomorphic-react/ui`](https://www.npmjs.com/package/@neomorphic-react/ui) |
| **Docs** | [neomorphic-ui.vercel.app](https://neomorphic-ui.vercel.app) |
| **Showcase** | [neomorphic-ui.vercel.app/showcase](https://neomorphic-ui.vercel.app/showcase) |
| **Storybook** | [punyprogrammer.github.io/neomorphic-ui](https://punyprogrammer.github.io/neomorphic-ui/) |
| **Changelog** | [`packages/ui/CHANGELOG.md`](./packages/ui/CHANGELOG.md) |

## Install

```sh
pnpm add @neomorphic-react/ui
# or: npm install @neomorphic-react/ui
```

Full setup (Tailwind `@source`, theme CSS, and usage) lives in the
[`packages/ui` README](./packages/ui/README.md).

## Monorepo

| Path | What |
| --- | --- |
| [`packages/ui`](./packages/ui) | Published component library |
| [`apps/docs`](./apps/docs) | Documentation site + live demos |
| [`apps/showcase`](./apps/showcase) | Themed product screens (`/showcase`) |
| [`apps/storybook`](./apps/storybook) | Component stories |

```sh
pnpm install
pnpm docs        # docs on :4000
pnpm showcase    # showcase on :3001
pnpm storybook   # Storybook
pnpm site        # docs + showcase together
```

## Licence

[MIT](./LICENSE)
