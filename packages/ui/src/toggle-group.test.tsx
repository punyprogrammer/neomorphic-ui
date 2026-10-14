import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

function Power(props: Partial<React.ComponentProps<typeof ToggleGroup>>) {
  return (
    <ToggleGroup aria-label="Power" defaultValue={["off"]} {...props}>
      <ToggleGroupItem value="off">Off</ToggleGroupItem>
      <ToggleGroupItem value="on">On</ToggleGroupItem>
    </ToggleGroup>
  );
}

const pressed = () =>
  screen
    .getAllByRole("button")
    .map((b) => b.getAttribute("aria-pressed") === "true");

describe("ToggleGroup", () => {
  it("renders a labelled group of toggles", () => {
    render(<Power />);
    expect(screen.getByRole("group", { name: "Power" })).toBeInTheDocument();
    expect(pressed()).toEqual([true, false]);
  });

  it("exposes its parts API through data attributes", () => {
    render(<Power size="sm" />);
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-slot", "toggle-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveAttribute("data-size", "sm");
    for (const item of screen.getAllByRole("button")) {
      expect(item).toHaveAttribute("data-slot", "toggle");
      expect(item).toHaveAttribute("data-size", "sm");
    }
  });

  it("selects one item at a time", () => {
    const onValueChange = vi.fn();
    render(<Power onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "On" }));
    expect(pressed()).toEqual([false, true]);
    expect(onValueChange).toHaveBeenLastCalledWith(["on"], expect.anything());
  });

  it("allows several with multiple", () => {
    render(<Power multiple />);
    fireEvent.click(screen.getByRole("button", { name: "On" }));
    expect(pressed()).toEqual([true, true]);
  });

  it("is a ButtonGroup slab", () => {
    render(<Power />);
    expect(screen.getByRole("group")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "bg-neu-convex",
      "rounded-lg"
    );
  });

  it("lets an item override the group size", () => {
    render(
      <ToggleGroup aria-label="Sizes" size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem size="lg" value="b">
          B
        </ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute(
      "data-size",
      "sm"
    );
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
      "data-size",
      "lg"
    );
  });

  it("stacks vertically", () => {
    render(<Power orientation="vertical" />);
    const group = screen.getByRole("group");
    expect(group).toHaveClass("flex-col");
    expect(group).toHaveAttribute("data-orientation", "vertical");
  });

  it("disables every item", () => {
    render(<Power disabled />);
    for (const item of screen.getAllByRole("button")) {
      expect(item).toBeDisabled();
    }
  });
});
