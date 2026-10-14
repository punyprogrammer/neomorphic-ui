"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The picture sits inside a raised frame, a ring of surface around it, like
// the kit's info box thumbnail.
const avatarVariants = cva(
  "group/avatar relative inset-shadow-neu-flat inline-flex shrink-0 select-none bg-neu-convex align-middle shadow-neu-sm",
  {
    variants: {
      size: {
        sm: "size-8 p-0.5 text-xs",
        md: "size-10 p-[3px] text-sm",
        lg: "size-14 p-1 text-base",
        xl: "size-20 p-1.5 text-xl",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

interface AvatarProps
  extends AvatarPrimitive.Root.Props,
    VariantProps<typeof avatarVariants> {
  /** @default "circle" */
  shape?: "circle" | "rounded";
  /** @default "md" (40px) */
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * A person or place: an `AvatarImage` with an `AvatarFallback` (initials or
 * an icon) shown until it loads, or if it fails.
 */
function Avatar({
  className,
  size = "md",
  shape = "circle",
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size, shape }), className)}
      data-shape={shape}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
}

type AvatarImageProps = AvatarPrimitive.Image.Props;

/** Give it an `alt` naming the person, or `alt=""` beside their name. */
function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "aspect-square size-full rounded-full object-cover group-data-[shape=rounded]/avatar:rounded-lg",
        className
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center font-medium text-foreground uppercase [&_svg:not([class*='size-'])]:size-[55%]",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AvatarBadge
// ---------------------------------------------------------------------------

/**
 * A status dot on the avatar's corner, `--success` by default. It is
 * decorative: say the status in text too (e.g. in the name, "Ada, online").
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute end-0 bottom-0 z-10 rounded-full bg-success ring-2 ring-background group-data-[shape=rounded]/avatar:-end-0.5 group-data-[shape=rounded]/avatar:-bottom-0.5 group-data-[size=lg]/avatar:size-3.5 group-data-[size=md]/avatar:size-3 group-data-[size=sm]/avatar:size-2.5 group-data-[size=xl]/avatar:size-4.5",
        className
      )}
      data-slot="avatar-badge"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AvatarGroup / AvatarGroupCount
// ---------------------------------------------------------------------------

/** Overlapping avatars; each frame keeps them apart. Label it. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a labelled cluster of images, not a form fieldset
    <div
      className={cn("group/avatar-group flex -space-x-2", className)}
      data-slot="avatar-group"
      role="group"
      {...props}
    />
  );
}

/** The "+3" at the end of a group, in the same raised frame. */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "relative inset-shadow-neu-flat flex size-10 shrink-0 items-center justify-center rounded-full bg-neu-convex font-medium text-foreground text-xs tabular-nums shadow-neu-sm group-has-data-[size=lg]/avatar-group:size-14 group-has-data-[size=sm]/avatar-group:size-8 group-has-data-[size=xl]/avatar-group:size-20 group-has-data-[size=lg]/avatar-group:text-sm",
        className
      )}
      data-slot="avatar-group-count"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { AvatarFallbackProps, AvatarImageProps, AvatarProps };
export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  avatarVariants,
};
