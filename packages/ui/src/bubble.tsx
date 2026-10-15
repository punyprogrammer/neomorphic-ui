"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive";

// Raised bubbles sit on the surface, `muted` and `destructive` are pressed
// into it, `outline` is a groove. The corner on the aligned side is tucked
// in, pointing at the sender.
const bubbleContentVariants = cva(
  "wrap-break-word w-fit min-w-0 max-w-full overflow-hidden whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed outline-none transition-[background-color,box-shadow] duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 group-data-[align=end]/bubble:self-end group-data-[align=end]/bubble:rounded-ee-sm group-data-[align=start]/bubble:rounded-es-sm [&:is(button,a)]:cursor-pointer [&:is(button,a)]:text-start",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-flat bg-primary text-primary-foreground shadow-neu-sm [&:is(button,a)]:hover:bg-primary/90 [&:is(button,a)]:active:inset-shadow-neu-sm [&:is(button,a)]:active:shadow-neu-flat",
        secondary:
          "inset-shadow-neu-flat bg-neu-convex text-foreground shadow-neu-sm [&:is(button,a)]:active:inset-shadow-neu-sm [&:is(button,a)]:active:bg-background [&:is(button,a)]:active:shadow-neu-flat",
        muted:
          "inset-shadow-neu-sm bg-background text-foreground shadow-neu-flat",
        tinted:
          "inset-shadow-neu-flat bg-[color-mix(in_oklab,var(--color-primary)_9%,var(--color-background))] text-foreground shadow-neu-sm [&:is(button,a)]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-background))]",
        outline:
          "inset-shadow-[1px_1px_0_var(--neu-light)] border border-neu-dark bg-transparent text-foreground shadow-[1px_1px_0_var(--neu-light)] [&:is(button,a)]:hover:bg-neu-convex",
        ghost:
          "inset-shadow-neu-flat rounded-none bg-transparent p-0 text-foreground shadow-neu-flat group-data-[align=end]/bubble:rounded-none group-data-[align=start]/bubble:rounded-none",
        destructive:
          "inset-shadow-neu-sm bg-[color-mix(in_oklab,var(--color-destructive)_8%,var(--color-background))] text-destructive shadow-neu-flat",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const BubbleContext = createContext<BubbleVariant>("default");

// ---------------------------------------------------------------------------
// BubbleGroup
// ---------------------------------------------------------------------------

type BubbleGroupProps = React.ComponentProps<"div">;

/** Consecutive bubbles from one sender, stacked with a small gap. */
function BubbleGroup({ className, ...props }: BubbleGroupProps) {
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      data-slot="bubble-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Bubble
// ---------------------------------------------------------------------------

interface BubbleProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bubbleContentVariants> {
  /**
   * Which side the bubble hangs from: `end` for your own messages.
   * @default "start"
   */
  align?: "start" | "end";
  /**
   * `default` is primary (outgoing), `secondary` is raised (incoming),
   * `muted` is pressed in, `tinted` a primary wash, `outline` a groove,
   * `ghost` bare text for long replies, `destructive` a failed message.
   * @default "default"
   */
  variant?: BubbleVariant;
}

/**
 * One chat bubble: a `BubbleContent`, and optionally `BubbleReactions`. It is
 * at most 80% of the row wide (`ghost` takes the full width).
 */
function Bubble({
  align = "start",
  className,
  variant = "default",
  ...props
}: BubbleProps) {
  return (
    <BubbleContext.Provider value={variant}>
      <div
        className={cn(
          "group/bubble relative flex w-fit min-w-0 max-w-[80%] flex-col gap-1 has-[>[data-slot=bubble-reactions][data-side=top]]:mt-4 has-[>[data-slot=bubble-reactions][data-side=bottom]]:mb-4 data-[variant=ghost]:max-w-full data-[align=end]:self-end group-data-[align=end]/message:self-end",
          className
        )}
        data-align={align}
        data-slot="bubble"
        data-variant={variant}
        {...props}
      />
    </BubbleContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// BubbleContent
// ---------------------------------------------------------------------------

type BubbleContentProps = useRender.ComponentProps<"div">;

/**
 * The bubble's surface. Render it as a `<button>` or `<a>` (`render`) when
 * the whole bubble is an action, such as a suggested reply.
 */
function BubbleContent({ className, render, ...props }: BubbleContentProps) {
  const variant = useContext(BubbleContext);
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn(bubbleContentVariants({ variant }), className) },
      props
    ),
    state: { slot: "bubble-content" },
  });
}

// ---------------------------------------------------------------------------
// BubbleReactions
// ---------------------------------------------------------------------------

const bubbleReactionsVariants = cva(
  "absolute inset-shadow-neu-flat z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-neu-convex px-1.5 py-0.5 text-sm shadow-neu-sm has-[button]:p-0.5",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "start-3",
        end: "end-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
);

interface BubbleReactionsProps extends React.ComponentProps<"div"> {
  /** @default "end" */
  align?: "start" | "end";
  /** @default "bottom" */
  side?: "top" | "bottom";
}

/**
 * A raised pill of reactions pinned to the bubble's edge. Emoji alone aren't
 * announced well: give it `role="img"` and an `aria-label` ("Liked by Maya"),
 * or put labelled buttons inside.
 */
function BubbleReactions({
  align = "end",
  className,
  side = "bottom",
  ...props
}: BubbleReactionsProps) {
  return (
    <div
      className={cn(bubbleReactionsVariants({ align, side }), className)}
      data-align={align}
      data-side={side}
      data-slot="bubble-reactions"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  BubbleContentProps,
  BubbleGroupProps,
  BubbleProps,
  BubbleReactionsProps,
  BubbleVariant,
};
export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  bubbleContentVariants,
};
