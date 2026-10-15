"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@neomorphic-react/ui/pagination";
import { type MouseEvent, useState } from "react";

const LAST = 12;

type Slot = number | "gap-start" | "gap-end";

function pagesAround(page: number): Slot[] {
  if (page <= 3) {
    return [1, 2, 3, 4, "gap-end", LAST];
  }
  if (page >= LAST - 2) {
    return [1, "gap-start", LAST - 3, LAST - 2, LAST - 1, LAST];
  }
  return [1, "gap-start", page - 1, page, page + 1, "gap-end", LAST];
}

export default function PaginationControlled() {
  const [page, setPage] = useState(1);

  const goTo = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(Math.min(LAST, Math.max(1, next)));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#page-${page - 1}`}
            onClick={goTo(page - 1)}
          />
        </PaginationItem>
        {pagesAround(page).map((slot) => (
          <PaginationItem key={slot}>
            {typeof slot === "number" ? (
              <PaginationLink
                href={`#page-${slot}`}
                isActive={slot === page}
                onClick={goTo(slot)}
              >
                {slot}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={`#page-${page + 1}`} onClick={goTo(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
