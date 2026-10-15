"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { createContext, useContext } from "react";

import { cn } from "./utils";

type AccordionVariant = "raised" | "flat";

const AccordionVariantContext = createContext<AccordionVariant>("raised");

// ---------------------------------------------------------------------------
// Accordion
// ---------------------------------------------------------------------------

const accordionVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      raised: "gap-4",
      flat: "",
    },
  },
  defaultVariants: {
    variant: "raised",
  },
});

interface AccordionProps
  extends AccordionPrimitive.Root.Props,
    VariantProps<typeof accordionVariants> {
  /**
   * `raised` makes each item its own panel; `flat` is a list split by
   * grooves, for use inside a `Card`.
   * @default "raised"
   */
  variant?: AccordionVariant;
}

/**
 * Stacked sections that open one at a time, or several with `multiple`.
 * Each header is a button in the Tab order; Enter or Space toggles it.
 */
function Accordion({
  className,
  variant = "raised",
  ...props
}: AccordionProps) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        className={cn(accordionVariants({ variant }), className)}
        data-slot="accordion"
        data-variant={variant}
        {...props}
      />
    </AccordionVariantContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      raised:
        "inset-shadow-neu-flat rounded-lg bg-neu-convex shadow-neu data-disabled:opacity-60",
      flat: "relative data-disabled:opacity-60 [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:inset-x-0 [&:not(:last-child)]:after:bottom-0 [&:not(:last-child)]:after:h-px [&:not(:last-child)]:after:bg-[var(--neu-dark)] [&:not(:last-child)]:after:shadow-[0_1px_0_var(--neu-light)]",
    },
  },
  defaultVariants: {
    variant: "raised",
  },
});

type AccordionItemProps = AccordionPrimitive.Item.Props;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  const variant = useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Item
      className={cn(accordionItemVariants({ variant }), className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

// The open header presses into the item and its chevron turns over: the
// chevron is the mark, the depth backs it up.
const accordionTriggerVariants = cva(
  "group/accordion-trigger inset-shadow-neu-flat flex w-full flex-1 items-center justify-between gap-4 rounded-lg px-5 py-4 text-start font-medium text-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow,color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:hover:text-foreground",
  {
    variants: {
      variant: {
        raised: "data-panel-open:inset-shadow-neu-sm",
        flat: "px-1",
      },
    },
    defaultVariants: {
      variant: "raised",
    },
  }
);

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const variant = useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        className={cn(accordionTriggerVariants({ variant }), className)}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-panel-open/accordion-trigger:rotate-180 group-data-panel-open/accordion-trigger:text-primary"
          data-slot="accordion-indicator"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// ---------------------------------------------------------------------------
// AccordionContent
// ---------------------------------------------------------------------------

type AccordionContentProps = AccordionPrimitive.Panel.Props;

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const variant = useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-muted-foreground text-sm transition-[height] duration-[var(--duration-base)] ease-[var(--ease-out)] data-ending-style:h-0 data-starting-style:h-0"
      data-slot="accordion-content"
      {...props}
    >
      <div
        className={cn(
          variant === "raised" ? "px-5 pt-3 pb-5" : "px-1 pb-4",
          "[&_a:hover]:text-primary [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
          className as string
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
};
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
};
