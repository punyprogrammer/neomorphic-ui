"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@neomorphic-react/ui/pagination";

export default function PaginationLabels() {
  return (
    <Pagination aria-label="Posts" className="max-w-md">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            aria-label="Newer posts"
            href="#newer"
            text="Newer"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext aria-label="Older posts" href="#older" text="Older" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
