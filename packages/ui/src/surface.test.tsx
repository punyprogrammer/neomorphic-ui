import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Surface } from "./surface";

const ANY_NEU_SHADOW = /(^|\s)(inset-)?shadow-neu(-sm|-lg)?(\s|$)/;

describe("Surface", () => {
  it("renders children in a div by default", () => {
    render(<Surface data-testid="surface">Content</Surface>);
    const el = screen.getByTestId("surface");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("Content");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Surface data-testid="surface" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveAttribute("data-slot", "surface");
    expect(el).toHaveAttribute("data-elevation", "raised");
    expect(el).toHaveAttribute("data-depth", "md");
    expect(el).toHaveAttribute("data-shape", "rounded");
  });

  it("defaults to a raised, medium-depth shadow", () => {
    render(<Surface data-testid="surface" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("shadow-neu", "inset-shadow-neu-flat");
  });

  it("gives raised surfaces the convex fill and keeps the others flat", () => {
    render(
      <>
        <Surface data-testid="raised" />
        <Surface data-testid="inset" elevation="inset" />
        <Surface data-testid="flat" elevation="flat" />
      </>
    );
    expect(screen.getByTestId("raised")).toHaveClass("bg-neu-convex");
    expect(screen.getByTestId("inset")).toHaveClass("bg-background");
    expect(screen.getByTestId("inset")).not.toHaveClass("bg-neu-convex");
    expect(screen.getByTestId("flat")).not.toHaveClass("bg-neu-convex");
  });

  it("lets a consumer background replace the convex fill", () => {
    render(<Surface className="bg-primary" data-testid="surface" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("bg-primary");
    expect(el).not.toHaveClass("bg-neu-convex");
  });

  it.each([
    ["sm", "shadow-neu-sm"],
    ["md", "shadow-neu"],
    ["lg", "shadow-neu-lg"],
  ] as const)("raised depth %s uses %s", (depth, expected) => {
    render(<Surface data-testid="surface" depth={depth} />);
    expect(screen.getByTestId("surface")).toHaveClass(expected);
  });

  it.each([
    ["sm", "inset-shadow-neu-sm"],
    ["md", "inset-shadow-neu"],
    ["lg", "inset-shadow-neu-lg"],
  ] as const)("inset depth %s uses %s", (depth, expected) => {
    render(<Surface data-testid="surface" depth={depth} elevation="inset" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveClass(expected, "shadow-neu-flat");
    expect(el).not.toHaveClass("shadow-neu");
  });

  it("keeps both shadow slots flat when elevation is flat", () => {
    render(<Surface data-testid="surface" elevation="flat" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("shadow-neu-flat", "inset-shadow-neu-flat");
    expect(el.className).not.toMatch(ANY_NEU_SHADOW);
  });

  it.each([
    ["square", "rounded-sm"],
    ["rounded", "rounded-lg"],
    ["pill", "rounded-full"],
  ] as const)("shape %s uses %s", (shape, expected) => {
    render(<Surface data-testid="surface" shape={shape} />);
    expect(screen.getByTestId("surface")).toHaveClass(expected);
  });

  it("makes circles square-aspect", () => {
    render(<Surface data-testid="surface" shape="circle" />);
    expect(screen.getByTestId("surface")).toHaveClass(
      "rounded-full",
      "aspect-square"
    );
  });

  it("lets a consumer className override the shape", () => {
    render(<Surface className="rounded-none" data-testid="surface" />);
    const el = screen.getByTestId("surface");
    expect(el).toHaveClass("rounded-none");
    expect(el).not.toHaveClass("rounded-lg");
  });

  it("renders as another element through the render prop", () => {
    render(
      <Surface render={<section aria-label="Panel" />}>Section body</Surface>
    );
    const el = screen.getByRole("region", { name: "Panel" });
    expect(el.tagName).toBe("SECTION");
    expect(el).toHaveAttribute("data-slot", "surface");
  });
});
