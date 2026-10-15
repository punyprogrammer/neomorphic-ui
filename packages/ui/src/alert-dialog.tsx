"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type * as React from "react";

import { Button, type ButtonProps } from "./button";
import { backdropClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// AlertDialog / AlertDialogTrigger
// ---------------------------------------------------------------------------

type AlertDialogProps = AlertDialogPrimitive.Root.Props;

/**
 * A dialog that needs an answer: outside clicks don't dismiss it, and it's
 * announced as an `alertdialog`. Escape still cancels.
 */
function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

// ---------------------------------------------------------------------------
// AlertDialogContent
// ---------------------------------------------------------------------------

interface AlertDialogContentProps extends AlertDialogPrimitive.Popup.Props {
  /**
   * `sm` is narrow and centred, with the actions side by side.
   * @default "default"
   */
  size?: "default" | "sm";
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop
        className={cn(backdropClassName, "z-[var(--z-modal)]")}
        data-slot="alert-dialog-overlay"
      />
      <AlertDialogPrimitive.Popup
        className={cn(
          "group/alert-dialog-content neu-scrollbar fixed inset-shadow-neu-flat top-1/2 left-1/2 z-[var(--z-modal)] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 overflow-y-auto rounded-2xl bg-neu-convex p-6 text-foreground text-sm shadow-neu-lg outline-none transition-[opacity,scale] duration-[var(--duration-base)] ease-[var(--ease-out)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
          size === "sm" ? "max-w-xs" : "max-w-md",
          className
        )}
        data-size={size}
        data-slot="alert-dialog-content"
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Layout parts
// ---------------------------------------------------------------------------

type AlertDialogHeaderProps = React.ComponentProps<"div">;

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 group-data-[size=sm]/alert-dialog-content:items-center group-data-[size=sm]/alert-dialog-content:text-center",
        className
      )}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

type AlertDialogMediaProps = React.ComponentProps<"div">;

/** A raised icon tile above the title. Colour the icon to set the tone. */
function AlertDialogMedia({ className, ...props }: AlertDialogMediaProps) {
  return (
    <div
      className={cn(
        "inset-shadow-neu-flat mb-2 flex size-12 items-center justify-center rounded-xl bg-neu-convex shadow-neu-sm [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      data-slot="alert-dialog-media"
      {...props}
    />
  );
}

type AlertDialogFooterProps = React.ComponentProps<"div">;

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props;

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("font-semibold text-foreground text-lg", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props;

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AlertDialogAction / AlertDialogCancel
// ---------------------------------------------------------------------------

interface AlertDialogActionProps extends ButtonProps {
  /**
   * Closes the dialog after `onClick`. Turn off to keep it open while an
   * async action runs, then close it through `open`.
   * @default true
   */
  closeOnClick?: boolean;
}

/**
 * The confirming action, a `Button`. Pass `variant="destructive"` for
 * actions that delete or can't be undone.
 */
function AlertDialogAction({
  closeOnClick = true,
  variant = "primary",
  ...props
}: AlertDialogActionProps) {
  if (!closeOnClick) {
    return (
      <Button data-slot="alert-dialog-action" variant={variant} {...props} />
    );
  }
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button variant={variant} {...props} />}
    />
  );
}

type AlertDialogCancelProps = ButtonProps;

/** Dismisses the dialog. Focus lands here first, the safe choice. */
function AlertDialogCancel(props: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button {...props} />}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
};
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
};
