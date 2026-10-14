"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { createContext, useContext } from "react";

import { buttonGroupVariants } from "./button-group";
import { Toggle, type ToggleProps } from "./toggle";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// ToggleGroup
// ---------------------------------------------------------------------------

const ToggleGroupSizeContext = createContext<ToggleProps["size"]>(undefined);

interface ToggleGroupProps extends ToggleGroupPrimitive.Props {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /**
   * Outer corners of the slab; the end items follow them.
   * @default "rounded"
   */
  shape?: "rounded" | "pill";
  /**
   * Size of every item, unless an item sets its own.
   * @default "md"
   */
  size?: ToggleProps["size"];
}

/**
 * A segmented control: one raised slab (like `ButtonGroup`) whose pressed
 * items sink into it. Arrow keys move focus between items. Single-select by
 * default; `multiple` allows several. Label it with `aria-label`.
 *
 * Clicking the pressed item of a single-select group clears the value. For a
 * control that always has a choice, ignore empty changes in `onValueChange`.
 */
function ToggleGroup({
  className,
  orientation = "horizontal",
  shape = "rounded",
  size = "md",
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupSizeContext.Provider value={size}>
      <ToggleGroupPrimitive
        className={cn(buttonGroupVariants({ orientation, shape }), className)}
        data-shape={shape}
        data-size={size}
        data-slot="toggle-group"
        orientation={orientation}
        {...props}
      />
    </ToggleGroupSizeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// ToggleGroupItem
// ---------------------------------------------------------------------------

interface ToggleGroupItemProps extends Omit<ToggleProps, "shape"> {
  /** Identifies the item in the group's `value`. */
  value: string;
}

function ToggleGroupItem({ size, ...props }: ToggleGroupItemProps) {
  const groupSize = useContext(ToggleGroupSizeContext);
  return <Toggle size={size ?? groupSize} {...props} />;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ToggleGroupItemProps, ToggleGroupProps };
export { ToggleGroup, ToggleGroupItem };
