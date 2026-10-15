"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

import { Button, type ButtonProps } from "./button";
import { inputControlClassName } from "./input";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type InputGroupSize = "sm" | "md" | "lg";
type InputGroupShape = "rounded" | "pill";

const InputGroupContext = createContext<{
  size: InputGroupSize;
  shape: InputGroupShape;
}>({ size: "md", shape: "rounded" });

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The well is drawn once, by the group; the control inside is bare. Its
// focus, invalid and disabled states light the whole well. The size sets
// `--input-group-h` (one line), `--input-group-py` (a textarea's line
// padding) and the shape `--input-group-px` (the edge padding).
const inputGroupVariants = cva(
  "group/input-group relative inset-shadow-neu flex min-h-(--input-group-h) w-full min-w-0 cursor-text items-center bg-background text-foreground shadow-neu-flat transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] has-[[data-slot=input-group-control]:focus-visible]:inset-shadow-neu-lg has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[>textarea]:items-end has-[[data-slot=input-group-control]:disabled]:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:outline-ring/50 has-[[data-slot=input-group-control]:focus-visible]:outline-offset-2 has-[[data-slot=input-group-control]:is([aria-invalid=true],[data-invalid])]:ring-1 has-[[data-slot=input-group-control]:is([aria-invalid=true],[data-invalid])]:ring-destructive/70 has-[>[data-align=inline-start]]:[&>[data-slot=input-group-control]]:ps-2 has-[>[data-align=inline-end]]:[&>[data-slot=input-group-control]]:pe-2",
  {
    variants: {
      size: {
        sm: "text-sm [--input-group-h:2rem] [--input-group-py:0.375rem]",
        md: "text-sm [--input-group-h:2.5rem] [--input-group-py:0.625rem]",
        lg: "text-base [--input-group-h:3rem] [--input-group-py:0.75rem]",
      },
      shape: {
        rounded: "rounded-lg",
        // A multi-line pill would be a stadium; it rounds like a card instead.
        pill: "rounded-full has-[>[data-align=block-end]]:rounded-3xl has-[>[data-align=block-start]]:rounded-3xl has-[>textarea]:rounded-3xl",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "sm", className: "[--input-group-px:0.75rem]" },
      { shape: "rounded", size: "md", className: "[--input-group-px:1rem]" },
      { shape: "rounded", size: "lg", className: "[--input-group-px:1.25rem]" },
      { shape: "pill", size: "sm", className: "[--input-group-px:1rem]" },
      { shape: "pill", size: "md", className: "[--input-group-px:1.25rem]" },
      { shape: "pill", size: "lg", className: "[--input-group-px:1.5rem]" },
    ],
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  }
);

// Inline addons are one line tall, so they stay level with a textarea's
// last line. A button inside sits 4px in from the well's edge.
const inputGroupAddonVariants = cva(
  "flex shrink-0 select-none items-center gap-2 text-muted-foreground has-[>button]:py-1 [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      align: {
        "inline-start":
          "order-first min-h-(--input-group-h) ps-(--input-group-px) has-[>button]:ps-1",
        "inline-end":
          "order-last min-h-(--input-group-h) pe-(--input-group-px) has-[>button]:pe-1",
        "block-start":
          "order-first w-full justify-start px-(--input-group-px) pt-3",
        "block-end":
          "order-last w-full justify-start px-(--input-group-px) pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

// A button one size below the group, so it fits with a 4px inset.
const BUTTON_SIZE = { sm: "sm", md: "sm", lg: "md" } as const;
const BUTTON_FIT = {
  sm: "h-6 px-3 data-icon-only:size-6 data-icon-only:px-0",
  md: "",
  lg: "",
} as const;

// ---------------------------------------------------------------------------
// InputGroup
// ---------------------------------------------------------------------------

interface InputGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupVariants> {
  /**
   * Corner treatment, passed on to `InputGroupButton`s. `pill` is the kit's
   * search and subscribe fields.
   * @default "rounded"
   */
  shape?: InputGroupShape;
  /**
   * Height of one line, passed on to `InputGroupButton`s.
   * @default "md" (40px)
   */
  size?: InputGroupSize;
}

// Pressing the well outside an interactive part focuses the control without
// first blurring it.
function focusControl(event: React.MouseEvent<HTMLDivElement>) {
  const target = event.target as HTMLElement;
  if (target.closest("a, button, input, select, textarea, [role=button]")) {
    return;
  }
  const control = event.currentTarget.querySelector<HTMLElement>(
    "[data-slot=input-group-control]"
  );
  if (control) {
    event.preventDefault();
    control.focus();
  }
}

/**
 * A well holding one control (`InputGroupInput` or `InputGroupTextarea`)
 * with addons around it: icons, text, or buttons. Label the control itself,
 * with a `<label htmlFor>` or `aria-label`.
 */
function InputGroup({
  className,
  size = "md",
  shape = "rounded",
  onMouseDown,
  ...props
}: InputGroupProps) {
  const context = useMemo(() => ({ size, shape }), [size, shape]);
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(event);
      if (!event.defaultPrevented) {
        focusControl(event);
      }
    },
    [onMouseDown]
  );
  return (
    <InputGroupContext.Provider value={context}>
      {/* biome-ignore lint/a11y/useSemanticElements: groups a field's parts, it is not a form fieldset */}
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: a pointer shortcut to the control, which keyboard users reach with Tab */}
      <div
        className={cn(inputGroupVariants({ size, shape }), className)}
        data-shape={shape}
        data-size={size}
        data-slot="input-group"
        onMouseDown={handleMouseDown}
        role="group"
        {...props}
      />
    </InputGroupContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// InputGroupAddon
