import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function Filters(props: React.ComponentProps<typeof SheetContent>) {
  return (
    <Sheet>
      <SheetTrigger>Filters</SheetTrigger>
      <SheetContent {...props}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow the results.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <button type="button">Apply</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("slides in from the end edge by default", async () => {
    render(<Filters />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const sheet = await screen.findByRole("dialog", { name: "Filters" });
    expect(sheet).toHaveAttribute("data-side", "end");
    expect(sheet).toHaveClass("end-0", "rounded-s-2xl", "max-w-sm");
    expect(sheet).toHaveAccessibleDescription("Narrow the results.");
  });

  it("takes a side and size", async () => {
    render(<Filters side="bottom" size="xl" />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveAttribute("data-side", "bottom");
    expect(sheet).toHaveClass("bottom-0", "rounded-t-2xl");
    expect(sheet).not.toHaveClass("max-w-2xl");
  });

  it("has a close button", async () => {
    render(<Filters />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "sheet-close"
    );
  });
});
