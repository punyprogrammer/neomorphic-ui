---
number: 49
subject: "Fix showcase rewrites falling back to localhost on Vercel."
date: 2026-10-16T11:29:47+05:30
author: "punyprogrammer"
files: 2
insertions: 13
deletions: 4
---

<!-- nav --> [← 0048](0048-initial-docs.md) · [Index](README.md) · latest →

# 0049 · Fix showcase rewrites falling back to localhost on Vercel.

> Secret SHOWCASE_URL left next.config on localhost and triggered
> DNS_HOSTNAME_RESOLVED_PRIVATE; fall back to the showcase URL when VERCEL is set.
> 
> Co-authored-by: Cursor <cursoragent@cursor.com>

## Overview

|  |  |
| --- | --- |
| Number | 49 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0049-fix-showcase-rewrites-falling-back-to-localhost-on-vercel.md` |
| Parent | `e11355e` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-16T11:29:47+05:30 |
| Branch | `feat/docs-site` |
| Changes | 2 files · +13 −4 |

## Changes by area

### apps/docs · `@neomorphic-react/docs`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/docs/next.config.mjs` | 7 | 1 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `DEPLOYMENT.md` | 6 | 3 |
