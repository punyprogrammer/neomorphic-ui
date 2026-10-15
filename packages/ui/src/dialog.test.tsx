import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function EditTrip(props: React.ComponentProps<typeof DialogContent>) {
  return (
    <Dialog>
      <DialogTrigger>Edit trip</DialogTrigger>
      <DialogContent {...props}>
        <DialogHeader>
          <DialogTitle>Edit trip</DialogTitle>
          <DialogDescription>Change the name and dates.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <input aria-label="Name" />
        </DialogBody>
        <DialogFooter showCloseButton>
          <button type="button">Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Edit trip" }));

describe("Dialog", () => {
  it("opens a titled, described modal panel", async () => {
    render(<EditTrip />);
    open();
    const dialog = await screen.findByRole("dialog", { name: "Edit trip" });
    expect(dialog).toHaveAccessibleDescription("Change the name and dates.");
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(dialog).toHaveClass("shadow-neu-lg", "max-w-lg");
  });

  it("dims the page behind it", async () => {
    render(<EditTrip />);
    open();
    await screen.findByRole("dialog");
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).toHaveClass("bg-[var(--neu-backdrop)]");
  });

  it("closes from the corner button and the footer button", async () => {
    render(<EditTrip />);
    open();
    await screen.findByRole("dialog");
    const closers = screen.getAllByRole("button", { name: "Close" });
    expect(closers).toHaveLength(2);
    fireEvent.click(closers[0] as HTMLElement);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("can drop the corner button and change size", async () => {
    render(<EditTrip showCloseButton={false} size="sm" />);
    open();
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass("max-w-sm");
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(1);
  });
});
