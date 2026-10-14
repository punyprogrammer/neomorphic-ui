import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

const separator = () =>
  document.querySelector('[data-slot="separator"]') as HTMLElement;

describe("Separator", () => {
  it("is decorative by default", () => {
    render(<Separator />);
    expect(separator()).toHaveAttribute("role", "none");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("is announced when not decorative, with its orientation", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
  });

  it("is a groove: a dark line with a highlight beside it", () => {
    render(<Separator />);
    expect(separator()).toHaveClass(
      "h-px",
      "bg-neu-dark",
      "shadow-[0_1px_0_var(--neu-light)]"
    );
  });

  it("turns the groove for vertical", () => {
    render(<Separator orientation="vertical" />);
    expect(separator()).toHaveClass(
      "w-px",
      "shadow-[1px_0_0_var(--neu-light)]"
    );
    expect(separator()).toHaveAttribute("data-orientation", "vertical");
  });

  it("dashes both lines when perforated", () => {
    render(<Separator variant="perforated" />);
    expect(separator()).toHaveAttribute("data-variant", "perforated");
    expect(separator()).toHaveClass("h-0.5", "bg-[length:8px_1px]");
    expect(separator()).not.toHaveClass("bg-neu-dark");
  });

  it("lets className override variant classes", () => {
    render(<Separator className="w-1/2" />);
    expect(separator()).toHaveClass("w-1/2");
    expect(separator()).not.toHaveClass("w-full");
  });
});
