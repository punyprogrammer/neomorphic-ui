import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Kbd, KbdGroup } from "./kbd";

describe("Kbd", () => {
  it("renders a raised kbd key cap", () => {
    render(<Kbd>K</Kbd>);
    const key = screen.getByText("K");
    expect(key.tagName).toBe("KBD");
    expect(key).toHaveClass(
      "bg-neu-convex",
      "shadow-neu-sm",
      "inset-shadow-neu-flat"
    );
    expect(key).toHaveAttribute("data-size", "md");
  });

  it("groups keys into a chord", () => {
    render(
      <KbdGroup data-testid="group">
        <Kbd aria-label="Command">⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );
    const group = screen.getByTestId("group");
    expect(group.tagName).toBe("KBD");
    expect(group.querySelectorAll('[data-slot="kbd"]')).toHaveLength(2);
    expect(screen.getByLabelText("Command")).toHaveTextContent("⌘");
  });

  it("has a small size", () => {
    render(<Kbd size="sm">Esc</Kbd>);
    expect(screen.getByText("Esc")).toHaveClass("h-5");
  });
});
