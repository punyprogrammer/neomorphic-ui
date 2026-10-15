---
number: 46
subject: "Deploy Storybook to GitHub Pages and finish Phase 7"
date: 2026-10-15T16:18:05+05:30
author: "punyprogrammer"
files: 6
insertions: 81
deletions: 37
---

<!-- nav --> [← 0042](0042-add-version-badge.md) · [Index](README.md) · [0048 →](0048-initial-docs.md)

# 0046 · Deploy Storybook to GitHub Pages and finish Phase 7

> CI now publishes the built Storybook to
> https://punyprogrammer.github.io/neomorphic-ui/ on pushes to main. The build
> job uploads storybook-static as a Pages artifact, and a separate
> deploy-storybook job deploys it only after the unit tests, Storybook tests
> and build have all passed, so a broken build never replaces the live site.
> Pull requests still build Storybook but never deploy it.
> 
> The npm README links the live Storybook (badge and Documentation section)
> instead of telling readers to clone the repo, with a patch changeset so it
> reaches npm in the next release. ROADMAP ticks the release workflow and the
> npm publish; PUBLISHING records Phase 7 (Pages source set to GitHub Actions,
> repo website and description, the 0.1.0 GitHub release notes).
> 
> Co-authored-by: Cursor <cursoragent@cursor.com>

## Overview

|  |  |
| --- | --- |
| Number | 46 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0046-deploy-storybook-to-github-pages-and-finish-phase-7.md` |
| Parent | `c326f17` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T16:18:05+05:30 |
| Branch | `chore/deploy-storybook` |
| Changes | 6 files · +81 −37 |

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-readme-storybook.md` | `@neomorphic-react/ui` patch | Link the deployed Storybook from the README. |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Release workflow (`.github/workflows/release.yml`): Changesets version PR, then npm publish through the trusted publisher with provenance (Phase 6 of [`PUBLISHING.md`](PUBLISHING.md))
- [x] Storybook deployed to [GitHub Pages](https://punyprogrammer.github.io/neomorphic-ui/) by CI from `main` once tests pass
- [x] Publish [`@neomorphic-react/ui`](https://www.npmjs.com/package/@neomorphic-react/ui) to npm: `0.1.0` on 15 Oct 2026 (step-by-step plan in [`PUBLISHING.md`](PUBLISHING.md))

## Changes by area

### packages/ui · `@neomorphic-react/ui`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/README.md` | 5 | 4 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-readme-storybook.md` | 5 | 0 |
| Modified | `.github/workflows/ci.yml` | 26 | 0 |
| Modified | `AGENTS.md` | 5 | 2 |
| Modified | `PUBLISHING.md` | 37 | 29 |
| Modified | `ROADMAP.md` | 3 | 2 |
