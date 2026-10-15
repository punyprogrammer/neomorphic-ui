import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";

function App() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New trip</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Map</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("is a raised menubar of triggers", () => {
    render(<App />);
    const bar = screen.getByRole("menubar");
    expect(bar).toHaveClass("shadow-neu");
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("opens a menu with menubar slots and presses its trigger in", async () => {
    render(<App />);
    const file = screen.getByRole("menuitem", { name: "File" });
    fireEvent.click(file);
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveAttribute("data-slot", "menubar-content");
    expect(screen.getByRole("menuitem", { name: "New trip" })).toHaveAttribute(
      "data-slot",
      "menubar-item"
    );
    expect(file).toHaveAttribute("data-popup-open");
    expect(file.className).toContain("data-popup-open:inset-shadow-neu-sm");
  });
});
