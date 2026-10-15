"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Triangle as TriangleIcon,
} from "lucide-react";
import type * as React from "react";

import {
  popupClassName,
  popupItemClassName,
  popupLabelClassName,
  popupSeparatorClassName,
} from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Select (Root)
// ---------------------------------------------------------------------------

/**
 * Owns the value. Pass `items` (`{ label, value }[]` or a record) so
 * `SelectValue` shows labels rather than raw values.
 */
const Select = SelectPrimitive.Root;

// ---------------------------------------------------------------------------
// SelectLabel
// ---------------------------------------------------------------------------

type SelectLabelProps = SelectPrimitive.Label.Props;

/** The field's visible label; Base UI wires it to the trigger. */
function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={cn("font-medium text-foreground text-sm", className)}
      data-slot="select-label"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SelectTrigger
// ---------------------------------------------------------------------------

// The kit's "SELECT CATEGORY": a raised, uppercase control like `Button`,
// pressed into the surface while its list is open.
const selectTriggerVariants = cva(
  "group inset-shadow-neu-flat flex min-w-0 select-none items-center justify-between gap-3 whitespace-nowrap rounded-lg bg-neu-convex font-medium text-foreground uppercase tracking-wide shadow-neu outline-none transition-[box-shadow,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:shadow-neu-lg focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 aria-invalid:ring-1 aria-invalid:ring-destructive/70 data-disabled:inset-shadow-neu-flat data-popup-open:inset-shadow-neu-sm data-disabled:cursor-not-allowed data-disabled:bg-none data-popup-open:bg-none data-disabled:text-foreground/50 data-placeholder:text-muted-foreground data-disabled:shadow-neu-flat data-popup-open:shadow-neu-flat",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-xs",
        lg: "h-12 px-5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface SelectTriggerProps
  extends SelectPrimitive.Trigger.Props,
    VariantProps<typeof selectTriggerVariants> {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

function SelectTrigger({
  className,
  size = "md",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(selectTriggerVariants({ size }), className)}
      data-size={size}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        className="flex shrink-0 text-foreground transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-popup-open:rotate-180"
        data-slot="select-icon"
      >
        {/* The kit's solid caret. */}
        <TriangleIcon
          aria-hidden="true"
          className="size-2.5 rotate-180 fill-current"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// ---------------------------------------------------------------------------
// SelectValue
// ---------------------------------------------------------------------------

type SelectValueProps = SelectPrimitive.Value.Props;

/** The chosen item's label, or `placeholder` when nothing is chosen. */
function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      className={cn("truncate text-start", className)}
      data-slot="select-value"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SelectContent
// ---------------------------------------------------------------------------

interface SelectContentProps extends SelectPrimitive.Popup.Props {
  /** @default "start" */
  align?: SelectPrimitive.Positioner.Props["align"];
  /**
   * Overlay the chosen item on the trigger (macOS style) instead of
   * dropping the list below it.
   * @default false
   */
  alignItemWithTrigger?: boolean;
  /** @default "bottom" */
  side?: SelectPrimitive.Positioner.Props["side"];
  /**
   * Gap to the trigger, leaving room for both raised shadows.
   * @default 8
   */
  sideOffset?: number;
}

// A raised card floating above the surface; items sit flat in it.
function SelectContent({
  className,
  children,
  align = "start",
  alignItemWithTrigger = false,
  side = "bottom",
  sideOffset = 8,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-(--z-popover) outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            popupClassName,
            "relative flex max-h-(--available-height) min-w-(--anchor-width) flex-col overflow-hidden",
            className
          )}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollArrow direction="up" />
          {/* The list, not the popup, must scroll: a `className` max-height
              lands on the popup, and the arrows pin to the popup's edges. */}
          <SelectPrimitive.List
            className="min-h-0 flex-1 scroll-py-6 overflow-y-auto p-1.5 [scrollbar-width:none]"
            data-slot="select-list"
          >
            {children}
          </SelectPrimitive.List>
          <SelectScrollArrow direction="down" />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// SelectItem
// ---------------------------------------------------------------------------

interface SelectItemProps extends SelectPrimitive.Item.Props {
  children: React.ReactNode;
}

// Highlighted (hover or arrow keys) sinks into the card; chosen is marked by
// a check and the darker `--primary`.
function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        popupItemClassName,
        "pe-9 data-selected:font-medium data-selected:text-primary",
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        className="absolute end-3 flex items-center"
        data-slot="select-item-indicator"
      >
        <CheckIcon aria-hidden="true" strokeWidth={3} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

// ---------------------------------------------------------------------------
// SelectGroup / SelectGroupLabel / SelectSeparator
// ---------------------------------------------------------------------------

type SelectGroupProps = SelectPrimitive.Group.Props;

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      className={cn("grid", className)}
      data-slot="select-group"
      {...props}
    />
  );
}

type SelectGroupLabelProps = SelectPrimitive.GroupLabel.Props;

function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(popupLabelClassName, className)}
      data-slot="select-group-label"
      {...props}
    />
  );
}

type SelectSeparatorProps = SelectPrimitive.Separator.Props;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn(popupSeparatorClassName, className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Scroll arrows
// ---------------------------------------------------------------------------

function SelectScrollArrow({ direction }: { direction: "up" | "down" }) {
  const Arrow =
    direction === "up"
      ? SelectPrimitive.ScrollUpArrow
      : SelectPrimitive.ScrollDownArrow;
  return (
    <Arrow
      className={cn(
        "absolute inset-x-0 z-10 flex h-6 cursor-default items-center justify-center bg-neu-convex text-muted-foreground [&_svg]:size-4",
        direction === "up" ? "top-0 rounded-t-lg" : "bottom-0 rounded-b-lg"
      )}
      data-slot={`select-scroll-${direction}-arrow`}
    >
      {direction === "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Arrow>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  SelectContentProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
};
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
