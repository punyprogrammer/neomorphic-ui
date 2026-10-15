"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X as XIcon } from "lucide-react";
import type * as React from "react";

import { Button, buttonVariants } from "./button";
import { backdropClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Dialog / DialogTrigger / DialogClose / DialogPortal / DialogOverlay
// ---------------------------------------------------------------------------

type DialogProps = DialogPrimitive.Root.Props;

/**
 * A modal panel over the page. Focus is trapped inside while open and
 * returns to the trigger on close; Escape and outside clicks dismiss it.
 */
function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

type DialogTriggerProps = DialogPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

type DialogCloseProps = DialogPrimitive.Close.Props;

function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type DialogPortalProps = DialogPrimitive.Portal.Props;

function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

type DialogOverlayProps = DialogPrimitive.Backdrop.Props;

/** Tints and softly blurs the page behind the panel. */
function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(backdropClassName, "z-[var(--z-modal)]", className)}
      data-slot="dialog-overlay"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// DialogContent
// ---------------------------------------------------------------------------

/** The panel's close button: a ghost icon button in the top corner. */
const dialogCloseIconClassName = cn(
  buttonVariants({
    variant: "ghost",
    size: "sm",
    shape: "rounded",
    iconOnly: true,
  }),
  "absolute end-4 top-4 text-muted-foreground hover:text-foreground"
);

const dialogContentVariants = cva(
  "fixed inset-shadow-neu-flat top-1/2 left-1/2 z-[var(--z-modal)] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-2xl bg-neu-convex p-6 text-foreground text-sm shadow-neu-lg outline-none transition-[opacity,scale] duration-[var(--duration-base)] ease-[var(--ease-out)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface DialogContentProps
  extends DialogPrimitive.Popup.Props,
    VariantProps<typeof dialogContentVariants> {
  /** Renders a close button in the top corner. @default true */
  showCloseButton?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A raised panel centred over the backdrop. It never outgrows the viewport;
 * put long content in a `DialogBody` so the header and footer stay put.
 */
function DialogContent({
  className,
  children,
  size = "md",
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        className={cn(dialogContentVariants({ size }), className)}
        data-size={size}
        data-slot="dialog-content"
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            className={dialogCloseIconClassName}
            data-slot="dialog-close"
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

// ---------------------------------------------------------------------------
// Layout parts
// ---------------------------------------------------------------------------

type DialogHeaderProps = React.ComponentProps<"div">;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pe-8", className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}

type DialogBodyProps = React.ComponentProps<"div">;

/** The scrolling middle of a tall dialog. */
function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn(
        "neu-scrollbar -mx-6 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6",
        className
      )}
      data-slot="dialog-body"
      {...props}
    />
  );
}

interface DialogFooterProps extends React.ComponentProps<"div"> {
  /** Adds a "Close" button before the footer's own actions. @default false */
  showCloseButton?: boolean;
}

/** Actions, end-aligned; stacked with the primary action on top when narrow. */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
      data-slot="dialog-footer"
      {...props}
    >
      {showCloseButton ? (
        <DialogPrimitive.Close render={<Button />}>Close</DialogPrimitive.Close>
      ) : null}
      {children}
    </div>
  );
}

type DialogTitleProps = DialogPrimitive.Title.Props;

/** Names the dialog for assistive tech. Every dialog needs one. */
function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn("font-semibold text-foreground text-lg", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

type DialogDescriptionProps = DialogPrimitive.Description.Props;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
};
export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogCloseIconClassName,
};
