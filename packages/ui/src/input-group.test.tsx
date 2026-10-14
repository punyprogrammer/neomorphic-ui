import { fireEvent, render, screen } from "@testing-library/react";
import { Search, X } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;

describe("InputGroup", () => {
  it("draws one well around a bare control", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    );
    expect(screen.getByRole("group")).toHaveClass(
      "inset-shadow-neu",
      "shadow-neu-flat"
    );
    const input = screen.getByRole("textbox", { name: "Search" });
    expect(input).toHaveAttribute("data-slot", "input-group-control");
    expect(input).not.toHaveClass("inset-shadow-neu");
  });

  it("lights the whole well for focus, invalid and disabled controls", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Email" />
      </InputGroup>
    );
    expect(part("input-group")).toHaveClass(
      "has-[[data-slot=input-group-control]:focus-visible]:inset-shadow-neu-lg",
      "has-[[data-slot=input-group-control]:focus-visible]:outline-2",
      "has-[[data-slot=input-group-control]:is([aria-invalid=true],[data-invalid])]:ring-1",
      "has-[[data-slot=input-group-control]:disabled]:opacity-50"
    );
  });

  it("places addons by align", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Amount" />
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
    const [start, end] = document.querySelectorAll(
      '[data-slot="input-group-addon"]'
    );
    expect(start).toHaveAttribute("data-align", "inline-start");
    expect(start).toHaveClass("order-first");
    expect(end).toHaveAttribute("data-align", "inline-end");
    expect(end).toHaveClass("order-last");
    expect(screen.getByText("USD")).toHaveAttribute(
      "data-slot",
      "input-group-text"
    );
  });

  it("focuses the control when the well or an addon is pressed", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon>
          <InputGroupText>Find</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
    fireEvent.mouseDown(screen.getByText("Find"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("leaves focus alone when a button in the group is pressed", () => {
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Clear" icon={<X />} onClick={onClick} />
        </InputGroupAddon>
      </InputGroup>
    );
    const clear = screen.getByRole("button", { name: "Clear" });
    fireEvent.mouseDown(clear);
    expect(screen.getByRole("textbox")).not.toHaveFocus();
    fireEvent.click(clear);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fits buttons inside the well, following the group's size and shape", () => {
    const { rerender } = render(
      <InputGroup shape="pill">
        <InputGroupInput aria-label="Email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="primary">Subscribe</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
    const button = () => screen.getByRole("button", { name: "Subscribe" });
    expect(button()).toHaveAttribute("data-size", "sm");
    expect(button()).toHaveAttribute("data-variant", "primary");
    expect(button()).toHaveClass("rounded-full", "h-8");

    rerender(
      <InputGroup size="sm">
        <InputGroupInput aria-label="Email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Subscribe</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
    expect(button()).toHaveAttribute("data-variant", "ghost");
    expect(button()).toHaveClass("h-6", "rounded-md");
    expect(button()).not.toHaveClass("h-8");
  });

  it("holds a growing textarea, addons level with its last line", () => {
    render(
      <InputGroup shape="pill">
        <InputGroupTextarea aria-label="Message" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Send" icon={<X />} />
        </InputGroupAddon>
      </InputGroup>
    );
    const textarea = screen.getByRole("textbox", { name: "Message" });
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveClass("field-sizing-content", "resize-none");
    expect(part("input-group")).toHaveClass(
      "has-[>textarea]:items-end",
      "has-[>textarea]:rounded-3xl"
    );
  });

  it("exposes size and shape, and lets className override the well", () => {
    render(
      <InputGroup className="rounded-xl" size="lg">
        <InputGroupInput aria-label="Name" />
      </InputGroup>
    );
    const group = part("input-group");
    expect(group).toHaveAttribute("data-size", "lg");
    expect(group).toHaveAttribute("data-shape", "rounded");
    expect(group).toHaveClass("rounded-xl");
    expect(group).not.toHaveClass("rounded-lg");
  });
});
