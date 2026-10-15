"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Breadcrumb / BreadcrumbList / BreadcrumbItem
// ---------------------------------------------------------------------------

type BreadcrumbProps = React.ComponentProps<"nav">;

/** The trail to the current page. Labelled "Breadcrumb" unless you rename it. */
function Breadcrumb({ "aria-label": ariaLabel, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel ?? "Breadcrumb"}
      data-slot="breadcrumb"
      {...props}
    />
  );
}

type BreadcrumbListProps = React.ComponentProps<"ol">;

function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2",
        className
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

type BreadcrumbItemProps = React.ComponentProps<"li">;

function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbLink / BreadcrumbPage
// ---------------------------------------------------------------------------

type BreadcrumbLinkProps = useRender.ComponentProps<"a">;

/** An ancestor page. Pass `render={<Link … />}` for a router link. */
function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          "rounded-sm underline-offset-3 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
          className
        ),
      },
      props
    ),
    state: { slot: "breadcrumb-link" },
  });
}

type BreadcrumbPageProps = React.ComponentProps<"span">;

/** The current page: pressed into the surface, in the foreground colour. */
function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn(
        "inset-shadow-neu-sm rounded-full px-3 py-1 font-medium text-foreground shadow-neu-flat",
        className
      )}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbSeparator / BreadcrumbEllipsis
// ---------------------------------------------------------------------------

type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

/** A chevron between items, hidden from assistive tech. Pass children to swap it. */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 rtl:[&>svg]:-scale-x-100", className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

/** Stands in for collapsed items; wrap it in a menu trigger to reveal them. */
function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      className={cn("flex size-5 items-center justify-center", className)}
      data-slot="breadcrumb-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon aria-hidden="true" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
};
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
