import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";

function Plans(props: Partial<React.ComponentProps<typeof RadioGroup>>) {
  return (
    <RadioGroup aria-label="Plan" defaultValue="free" {...props}>
      {["free", "pro", "team"].map((plan) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: RadioGroupItem renders the control
        <label key={plan}>
          <RadioGroupItem value={plan} />
          {plan}
        </label>
      ))}
    </RadioGroup>
  );
}

const checked = () =>
  screen
    .getAllByRole("radio")
    .map((r) => r.getAttribute("aria-checked") === "true");

describe("RadioGroup", () => {
  it("renders a labelled radiogroup with one choice", () => {
    render(<Plans />);
    expect(
      screen.getByRole("radiogroup", { name: "Plan" })
    ).toBeInTheDocument();
    expect(checked()).toEqual([true, false, false]);
  });

  it("exposes its parts API through data attributes", () => {
    render(<Plans size="sm" />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("data-slot", "radio-group");
    expect(group).toHaveAttribute("data-size", "sm");
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveAttribute("data-slot", "radio-group-item");
      expect(radio).toHaveAttribute("data-size", "sm");
    }
  });

  it("moves the choice when an item's label is clicked", () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);
    fireEvent.click(screen.getByText("pro"));
    expect(checked()).toEqual([false, true, false]);
    expect(onValueChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("is a round well when empty and raised when chosen", () => {
    render(<Plans />);
    const [chosen] = screen.getAllByRole("radio");
    expect(chosen).toHaveClass(
      "rounded-full",
      "inset-shadow-neu-sm",
      "data-checked:shadow-neu-sm"
    );
    expect(chosen).not.toHaveClass("rounded-sm");
    expect(
      chosen.querySelector('[data-slot="radio-group-indicator"]')
    ).not.toBeNull();
  });

  it("lets an item override the group size", () => {
    render(
      <RadioGroup aria-label="Sizes" size="sm">
        <RadioGroupItem aria-label="A" value="a" />
        <RadioGroupItem aria-label="B" size="lg" value="b" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "A" })).toHaveClass("size-5");
    expect(screen.getByRole("radio", { name: "B" })).toHaveClass("size-7");
  });

  it("disables every item", () => {
    render(<Plans disabled />);
    fireEvent.click(screen.getByText("team"));
    expect(checked()).toEqual([true, false, false]);
  });

  it("lays out in a row through className", () => {
    render(<Plans className="flex gap-6" />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveClass("flex", "gap-6");
    expect(group).not.toHaveClass("grid");
  });
});
