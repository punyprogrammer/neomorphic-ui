import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

describe("HoverCard", () => {
  it("renders its trigger as a link", () => {
    render(
      <HoverCard>
        <HoverCardTrigger href="/porto">Porto</HoverCardTrigger>
        <HoverCardContent>Second city of Portugal.</HoverCardContent>
      </HoverCard>
    );
    const link = screen.getByRole("link", { name: "Porto" });
    expect(link).toHaveAttribute("href", "/porto");
    expect(link).toHaveAttribute("data-slot", "hover-card-trigger");
    expect(
      screen.queryByText("Second city of Portugal.")
    ).not.toBeInTheDocument();
  });

  it("shows a raised card on keyboard focus", async () => {
    render(
      <HoverCard>
        <HoverCardTrigger delay={0} href="/porto">
          Porto
        </HoverCardTrigger>
        <HoverCardContent>Second city of Portugal.</HoverCardContent>
      </HoverCard>
    );
    fireEvent.focus(screen.getByRole("link", { name: "Porto" }));
    const card = await screen.findByText("Second city of Portugal.");
    expect(card).toHaveAttribute("data-slot", "hover-card-content");
    expect(card).toHaveClass("shadow-neu-lg");
  });
});
