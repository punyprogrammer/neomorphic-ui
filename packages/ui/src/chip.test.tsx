import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Chip } from "./chip";

const Icon = () => <svg data-testid="icon" />;

describe("Chip", () => {
  it("renders children in a span", () => {
    render(<Chip data-testid="chip">Paid</Chip>);
    const chip = screen.getByTestId("chip");
    expect(chip.tagName).toBe("SPAN");
    expect(chip).toHaveTextContent("Paid");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Chip data-testid="chip">Paid</Chip>);
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveAttribute("data-slot", "chip");
    expect(chip).toHaveAttribute("data-variant", "default");
    expect(chip).toHaveAttribute("data-size", "md");
    expect(chip).not.toHaveAttribute("data-icon-position");
  });

  it("is raised by default, with both shadow slots", () => {
    render(<Chip data-testid="chip">Paid</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass(
      "bg-neu-convex",
      "shadow-neu-sm",
      "inset-shadow-neu-flat"
    );
  });

  it.each([
    ["inset", ["inset-shadow-neu-sm", "shadow-neu-flat", "bg-background"]],
    ["primary", ["bg-primary", "text-primary-foreground"]],
    ["destructive", ["bg-destructive", "text-destructive-foreground"]],
    ["success", ["bg-success", "text-success-foreground"]],
    ["warning", ["bg-warning", "text-warning-foreground"]],
  ] as const)("pairs the %s variant's fill and text", (variant, classes) => {
    render(
      <Chip data-testid="chip" variant={variant}>
        Status
      </Chip>
    );
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass(...classes);
    expect(chip).not.toHaveClass("bg-neu-convex");
  });

  it("puts the icon before the label by default, hidden from assistive tech", () => {
    render(
      <Chip data-testid="chip" icon={<Icon />}>
        Paid
      </Chip>
    );
    const chip = screen.getByTestId("chip");
    const wrapper = screen.getByTestId("icon").parentElement;
    expect(chip.firstChild).toBe(wrapper);
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(wrapper).toHaveAttribute("data-slot", "chip-icon");
    expect(chip).toHaveAttribute("data-icon-position", "start");
  });

  it("puts the icon after the label with iconPosition end", () => {
    render(
      <Chip data-testid="chip" icon={<Icon />} iconPosition="end">
        Due soon
      </Chip>
    );
    const chip = screen.getByTestId("chip");
    expect(chip.lastChild).toBe(screen.getByTestId("icon").parentElement);
    expect(chip).toHaveAttribute("data-icon-position", "end");
  });

  it.each([
    ["sm", "h-6"],
    ["md", "h-7"],
    ["lg", "h-8"],
  ] as const)("sizes %s to %s", (size, height) => {
    render(
      <Chip data-testid="chip" size={size}>
        Paid
      </Chip>
    );
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass(height);
    expect(chip).toHaveAttribute("data-size", size);
  });

  it("lets className override variant classes", () => {
    render(
      <Chip className="shadow-neu" data-testid="chip">
        Paid
      </Chip>
    );
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass("shadow-neu");
    expect(chip).not.toHaveClass("shadow-neu-sm");
  });

  it("renders as another element through the render prop", () => {
    render(
      <ul>
        <Chip data-testid="chip" icon={<Icon />} render={<li />}>
          Paid
        </Chip>
      </ul>
    );
    const chip = screen.getByTestId("chip");
    expect(chip.tagName).toBe("LI");
    expect(chip).toHaveTextContent("Paid");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
