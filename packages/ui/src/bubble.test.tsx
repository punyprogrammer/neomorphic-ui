import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble";

describe("Bubble", () => {
  it("is a primary bubble hanging from the start by default", () => {
    render(
      <Bubble data-testid="bubble">
        <BubbleContent data-testid="content">Hello</BubbleContent>
      </Bubble>
    );
    const bubble = screen.getByTestId("bubble");
    expect(bubble).toHaveAttribute("data-slot", "bubble");
    expect(bubble).toHaveAttribute("data-align", "start");
    expect(bubble).toHaveAttribute("data-variant", "default");
    expect(bubble).toHaveClass("max-w-[80%]");
    expect(screen.getByTestId("content")).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "shadow-neu-sm",
      "inset-shadow-neu-flat"
    );
  });

  it.each([
    ["secondary", ["bg-neu-convex", "shadow-neu-sm", "inset-shadow-neu-flat"]],
    ["muted", ["inset-shadow-neu-sm", "shadow-neu-flat", "bg-background"]],
    ["destructive", ["text-destructive", "inset-shadow-neu-sm"]],
    ["outline", ["border", "border-neu-dark"]],
  ] as const)("styles the %s variant's surface", (variant, classes) => {
    render(
      <Bubble variant={variant}>
        <BubbleContent data-testid="content">Hi</BubbleContent>
      </Bubble>
    );
    expect(screen.getByTestId("content")).toHaveClass(...classes);
  });

  it("renders the content as another element", () => {
    render(
      <Bubble align="end" variant="tinted">
        <BubbleContent render={<button type="button" />}>
          Sounds good
        </BubbleContent>
      </Bubble>
    );
    const button = screen.getByRole("button", { name: "Sounds good" });
    expect(button).toHaveAttribute("data-slot", "bubble-content");
  });

  it("pins labelled reactions to an edge", () => {
    render(
      <BubbleGroup data-testid="group">
        <Bubble>
          <BubbleContent>Done!</BubbleContent>
          <BubbleReactions aria-label="Liked by Maya" role="img" side="top">
            👍
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
    );
    const reactions = screen.getByRole("img", { name: "Liked by Maya" });
    expect(reactions).toHaveAttribute("data-side", "top");
    expect(reactions).toHaveClass("absolute", "bg-neu-convex", "end-3");
    expect(screen.getByTestId("group")).toHaveAttribute(
      "data-slot",
      "bubble-group"
    );
  });
});
