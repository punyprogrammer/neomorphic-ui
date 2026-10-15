import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("is a hidden, shimmering well", () => {
    const { container } = render(<Skeleton className="h-20 w-40" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveClass(
      "neu-shimmer",
      "inset-shadow-neu-sm",
      "shadow-neu-flat",
      "rounded-lg",
      "h-20"
    );
  });

  it("has line and circle shapes", () => {
    const { container } = render(
      <>
        <Skeleton shape="line" />
        <Skeleton shape="circle" />
      </>
    );
    const [line, circle] = container.querySelectorAll('[data-slot="skeleton"]');
    expect(line).toHaveClass("h-4", "rounded-full");
    expect(circle).toHaveClass("aspect-square", "rounded-full");
    expect(circle).toHaveAttribute("data-shape", "circle");
  });
});
