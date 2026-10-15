import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

function Filters() {
  return (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Stops</PopoverTitle>
          <PopoverDescription>Limit the number of changes.</PopoverDescription>
        </PopoverHeader>
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("opens a raised, titled dialog from its trigger", async () => {
    render(<Filters />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    const popup = await screen.findByRole("dialog", { name: "Stops" });
    expect(popup).toHaveAttribute("data-slot", "popover-content");
    expect(popup).toHaveClass("shadow-neu-lg", "inset-shadow-neu-flat");
    expect(popup).toHaveAccessibleDescription("Limit the number of changes.");
  });

  it("closes from a close button", async () => {
    render(<Filters />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    fireEvent.click(await screen.findByRole("button", { name: "Done" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(screen.getByRole("button", { name: "Filters" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("sits above the page on the popover layer", async () => {
    render(<Filters />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const popup = await screen.findByRole("dialog");
    expect(popup.parentElement).toHaveClass("z-[var(--z-popover)]");
  });
});
