import { render, screen } from "@testing-library/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";
import { ButtonGroup, ButtonGroupText } from "./button-group";

function Stepper() {
  return (
    <ButtonGroup aria-label="Pages" data-testid="group">
      <Button aria-label="Previous" disabled icon={<ChevronLeft />} />
      <ButtonGroupText>1 / 5</ButtonGroupText>
      <Button aria-label="Next" icon={<ChevronRight />} />
    </ButtonGroup>
  );
}

describe("ButtonGroup", () => {
  it("renders a labelled group of buttons", () => {
    render(<Stepper />);
    const group = screen.getByRole("group", { name: "Pages" });
    expect(group.tagName).toBe("DIV");
    expect(
      screen.getAllByRole("button").map((b) => b.getAttribute("aria-label"))
    ).toEqual(["Previous", "Next"]);
    expect(group).toHaveTextContent("1 / 5");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Stepper />);
    const group = screen.getByTestId("group");
    expect(group).toHaveAttribute("data-slot", "button-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveAttribute("data-shape", "rounded");
    expect(screen.getByText("1 / 5")).toHaveAttribute(
      "data-slot",
      "button-group-text"
    );
  });

  it("is one raised slab with both shadow slots", () => {
    render(<Stepper />);
    expect(screen.getByTestId("group")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "bg-neu-convex",
      "rounded-lg"
    );
  });

  it("flattens resting buttons without overriding their pressed state", () => {
    render(<Stepper />);
    const className = screen.getByTestId("group").className;
    expect(className).toContain(":not(:active):not([aria-pressed=true])]");
    expect(className).not.toContain("[&>[data-slot=button]]:shadow");
  });

  it("leaves the buttons' own behaviour intact", () => {
    render(<Stepper />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("stacks vertically", () => {
    render(<ButtonGroup data-testid="group" orientation="vertical" />);
    const group = screen.getByTestId("group");
    expect(group).toHaveClass("flex-col");
    expect(group).toHaveAttribute("data-orientation", "vertical");
  });

  it("supports a pill slab", () => {
    render(<ButtonGroup data-testid="group" shape="pill" />);
    const group = screen.getByTestId("group");
    expect(group).toHaveClass("rounded-full");
    expect(group).not.toHaveClass("rounded-lg");
  });

  it("lets className override variant classes", () => {
    render(<ButtonGroup className="shadow-neu-lg" data-testid="group" />);
    const group = screen.getByTestId("group");
    expect(group).toHaveClass("shadow-neu-lg");
    expect(group).not.toHaveClass("shadow-neu");
  });

  it("renders as another element through the render prop", () => {
    render(<ButtonGroup data-testid="group" render={<nav />} />);
    expect(screen.getByTestId("group").tagName).toBe("NAV");
  });
});

describe("ButtonGroupText", () => {
  it("renders a non-interactive span", () => {
    render(<ButtonGroupText>Page 2</ButtonGroupText>);
    const text = screen.getByText("Page 2");
    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveClass("relative", "tabular-nums");
  });
});
