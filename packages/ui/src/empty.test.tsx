import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

describe("Empty", () => {
  it("composes media, title, description and content", () => {
    render(
      <Empty data-testid="empty">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <svg aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No trips yet</EmptyTitle>
          <EmptyDescription>Book one to see it here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <button type="button">Book a trip</button>
        </EmptyContent>
      </Empty>
    );
    expect(screen.getByTestId("empty")).toHaveAttribute("data-variant", "flat");
    expect(screen.getByText("No trips yet")).toHaveAttribute(
      "data-slot",
      "empty-title"
    );
    expect(screen.getByRole("button", { name: "Book a trip" })).toBeVisible();
  });

  it("puts an icon on a raised tile", () => {
    const { container } = render(
      <EmptyMedia variant="icon">
        <svg aria-hidden="true" />
      </EmptyMedia>
    );
    expect(container.firstChild).toHaveClass(
      "bg-neu-convex",
      "shadow-neu",
      "inset-shadow-neu-flat"
    );
  });

  it("can sit in a well", () => {
    render(<Empty data-testid="empty" variant="inset" />);
    expect(screen.getByTestId("empty")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat"
    );
  });
});
