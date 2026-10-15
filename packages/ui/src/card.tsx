"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Padding and gaps all resolve from `--card-spacing`, emitted as one
// unmodified class per size so a consumer's `[--card-spacing:0px]` always
// wins: tailwind-merge keeps a `data-[size=…]:` variant, whose attribute
// selector would out-specify the consumer's class. An image as the first or
// last child runs to the card's edge.
const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden py-(--card-spacing) text-foreground text-sm has-[>img:first-child]:pt-0 has-[>img:last-child]:pb-0 *:[img:first-child]:w-full *:[img:last-child]:w-full *:[img]:object-cover",
  {
    variants: {
      elevation: {
        raised: "inset-shadow-neu-flat bg-neu-convex shadow-neu",
        inset: "inset-shadow-neu bg-background shadow-neu-flat",
        flat: "inset-shadow-neu-flat bg-background shadow-neu-flat",
      },
      size: {
        sm: "rounded-xl [--card-spacing:--spacing(4)]",
        md: "rounded-2xl [--card-spacing:--spacing(6)]",
        lg: "rounded-3xl [--card-spacing:--spacing(8)]",
      },
    },
    defaultVariants: {
      elevation: "raised",
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface CardProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  /**
   * `raised` stands out of the surface, like the kit's travel cards; `inset`
   * is a well for secondary panels; `flat` is level, for nesting.
   * @default "raised"
   */
  elevation?: "raised" | "inset" | "flat";
  /** Padding, gap and corner radius. @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A panel grouping related content: `CardHeader` (with `CardTitle`,
 * `CardDescription` and `CardAction`), `CardContent` and `CardFooter`.
 * Use `render={<article />}` or `<section />` for a landmark.
 */
function Card({
  className,
  elevation = "raised",
  size = "md",
  render,
  ...props
}: CardProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn(cardVariants({ elevation, size }), className) },
      props
    ),
    state: { slot: "card", elevation, size },
  });
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

type CardPartProps = React.ComponentProps<"div">;

/** Title and description, with an optional `CardAction` beside them. */
function CardHeader({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn(
        "font-medium text-base text-foreground leading-snug group-data-[size=lg]/card:text-lg group-data-[size=sm]/card:text-sm",
        className
      )}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

/** Sits at the header's end, beside the title and description. */
function CardAction({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn("px-(--card-spacing)", className)}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: CardPartProps) {
  return (
    <div
      className={cn("flex items-center gap-3 px-(--card-spacing)", className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { CardPartProps, CardProps };
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
