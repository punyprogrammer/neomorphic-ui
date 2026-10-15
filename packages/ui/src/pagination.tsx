"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";

import { buttonVariants } from "./button";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Pagination / PaginationContent / PaginationItem
// ---------------------------------------------------------------------------

type PaginationProps = React.ComponentProps<"nav">;

/** Page links. Labelled "Pagination" unless you rename it. */
function Pagination({
  className,
  "aria-label": ariaLabel,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label={ariaLabel ?? "Pagination"}
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      {...props}
    />
  );
}

type PaginationContentProps = React.ComponentProps<"ul">;

function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-2", className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

type PaginationItemProps = React.ComponentProps<"li">;

function PaginationItem(props: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

// ---------------------------------------------------------------------------
// PaginationLink
// ---------------------------------------------------------------------------

// The current page presses in and takes the primary colour, so it reads as
// selected by colour as well as depth.
const ACTIVE =
  "aria-[current=page]:inset-shadow-neu-sm aria-[current=page]:bg-none aria-[current=page]:font-semibold aria-[current=page]:text-primary aria-[current=page]:shadow-neu-flat aria-[current=page]:hover:shadow-neu-flat";

interface PaginationLinkProps extends useRender.ComponentProps<"a"> {
  /** Marks this link as the current page (`aria-current="page"`). */
  isActive?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
}

/** A page link. Pass `render={<Link … />}` for a router link. */
function PaginationLink({
  className,
  isActive,
  size = "md",
  render,
  ...props
}: PaginationLinkProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        "aria-current": isActive ? "page" : undefined,
        className: cn(
          buttonVariants({ size, shape: "pill", iconOnly: true }),
          "normal-case tracking-normal",
          ACTIVE,
          className
        ),
      },
      props
    ),
    state: { slot: "pagination-link", active: isActive },
  });
}

// ---------------------------------------------------------------------------
// PaginationPrevious / PaginationNext / PaginationEllipsis
// ---------------------------------------------------------------------------

type PaginationPreviousProps = Omit<PaginationLinkProps, "isActive"> & {
  /** @default "Previous" */
  text?: string;
};

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("w-auto gap-1 ps-3 pe-4", className)}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
      <span className="hidden sm:inline">{text}</span>
    </PaginationLink>
  );
}

type PaginationNextProps = Omit<PaginationLinkProps, "isActive"> & {
  /** @default "Next" */
  text?: string;
};

function PaginationNext({
  className,
  text = "Next",
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("w-auto gap-1 ps-4 pe-3", className)}
      {...props}
    >
      <span className="hidden sm:inline">{text}</span>
      <ChevronRightIcon aria-hidden="true" className="rtl:-scale-x-100" />
    </PaginationLink>
  );
}

type PaginationEllipsisProps = React.ComponentProps<"span">;

/** Stands in for skipped pages. */
function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 items-center justify-center text-muted-foreground",
        className
      )}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
};
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
