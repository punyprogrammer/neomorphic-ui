import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "./collapsible";

function Details(props: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>
        Fare rules
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>Refundable until 24 hours out.</CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("starts closed with the trigger collapsed", () => {
    render(<Details />);
    const trigger = screen.getByRole("button", { name: "Fare rules" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-slot", "collapsible-trigger");
    expect(
      screen.queryByText("Refundable until 24 hours out.")
    ).not.toBeInTheDocument();
  });

  it("opens and closes on click", () => {
    const onOpenChange = vi.fn();
    render(<Details onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Fare rules" });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());
    const panel = screen.getByText("Refundable until 24 hours out.");
    expect(panel).toHaveAttribute("data-slot", "collapsible-content");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
  });

  it("renders open by default with a decorative chevron", () => {
    const { container } = render(<Details defaultOpen />);
    expect(
      screen.getByText("Refundable until 24 hours out.")
    ).toBeInTheDocument();
    const chevron = container.querySelector(
      '[data-slot="collapsible-indicator"]'
    );
    expect(chevron).toHaveAttribute("aria-hidden", "true");
  });
});
