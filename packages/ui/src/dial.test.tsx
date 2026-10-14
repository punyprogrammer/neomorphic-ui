import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Dial } from "./dial";

const dial = () => document.querySelector('[data-slot="dial"]') as HTMLElement;

// A 100px dial at the page origin, so pointer angles are easy to read.
function placeDial() {
  dial().getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 100, height: 100 }) as DOMRect;
}

const degrees = (value: number) => `${value} degrees`;

describe("Dial", () => {
  it("is a slider named on its knob", () => {
    render(<Dial aria-label="Volume" defaultValue={40} />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("data-slot", "dial-knob");
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("tabindex", "0");
  });

  it("steps with arrows, pages and Home/End", () => {
    const onValueCommitted = vi.fn();
    render(
      <Dial
        aria-label="Volume"
        defaultValue={50}
        onValueCommitted={onValueCommitted}
      />
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "51");
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    fireEvent.keyDown(slider, { key: "PageUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "60");
    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(onValueCommitted).toHaveBeenLastCalledWith(0);
  });

  it("sets the value from the pointer's angle around the ring", () => {
    const onValueChange = vi.fn();
    render(<Dial aria-label="Volume" onValueChange={onValueChange} />);
    placeDial();
    const slider = screen.getByRole("slider");

    // 12 o'clock is halfway through the 270° sweep.
    fireEvent.pointerDown(dial(), { clientX: 50, clientY: 0 });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(dial()).toHaveAttribute("data-dragging");
    expect(slider).toHaveFocus();

    fireEvent.pointerMove(dial(), { clientX: 100, clientY: 50 });
    expect(slider).toHaveAttribute("aria-valuenow", "83");
    fireEvent.pointerMove(dial(), { clientX: 0, clientY: 50 });
    expect(slider).toHaveAttribute("aria-valuenow", "17");
    fireEvent.pointerUp(dial(), { clientX: 0, clientY: 50 });
    expect(dial()).not.toHaveAttribute("data-dragging");
    expect(onValueChange).toHaveBeenLastCalledWith(17);
  });

  it("holds the nearer end in the gap below the arc", () => {
    render(<Dial aria-label="Volume" defaultValue={95} />);
    placeDial();
    fireEvent.pointerDown(dial(), { clientX: 50, clientY: 100 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "100");
  });

  it("leaves the value alone when pressed in the centre", () => {
    const onValueChange = vi.fn();
    render(
      <Dial
        aria-label="Volume"
        defaultValue={30}
        onValueChange={onValueChange}
      />
    );
    placeDial();
    fireEvent.pointerDown(dial(), { clientX: 52, clientY: 49 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("snaps to step and says the value with getAriaValueText", () => {
    render(
      <Dial
        aria-label="Temperature"
        defaultValue={20}
        getAriaValueText={degrees}
        max={30}
        min={16}
        step={0.5}
      />
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "20.5");
    expect(slider).toHaveAttribute("aria-valuetext", "20.5 degrees");
  });

  it("follows a controlled value", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Dial aria-label="Volume" onValueChange={onValueChange} value={10} />
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith(11);
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    rerender(
      <Dial aria-label="Volume" onValueChange={onValueChange} value={11} />
    );
    expect(slider).toHaveAttribute("aria-valuenow", "11");
  });

  it("submits with a form under its name", () => {
    render(<Dial aria-label="Volume" defaultValue={30} name="volume" />);
    const input = document.querySelector('input[name="volume"]');
    expect(input).toHaveAttribute("type", "hidden");
    expect(input).toHaveValue("30");
  });

  it("ignores input when disabled", () => {
    render(<Dial aria-label="Volume" defaultValue={30} disabled />);
    placeDial();
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
    expect(slider).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    fireEvent.pointerDown(dial(), { clientX: 50, clientY: 0 });
    expect(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("is a raised knob in a well, with the arc filled to the value", () => {
    render(<Dial aria-label="Volume" defaultValue={0} />);
    expect(dial()).toHaveClass("inset-shadow-neu", "shadow-neu-flat");
    expect(screen.getByRole("slider")).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "group-data-dragging/dial:inset-shadow-neu-sm"
    );
    expect(document.querySelector('[data-slot="dial-fill"]')).toBeNull();
  });
});
