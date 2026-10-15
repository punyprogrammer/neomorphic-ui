---
"@neomorphic-react/ui": minor
---

Add the Phase 4 overlays, all sharing one raised popup style (which `Select` now uses too): `Popover`, `HoverCard`, `Dialog` (blurred backdrop, sm/md/lg, scrolling `DialogBody`), `AlertDialog` (no outside dismiss), `Sheet` (slides in from any edge; start/end follow RTL), `Drawer` (swipe to dismiss, snap points), `DropdownMenu`, `ContextMenu` and `Menubar` (checkbox and radio items, submenus, shortcuts, destructive items), `NavigationMenu` (a viewport panel that resizes between triggers) and `Toast` (`Toaster` plus `toast()` with `.success`, `.info`, `.warning`, `.error`, `.loading` and `.promise`). Built on Base UI, so no Radix, `cmdk`, `vaul` or `sonner`.
