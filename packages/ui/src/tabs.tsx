"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";

import { cn } from "./utils";

type TabsListVariant = "default" | "line";

const TabsListVariantContext = createContext<TabsListVariant>("default");

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type TabsProps = TabsPrimitive.Root.Props;

/**
 * Panels behind a row (or column) of tabs. Arrow keys move between tabs;
 * set `activateOnFocus` on the list to switch panels as focus moves.
 */
function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex gap-4 data-[orientation=horizontal]:flex-col",
        className
      )}
      data-slot="tabs"
      orientation={orientation}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TabsList
// ---------------------------------------------------------------------------

// `default` is a raised slab, like `ToggleGroup`; a well slides under the
// active tab. `line` is flat, with a primary bar under the active tab.
const tabsListVariants = cva(
  "relative z-0 inline-flex w-fit items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-flat gap-1 rounded-xl bg-neu-convex p-1.5 shadow-neu",
        line: "gap-4 data-[orientation=vertical]:gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tabsIndicatorVariants = cva(
  "absolute -z-10 transition-[left,top,width,height] duration-[var(--duration-base)] ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-sm top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width) rounded-lg bg-background shadow-neu-flat",
        line: "rounded-full bg-[var(--tabs-active,var(--color-primary))] data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:left-(--active-tab-left) data-[orientation=vertical]:left-0 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=vertical]:w-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsListProps
  extends TabsPrimitive.List.Props,
    VariantProps<typeof tabsListVariants> {
  /** @default "default" */
  variant?: TabsListVariant;
}

/** Holds the tabs. Name it with `aria-label` when nothing else does. */
function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsListProps) {
  return (
    <TabsListVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant }), className)}
        data-slot="tabs-list"
        data-variant={variant}
        {...props}
      >
        {children}
        <TabsPrimitive.Indicator
          className={tabsIndicatorVariants({ variant })}
          data-slot="tabs-indicator"
        />
      </TabsPrimitive.List>
    </TabsListVariantContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// TabsTrigger
// ---------------------------------------------------------------------------

// The active tab takes `--tabs-active` (default `--primary`) and weight, so
// it's marked by more than the well under it.
const tabsTriggerVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium text-muted-foreground text-sm outline-none transition-colors duration-[var(--duration-base)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-active:font-semibold data-active:text-[var(--tabs-active,var(--color-primary))] data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "h-9 rounded-lg px-4",
        line: "h-10 px-1 data-[orientation=vertical]:justify-start data-[orientation=vertical]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type TabsTriggerProps = TabsPrimitive.Tab.Props;

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  const variant = useContext(TabsListVariantContext);
  return (
    <TabsPrimitive.Tab
      className={cn(tabsTriggerVariants({ variant }), className)}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TabsContent
// ---------------------------------------------------------------------------

type TabsContentProps = TabsPrimitive.Panel.Props;

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        "flex-1 rounded-lg text-foreground text-sm outline-none focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
        className
      )}
      data-slot="tabs-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
