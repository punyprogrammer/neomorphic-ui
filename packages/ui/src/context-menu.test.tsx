import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";

describe("ContextMenu", () => {
  it("opens on right-click with context-menu slots", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Ticket</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy reference</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const trigger = screen.getByText("Ticket");
    expect(trigger).toHaveAttribute("data-slot", "context-menu-trigger");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.contextMenu(trigger, { clientX: 40, clientY: 40 });
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveAttribute("data-slot", "context-menu-content");
    expect(
      screen.getByRole("menuitem", { name: "Copy reference" })
    ).toHaveAttribute("data-slot", "context-menu-item");
    expect(screen.getByRole("separator")).toHaveAttribute(
      "data-slot",
      "context-menu-separator"
    );
  });
});
