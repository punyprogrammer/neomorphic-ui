import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

function Trail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Booking</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("is a labelled navigation landmark holding an ordered list", () => {
    render(<Trail />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("list").tagName).toBe("OL");
  });

  it("exposes only the real items to assistive tech", () => {
    render(<Trail />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("links ancestors and marks the current page", () => {
    render(<Trail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    const page = screen.getByText("Booking");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveClass("inset-shadow-neu-sm", "shadow-neu-flat");
  });

  it("names the ellipsis for screen readers", () => {
    render(<Trail />);
    expect(screen.getByText("More pages")).toHaveClass("sr-only");
  });

  it("renders a custom link element", () => {
    render(
      <BreadcrumbLink render={<a data-router="true" href="/trips" />}>
        Trips
      </BreadcrumbLink>
    );
    expect(screen.getByRole("link", { name: "Trips" })).toHaveAttribute(
      "data-router",
      "true"
    );
  });

  it("names a second breadcrumb differently", () => {
    render(<Breadcrumb aria-label="Category" />);
    expect(
      screen.getByRole("navigation", { name: "Category" })
    ).toBeInTheDocument();
  });
});
