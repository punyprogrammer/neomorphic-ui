"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Collapsible / CollapsibleTrigger
// ---------------------------------------------------------------------------

type CollapsibleProps = CollapsiblePrimitive.Root.Props;

/** Shows and hides one region. Controlled with `open`, or `defaultOpen`. */
function Collapsible(props: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;

/**
 * The toggle: a `<button>` with `aria-expanded`. Pass
 * `render={<Button … />}` for a library button; add a
 * `CollapsibleIndicator` for the chevron.
 */
function CollapsibleTrigger({ className, ...props }: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn("group/collapsible-trigger", className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

type CollapsibleIndicatorProps = React.ComponentProps<"svg">;

/** A chevron that turns over while its trigger's panel is open. */
function CollapsibleIndicator({
  className,
  ...props
}: CollapsibleIndicatorProps) {
  return (
    <ChevronDownIcon
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-panel-open/collapsible-trigger:rotate-180",
        className
      )}
      data-slot="collapsible-indicator"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CollapsibleContent
// ---------------------------------------------------------------------------

type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props;

/**
 * The region, animating its height open and shut. `keepMounted` keeps it in
 * the DOM while closed; `hiddenUntilFound` lets find-in-page open it.
 */
function CollapsibleContent({ className, ...props }: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-[var(--duration-base)] ease-[var(--ease-out)] data-ending-style:h-0 data-starting-style:h-0 [&[hidden]:not([hidden='until-found'])]:hidden",
        className
      )}
      data-slot="collapsible-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  CollapsibleContentProps,
  CollapsibleIndicatorProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
};
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
};
