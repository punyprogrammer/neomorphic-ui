import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Toaster, toast } from "./toast";

afterEach(() => {
  act(() => toast.dismiss());
});

describe("Toast", () => {
  it("shows a bare message as the description", async () => {
    render(<Toaster />);
    act(() => {
      toast("Trip saved");
    });
    const message = await screen.findByText("Trip saved");
    expect(message).toHaveAttribute("data-slot", "toast-description");
    expect(message.closest('[data-slot="toast"]')).toHaveClass("shadow-neu-lg");
  });

  it("colours the icon by type", async () => {
    render(<Toaster />);
    act(() => {
      toast.success({ title: "Booked", description: "See you in Porto." });
    });
    const title = await screen.findByText("Booked");
    const root = title.closest('[data-slot="toast"]') as HTMLElement;
    expect(root).toHaveAttribute("data-type", "success");
    expect(root.className).toContain("[--toast-accent:color-mix");
    expect(root.querySelector('[data-slot="toast-icon"]')).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("runs an action", async () => {
    const onUndo = vi.fn();
    render(<Toaster />);
    act(() => {
      toast("Seat released", { action: { label: "Undo", onClick: onUndo } });
    });
    fireEvent.click(await screen.findByRole("button", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledOnce();
  });

  it("closes from its close button", async () => {
    render(<Toaster />);
    act(() => {
      toast("Copied");
    });
    const root = (await screen.findByText("Copied")).closest(
      '[data-slot="toast"]'
    ) as HTMLElement;
    // Base UI hides the button from assistive tech; Escape closes instead.
    fireEvent.click(
      root.querySelector('[data-slot="toast-close"]') as HTMLElement
    );
    await waitFor(() =>
      expect(screen.queryByText("Copied")).not.toBeInTheDocument()
    );
  });

  it("hides the close button on toasts that can't be dismissed", async () => {
    render(<Toaster />);
    act(() => {
      toast.loading("Saving", { dismissible: false });
    });
    await screen.findByText("Saving");
    expect(
      screen.queryByRole("button", { name: "Close", hidden: true })
    ).not.toBeInTheDocument();
  });
});
