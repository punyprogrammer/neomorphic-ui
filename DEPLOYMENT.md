# Deploying the docs and showcase to Vercel

A step-by-step plan for putting the docs site and the showcase online under one
custom domain. Work through the phases in order; each one ends in something you
can check before moving on.

**Legend:** `[x]` done · `[ ]` to do

## Where things stand

Checked on 16 Oct 2026:

| Item | State |
| --- | --- |
| Docs | `apps/docs`, Next.js 16 with Fumadocs. Builds to static pages (`pnpm examples && next build`). Not committed to git yet |
| Showcase | `apps/showcase`, Next.js 16 with `basePath: "/showcase"`. Moved in from the separate `neomorphic-showcase` folder; uses the library's source through `workspace:*`. Not committed to git yet |
| How they join | The docs app rewrites `/showcase` and `/showcase/*` to `SHOWCASE_URL` (default `http://localhost:3001`). Visitors only ever see the docs domain |
| Library | `packages/ui`. Both apps import its source and transpile it, so neither needs a library build first |
| Site URL | `siteConfig.url` reads `NEXT_PUBLIC_SITE_URL`; the sitemap, robots file and metadata use it |
| Repository | `github.com/punyprogrammer/neomorphic-ui` |
| CI | `pnpm check` passes. Showcase-specific style and complexity rules are relaxed in `biome.jsonc` |

### How a request is served

```text
browser ──► https://<your-domain>/docs/...           ──► docs project (Vercel)
browser ──► https://<your-domain>/showcase/chat      ──► docs project
                                                         └─ rewrite ─► showcase project
                                                                       /showcase/chat
```

This is the Next.js multi-zones pattern: two Vercel projects from one
repository, one domain. Moving from a docs page to a showcase page is a full
page load, which is why the home page cards use `<a>` rather than `Link`.

---

## Phase 1: Get the code ready

- [x] **Fix or relax the showcase lint errors** so `pnpm check` passes. Run
  `pnpm fix` first (it clears the sortable ones), then deal with the rest in
  `apps/showcase/src/app/piano/engine.ts`, `podcasts/*` and `chat/*`, or turn
  the noisy rules off for `apps/showcase/**` in `biome.jsonc`.
  Done: a dedicated `apps/showcase/**` override in `biome.jsonc` turns off the
  style and complexity rules that fight the demo screens; unused
  `biome-ignore` comments were removed.
- [x] **Run every check locally** from the repository root:
  ```bash
  pnpm install
  pnpm check
  pnpm --filter @neomorphic-react/showcase typecheck
  pnpm --filter @neomorphic-react/docs typecheck
  pnpm build
  ```
- [x] **Try the production pair locally.** In one terminal, build and start
  the showcase; in another, build the docs against it:
  ```bash
  pnpm --filter @neomorphic-react/showcase build
  pnpm --filter @neomorphic-react/showcase start     # :3001
  SHOWCASE_URL=http://localhost:3001 pnpm --filter @neomorphic-react/docs build
  pnpm --filter @neomorphic-react/docs start         # :4000
  ```
  Open `http://localhost:4000/showcase/chat` and a docs page.
  Verified 16 Oct 2026: `/`, `/docs/components/calendar`, `/showcase`,
  `/showcase/chat`, `/showcase/piano` and a showcase image all return 200
  through the docs production server.
- [x] **Ignore Vercel's local folder.** Add `.vercel` to `.gitignore`; the
  Vercel CLI writes project links there.
- [ ] **Commit and push** `apps/docs`, `apps/showcase`, the root
  `package.json`, `biome.jsonc`, `pnpm-lock.yaml` and this file.
- [ ] **Retire the old copy.** Once the push is in, delete the separate
  `neomorphic-showcase` folder (it has its own `.git`), so there's one source.

## Phase 2: Create the Vercel projects

