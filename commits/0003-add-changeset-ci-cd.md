---
number: 3
subject: "add-changeset-ci-cd"
date: 2026-10-14T18:13:02+05:30
author: "punyprogrammer"
files: 10
insertions: 869
deletions: 8
---

<!-- nav --> [← 0002](0002-add-commit-doc.md) · [Index](README.md) · [0004 →](0004-add-button.md)

# 0003 · add-changeset-ci-cd

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 3 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0003-add-changeset-ci-cd.md` |
| Parent | `b6ac39d` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T18:13:02+05:30 |
| Branch | `feat/implement-changesets-for-versioning` |
| Changes | 10 files · +869 −8 |

## Dependencies and scripts

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@changesets/cli` | `^3.0.3` | devDependencies |
| Added | `lint-staged` | `^17.6.0` | devDependencies |
| Added | `add:component` | `node scripts/add-component.mjs` | scripts |
| Added | `changeset` | `changeset` | scripts |
| Added | `version-packages` | `changeset version` | scripts |
| Added | `release` | `turbo run build --filter=@neomorphic-ui/react && changeset publish` | scripts |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Changesets for versioning: `pnpm changeset`, `pnpm version-packages`; private workspaces are never versioned; commit docs list changesets added/consumed and version bumps
- [x] lint-staged pre-commit hook (`ultracite fix` on staged JS/TS/JSON/CSS)
- [x] CI (`.github/workflows/ci.yml`): Biome check, then unit tests, Storybook interaction tests and full build in parallel
- [x] `pnpm add:component <Name>`: component (`useRender` + cva, both shadow slots), unit tests, story with a `play` check, `exports` + `tsup` entry
- [x] Run Storybook interaction tests (`play` functions) in CI
- [ ] Release workflow: Changesets version PR + npm publish (with "Publish to npm" below)

## Changes by area

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/README.md` | 17 | 0 |
| Added | `.changeset/config.json` | 12 | 0 |
| Added | `.github/workflows/ci.yml` | 120 | 0 |
| Added | `.husky/pre-commit` | 1 | 0 |
| Modified | `AGENTS.md` | 11 | 3 |
| Modified | `ROADMAP.md` | 6 | 5 |
| Modified | `package.json` | 11 | 0 |
| Modified | `pnpm-lock.yaml` | 264 | 0 |
| Added | `scripts/add-component.mjs` | 361 | 0 |
| Modified | `scripts/commit-docs.mjs` | 66 | 0 |
