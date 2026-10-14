import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

function Example({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <TooltipProvider delay={0}>
      <Tooltip defaultOpen={defaultOpen}>
        <TooltipTrigger aria-label="Share">S</TooltipTrigger>
        <TooltipContent>Share this trip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("is closed until the trigger is hovered or focused", () => {
    render(<Example />);
    expect(screen.queryByText("Share this trip")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    );
  });

  it("opens on focus", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Share" });
    await act(async () => {
      trigger.focus();
      fireEvent.focus(trigger);
    });
    expect(await screen.findByText("Share this trip")).toBeInTheDocument();
  });

  it("is a raised card on the surface colour, no dark fill", () => {
    render(<Example defaultOpen />);
    const popup = screen.getByText("Share this trip");
    expect(popup).toHaveAttribute("data-slot", "tooltip-content");
    expect(popup).toHaveClass(
      "bg-neu-convex",
      "shadow-neu",
      "inset-shadow-neu-flat",
      "text-foreground"
    );
  });

  it("sits above other layers on the tooltip z-index", () => {
    render(<Example defaultOpen />);
    expect(screen.getByText("Share this trip").parentElement).toHaveClass(
      "z-[var(--z-tooltip)]"
    );
  });

  it("lets className override popup classes", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>T</TooltipTrigger>
        <TooltipContent className="max-w-sm">Tip</TooltipContent>
      </Tooltip>
    );
    expect(screen.getByText("Tip")).toHaveClass("max-w-sm");
    expect(screen.getByText("Tip")).not.toHaveClass("max-w-xs");
  });
});
