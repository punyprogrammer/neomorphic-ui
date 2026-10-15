import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";

describe("Resizable", () => {
  it("splits panels with a focusable groove separator", () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="30">Stations</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Map</ResizablePanel>
      </ResizablePanelGroup>
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-slot", "resizable-handle");
    expect(separator).toHaveAttribute("tabindex", "0");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveClass("w-px", "bg-[var(--neu-dark)]");
    expect(
      document.querySelectorAll('[data-slot="resizable-panel"]')
    ).toHaveLength(2);
    expect(
      document.querySelector('[data-slot="resizable-handle-grip"]')
    ).toBeNull();
  });

  it("draws a raised grip with `withHandle`", () => {
    render(
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel>Top</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Bottom</ResizablePanel>
      </ResizablePanelGroup>
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
    expect(
      document.querySelector('[data-slot="resizable-handle-grip"]')
    ).toHaveClass("bg-neu-convex", "shadow-neu-sm", "inset-shadow-neu-flat");
  });
});
