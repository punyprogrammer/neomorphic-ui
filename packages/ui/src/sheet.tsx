"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cva } from "class-variance-authority";
import { X as XIcon } from "lucide-react";
import type * as React from "react";

import { dialogCloseIconClassName } from "./dialog";
import { backdropClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Sheet / SheetTrigger / SheetClose
// ---------------------------------------------------------------------------

type SheetProps = SheetPrimitive.Root.Props;

/** A modal panel that slides in from an edge of the screen. */
function Sheet(props: SheetProps) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

type SheetTriggerProps = SheetPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = SheetPrimitive.Close.Props;

function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

// ---------------------------------------------------------------------------
// SheetContent
// ---------------------------------------------------------------------------

type SheetSide = "top" | "bottom" | "start" | "end" | "left" | "right";

// Only the edge facing the page is rounded; the others meet the viewport.
const sheetContentVariants = cva(
  "neu-scrollbar fixed inset-shadow-neu-flat z-[var(--z-modal)] flex flex-col gap-5 overflow-y-auto bg-neu-convex p-6 text-foreground text-sm shadow-neu-lg outline-none transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 max-h-[85dvh] rounded-b-2xl data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl data-ending-style:translate-y-full data-starting-style:translate-y-full",
        start:
          "inset-y-0 start-0 h-full w-[calc(100%-3rem)] rounded-e-2xl data-ending-style:-translate-x-full data-starting-style:-translate-x-full rtl:data-ending-style:translate-x-full rtl:data-starting-style:translate-x-full",
        end: "inset-y-0 end-0 h-full w-[calc(100%-3rem)] rounded-s-2xl data-ending-style:translate-x-full data-starting-style:translate-x-full rtl:data-ending-style:-translate-x-full rtl:data-starting-style:-translate-x-full",
        left: "inset-y-0 left-0 h-full w-[calc(100%-3rem)] rounded-r-2xl data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        right:
          "inset-y-0 right-0 h-full w-[calc(100%-3rem)] rounded-l-2xl data-ending-style:translate-x-full data-starting-style:translate-x-full",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      {
        side: ["start", "end", "left", "right"],
        size: "sm",
        className: "max-w-xs",
      },
      {
        side: ["start", "end", "left", "right"],
        size: "md",
        className: "max-w-sm",
      },
      {
        side: ["start", "end", "left", "right"],
        size: "lg",
        className: "max-w-lg",
      },
      {
        side: ["start", "end", "left", "right"],
        size: "xl",
        className: "max-w-2xl",
      },
    ],
    defaultVariants: {
      side: "end",
      size: "md",
    },
  }
);

interface SheetContentProps extends SheetPrimitive.Popup.Props {
  /** Renders a close button in the top corner. @default true */
  showCloseButton?: boolean;
  /**
   * The edge it slides in from. `start` and `end` follow the writing
   * direction; `left` and `right` don't.
   * @default "end"
   */
  side?: SheetSide;
  /**
   * Width cap for side sheets; top and bottom sheets span the screen.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
}

function SheetContent({
  className,
  children,
  side = "end",
  size = "md",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop
        className={cn(backdropClassName, "z-[var(--z-modal)]")}
        data-slot="sheet-overlay"
      />
      <SheetPrimitive.Popup
        className={cn(sheetContentVariants({ side, size }), className)}
        data-side={side}
        data-size={size}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            className={dialogCloseIconClassName}
            data-slot="sheet-close"
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Layout parts
// ---------------------------------------------------------------------------

type SheetHeaderProps = React.ComponentProps<"div">;

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pe-8", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

type SheetFooterProps = React.ComponentProps<"div">;

/** Actions pinned to the foot of the sheet. */
function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-3", className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

type SheetTitleProps = SheetPrimitive.Title.Props;

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      className={cn("font-semibold text-foreground text-lg", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}

type SheetDescriptionProps = SheetPrimitive.Description.Props;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetProps,
  SheetSide,
  SheetTitleProps,
  SheetTriggerProps,
};
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
