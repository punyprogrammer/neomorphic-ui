"use client";

import { ChevronRight as ChevronRightIcon } from "lucide-react";
import type * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  type CollapsibleContentProps,
  type CollapsibleProps,
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
} from "./collapsible";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Trace
// ---------------------------------------------------------------------------

type TraceProps = React.ComponentProps<"div">;

/**
 * An agent's working steps, one `TraceLine` each: "Read 3 files", "Searched
 * the web". Wrap a line in a `<button>` or `<a>` to make it an action, or in
 * a `TraceCollapsible` to show its output.
 */
function Trace({ className, ...props }: TraceProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-start *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:outline-2 *:has-[>[data-slot=trace-line]]:focus-visible:outline-ring/50 *:has-[>[data-slot=trace-line]]:focus-visible:outline-offset-2",
        className
      )}
      data-slot="trace"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TraceLine and its parts
// ---------------------------------------------------------------------------

interface TraceLineProps extends React.ComponentProps<"span"> {
  /**
   * `running` sweeps a shine across the title, `pending` dims the line,
   * `error` turns it destructive. Finished steps have no status.
   */
  status?: "running" | "pending" | "error";
}

/** One step: a `TraceIcon`, a `TraceTitle` and a `TraceDescription`. */
function TraceLine({ className, status, ...props }: TraceLineProps) {
  return (
    <span
      className={cn(
        "data-[status=running]:*:data-[slot=trace-title]:neu-shimmer-text flex w-fit min-w-0 max-w-full in-[a,button]:cursor-pointer items-center gap-2 in-[a:hover,button:hover]:text-foreground text-muted-foreground text-sm transition-colors duration-[var(--duration-fast)] data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=error]:text-destructive data-[status=pending]:opacity-60",
        className
      )}
      data-slot="trace-line"
      data-status={status}
      {...props}
    />
  );
}

type TraceIconProps = React.ComponentProps<"span">;

/** A decorative icon, or a `Spinner` while the step runs. */
function TraceIcon({ className, ...props }: TraceIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [[data-slot=trace-title]~&]:-ms-1",
        className
      )}
      data-slot="trace-icon"
      {...props}
    />
  );
}

type TraceTitleProps = React.ComponentProps<"span">;

/** What the step did, on one line. */
function TraceTitle({ className, ...props }: TraceTitleProps) {
  return (
    <span
      className={cn("min-w-0 truncate", className)}
      data-slot="trace-title"
      {...props}
    />
  );
}

type TraceDescriptionProps = React.ComponentProps<"span">;

/** A count or duration after the title ("12 results", "2.4s"). */
function TraceDescription({ className, ...props }: TraceDescriptionProps) {
  return (
    <span
      className={cn(
        "shrink-0 text-muted-foreground/70 tabular-nums",
        className
      )}
      data-slot="trace-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TraceCollapsible
// ---------------------------------------------------------------------------

type TraceCollapsibleProps = CollapsibleProps;

/** A step whose output opens below it. */
function TraceCollapsible({ className, ...props }: TraceCollapsibleProps) {
  return (
    <Collapsible
      className={cn("flex w-full min-w-0 flex-col", className)}
      data-slot="trace-collapsible"
      {...props}
    />
  );
}

type TraceCollapsibleTriggerProps = CollapsibleTriggerProps;

/** Wraps a `TraceLine`, adding a chevron that turns while open. */
function TraceCollapsibleTrigger({
  children,
  className,
  ...props
}: TraceCollapsibleTriggerProps) {
  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-fit min-w-0 max-w-full cursor-pointer items-center gap-1 rounded-md text-start text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 has-[[data-status=error]]:text-destructive",
        className
      )}
      data-slot="trace-collapsible-trigger"
      {...props}
    >
      {children}
      <TraceIcon className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-panel-open/collapsible-trigger:rotate-90 rtl:rotate-180 rtl:group-data-panel-open/collapsible-trigger:rotate-90">
        <ChevronRightIcon />
      </TraceIcon>
    </CollapsibleTrigger>
  );
}

type TraceCollapsibleContentProps = CollapsibleContentProps;

/** The step's output, hanging off a groove under its icon. */
function TraceCollapsibleContent({
  children,
  className,
  ...props
}: TraceCollapsibleContentProps) {
  return (
    <CollapsibleContent
      className="min-w-0"
      data-slot="trace-collapsible-content"
      {...props}
    >
      <div
        className={cn(
          "wrap-break-word ms-[calc(--spacing(2)-1px)] mt-2 mb-1 min-w-0 border-neu-dark border-s ps-4 pe-1 text-muted-foreground text-sm leading-relaxed shadow-[inset_1px_0_0_var(--neu-light)] rtl:shadow-[inset_-1px_0_0_var(--neu-light)]",
          className
        )}
        data-slot="trace-collapsible-content-inner"
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  TraceCollapsibleContentProps,
  TraceCollapsibleProps,
  TraceCollapsibleTriggerProps,
  TraceDescriptionProps,
  TraceIconProps,
  TraceLineProps,
  TraceProps,
  TraceTitleProps,
};
export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
};
