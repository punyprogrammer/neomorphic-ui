"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { createContext, useContext } from "react";

import {
  type CheckboxProps,
  checkboxIndicatorClassName,
  checkboxVariants,
} from "./checkbox";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

type RadioSize = CheckboxProps["size"];

const RadioGroupSizeContext = createContext<RadioSize>(undefined);

interface RadioGroupProps extends RadioGroupPrimitive.Props {
  /**
   * Size of every item, unless an item sets its own.
   * @default "md"
   */
  size?: RadioSize;
}

/**
 * A single-choice group (`role="radiogroup"`): arrow keys move the choice,
 * Tab leaves the group. Name it with `aria-labelledby` or `aria-label`, and
 * wrap each item with its text in a `<label>`. Stacks vertically; pass
 * `className="flex gap-6"` for a row.
 */
function RadioGroup({ className, size = "md", ...props }: RadioGroupProps) {
  return (
    <RadioGroupSizeContext.Provider value={size}>
      <RadioGroupPrimitive
        className={cn("grid gap-3", className)}
        data-size={size}
        data-slot="radio-group"
        {...props}
      />
    </RadioGroupSizeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// RadioGroupItem
// ---------------------------------------------------------------------------

interface RadioGroupItemProps extends RadioPrimitive.Root.Props {
  size?: RadioSize;
}

// The dot tracks the control size, as the check does in `Checkbox`.
const DOT_SIZE = {
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
} as const;

function RadioGroupItem({ className, size, ...props }: RadioGroupItemProps) {
  const groupSize = useContext(RadioGroupSizeContext);
  const resolvedSize = size ?? groupSize ?? "md";
  return (
    <RadioPrimitive.Root
      className={cn(
        checkboxVariants({ size: resolvedSize }),
        "rounded-full",
        className
      )}
      data-size={resolvedSize}
      data-slot="radio-group-item"
      {...props}
    >
      <RadioPrimitive.Indicator
        className={checkboxIndicatorClassName}
        data-slot="radio-group-indicator"
      >
        <span
          aria-hidden="true"
          className={cn("rounded-full bg-current", DOT_SIZE[resolvedSize])}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { RadioGroupItemProps, RadioGroupProps };
export { RadioGroup, RadioGroupItem };
