import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./spinner";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as Element;

describe("Spinner", () => {
  it("is a status named Loading by default", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status", { name: "Loading" });
    expect(spinner.tagName).toBe("SPAN");
    expect(spinner).toHaveAttribute("data-slot", "spinner");
    expect(spinner).toHaveAttribute("data-size", "md");
  });

  it("takes a more specific name", () => {
    render(<Spinner aria-label="Loading messages" />);
    expect(
      screen.getByRole("status", { name: "Loading messages" })
    ).toBeVisible();
  });

  it("is a groove around a raised hub, both shadow slots set", () => {
    render(<Spinner />);
    expect(part("spinner")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat"
    );
    expect(part("spinner-hub")).toHaveClass(
      "shadow-neu-sm",
      "inset-shadow-neu-flat",
      "bg-neu-convex"
    );
  });

  it("spins a decorative arc, held still under reduced motion", () => {
    render(<Spinner />);
    const arc = part("spinner-arc");
    expect(arc).toHaveAttribute("aria-hidden", "true");
    expect(arc).toHaveClass("animate-spin", "motion-reduce:animate-none");
    expect(arc.querySelector("circle")).toHaveAttribute(
      "stroke",
      "var(--spinner-fill, var(--color-primary))"
    );
  });

  it("sizes the ring; lg is a deeper groove", () => {
    render(<Spinner size="lg" />);
    expect(part("spinner")).toHaveClass("size-16", "inset-shadow-neu");
    expect(part("spinner")).toHaveAttribute("data-size", "lg");
  });

  it("drops its status role when hidden inside a busy control", () => {
    render(
      <button aria-busy="true" type="button">
        <Spinner aria-hidden="true" size="sm" />
        Saving
      </button>
    );
    expect(part("spinner")).not.toHaveAttribute("role");
    expect(part("spinner")).not.toHaveAttribute("aria-label");
    expect(screen.getByRole("button", { name: "Saving" })).toBeVisible();
  });

  it("lets className override variant classes", () => {
    render(<Spinner className="size-12" />);
    expect(part("spinner")).toHaveClass("size-12");
    expect(part("spinner")).not.toHaveClass("size-10");
  });
});
