import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

function Pages() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="?page=3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

describe("Pagination", () => {
  it("is a labelled navigation landmark", () => {
    render(<Pages />);
    expect(
      screen.getByRole("navigation", { name: "Pagination" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("marks the current page with aria-current", () => {
    render(<Pages />);
    const current = screen.getByRole("link", { name: "2" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.className).toContain(
      "aria-[current=page]:inset-shadow-neu-sm"
    );
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("raises the links like buttons", () => {
    render(<Pages />);
    expect(screen.getByRole("link", { name: "1" })).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "rounded-full"
    );
  });

  it("names previous and next for screen readers", () => {
    render(<Pages />);
    expect(
      screen.getByRole("link", { name: "Go to previous page" })
    ).toHaveAttribute("href", "?page=1");
    expect(
      screen.getByRole("link", { name: "Go to next page" })
    ).toHaveAttribute("href", "?page=3");
  });

  it("hides the ellipsis from assistive tech", () => {
    const { container } = render(<Pages />);
    expect(
      container.querySelector('[data-slot="pagination-ellipsis"]')
    ).toHaveAttribute("aria-hidden", "true");
  });
});
