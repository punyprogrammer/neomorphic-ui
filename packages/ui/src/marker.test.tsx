import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Marker, MarkerContent, MarkerIcon } from "./marker";

describe("Marker", () => {
  it("is a quiet line of text, not a separator", () => {
    render(
      <Marker data-testid="marker">
        <MarkerIcon data-testid="icon">•</MarkerIcon>
        <MarkerContent>Maya joined</MarkerContent>
      </Marker>
    );
    const marker = screen.getByTestId("marker");
    expect(marker).toHaveAttribute("data-slot", "marker");
    expect(marker).toHaveAttribute("data-variant", "default");
    expect(marker).not.toHaveAttribute("role");
    expect(screen.queryByRole("separator")).toBeNull();
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("draws grooves for the separator and border variants", () => {
    render(
      <>
        <Marker data-testid="separator" variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        <Marker data-testid="border" variant="border">
          <MarkerContent>Earlier</MarkerContent>
        </Marker>
      </>
    );
    expect(screen.getByTestId("separator")).toHaveClass(
      "before:bg-neu-dark",
      "after:bg-neu-dark"
    );
    expect(screen.getByTestId("border")).toHaveClass(
      "border-b",
      "border-neu-dark"
    );
  });

  it("announces live progress and can shimmer", () => {
    render(
      <Marker role="status" shimmer>
        <MarkerContent>Thinking…</MarkerContent>
      </Marker>
    );
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("data-shimmer");
    expect(screen.getByText("Thinking…")).toHaveClass(
      "group-data-shimmer/marker:neu-shimmer-text"
    );
  });
});
