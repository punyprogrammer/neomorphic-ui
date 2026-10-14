import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

function Labelled(props: React.ComponentProps<typeof Checkbox>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control
    <label>
      <Checkbox {...props} />
      Remember me
    </label>
  );
}

describe("Checkbox", () => {
  it("renders an unchecked checkbox named by its label", () => {
    render(<Labelled />);
    const box = screen.getByRole("checkbox", { name: "Remember me" });
    expect(box).toHaveAttribute("aria-checked", "false");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Labelled defaultChecked size="lg" />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("data-slot", "checkbox");
    expect(box).toHaveAttribute("data-size", "lg");
    expect(box).toHaveAttribute("data-checked");
  });

  it("toggles when its label is clicked", () => {
    render(<Labelled />);
    fireEvent.click(screen.getByText("Remember me"));
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("reports changes when controlled", () => {
    const onCheckedChange = vi.fn();
    render(<Labelled checked={false} onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("is a well when empty and raised when checked, setting both shadow slots", () => {
    render(<Labelled />);
    expect(screen.getByRole("checkbox")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat",
      "data-checked:inset-shadow-neu-flat",
      "data-checked:shadow-neu-sm"
    );
  });

  it("switches the check for a dash by the indicator's indeterminate state", () => {
    render(<Labelled indeterminate />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-checked", "mixed");
    expect(
      box.querySelector('[data-slot="checkbox-indicator"]')
    ).toHaveAttribute("data-indeterminate");
    expect(box.querySelector(".lucide-check")).toHaveClass(
      "in-data-indeterminate:hidden"
    );
    expect(box.querySelector(".lucide-minus")).toHaveClass(
      "hidden",
      "in-data-indeterminate:block"
    );
  });

  it("renders no mark when unchecked", () => {
    render(<Labelled />);
    expect(screen.getByRole("checkbox").querySelector("svg")).toBeNull();
  });

  it("submits through a hidden native input", () => {
    render(
      <form>
        <Checkbox aria-label="Terms" defaultChecked name="terms" value="yes" />
      </form>
    );
    const input = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"][name="terms"]'
    );
    expect(input).not.toBeNull();
    expect(input?.checked).toBe(true);
  });

  it("does not toggle when disabled", () => {
    render(<Labelled disabled />);
    const box = screen.getByRole("checkbox");
    fireEvent.click(box);
    expect(box).toHaveAttribute("aria-checked", "false");
    expect(box).toHaveAttribute("aria-disabled", "true");
  });

  it("lets className override variant classes", () => {
    render(<Labelled className="size-8" />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveClass("size-8");
    expect(box).not.toHaveClass("size-6");
  });
});
