"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { Button, type ButtonProps } from "./button";
import { Progress, type ProgressProps } from "./progress";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";

// A raised file tile. `idle` (picked, not sent yet) is pressed into the
// surface; a full-tile `AttachmentTrigger` presses the tile in while held.
const attachmentVariants = cva(
  "group/attachment relative inset-shadow-neu-flat flex min-w-0 max-w-full shrink-0 flex-wrap rounded-xl bg-neu-convex text-foreground shadow-neu-sm transition-shadow duration-[var(--duration-fast)] has-[>[data-slot=attachment-trigger]:active]:inset-shadow-neu-sm has-[>[data-slot=attachment-trigger]:active]:bg-background has-[>[data-slot=attachment-trigger]:active]:shadow-neu-flat has-[>[data-slot=attachment-trigger]:focus-visible]:outline-2 has-[>[data-slot=attachment-trigger]:focus-visible]:outline-ring/50 has-[>[data-slot=attachment-trigger]:focus-visible]:outline-offset-2 data-[state=idle]:inset-shadow-neu-sm data-[state=idle]:bg-background data-[state=idle]:shadow-neu-flat",
  {
    variants: {
      size: {
        default:
          "gap-2 text-sm has-data-[slot=attachment-media]:p-2 has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-media]:p-1.5 has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-media]:p-1 has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
    defaultVariants: {
      size: "default",
      orientation: "horizontal",
    },
  }
);

// ---------------------------------------------------------------------------
// Attachment
// ---------------------------------------------------------------------------

interface AttachmentProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof attachmentVariants> {
  /**
   * `horizontal` puts the media beside the text; `vertical` stacks them, as
   * a thumbnail card.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /** @default "default" */
  size?: "default" | "sm" | "xs";
  /**
   * Where the file is. The title shimmers while `uploading` or
   * `processing`; say what went wrong in the description for `error`, not
   * only with colour.
   * @default "done"
   */
  state?: AttachmentState;
}

/**
 * A file in a composer or a message: `AttachmentMedia`, `AttachmentContent`
 * (title and description) and `AttachmentActions`. Add an
 * `AttachmentTrigger` to make the whole tile open the file.
 */
function Attachment({
  className,
  orientation = "horizontal",
  size = "default",
  state = "done",
  ...props
}: AttachmentProps) {
  return (
    <div
      className={cn(attachmentVariants({ orientation, size }), className)}
      data-orientation={orientation}
      data-size={size}
      data-slot="attachment"
      data-state={state}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AttachmentMedia
// ---------------------------------------------------------------------------

const attachmentMediaVariants = cva(
  "relative inset-shadow-neu-sm flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background text-muted-foreground shadow-neu-flat group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:text-destructive [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:size-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
);

interface AttachmentMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof attachmentMediaVariants> {
  /**
   * `icon` is a well holding a file-type icon or a `Spinner`; `image` is a
   * thumbnail, dimmed until the file is `done`.
   * @default "icon"
   */
  variant?: "icon" | "image";
}

/** A file-type icon, `Spinner` or thumbnail, in a small well. */
function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      className={cn(attachmentMediaVariants({ variant }), className)}
      data-slot="attachment-media"
      data-variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

type AttachmentContentProps = React.ComponentProps<"div">;

/** The title and description column. */
function AttachmentContent({ className, ...props }: AttachmentContentProps) {
  return (
    <div
      className={cn(
        "min-w-0 max-w-full flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
        className
      )}
      data-slot="attachment-content"
      {...props}
    />
  );
}

type AttachmentTitleProps = React.ComponentProps<"span">;

/** The file name, truncated to one line. */
function AttachmentTitle({ className, ...props }: AttachmentTitleProps) {
  return (
    <span
      className={cn(
        "group-data-[state=processing]/attachment:neu-shimmer-text group-data-[state=uploading]/attachment:neu-shimmer-text block min-w-0 max-w-full truncate font-medium",
        className
      )}
      data-slot="attachment-title"
      {...props}
    />
  );
}

type AttachmentDescriptionProps = React.ComponentProps<"span">;

/** Size, type or status ("Uploading… 40%", "Too large to upload"). */
function AttachmentDescription({
  className,
  ...props
}: AttachmentDescriptionProps) {
  return (
    <span
      className={cn(
        "mt-0.5 block min-w-0 max-w-full truncate text-muted-foreground text-xs group-data-[state=error]/attachment:text-destructive",
        className
      )}
      data-slot="attachment-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AttachmentProgress
// ---------------------------------------------------------------------------

type AttachmentProgressProps = Omit<ProgressProps, "size">;

/**
 * A thin `Progress` bar across the bottom of the tile while it uploads. Give
 * it an `aria-label` ("Uploading report.pdf").
 */
function AttachmentProgress({ className, ...props }: AttachmentProgressProps) {
  return (
    <Progress
      className={cn("basis-full", className)}
      data-slot="attachment-progress"
      size="sm"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type AttachmentActionsProps = React.ComponentProps<"div">;

/**
 * Buttons such as remove or retry. They sit above an `AttachmentTrigger`;
 * on a vertical tile they float over the thumbnail's corner.
 */
function AttachmentActions({ className, ...props }: AttachmentActionsProps) {
  return (
    <div
      className={cn(
        "relative z-20 flex shrink-0 items-center gap-1 group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:end-3 group-data-[orientation=vertical]/attachment:top-3",
        className
      )}
      data-slot="attachment-actions"
      {...props}
    />
  );
}

type AttachmentActionProps = ButtonProps;

/** A small round icon `Button`; flat until hovered. Needs an `aria-label`. */
function AttachmentAction({
  className,
  shape = "pill",
  size = "sm",
  variant = "ghost",
  ...props
}: AttachmentActionProps) {
  return (
    <Button
      className={cn(
        "size-7 group-data-[size=xs]/attachment:size-6 group-data-[orientation=vertical]/attachment:bg-neu-convex group-data-[orientation=vertical]/attachment:shadow-neu-sm",
        className
      )}
      data-slot="attachment-action"
      shape={shape}
      size={size}
      variant={variant}
      {...props}
    />
  );
}

type AttachmentTriggerProps = useRender.ComponentProps<"button">;

/**
 * Covers the whole tile, so a click anywhere opens the file. Give it an
 * `aria-label` ("Open report.pdf"), or `render` an `<a href>`.
 */
function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: AttachmentTriggerProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute inset-0 z-10 cursor-pointer rounded-[inherit] outline-none",
          className
        ),
        type: render ? type : (type ?? "button"),
      },
      props
    ),
    state: { slot: "attachment-trigger" },
  });
}

// ---------------------------------------------------------------------------
// AttachmentGroup
// ---------------------------------------------------------------------------

type AttachmentGroupProps = React.ComponentProps<"div">;

/**
 * A row of attachments that scrolls sideways and snaps to each tile. It is
 * padded so the tiles' shadows aren't clipped.
 */
function AttachmentGroup({ className, ...props }: AttachmentGroupProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 snap-x snap-mandatory scroll-px-2 gap-3 overflow-x-auto overscroll-x-contain p-2 [scrollbar-width:none] *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start [&::-webkit-scrollbar]:hidden",
        className
      )}
      data-slot="attachment-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  AttachmentActionProps,
  AttachmentActionsProps,
  AttachmentContentProps,
  AttachmentDescriptionProps,
  AttachmentGroupProps,
  AttachmentMediaProps,
  AttachmentProgressProps,
  AttachmentProps,
  AttachmentState,
  AttachmentTitleProps,
  AttachmentTriggerProps,
};
export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentProgress,
  AttachmentTitle,
  AttachmentTrigger,
  attachmentMediaVariants,
  attachmentVariants,
};
