"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@neomorphic-react/ui/pagination";

const sizes = [
  { size: "sm", label: "Small pagination" },
  { size: "md", label: "Medium pagination" },
] as const;

export default function PaginationSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ size, label }) => (
        <Pagination aria-label={label} key={size}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#page-1" size={size} />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`#page-${page}`}
                  isActive={page === 1}
                  size={size}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#page-2" size={size} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ))}
    </div>
  );
}
