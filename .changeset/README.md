# Changesets

Each file here records one user-facing change to `@neomorphic-ui/react` and
how it bumps the version. Private workspaces (Storybook, the TypeScript config)
are never versioned.

```sh
pnpm changeset            # describe a change: pick patch, minor or major
pnpm version-packages     # consume the changesets: bump version, write CHANGELOG.md
```

Add a changeset in the same commit as the change. Commit the output of
`pnpm version-packages` on its own, as `Version packages`; the commit doc lists
the changesets it consumed and the version it moved to.

While the library is `0.x`, use `minor` for breaking changes and `patch` for
everything else.