Sign in at [vercel.com](https://vercel.com) with GitHub. The free Hobby plan
is enough to start; it's for personal, non-commercial projects, so move to Pro
if the site ever earns money.

Create the showcase first, because the docs project needs its URL.

### 2a. Showcase project

- [ ] **Add New → Project → Import** `punyprogrammer/neomorphic-ui`.
- [ ] **Project name:** `neomorphic-showcase`. Its production URL becomes
  `https://neomorphic-showcase.vercel.app`.
- [ ] **Root Directory:** `apps/showcase`. Vercel spots the pnpm workspace,
  installs from the repository root and builds the app. Leave "Include files
  outside the root directory" on, as the app imports `packages/ui`.
- [ ] **Framework preset:** Next.js. Leave the build and output commands as
  they are.
- [ ] **Node.js version** (Settings → Build and Deployment): `22.x` or later.
- [ ] **Environment variable:** `ENABLE_EXPERIMENTAL_COREPACK=1`, so Vercel
  uses the pnpm version pinned in the root `packageManager` field
  (`pnpm@10.34.6`).
- [ ] **Deploy**, then open
  `https://neomorphic-showcase.vercel.app/showcase/chat`. (The bare `.vercel.app`
  root shows a 404; that's expected with a base path.)

### 2b. Docs project

- [ ] **Add New → Project → Import** the same repository again.
- [ ] **Project name:** `neomorphic-docs`. **Root Directory:** `apps/docs`.
  Framework preset Next.js; Node.js `22.x` or later.
- [ ] **Environment variables** (Production and Preview):

  | Name | Value |
  | --- | --- |
  | `SHOWCASE_URL` | `https://neomorphic-showcase.vercel.app` (no trailing slash) |
  | `NEXT_PUBLIC_SITE_URL` | `https://neomorphic-docs.vercel.app` for now; your domain after Phase 3 |
  | `ENABLE_EXPERIMENTAL_COREPACK` | `1` |

  Point `SHOWCASE_URL` at the showcase's **production** URL. Preview URLs sit
  behind Vercel Authentication by default (Settings → Deployment Protection),
  so a rewrite to one returns a login page instead of the app.
- [ ] **Deploy**, then check `/`, `/docs/components/calendar` and
  `/showcase/piano` on `https://neomorphic-docs.vercel.app`.

### 2c. Build only what changed

Both projects build on every push by default. To skip a project when nothing it
depends on has changed:

- [ ] In each project, Settings → Git → **Ignored Build Step**, choose a custom
  command and enter `npx turbo-ignore --fallback=HEAD^1`. Turbo knows both apps
  depend on `packages/ui`, so a library change still rebuilds both.

## Phase 3: Buy and connect a domain

### 3a. Pick and buy

- [ ] **Choose a name.** Short and tied to the package, for example
  `neomorphic-ui.dev`, `neomorphic.design` or `neomorphicui.com`. `.dev`
  forces HTTPS, which Vercel provides anyway.
- [ ] **Buy it.** Either works:
  - **Vercel Domains** (Dashboard → Domains → Buy). Simplest: DNS and
    certificates are set up for you, and renewals sit on the Vercel bill.
  - **An outside registrar** such as Cloudflare Registrar, Porkbun or
    Namecheap. Often cheaper to renew, and keeps the domain separate from the
    host. Turn on auto-renew and WHOIS privacy.

### 3b. Attach it to the docs project

The domain goes on the **docs** project only. The showcase keeps its
`.vercel.app` address, which visitors never see.

- [ ] Docs project → Settings → **Domains** → add `your-domain.com`. Accept
  Vercel's offer to add `www.your-domain.com` as a redirect to it (or the other
  way round, if you prefer `www`).
- [ ] **DNS.** If you bought through Vercel, there's nothing to do. Otherwise,
  at your registrar either:
  - switch the nameservers to the ones Vercel lists (it then manages all DNS),
    or
  - keep the registrar's DNS and add the records Vercel shows on the Domains
    page: an `A` record for the apex (`@`) and a `CNAME` for `www`.
    Historically these are `76.76.21.21` and `cname.vercel-dns.com`, but copy
    the values Vercel gives you.
- [ ] Wait for the Domains page to show **Valid Configuration**. DNS can take
  from minutes to a few hours; Vercel issues the HTTPS certificate on its own.

### 3c. Point everything at the new domain

- [ ] Change `NEXT_PUBLIC_SITE_URL` on the docs project to
  `https://your-domain.com` and **redeploy** (it's read at build time, so the
  sitemap and metadata only update after a new build).
- [ ] Check `https://your-domain.com/sitemap.xml` and `/robots.txt` list the
  new domain.
- [ ] Update the links that point at the site: the `homepage` field in
  `packages/ui/package.json` (ships with the next npm release), the README,
  and the repository's **Website** field on GitHub.

## Phase 4: After launch

- [ ] **Search.** Add the domain to Google Search Console and submit
  `/sitemap.xml`.
- [ ] **Analytics (optional).** Turn on Vercel Web Analytics on the docs
  project; it needs `@vercel/analytics` added to `apps/docs/app/layout.tsx`.
- [ ] **Previews.** Every pull request gets a docs preview. Its `/showcase`
  routes use the production showcase (from `SHOWCASE_URL`), so showcase changes
  are reviewed on the showcase project's own preview, under
  `/showcase/...`.
- [ ] **Storybook** stays on GitHub Pages
  (`punyprogrammer.github.io/neomorphic-ui`). To bring it under the domain
  later, add a `storybook.your-domain.com` CNAME to GitHub Pages.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `/showcase/...` returns a Vercel login page | `SHOWCASE_URL` points at a protected preview URL; use the production URL |
| `/showcase/...` is a 404 on the docs domain | `SHOWCASE_URL` is missing or has a trailing slash, or the showcase deployment failed |
| Showcase pages load without styles or scripts | The showcase was deployed without `basePath`, so its `/_next` files aren't under `/showcase` |
| Showcase images are broken | A new image path skipped `asset()` from `src/lib/base-path.ts` |
| Install fails with a pnpm version error | `ENABLE_EXPERIMENTAL_COREPACK=1` is missing |
| Sitemap still shows `localhost:4000` | `NEXT_PUBLIC_SITE_URL` wasn't set before the build; set it and redeploy |
