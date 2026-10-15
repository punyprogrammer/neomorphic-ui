import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const SHARE_RE = /Share/;

function Options({
  onShare,
  onCurrency,
}: {
  onShare?: () => void;
  onCurrency?: (value: unknown) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Trip</DropdownMenuLabel>
          <DropdownMenuItem onClick={onShare}>
            Share
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem defaultChecked>
          Show prices
        </DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup defaultValue="eur" onValueChange={onCurrency}>
          <DropdownMenuRadioItem value="eur">Euro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="gbp">Pound</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const open = async () => {
  fireEvent.click(screen.getByRole("button", { name: "Options" }));
  return await screen.findByRole("menu");
};

describe("DropdownMenu", () => {
  it("opens a raised menu of items", async () => {
    render(<Options />);
    const menu = await open();
    expect(menu).toHaveAttribute("data-slot", "dropdown-menu-content");
    expect(menu).toHaveClass("shadow-neu-lg");
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(screen.getByRole("group", { name: "Trip" })).toBeInTheDocument();
  });

  it("prefixes every part's slot with the menu's name", async () => {
    render(<Options />);
    await open();
    expect(screen.getByRole("menuitem", { name: SHARE_RE })).toHaveAttribute(
      "data-slot",
      "dropdown-menu-item"
    );
    expect(screen.getByText("⌘S")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-shortcut"
    );
  });

  it("runs an item and closes", async () => {
    const onShare = vi.fn();
    render(<Options onShare={onShare} />);
    await open();
    fireEvent.click(screen.getByRole("menuitem", { name: SHARE_RE }));
    expect(onShare).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
  });

  it("colours destructive items", async () => {
    render(<Options />);
    await open();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveClass(
      "text-destructive"
    );
  });

  it("toggles a checkbox item and stays open", async () => {
    render(<Options />);
    await open();
    const prices = screen.getByRole("menuitemcheckbox", {
      name: "Show prices",
    });
    expect(prices).toHaveAttribute("aria-checked", "true");
    fireEvent.click(prices);
    expect(prices).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("picks a radio item and closes", async () => {
    const onCurrency = vi.fn();
    render(<Options onCurrency={onCurrency} />);
    await open();
    expect(screen.getByRole("menuitemradio", { name: "Euro" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Pound" }));
    expect(onCurrency).toHaveBeenCalledWith("gbp", expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
  });
});
