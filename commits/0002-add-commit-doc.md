---
number: 2
subject: "add-commit-doc"
date: 2026-10-14T18:05:21+05:30
author: "punyprogrammer"
files: 7
insertions: 734
deletions: 4
---

<!-- nav --> [← 0001](0001-initial-code-setup.md) · [Index](README.md) · latest →

# 0002 · add-commit-doc

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 2 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0002-add-commit-doc.md` |
| Parent | `353b3d8` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-14T18:05:21+05:30 |
| Branch | `main` |
| Changes | 7 files · +734 −4 |

## Dependencies and scripts

### `package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `husky` | `^9.1.7` | devDependencies |
| Added | `docs:commit` | `node scripts/commit-docs.mjs` | scripts |
| Added | `prepare` | `husky` | scripts |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] Git repository and first commit (`0001` initial-code-setup, pushed to `origin/main`)
- [x] Husky hooks (`prepare` script installs them on `pnpm install`)
- [x] Per-commit docs: `post-commit` hook writes `commits/NNNN-<subject>.md` and folds it into the same commit (`pnpm docs:commit --rev <sha>` to backfill)
- [ ] lint-staged pre-commit hook (`ultracite fix` on staged files)

## Changes by area

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.husky/post-commit` | 1 | 0 |
| Modified | `AGENTS.md` | 7 | 0 |
| Modified | `ROADMAP.md` | 7 | 2 |
| Modified | `biome.jsonc` | 16 | 0 |
| Modified | `package.json` | 4 | 1 |
| Modified | `pnpm-lock.yaml` | 11 | 1 |
| Added | `scripts/commit-docs.mjs` | 688 | 0 |
