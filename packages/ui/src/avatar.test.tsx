import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;

describe("Avatar", () => {
  it("shows the loaded image in place of the fallback", () => {
    render(
      <Avatar>
        <AvatarImage alt="Ada Lovelace" src="/ada.png" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveAttribute(
      "data-slot",
      "avatar-image"
    );
    expect(screen.queryByText("AL")).not.toBeInTheDocument();
  });

  it("shows the fallback without an image", () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AL")).toHaveAttribute(
      "data-slot",
      "avatar-fallback"
    );
  });

  it("is a raised frame, both shadow slots set", () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    );
    expect(part("avatar")).toHaveClass(
      "shadow-neu-sm",
      "inset-shadow-neu-flat",
      "bg-neu-convex",
      "rounded-full"
    );
    expect(part("avatar")).toHaveAttribute("data-size", "md");
  });

  it("sizes and shapes the frame", () => {
    render(
      <Avatar shape="rounded" size="xl">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    );
    expect(part("avatar")).toHaveClass("size-20", "rounded-xl");
    expect(part("avatar")).toHaveAttribute("data-shape", "rounded");
  });

  it("puts a decorative status badge on the corner", () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    );
    expect(part("avatar-badge")).toHaveAttribute("aria-hidden", "true");
    expect(part("avatar-badge")).toHaveClass("bg-success", "end-0", "bottom-0");
  });

  it("groups avatars with a count", () => {
    render(
      <AvatarGroup aria-label="Travellers">
        <Avatar>
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );
    expect(screen.getByRole("group", { name: "Travellers" })).toHaveClass(
      "-space-x-2"
    );
    expect(part("avatar-group-count")).toHaveTextContent("+3");
  });

  it("lets className override variant classes", () => {
    render(
      <Avatar className="size-12">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    );
    expect(part("avatar")).toHaveClass("size-12");
    expect(part("avatar")).not.toHaveClass("size-10");
  });
});
