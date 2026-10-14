import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress, ProgressLabel, ProgressValue } from "./progress";

const part = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;

describe("Progress", () => {
  it("renders a progressbar named by aria-label", () => {
    render(<Progress aria-label="Upload" value={40} />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("is named by ProgressLabel and shows ProgressValue", () => {
    render(
      <Progress value={40}>
        <ProgressLabel>Upload</ProgressLabel>
        <ProgressValue />
      </Progress>
    );
    expect(screen.getByRole("progressbar", { name: "Upload" })).toBeVisible();
    expect(part("progress-value")).toHaveTextContent("40%");
  });

  it("fills the track to the value's share of min to max", () => {
    render(<Progress aria-label="Steps" max={8} min={0} value={2} />);
    expect(part("progress-indicator").style.width).toBe("25%");
  });

  it("prints the value inside the fill when asked", () => {
    render(<Progress aria-label="Upload" size="lg" value={40} valueInside />);
    const value = part("progress-value");
    expect(part("progress-indicator")).toContainElement(value);
    expect(value).toHaveTextContent("40%");
    // Too narrow to hold it, the fill pushes it past its end.
    expect(value).toHaveClass("@max-[3.5rem]:start-full");
  });

  it("marks indeterminate and complete states", () => {
    const { rerender } = render(<Progress aria-label="Sync" value={null} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "data-indeterminate"
    );
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow"
    );
    expect(part("progress-indicator")).toHaveClass(
      "data-indeterminate:animate-neu-progress",
      "motion-reduce:data-indeterminate:animate-none"
    );
    rerender(<Progress aria-label="Sync" value={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-complete");
  });

  it("is a well holding a raised fill", () => {
    render(<Progress aria-label="Upload" value={40} />);
    expect(part("progress-track")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat"
    );
    expect(part("progress-indicator")).toHaveClass("shadow-neu-sm");
  });

  it("sizes the track; lg is the kit's deep bar", () => {
    render(<Progress aria-label="Upload" size="lg" value={40} />);
    expect(part("progress")).toHaveAttribute("data-size", "lg");
    expect(part("progress-track")).toHaveClass(
      "h-10",
      "rounded-lg",
      "inset-shadow-neu"
    );
  });

  it("lets className override root classes", () => {
    render(<Progress aria-label="Upload" className="gap-4" value={40} />);
    expect(part("progress")).toHaveClass("gap-4");
    expect(part("progress")).not.toHaveClass("gap-2");
  });
});
