"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from "lucide-react";
import type * as React from "react";
import { useRef } from "react";

import { chipVariants } from "./chip";
import { inputControlClassName } from "./input";
import { InputGroup, InputGroupAddon, InputGroupButton } from "./input-group";
import {
  popupClassName,
  popupItemClassName,
  popupLabelClassName,
  popupSeparatorClassName,
} from "./popup";
import { selectTriggerVariants } from "./select";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Combobox (Root)
// ---------------------------------------------------------------------------

/**
 * Owns the value, the typed query and the filtering. Pass `items` so the
 * list filters and `ComboboxEmpty` knows when nothing matches; `multiple`
 * keeps an array of values, shown as `ComboboxChip`s.
 */
const Combobox = ComboboxPrimitive.Root;

// ---------------------------------------------------------------------------
// ComboboxInput
// ---------------------------------------------------------------------------

interface ComboboxInputProps
  extends Omit<ComboboxPrimitive.Input.Props, "className" | "size"> {
  /** Extra addons, such as a leading search icon in an `InputGroupAddon`. */
  children?: React.ReactNode;
  /** Classes for the well around the input. */
  className?: string;
  /** @default "rounded" */
  shape?: "rounded" | "pill";
  /**
   * Show a button that clears the value; it appears once there is one.
   * @default false
   */
  showClear?: boolean;
  /**
   * Show the chevron button that opens the list.
   * @default true
   */
  showTrigger?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A text field in an `InputGroup` well that filters the list as you type,
 * with a chevron to open it and an optional clear button. Label it with a
 * `<label htmlFor>`, `FieldLabel` or `aria-label`.
 */
function ComboboxInput({
  className,
  children,
  disabled = false,
  shape = "rounded",
  showClear = false,
  showTrigger = true,
  size = "md",
  ...props
}: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.InputGroup
      className={cn("w-auto", className)}
      render={<InputGroup shape={shape} size={size} />}
    >
      <ComboboxPrimitive.Input
        className={cn(
          inputControlClassName,
          "h-(--input-group-h) flex-1 px-(--input-group-px)"
        )}
        data-slot="input-group-control"
        disabled={disabled}
        {...props}
      />
      {showClear || showTrigger ? (
        <InputGroupAddon align="inline-end" className="gap-0.5">
          {showClear ? <ComboboxClear disabled={disabled} /> : null}
          {showTrigger ? (
            <ComboboxPrimitive.Trigger
              aria-label="Show options"
              className="text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-[var(--duration-base)] data-popup-open:[&_svg]:rotate-180"
              data-slot="combobox-trigger"
              disabled={disabled}
              render={<InputGroupButton icon={<ChevronDownIcon />} />}
            />
          ) : null}
        </InputGroupAddon>
      ) : null}
      {children}
    </ComboboxPrimitive.InputGroup>
  );
}

// ---------------------------------------------------------------------------
// ComboboxClear
// ---------------------------------------------------------------------------

type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

/** Clears the value; renders only while there is one. */
function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      aria-label="Clear"
      className={cn("text-muted-foreground", className)}
      data-slot="combobox-clear"
      render={<InputGroupButton icon={<XIcon />} />}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ComboboxTrigger / ComboboxValue
// ---------------------------------------------------------------------------

interface ComboboxTriggerProps extends ComboboxPrimitive.Trigger.Props {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A raised button like `SelectTrigger`, for a searchable select: put a
 * `ComboboxValue` in it and a `ComboboxInput` inside `ComboboxContent`.
 */
function ComboboxTrigger({
  className,
  children,
  size = "md",
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(selectTriggerVariants({ size }), className)}
      data-size={size}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-popup-open:rotate-180"
      />
    </ComboboxPrimitive.Trigger>
  );
}

type ComboboxValueProps = ComboboxPrimitive.Value.Props;

/** The chosen item's label, or a render function over the value(s). */
function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value {...props} />;
}

// ---------------------------------------------------------------------------
// ComboboxContent
// ---------------------------------------------------------------------------

interface ComboboxContentProps extends ComboboxPrimitive.Popup.Props {
  /** @default "start" */
  align?: ComboboxPrimitive.Positioner.Props["align"];
  /** @default 0 */
  alignOffset?: number;
  /**
   * The element to line the list up with. Pass the ref from
   * `useComboboxAnchor()` that you put on `ComboboxChips`.
   */
  anchor?: ComboboxPrimitive.Positioner.Props["anchor"];
  /** @default "bottom" */
  side?: ComboboxPrimitive.Positioner.Props["side"];
  /**
   * Gap to the field, leaving room for both shadows.
   * @default 8
   */
  sideOffset?: number;
}

