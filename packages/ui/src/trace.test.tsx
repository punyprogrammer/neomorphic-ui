import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "./trace";

describe("Trace", () => {
  it("shimmers a running step's title", () => {
    render(
      <Trace>
        <TraceLine data-testid="line" status="running">
          <TraceIcon>•</TraceIcon>
          <TraceTitle>Searching the web</TraceTitle>
          <TraceDescription>12 results</TraceDescription>
        </TraceLine>
      </Trace>
    );
    const line = screen.getByTestId("line");
    expect(line).toHaveAttribute("data-status", "running");
    expect(line).toHaveClass(
      "data-[status=running]:*:data-[slot=trace-title]:neu-shimmer-text"
    );
    expect(screen.getByText("Searching the web")).toHaveClass("truncate");
  });

  it("opens a step's output under a groove", async () => {
    const user = userEvent.setup();
    render(
      <Trace>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Read 3 files</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>src/app.tsx</TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    );
    const trigger = screen.getByRole("button", { name: "Read 3 files" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const inner = screen.getByText("src/app.tsx");
    expect(inner).toHaveAttribute(
      "data-slot",
      "trace-collapsible-content-inner"
    );
    expect(inner).toHaveClass("border-s", "border-neu-dark");
  });
});
