import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

function CancelTrip({
  onDelete,
  closeOnClick,
}: {
  onDelete?: () => void;
  closeOnClick?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Cancel trip</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this trip?</AlertDialogTitle>
          <AlertDialogDescription>
            Your seats will be released.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep</AlertDialogCancel>
          <AlertDialogAction
            closeOnClick={closeOnClick}
            onClick={onDelete}
            variant="destructive"
          >
            Cancel trip
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Cancel trip" }));

describe("AlertDialog", () => {
  it("opens as an alertdialog", async () => {
    render(<CancelTrip />);
    open();
    const dialog = await screen.findByRole("alertdialog", {
      name: "Cancel this trip?",
    });
    expect(dialog).toHaveAccessibleDescription("Your seats will be released.");
    expect(dialog).toHaveAttribute("data-size", "sm");
  });

  it("runs the action and closes", async () => {
    const onDelete = vi.fn();
    render(<CancelTrip onDelete={onDelete} />);
    open();
    await screen.findByRole("alertdialog");
    const action = screen
      .getAllByRole("button", { name: "Cancel trip" })
      .at(-1);
    expect(action).toHaveAttribute("data-variant", "destructive");
    fireEvent.click(action as HTMLElement);
    expect(onDelete).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  });

  it("stays open for an async action when asked", async () => {
    render(<CancelTrip closeOnClick={false} />);
    open();
    await screen.findByRole("alertdialog");
    fireEvent.click(
      screen
        .getAllByRole("button", { name: "Cancel trip" })
        .at(-1) as HTMLElement
    );
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("cancels from the cancel button", async () => {
    render(<CancelTrip />);
    open();
    await screen.findByRole("alertdialog");
    fireEvent.click(screen.getByRole("button", { name: "Keep" }));
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  });
});
