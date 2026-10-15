import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Empty
// ---------------------------------------------------------------------------

const emptyVariants = cva(
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-xl p-6 text-center md:p-12",
  {
    variants: {
      variant: {
        flat: "",
        /** A shallow well, for an empty region inside a page or card. */
        inset: "inset-shadow-neu-sm bg-background shadow-neu-flat",
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  }
);

interface EmptyProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof emptyVariants> {
  /** @default "flat" */
  variant?: "flat" | "inset";
}

/**
 * What to show when there's nothing to show: `EmptyHeader` (media, title,
 * description), then `EmptyContent` with the next step.
 */
function Empty({ className, variant = "flat", ...props }: EmptyProps) {
  return (
    <div
      className={cn(emptyVariants({ variant }), className)}
      data-slot="empty"
      data-variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// EmptyHeader / EmptyMedia
// ---------------------------------------------------------------------------

type EmptyHeaderProps = React.ComponentProps<"div">;

function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      data-slot="empty-header"
      {...props}
    />
  );
}

// `icon` is the kit's raised icon tile, as in `ItemMedia`.
const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "inset-shadow-neu-flat size-14 rounded-xl bg-neu-convex text-foreground shadow-neu [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface EmptyMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof emptyMediaVariants> {
  /**
   * `icon` puts an icon on a raised tile; `default` leaves an `Avatar` or
   * illustration as it is.
   * @default "default"
   */
  variant?: "default" | "icon";
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: EmptyMediaProps) {
  return (
    <div
      className={cn(emptyMediaVariants({ variant }), className)}
      data-slot="empty-media"
      data-variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// EmptyTitle / EmptyDescription / EmptyContent
// ---------------------------------------------------------------------------

type EmptyTitleProps = React.ComponentProps<"div">;

function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  return (
    <div
      className={cn(
        "font-medium text-foreground text-lg tracking-tight",
        className
      )}
      data-slot="empty-title"
      {...props}
    />
  );
}

type EmptyDescriptionProps = React.ComponentProps<"p">;

function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      data-slot="empty-description"
      {...props}
    />
  );
}

type EmptyContentProps = React.ComponentProps<"div">;

function EmptyContent({ className, ...props }: EmptyContentProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        className
      )}
      data-slot="empty-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyProps,
  EmptyTitleProps,
};
export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  emptyMediaVariants,
  emptyVariants,
};
