"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext } from "react";

import { Separator, type SeparatorProps } from "./separator";
import { cn } from "./utils";

const ItemGroupContext = createContext(false);

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Rendered as a link or button, a row lifts on hover and presses into the
// surface while held. Every state sets both shadow slots so changes ease.
const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center text-start text-foreground text-sm outline-none transition-[box-shadow,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 [&:is(a,button)]:cursor-pointer [&:is(a,button)]:active:inset-shadow-neu-sm [&:is(a,button)]:active:bg-none [&:is(a,button)]:active:shadow-neu-flat",
  {
    variants: {
      variant: {
        flat: "inset-shadow-neu-flat bg-transparent shadow-neu-flat [&:is(a,button)]:hover:bg-neu-convex [&:is(a,button)]:hover:shadow-neu-sm",
        raised:
          "inset-shadow-neu-flat bg-neu-convex shadow-neu-sm [&:is(a,button)]:hover:shadow-neu",
        inset: "inset-shadow-neu-sm bg-background shadow-neu-flat",
      },
      size: {
        sm: "gap-2.5 rounded-lg px-3 py-2",
        md: "gap-3 rounded-xl px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "md",
    },
  }
);

// Icons sit on a small raised tile, like the kit's list rows.
const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        icon: "inset-shadow-neu-flat size-10 rounded-lg bg-neu-convex text-foreground shadow-neu-sm group-data-[size=sm]/item:size-8 [&_svg:not([class*='size-'])]:size-5 group-data-[size=sm]/item:[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-lg group-data-[size=sm]/item:size-8 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ---------------------------------------------------------------------------
// ItemGroup / ItemSeparator
// ---------------------------------------------------------------------------

/** A list of `Item`s; each default (`<div>`) item becomes a list item. */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ItemGroupContext.Provider value={true}>
      {/* biome-ignore lint/a11y/useSemanticElements: list semantics without restyling <ul>/<li> */}
      <div
        className={cn("group/item-group flex w-full flex-col gap-2", className)}
        data-slot="item-group"
        role="list"
        {...props}
      />
    </ItemGroupContext.Provider>
  );
}

/** A groove between items; decorative, so the list keeps only list items. */
function ItemSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      className={cn("my-1", className)}
      data-slot="item-separator"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

interface ItemProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof itemVariants> {
  /** @default "md" */
  size?: "sm" | "md";
  /**
   * `flat` sits level with the surface, `raised` stands out of it like the
   * kit's card rows, `inset` is a well.
   * @default "flat"
   */
  variant?: "flat" | "raised" | "inset";
}

/**
 * A row: `ItemMedia`, `ItemContent` (with `ItemTitle` and
 * `ItemDescription`) and `ItemActions`. Render it as a link or button with
 * `render` to make the whole row clickable; it then keeps its own role, so
 * wrap it in an element with `role="listitem"` inside an `ItemGroup`.
 */
function Item({
  className,
  variant = "flat",
  size = "md",
  render,
  ...props
}: ItemProps) {
  const inGroup = useContext(ItemGroupContext);
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size }), className),
        role: inGroup && render === undefined ? "listitem" : undefined,
      },
      props
    ),
    state: { slot: "item", variant, size },
  });
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

interface ItemMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof itemMediaVariants> {
  /**
   * `icon` puts it on a raised tile; `image` crops a picture to the tile.
   * @default "default"
   */
  variant?: "default" | "icon" | "image";
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: ItemMediaProps) {
  return (
    <div
      className={cn(itemMediaVariants({ variant }), className)}
      data-slot="item-media"
      data-variant={variant}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none [&+[data-slot=item-content]]:text-end",
        className
      )}
      data-slot="item-content"
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 font-medium leading-snug",
        className
      )}
      data-slot="item-title"
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "line-clamp-2 text-muted-foreground leading-normal group-data-[size=sm]/item:text-xs",
        className
      )}
      data-slot="item-description"
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="item-actions"
      {...props}
    />
  );
}

/** A full-width row above the item's content. */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex basis-full items-center justify-between gap-2 text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-slot="item-header"
      {...props}
    />
  );
}

/** A full-width row below the item's content. */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex basis-full items-center gap-2 text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      data-slot="item-footer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ItemMediaProps, ItemProps };
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  itemMediaVariants,
  itemVariants,
};