/** The raised card holding the list, as wide as the field. */
function ComboboxContent({
  className,
  children,
  align = "start",
  alignOffset = 0,
  anchor,
  side = "bottom",
  sideOffset = 8,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-(--z-popover) outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            popupClassName,
            "group/combobox-content flex max-h-[min(var(--available-height),24rem)] w-(--anchor-width) min-w-48 max-w-(--available-width) flex-col overflow-hidden",
            "has-[>[data-slot=input-group]]:pt-1.5 [&>[data-slot=input-group]]:mx-1.5 [&>[data-slot=input-group]]:w-auto",
            className
          )}
          data-slot="combobox-content"
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// ComboboxList / ComboboxItem
// ---------------------------------------------------------------------------

type ComboboxListProps = ComboboxPrimitive.List.Props;

/**
 * The scrolling list. Give it a render function to map the filtered
 * `items`, or `ComboboxGroup`s holding `ComboboxCollection`s.
 */
function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        "neu-scrollbar min-h-0 flex-1 scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 outline-none data-empty:p-0",
        className
      )}
      data-slot="combobox-list"
      {...props}
    />
  );
}

interface ComboboxItemProps extends ComboboxPrimitive.Item.Props {
  children: React.ReactNode;
}

// Highlighted sinks into the card; chosen takes a check and `--primary`.
function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        popupItemClassName,
        "pe-9 data-selected:font-medium data-selected:text-primary",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        className="absolute end-3 flex items-center"
        data-slot="combobox-item-indicator"
      >
        <CheckIcon aria-hidden="true" strokeWidth={3} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

// ---------------------------------------------------------------------------
// ComboboxGroup / ComboboxLabel / ComboboxCollection / ComboboxSeparator
// ---------------------------------------------------------------------------

type ComboboxGroupProps = ComboboxPrimitive.Group.Props;

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      className={cn("grid", className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

/** A group's heading. */
function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(popupLabelClassName, className)}
      data-slot="combobox-label"
      {...props}
    />
  );
}

type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;

/** Maps a group's filtered `items` through a render function. */
function ComboboxCollection(props: ComboboxCollectionProps) {
  return <ComboboxPrimitive.Collection {...props} />;
}

type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;

function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      className={cn(popupSeparatorClassName, className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ComboboxEmpty
// ---------------------------------------------------------------------------

type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

/**
 * Shown when nothing matches the query. It stays mounted (and empty) the
 * rest of the time so screen readers hear the change.
 */
function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "px-3 not-empty:py-6 text-center text-muted-foreground text-sm",
        className
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ComboboxChips / ComboboxChip / ComboboxChipsInput
// ---------------------------------------------------------------------------

type ComboboxChipsProps = ComboboxPrimitive.Chips.Props;

/**
 * The well for `multiple`: chosen values as raised chips with the input
 * after them. Arrow Left from the input's start moves onto the chips.
 */
function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      className={cn(
        "inset-shadow-neu flex min-h-10 w-full cursor-text flex-wrap items-center gap-1.5 rounded-lg bg-background p-1.5 text-foreground text-sm shadow-neu-flat transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] has-[[data-slot=combobox-chips-input]:focus-visible]:inset-shadow-neu-lg has-[[data-slot=combobox-chips-input]:focus-visible]:outline-2 has-[[data-slot=combobox-chips-input]:focus-visible]:outline-ring/50 has-[[data-slot=combobox-chips-input]:focus-visible]:outline-offset-2 has-aria-invalid:ring-1 has-aria-invalid:ring-destructive/70",
        className
      )}
      data-slot="combobox-chips"
      {...props}
    />
  );
}

interface ComboboxChipProps extends ComboboxPrimitive.Chip.Props {
  /**
   * Accessible name for the remove button, such as "Remove Lisbon".
   * @default "Remove"
   */
  removeLabel?: string;
  /**
   * Show the remove button (Backspace and Delete remove the chip either way).
   * @default true
   */
  showRemove?: boolean;
}

// A raised `Chip`; the one reached with the arrow keys presses in and takes
// the primary colour.
function ComboboxChip({
  className,
  children,
  removeLabel = "Remove",
  showRemove = true,
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        chipVariants({ size: "md" }),
        "cursor-default gap-1 outline-none transition-[box-shadow,color] duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 has-data-[slot=combobox-chip-remove]:pe-1 data-highlighted:inset-shadow-neu-sm data-highlighted:bg-none data-highlighted:text-primary data-highlighted:shadow-neu-flat",
        className
      )}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove ? (
        <ComboboxPrimitive.ChipRemove
          aria-label={removeLabel}
          className="flex size-5 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50 [&_svg]:size-3"
          data-slot="combobox-chip-remove"
        >
          <XIcon aria-hidden="true" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  );
}

type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

/** The bare text input after the chips. */
function ComboboxChipsInput({ className, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      className={cn(
        "h-7 min-w-16 flex-1 bg-transparent px-1.5 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      data-slot="combobox-chips-input"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// useComboboxAnchor
// ---------------------------------------------------------------------------

/** A ref for `ComboboxChips`, passed to `ComboboxContent`'s `anchor`. */
function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ComboboxRootProps as ComboboxProps } from "@base-ui/react/combobox";
export type {
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
};
export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
