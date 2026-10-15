"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle as LoaderCircleIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Raised at rest, pressed into the surface while held (or while
// `aria-pressed`), flat when disabled. Every state sets BOTH shadow slots so
// the press eases instead of snapping.
const PRESSED =
  "active:inset-shadow-neu-sm active:bg-none active:shadow-neu-flat aria-pressed:inset-shadow-neu-sm aria-pressed:bg-none aria-pressed:shadow-neu-flat";

const buttonVariants = cva(
  "relative inline-flex shrink-0 touch-manipulation select-none items-center justify-center whitespace-nowrap font-medium uppercase tracking-wide transition-[box-shadow,background-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:inset-shadow-neu-flat disabled:cursor-not-allowed disabled:bg-none disabled:text-foreground/50 disabled:shadow-neu-flat data-loading:cursor-wait [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `inset-shadow-neu-flat bg-neu-convex text-foreground shadow-neu hover:shadow-neu-lg ${PRESSED}`,
        primary: `inset-shadow-neu-flat bg-primary text-primary-foreground shadow-neu hover:shadow-neu-lg disabled:bg-[color-mix(in_oklab,var(--color-primary)_40%,var(--color-background))] disabled:text-primary-foreground ${PRESSED}`,
        destructive: `inset-shadow-neu-flat bg-neu-convex text-destructive shadow-neu hover:shadow-neu-lg disabled:text-destructive/50 ${PRESSED}`,
        ghost: `inset-shadow-neu-flat bg-transparent text-foreground shadow-neu-flat hover:bg-neu-convex hover:shadow-neu-sm ${PRESSED}`,
      },
      size: {
        sm: "h-8 gap-1.5 px-4 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 gap-2 px-6 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2.5 px-8 text-base [&_svg:not([class*='size-'])]:size-5",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
      },
      iconPosition: {
        start: "",
        end: "",
        top: "h-auto flex-col py-3",
        bottom: "h-auto flex-col py-3",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "size-8" },
      { iconOnly: true, size: "md", className: "size-10" },
      { iconOnly: true, size: "lg", className: "size-12" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
      iconPosition: "start",
      iconOnly: false,
    },
  }
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

// For navigation, style an `<a>` with `buttonVariants()` instead: Base UI's
// Button always carries `role="button"`, even when rendered as another element.
interface ButtonProps
  extends ButtonPrimitive.Props,
    Omit<ButtonVariantsProps, "iconOnly"> {
  /** Whether the button spans the full width of its container. */
  fullWidth?: boolean;
  /**
   * Any icon element: a lucide-react icon, an inline `<svg>`, an `<img>`.
   * SVGs without a `size-*` class are sized to match the button. The icon is
   * decorative; with no children, give the button an `aria-label`.
   */
  icon?: React.ReactNode;
  /**
   * Where the icon sits relative to the label. `start` and `end` follow the
   * writing direction; `top` and `bottom` stack the icon above or below it.
   * @default "start"
   */
  iconPosition?: "start" | "end" | "top" | "bottom";
  /**
   * Shows a spinner over the content and blocks clicks. The button stays
   * raised and focusable, so focus isn't lost mid-submit.
   */
  isLoading?: boolean;
  /**
   * Corner treatment. An icon-only `pill` button is a circle.
   * @default "pill", or "rounded" for icon-only buttons (the kit's icon tiles)
   */
  shape?: "pill" | "rounded";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /**
   * `default` and `destructive` are raised from the surface, `primary` is the
   * kit's dark fill, `ghost` stays flat until hovered.
   * @default "default"
   */
  variant?: "default" | "primary" | "destructive" | "ghost";
}

function hasContent(children: React.ReactNode) {
  return children != null && children !== false && children !== "";
}

function Button({
  className,
  variant = "default",
  size = "md",
  shape,
  icon,
  iconPosition = "start",
  fullWidth,
  isLoading = false,
  disabled,
  focusableWhenDisabled,
  nativeButton,
  type = "button",
  children,
  ref,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  const hasIcon = hasContent(icon);
  const iconOnly = hasIcon && !hasContent(children);
  const resolvedShape = shape ?? (iconOnly ? "rounded" : "pill");
  const vertical = iconPosition === "top" || iconPosition === "bottom";
  const iconFirst = iconPosition === "start" || iconPosition === "top";

  const iconNode = hasIcon ? (
    <span aria-hidden="true" className="inline-flex" data-slot="button-icon">
      {icon}
    </span>
  ) : null;

  // Icon and label are direct flex items, so consumer layout classes
  // (`justify-start`, `ml-auto` on a child) reach them. The wrapper exists only
  // while loading, holding the button's size under the spinner.
  const leadingIcon = iconFirst ? iconNode : null;
  const trailingIcon = iconFirst ? null : iconNode;
  const content = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
  );

  return (
    <ButtonPrimitive
      aria-busy={isLoading || undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          shape: resolvedShape,
          iconPosition: hasIcon ? iconPosition : "start",
          iconOnly,
          fullWidth,
        }),
        className
      )}
      data-icon-only={iconOnly || undefined}
      data-icon-position={hasIcon ? iconPosition : undefined}
      data-loading={isLoading || undefined}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      // Loading keeps focus (aria-disabled, not `disabled`), so the
      // button keeps its raised look instead of the disabled styles.
      disabled={isLoading || disabled}
      focusableWhenDisabled={isLoading || focusableWhenDisabled}
      nativeButton={nativeButton}
      ref={ref}
      type={nativeButton === false ? undefined : type}
      {...props}
    >
      {isLoading ? (
        <>
          {/* Transparent, not `invisible`: hidden content drops out of the
              accessible name, leaving a nameless busy button. */}
          <span
            className={cn(
              "inline-flex items-center justify-center gap-[inherit] opacity-0",
              vertical && "flex-col"
            )}
          >
            {content}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <LoaderCircleIcon aria-hidden="true" className="animate-spin" />
          </span>
        </>
      ) : (
        content
      )}
    </ButtonPrimitive>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ButtonProps, ButtonVariantsProps };
export { Button, buttonVariants };
