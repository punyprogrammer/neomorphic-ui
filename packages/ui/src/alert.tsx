import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A shallow well with a coloured rule at its start and a coloured icon: the
// colour, not the depth, says what kind of message it is. `--alert-accent`
// is 3:1 or more against the surface for every variant; the success and
// warning fills are too light alone, so they're mixed toward their
// foregrounds.
const alertVariants = cva(
  "relative inset-shadow-neu-sm grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg bg-background py-3 ps-5 pe-4 text-foreground text-sm shadow-neu-flat before:absolute before:inset-y-3 before:start-1.5 before:w-1 before:rounded-full before:bg-[var(--alert-accent)] has-[>svg]:grid-cols-[--spacing(4)_1fr] has-[>svg]:gap-x-3 has-data-[slot=alert-action]:pe-28 [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:text-[var(--alert-accent)]",
  {
    variants: {
      variant: {
        default: "[--alert-accent:var(--color-foreground)]",
        info: "[--alert-accent:var(--color-chart-1,oklch(0.62_0.14_245))]",
        success:
          "[--alert-accent:color-mix(in_oklab,var(--color-success)_75%,var(--color-success-foreground))]",
        warning:
          "[--alert-accent:color-mix(in_oklab,var(--color-warning)_55%,var(--color-warning-foreground))]",
        destructive:
          "[--alert-accent:var(--color-destructive)] *:data-[slot=alert-title]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  /** @default "default" */
  variant?: "default" | "info" | "success" | "warning" | "destructive";
}

/**
 * A message in the page's flow: an optional icon (any SVG child), then
 * `AlertTitle`, `AlertDescription` and an `AlertAction`. It is a `status` so
 * screen readers announce it politely; pass `role="alert"` only for urgent
 * messages that should interrupt.
 */
function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      data-variant={variant}
      role="status"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

type AlertTitleProps = React.ComponentProps<"div">;

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

type AlertDescriptionProps = React.ComponentProps<"div">;

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground leading-relaxed [&_p]:leading-relaxed",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

type AlertActionProps = React.ComponentProps<"div">;

/** A button or link pinned to the alert's end, e.g. Undo or Retry. */
function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      className={cn("absolute end-3 top-1/2 -translate-y-1/2", className)}
      data-slot="alert-action"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
};
export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants };
