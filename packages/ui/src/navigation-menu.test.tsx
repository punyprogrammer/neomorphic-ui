import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

function Site() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/lisbon">Lisbon</NavigationMenuLink>
            <NavigationMenuLink href="/porto">Porto</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active
            className={navigationMenuTriggerStyle()}
            href="/deals"
          >
            Deals
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  it("is a navigation landmark with a list of items", () => {
    render(<Site />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "data-slot",
      "navigation-menu"
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("marks the current page link", () => {
    render(<Site />);
    expect(screen.getByRole("link", { name: "Deals" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("opens a panel of links from its trigger", async () => {
    render(<Site />);
    const trigger = screen.getByRole("button", { name: "Destinations" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(await screen.findByRole("link", { name: "Lisbon" })).toHaveAttribute(
      "href",
      "/lisbon"
    );
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
