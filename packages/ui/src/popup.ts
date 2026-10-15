// Shared styles for floating and modal layers. Every popup is a raised card
// on the page's own surface colour; depth, not a fill, lifts it off the page.

/** A raised card scaling in from its anchor (Select, Popover, menus, …). */
const popupClassName =
  "inset-shadow-neu-flat origin-(--transform-origin) rounded-lg bg-neu-convex text-foreground shadow-neu-lg outline-none transition-[opacity,scale] duration-[var(--duration-fast)] ease-[var(--ease-out)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0";

/**
 * A row in a popup list. Highlighted (hover or arrow keys) sinks into the
 * card; selection is marked separately by a check and `--primary`.
 */
const popupItemClassName =
  "relative inset-shadow-neu-flat flex min-h-9 cursor-pointer select-none items-center gap-2 rounded-md px-3 text-sm shadow-neu-flat outline-none transition-[box-shadow] duration-[var(--duration-fast)] data-highlighted:inset-shadow-neu-sm data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";

/** A small uppercase heading over a group of popup items. */
const popupLabelClassName =
  "px-3 pt-2 pb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide";

/** A groove between popup groups, like the dividers in `ButtonGroup`. */
const popupSeparatorClassName =
  "mx-2 my-1.5 h-px bg-[var(--neu-dark)] shadow-[0_1px_0_var(--neu-light)]";

/** Dims the page behind a modal layer, fading with it. */
const backdropClassName =
  "fixed inset-0 bg-[var(--neu-backdrop)] backdrop-blur-[2px] transition-opacity duration-[var(--duration-base)] ease-[var(--ease-out)] data-ending-style:opacity-0 data-starting-style:opacity-0";

export {
  backdropClassName,
  popupClassName,
  popupItemClassName,
  popupLabelClassName,
  popupSeparatorClassName,
};
