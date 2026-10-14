import { fireEvent, render, screen } from "@testing-library/react";
import { Heart } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("renders an unpressed button", () => {
    render(
      <Toggle aria-label="Like">
        <Heart />
      </Toggle>
    );
    const toggle = screen.getByRole("button", { name: "Like" });
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Toggle aria-label="Like" defaultPressed size="lg" />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("data-slot", "toggle");
    expect(toggle).toHaveAttribute("data-size", "lg");
    expect(toggle).toHaveAttribute("data-shape", "pill");
    expect(toggle).toHaveAttribute("data-pressed");
  });

  it("toggles uncontrolled", () => {
    render(<Toggle aria-label="Like" />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("reports changes when controlled", () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle
        aria-label="Like"
        onPressedChange={onPressedChange}
        pressed={false}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("is raised at rest and pressed in when on, setting both shadow slots", () => {
    render(<Toggle aria-label="Like" />);
    expect(screen.getByRole("button")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "aria-pressed:shadow-neu-flat",
      "aria-pressed:inset-shadow-neu-sm"
    );
  });

  it("colours pressed content from --toggle-on, falling back to primary", () => {
    render(<Toggle aria-label="Like" />);
    expect(screen.getByRole("button")).toHaveClass(
      "aria-pressed:text-[var(--toggle-on,var(--color-primary))]"
    );
  });

  it("fills the icon while pressed only when asked", () => {
    const { rerender } = render(<Toggle aria-label="Like" />);
    expect(screen.getByRole("button")).not.toHaveClass(
      "aria-pressed:[&_svg]:fill-current"
    );
    rerender(<Toggle aria-label="Like" iconFill />);
    expect(screen.getByRole("button")).toHaveClass(
      "aria-pressed:[&_svg]:fill-current"
    );
  });

  it("is a circle by default and a tile when rounded", () => {
    const { rerender } = render(<Toggle aria-label="Like" />);
    expect(screen.getByRole("button")).toHaveClass("rounded-full", "min-w-10");
    rerender(<Toggle aria-label="Like" shape="rounded" />);
    expect(screen.getByRole("button")).toHaveClass("rounded-lg");
  });

  it("does not toggle when disabled", () => {
    render(<Toggle aria-label="Like" disabled />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("lets className override variant classes", () => {
    render(<Toggle aria-label="Like" className="rounded-none" />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveClass("rounded-none");
    expect(toggle).not.toHaveClass("rounded-full");
  });
});
