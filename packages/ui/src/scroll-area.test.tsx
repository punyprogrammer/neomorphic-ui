import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("wraps content in a viewport", () => {
    const { container } = render(
      <ScrollArea className="h-40">
        <p>Long content</p>
      </ScrollArea>
    );
    const root = container.querySelector('[data-slot="scroll-area"]');
    expect(root).toHaveClass("h-40");
    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]'
    );
    expect(viewport).toHaveTextContent("Long content");
  });

  it("only fades when asked", () => {
    const { container, rerender } = render(<ScrollArea>Text</ScrollArea>);
    const viewport = () =>
      container.querySelector('[data-slot="scroll-area-viewport"]');
    expect(viewport()?.className).not.toContain("mask-linear");
    rerender(<ScrollArea fade>Text</ScrollArea>);
    expect(viewport()?.className).toContain("mask-linear-[to_bottom");
    rerender(
      <ScrollArea fade orientation="horizontal">
        Text
      </ScrollArea>
    );
    expect(viewport()?.className).toContain("mask-linear-[to_right");
  });
});
