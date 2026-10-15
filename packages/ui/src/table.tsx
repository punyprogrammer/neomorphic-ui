"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// A groove: a dark line with a light line under it.
const GROOVE =
  "border-[var(--neu-dark)] border-b shadow-[0_1px_0_var(--neu-light)]";

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

const tableContainerVariants = cva(
  "neu-scrollbar relative w-full overflow-x-auto",
  {
    variants: {
      variant: {
        flat: "",
        raised:
          "inset-shadow-neu-flat rounded-xl bg-neu-convex px-3 pb-2 shadow-neu",
        inset: "inset-shadow-neu rounded-xl px-3 pb-2 shadow-neu-flat",
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  }
);

interface TableProps
  extends React.ComponentProps<"table">,
    VariantProps<typeof tableContainerVariants> {
  /** Props for the scrolling wrapper, e.g. a `max-h-*` with `stickyHeader`. */
  containerProps?: React.ComponentProps<"div">;
  /**
   * Keeps the header row in view while the body scrolls. Give the wrapper a
   * height through `containerProps`.
   */
  stickyHeader?: boolean;
  /**
   * `flat` sits on the surface; `raised` and `inset` wrap the table in a
   * panel or a well.
   * @default "flat"
   */
  variant?: "flat" | "raised" | "inset";
}

/**
 * A data table with grooves between rows. It scrolls sideways when it's wider
 * than its container.
 */
function Table({
  className,
  variant = "flat",
  stickyHeader = false,
  containerProps,
  ...props
}: TableProps) {
  return (
    <div
      {...containerProps}
      className={cn(
        tableContainerVariants({ variant }),
        stickyHeader && "overflow-y-auto",
        containerProps?.className
      )}
      data-slot="table-container"
      data-variant={variant}
    >
      <table
        className={cn(
          "w-full caption-bottom border-separate border-spacing-0 text-sm",
          className
        )}
        data-slot="table"
        data-sticky-header={stickyHeader || undefined}
        {...props}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

type TableHeaderProps = React.ComponentProps<"thead">;

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "[[data-sticky-header]_&_th]:sticky [[data-sticky-header]_&_th]:top-0 [[data-sticky-header]_&_th]:z-(--z-sticky) [[data-sticky-header]_&_th]:bg-background [[data-variant=raised]_&_th]:bg-transparent",
        className
      )}
      data-slot="table-header"
      {...props}
    />
  );
}

type TableBodyProps = React.ComponentProps<"tbody">;

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn(
        "[&>tr:last-child>td]:border-b-0 [&>tr:last-child>td]:shadow-none",
        className
      )}
      data-slot="table-body"
      {...props}
    />
  );
}

type TableFooterProps = React.ComponentProps<"tfoot">;

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        "font-medium [&>tr:first-child>td]:border-[var(--neu-dark)] [&>tr:first-child>td]:border-t [&>tr>td]:border-b-0 [&>tr>td]:shadow-[inset_0_1px_0_var(--neu-light)]",
        className
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TableRow
// ---------------------------------------------------------------------------

type TableRowProps = React.ComponentProps<"tr">;

/**
 * A row. Set `aria-selected` (or `data-selected`) to mark it chosen: it
 * takes a primary tint and a bar at its leading edge.
 */
function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-[color-mix(in_oklab,var(--neu-dark)_18%,transparent)] aria-selected:bg-[color-mix(in_oklab,var(--color-primary)_9%,transparent)] data-selected:bg-[color-mix(in_oklab,var(--color-primary)_9%,transparent)] aria-selected:[&>td:first-child]:shadow-[inset_3px_0_0_var(--color-primary),0_1px_0_var(--neu-light)] data-selected:[&>td:first-child]:shadow-[inset_3px_0_0_var(--color-primary),0_1px_0_var(--neu-light)] [thead_&]:hover:bg-transparent",
        className
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// TableHead / TableCell / TableCaption
// ---------------------------------------------------------------------------

type TableHeadProps = React.ComponentProps<"th">;

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-11 whitespace-nowrap px-3 text-start align-middle font-semibold text-muted-foreground text-xs uppercase tracking-wide [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pe-0",
        GROOVE,
        className
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

type TableCellProps = React.ComponentProps<"td">;

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "whitespace-nowrap px-3 py-3 align-middle text-foreground [&:has([role=checkbox])]:pe-0",
        GROOVE,
        className
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

type TableCaptionProps = React.ComponentProps<"caption">;

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      data-slot="table-caption"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
};
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
