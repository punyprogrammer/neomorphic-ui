import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;

describe("Card", () => {
  it("is raised by default, both shadow slots set", () => {
    render(<Card>Body</Card>);
    expect(part("card")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "bg-neu-convex"
    );
    expect(part("card")).toHaveAttribute("data-elevation", "raised");
    expect(part("card")).toHaveAttribute("data-size", "md");
  });

  it("can be a well or level with the surface", () => {
    const { rerender } = render(<Card elevation="inset" />);
    expect(part("card")).toHaveClass("inset-shadow-neu", "shadow-neu-flat");
    rerender(<Card elevation="flat" />);
    expect(part("card")).toHaveClass(
      "inset-shadow-neu-flat",
      "shadow-neu-flat"
    );
  });

  it("composes header, title, description, action, content and footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Bali</CardTitle>
          <CardDescription>7 nights</CardDescription>
          <CardAction>
            <button type="button">Save</button>
          </CardAction>
        </CardHeader>
        <CardContent>Itinerary</CardContent>
        <CardFooter>$1,240</CardFooter>
      </Card>
    );
    expect(part("card-header")).toHaveClass(
      "has-data-[slot=card-action]:sm:grid-cols-[1fr_auto]"
    );
    expect(part("card-title")).toHaveTextContent("Bali");
    expect(part("card-description")).toHaveTextContent("7 nights");
    expect(part("card-action")).toContainElement(
      screen.getByRole("button", { name: "Save" })
    );
    expect(part("card-content")).toHaveClass("px-(--card-spacing)");
    expect(part("card-footer")).toHaveTextContent("$1,240");
  });

  it.each([
    ["sm", "[--card-spacing:--spacing(4)]"],
    ["md", "[--card-spacing:--spacing(6)]"],
    ["lg", "[--card-spacing:--spacing(8)]"],
  ] as const)("lets a spacing override win at size %s", (size, spacing) => {
    render(<Card className="[--card-spacing:0px]" size={size} />);
    expect(part("card")).toHaveClass("[--card-spacing:0px]");
    expect(part("card")).not.toHaveClass(spacing);
  });

  it("renders as a landmark through the render prop", () => {
    render(<Card aria-label="Trip" render={<section />} />);
    expect(screen.getByRole("region", { name: "Trip" })).toBe(part("card"));
  });
});
