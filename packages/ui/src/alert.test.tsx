import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("is a polite status in a shallow well", () => {
    render(
      <Alert>
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your trip is saved.</AlertDescription>
      </Alert>
    );
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("inset-shadow-neu-sm", "shadow-neu-flat");
    expect(alert).toHaveAttribute("data-variant", "default");
    expect(alert).toHaveTextContent("SavedYour trip is saved.");
  });

  it("can interrupt with role=alert", () => {
    render(<Alert role="alert" variant="destructive" />);
    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-variant",
      "destructive"
    );
  });

  it("colours the accent per variant", () => {
    render(<Alert variant="warning" />);
    expect(screen.getByRole("status").className).toContain(
      "[--alert-accent:color-mix(in_oklab,var(--color-warning)"
    );
  });

  it("leaves room for an action at the end", () => {
    render(
      <Alert>
        <AlertTitle>Deleted</AlertTitle>
        <AlertAction>
          <button type="button">Undo</button>
        </AlertAction>
      </Alert>
    );
    expect(
      screen.getByRole("button", { name: "Undo" }).parentElement
    ).toHaveAttribute("data-slot", "alert-action");
  });
});
