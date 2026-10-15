"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";

import { backdropClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

type DrawerDirection = "top" | "bottom" | "left" | "right";

const SWIPE_DIRECTION = {
  top: "up",
  bottom: "down",
  left: "left",
  right: "right",
} as const;

interface DrawerProps extends DrawerPrimitive.Root.Props {
  /**
   * The edge it slides in from; swiping back toward that edge dismisses it.
   * @default "bottom"
   */
  direction?: DrawerDirection;
}

/**
 * A panel that slides in from an edge and follows the finger: swipe it away,
 * or drag it between `snapPoints` (fractions of the viewport, or px/rem).
 */
function Drawer({
  direction = "bottom",
  swipeDirection,
  ...props
}: DrawerProps) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      swipeDirection={swipeDirection ?? SWIPE_DIRECTION[direction]}
      {...props}
    />
  );
}

type DrawerTriggerProps = DrawerPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function DrawerTrigger(props: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

type DrawerCloseProps = DrawerPrimitive.Close.Props;

function DrawerClose(props: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

// ---------------------------------------------------------------------------
// DrawerContent
// ---------------------------------------------------------------------------

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// Each edge: where it sits, which corners round, and how the swipe (and,
// for bottom drawers, the snap point) moves it.
const DRAWER_POPUP = cn(
  "group/drawer fixed inset-shadow-neu-flat flex flex-col bg-neu-convex text-foreground text-sm shadow-neu-lg outline-none transition-transform duration-[450ms] data-swiping:select-none data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)] data-swiping:duration-0",
  EASE,
  "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[calc(100dvh-3rem)] data-[swipe-direction=down]:rounded-t-3xl data-[swipe-direction=down]:pb-[env(safe-area-inset-bottom)] data-[swipe-direction=down]:data-ending-style:[transform:translateY(100%)] data-[swipe-direction=down]:data-starting-style:[transform:translateY(100%)] data-[swipe-direction=down]:[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]",
  "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[calc(100dvh-3rem)] data-[swipe-direction=up]:rounded-b-3xl data-[swipe-direction=up]:pt-[env(safe-area-inset-top)] data-[swipe-direction=up]:data-ending-style:[transform:translateY(-100%)] data-[swipe-direction=up]:data-starting-style:[transform:translateY(-100%)] data-[swipe-direction=up]:[transform:translateY(var(--drawer-swipe-movement-y,0px))]",
  "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-[calc(100%-3rem)] data-[swipe-direction=left]:max-w-sm data-[swipe-direction=left]:rounded-r-3xl data-[swipe-direction=left]:data-ending-style:[transform:translateX(-100%)] data-[swipe-direction=left]:data-starting-style:[transform:translateX(-100%)] data-[swipe-direction=left]:[transform:translateX(var(--drawer-swipe-movement-x,0px))]",
  "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-[calc(100%-3rem)] data-[swipe-direction=right]:max-w-sm data-[swipe-direction=right]:rounded-l-3xl data-[swipe-direction=right]:data-ending-style:[transform:translateX(100%)] data-[swipe-direction=right]:data-starting-style:[transform:translateX(100%)] data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x,0px))]"
);

interface DrawerContentProps extends DrawerPrimitive.Popup.Props {
  /**
   * Shows the raised grip at the top of a bottom drawer. It's a visual cue
   * only; Escape, the backdrop and a close button still dismiss it.
   * @default true
   */
  showHandle?: boolean;
}

function DrawerContent({
  className,
  children,
  showHandle = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        className={cn(
          backdropClassName,
          "z-[var(--z-drawer)] opacity-[calc(1-var(--drawer-swipe-progress,0))] data-swiping:duration-0"
        )}
        data-slot="drawer-overlay"
      />
      <DrawerPrimitive.Viewport
        className="fixed inset-0 z-[var(--z-drawer)]"
        data-slot="drawer-viewport"
      >
        <DrawerPrimitive.Popup
          className={cn(DRAWER_POPUP, className)}
          data-slot="drawer-content"
          {...props}
        >
          {showHandle ? (
            <div
              aria-hidden="true"
              className="inset-shadow-neu-flat mx-auto mt-3 hidden h-1.5 w-12 shrink-0 rounded-full bg-neu-convex shadow-neu-sm group-data-[swipe-direction=down]/drawer:block"
              data-slot="drawer-handle"
            />
          ) : null}
          <DrawerPrimitive.Content
            className="neu-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
            data-slot="drawer-inner-content"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Layout parts
// ---------------------------------------------------------------------------

type DrawerHeaderProps = React.ComponentProps<"div">;

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-1 p-5 group-data-[swipe-direction=down]/drawer:text-center group-data-[swipe-direction=up]/drawer:text-center",
        className
      )}
      data-slot="drawer-header"
      {...props}
    />
  );
}

type DrawerFooterProps = React.ComponentProps<"div">;

function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn("mt-auto flex shrink-0 flex-col gap-3 p-5", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

type DrawerTitleProps = DrawerPrimitive.Title.Props;

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-semibold text-foreground text-lg", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

type DrawerDescriptionProps = DrawerPrimitive.Description.Props;

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerDirection,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
};
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};
