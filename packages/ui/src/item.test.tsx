import { render, screen } from "@testing-library/react";
import { CreditCard } from "lucide-react";
import { describe, expect, it } from "vitest";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./item";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;

describe("Item", () => {
  it("is a flat row by default, both shadow slots set", () => {
    render(<Item>Row</Item>);
    expect(part("item")).toHaveClass(
      "shadow-neu-flat",
      "inset-shadow-neu-flat"
    );
    expect(part("item")).toHaveAttribute("data-variant", "flat");
    expect(part("item")).toHaveAttribute("data-size", "md");
    expect(part("item")).not.toHaveAttribute("role");
  });

  it("can be raised or a well", () => {
    const { rerender } = render(<Item variant="raised" />);
    expect(part("item")).toHaveClass("shadow-neu-sm", "bg-neu-convex");
    rerender(<Item variant="inset" />);
    expect(part("item")).toHaveClass("inset-shadow-neu-sm", "shadow-neu-flat");
  });

  it("composes media, title, description and actions", () => {
    render(
      <Item>
        <ItemMedia variant="icon">
          <CreditCard />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Visa</ItemTitle>
          <ItemDescription>•••• 4821</ItemDescription>
        </ItemContent>
        <ItemActions>
          <button type="button">Edit</button>
        </ItemActions>
      </Item>
    );
    expect(part("item-media")).toHaveClass("shadow-neu-sm", "bg-neu-convex");
    expect(part("item-title")).toHaveTextContent("Visa");
    expect(part("item-description")).toHaveTextContent("•••• 4821");
    expect(part("item-actions")).toContainElement(
      screen.getByRole("button", { name: "Edit" })
    );
  });

  it("makes default items list items inside a group", () => {
    render(
      <ItemGroup aria-label="Cards">
        <Item>Visa</Item>
        <ItemSeparator />
        <Item>Mastercard</Item>
      </ItemGroup>
    );
    const list = screen.getByRole("list", { name: "Cards" });
    expect(list).toBeVisible();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(part("item-separator")).toHaveAttribute("role", "none");
  });

  it("keeps a link's role and presses in while held", () => {
    render(
      <ItemGroup>
        <Item render={<a href="#visa" />} variant="raised">
          Visa
        </Item>
      </ItemGroup>
    );
    const link = screen.getByRole("link", { name: "Visa" });
    expect(link).toHaveClass(
      "[&:is(a,button)]:active:inset-shadow-neu-sm",
      "[&:is(a,button)]:active:shadow-neu-flat",
      "[&:is(a,button)]:hover:shadow-neu"
    );
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("lets className override variant classes", () => {
    render(<Item className="px-6" />);
    expect(part("item")).toHaveClass("px-6");
    expect(part("item")).not.toHaveClass("px-4");
  });
});
