import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

function Seats(props: Partial<React.ComponentProps<typeof Drawer>>) {
  return (
    <Drawer {...props}>
      <DrawerTrigger>Pick a seat</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Seats</DrawerTitle>
          <DrawerDescription>Coach 4</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("opens from the bottom with a grip", async () => {
    render(<Seats />);
    fireEvent.click(screen.getByRole("button", { name: "Pick a seat" }));
    const drawer = await screen.findByRole("dialog", { name: "Seats" });
    expect(drawer).toHaveAttribute("data-swipe-direction", "down");
    expect(drawer).toHaveAccessibleDescription("Coach 4");
    expect(drawer.querySelector('[data-slot="drawer-handle"]')).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("maps direction onto the swipe direction", async () => {
    render(<Seats direction="right" />);
    fireEvent.click(screen.getByRole("button", { name: "Pick a seat" }));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-swipe-direction",
      "right"
    );
  });

  it("closes from a close button", async () => {
    render(<Seats />);
    fireEvent.click(screen.getByRole("button", { name: "Pick a seat" }));
    fireEvent.click(await screen.findByRole("button", { name: "Done" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });
});
