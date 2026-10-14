import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./switch";

function Labelled(props: React.ComponentProps<typeof Switch>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control
    <label>
      Wi-Fi
      <Switch {...props} />
    </label>
  );
}

const thumb = () =>
  screen.getByRole("switch").querySelector('[data-slot="switch-thumb"]');

describe("Switch", () => {
  it("renders an off switch named by its label", () => {
    render(<Labelled />);
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(thumb()).not.toBeNull();
  });

  it("exposes its parts API through data attributes", () => {
    render(<Labelled defaultChecked size="lg" />);
    const control = screen.getByRole("switch");
    expect(control).toHaveAttribute("data-slot", "switch");
    expect(control).toHaveAttribute("data-size", "lg");
    expect(control).toHaveAttribute("data-checked");
    expect(thumb()).toHaveAttribute("data-checked");
  });

  it("toggles when its label is clicked", () => {
    render(<Labelled />);
    fireEvent.click(screen.getByText("Wi-Fi"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("reports changes when controlled", () => {
    const onCheckedChange = vi.fn();
    render(<Labelled checked={false} onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("is a well when off and a filled raised track when on", () => {
    render(<Labelled />);
    expect(screen.getByRole("switch")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat",
      "data-checked:bg-primary",
      "data-checked:inset-shadow-neu-flat",
      "data-checked:shadow-neu-sm"
    );
  });

  it("moves the thumb by the track's inner width, flipped for RTL", () => {
    render(<Labelled />);
    expect(thumb()).toHaveClass(
      "size-5",
      "data-checked:translate-x-6",
      "rtl:data-checked:-translate-x-6"
    );
  });

  it("sizes the track and thumb together", () => {
    render(<Labelled size="sm" />);
    expect(screen.getByRole("switch")).toHaveClass("h-5", "w-10");
    expect(thumb()).toHaveClass("size-4", "data-checked:translate-x-5");
  });

  it("submits through a hidden native input", () => {
    render(
      <form>
        <Switch aria-label="Alerts" defaultChecked name="alerts" />
      </form>
    );
    const input = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"][name="alerts"]'
    );
    expect(input?.checked).toBe(true);
  });

  it("does not toggle when disabled", () => {
    render(<Labelled disabled />);
    const control = screen.getByRole("switch");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(control).toHaveAttribute("aria-disabled", "true");
  });

  it("lets className override variant classes", () => {
    render(<Labelled className="w-16" />);
    const control = screen.getByRole("switch");
    expect(control).toHaveClass("w-16");
    expect(control).not.toHaveClass("w-12");
  });
});
