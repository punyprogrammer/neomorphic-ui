# Neomorphic showcase

A Next.js app built on [`@neomorphic-react/ui`](https://www.npmjs.com/package/@neomorphic-react/ui), using the library's source in `packages/ui` so changes show up straight away. Each route is a small product screen with its own theme and typeface, so you can see how far the library's CSS variables stretch.

The app has `basePath: "/showcase"`, and the docs site rewrites `/showcase/*` to it, so on the docs domain `/showcase/chat` serves this app's `/chat` route. Files in `public` need the prefix too: use `asset()` from `src/lib/base-path.ts` for image URLs. `Link` adds it on its own.

```bash
# from the repository root
pnpm showcase   # http://localhost:3001/showcase
pnpm site       # docs on :4000 and the showcase together; open http://localhost:4000/showcase
pnpm --filter @neomorphic-react/showcase build
```

See `DEPLOYMENT.md` at the root for hosting.

## Routes

Each route below sits under `/showcase`, for example `/showcase/chat`.

| Route | Screen | Theme | Font |
|---|---|---|---|
| `/` | Overview and theming guide | porcelain, with scoped previews | Inter |
| `/chat` | Still, a calm AI assistant (simulated replies) | haze | Geist, Geist Mono |
| `/shop` | Kiln, a homeware storefront | pearl | Figtree, Fraunces for headings |
| `/podcasts` | Lull, a desktop podcast player | cloud | Figtree |
| `/piano` | Hush, a playable felt piano (Web Audio) | ivory | Jost, Fraunces |
| `/fitness` | Pulse, a fitness tracker | sage | Manrope |
| `/social` | Murmur, a social feed | lilac | Plus Jakarta Sans |
| `/dashboard` | Ledger, a sales dashboard | graphite | IBM Plex Sans |
| `/checkout` | Atelier, a checkout | linen | DM Sans |
| `/smart-home` | Haven, a smart home panel | mist | Poppins |
| `/theming` | Theme studio, live token editor | porcelain | Inter |
| `/credits` | Photo credits | porcelain | Inter |

The carousel in `/shop` needs `embla-carousel-react`, one of the library's optional peer dependencies; charts need `recharts`.

## Photography

Every photo in `public/images` is CC0 (public domain) from [StockSnap](https://stocksnap.io), found through the [Openverse](https://openverse.org) API with `source=stocksnap`. `src/lib/photos.ts` names them for the pages, and `src/lib/photo-credits.json` records each photographer and source page, which `/credits` lists. Images go through `next/image`, so each page gets resized WebP or AVIF.

## How theming works

The library reads a small set of tokens: `--background`, `--foreground`, `--muted`, `--primary`, `--border`, `--neu-light`, `--neu-dark`, `--neu-depth`, `--radius` and the `--chart-*` colours. This app overrides them in three ways.

1. **Page themes** live in `src/app/themes.css`. Each page renders `<main data-theme="sage">`, and `:root:has(main[data-theme="sage"])` applies the tokens to the whole document, so menus, selects and toasts that portal to `body` match the page. A plain `[data-theme]` selector scopes a theme to one subtree, which the home page uses for its preview cards.
2. **Component fills** are per-instance variables set through `style`: `--progress-fill`, `--slider-fill`, `--dial-fill`, `--bar-meter-fill` and `--toggle-on`. They take a single colour because the components mix it with the surface.
3. **Runtime tokens** are set on `document.documentElement` from JavaScript. The theme studio does this and prints the resulting CSS, with WCAG contrast checks for text and the primary button.

Fonts load through `next/font/google` in `src/app/fonts.ts`; each theme picks one by setting `--font-sans`.