// ---------------------------------------------------------------------------

interface InputGroupAddonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupAddonVariants> {
  /**
   * Where the addon sits. `inline-start` and `inline-end` follow the writing
   * direction; `block-start` and `block-end` add a row above or below.
   * @default "inline-start"
   */
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}

/** Holds icons, `InputGroupText` or `InputGroupButton`s beside the control. */
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputGroupButton
// ---------------------------------------------------------------------------

interface InputGroupButtonProps extends Omit<ButtonProps, "shape" | "size"> {
  /**
   * `ghost` stays flat in the well until hovered; `default` and `primary`
   * rise out of it, like the kit's Subscribe button.
   * @default "ghost"
   */
  variant?: ButtonProps["variant"];
}

/**
 * A `Button` sized and shaped to fit inside the group's well. With only an
 * `icon`, give it an `aria-label`.
 */
function InputGroupButton({
  className,
  variant = "ghost",
  ...props
}: InputGroupButtonProps) {
  const { size, shape } = useContext(InputGroupContext);
  return (
    <Button
      className={cn(
        BUTTON_FIT[size],
        shape === "rounded" && "rounded-md",
        className
      )}
      data-slot="input-group-button"
      shape={shape}
      size={BUTTON_SIZE[size]}
      variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputGroupText
// ---------------------------------------------------------------------------

type InputGroupTextProps = React.ComponentProps<"span">;

/** Static text in an addon, such as a unit, prefix or keyboard hint. */
function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="input-group-text"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputGroupInput / InputGroupTextarea
// ---------------------------------------------------------------------------

interface InputGroupInputProps
  extends Omit<InputPrimitive.Props, "className" | "size"> {
  className?: string;
  /** The native `size` attribute: the visible width in characters. */
  htmlSize?: number;
}

/** The group's single-line control, built on Base UI's `Input`. */
function InputGroupInput({
  className,
  htmlSize,
  type = "text",
  ...props
}: InputGroupInputProps) {
  return (
    <InputPrimitive
      className={cn(
        inputControlClassName,
        "h-(--input-group-h) flex-1 px-(--input-group-px)",
        className
      )}
      data-slot="input-group-control"
      size={htmlSize}
      type={type}
      {...props}
    />
  );
}

type InputGroupTextareaProps = React.ComponentProps<"textarea">;

/**
 * The group's multi-line control, like the kit's chat composer. It grows
 * with its text (`field-sizing`); cap it with `max-h-*`.
 */
function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <textarea
      className={cn(
        inputControlClassName,
        "neu-scrollbar field-sizing-content min-h-(--input-group-h) flex-1 resize-none px-(--input-group-px) py-(--input-group-py)",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
};
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  inputGroupAddonVariants,
  inputGroupVariants,
};
