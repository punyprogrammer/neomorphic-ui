import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider, SliderLabel, SliderValue } from "./slider";

const part = (slot: string) =>
  document.querySelectorAll(`[data-slot="${slot}"]`);

// Edge-aligned thumbs stay `visibility: hidden` until Base UI measures the
// track, which never happens without layout in jsdom. Hidden elements also
// have no accessible name there, so names are checked through attributes.
const slider = () => screen.getByRole("slider", { hidden: true });

const rangeLabel = (index: number) => ["Minimum", "Maximum"][index] ?? "";

describe("Slider", () => {
  it("renders a range input named by aria-label", () => {
    render(<Slider aria-label="Volume" defaultValue={30} />);
    const input = slider();
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("aria-label", "Volume");
    expect(input).toHaveValue("30");
  });

  it("is named by SliderLabel and shows SliderValue", () => {
    render(
      <Slider defaultValue={40}>
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue />
      </Slider>
    );
    const label = part("slider-label")[0] as HTMLElement;
    expect(label).toHaveTextContent("Brightness");
    expect(slider()).toHaveAttribute("aria-labelledby", label.id);
    expect(slider()).toHaveValue("40");
    expect(part("slider-value")[0]).toHaveTextContent("40");
  });

  it("renders one thumb per value for a range", () => {
    render(<Slider defaultValue={[20, 80]} getAriaLabel={rangeLabel} />);
    const [min, max] = screen.getAllByRole("slider", { hidden: true });
    expect(min).toHaveAttribute("aria-label", "Minimum");
    expect(min).toHaveValue("20");
    expect(max).toHaveAttribute("aria-label", "Maximum");
    expect(max).toHaveValue("80");
    expect(part("slider-thumb")).toHaveLength(2);
  });

  it("steps with the arrow keys", () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        defaultValue={30}
        onValueChange={onValueChange}
        step={5}
      />
    );
    fireEvent.keyDown(slider(), { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith(35, expect.anything());
    expect(slider()).toHaveValue("35");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Slider aria-label="Volume" size="lg" />);
    const root = part("slider")[0];
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    for (const slot of [
      "slider-control",
      "slider-track",
      "slider-indicator",
      "slider-thumb",
    ]) {
      expect(part(slot)).toHaveLength(1);
    }
  });

  it("is a groove with a raised, gripped thumb that sinks while dragged", () => {
    render(<Slider aria-label="Volume" />);
    expect(part("slider-track")[0]).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat"
    );
    const thumb = part("slider-thumb")[0];
    expect(thumb).toHaveClass(
      "shadow-neu-sm",
      "inset-shadow-neu-flat",
      "data-dragging:shadow-neu-flat",
      "data-dragging:inset-shadow-neu-sm"
    );
    expect(thumb?.querySelectorAll("span[aria-hidden]")).toHaveLength(3);
  });

  it("stands upright when vertical", () => {
    render(<Slider aria-label="Volume" orientation="vertical" />);
    expect(slider()).toHaveAttribute("aria-orientation", "vertical");
    expect(part("slider-thumb")[0]).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });

  it("submits its value with a form", () => {
    render(
      <form>
        <Slider aria-label="Volume" defaultValue={60} name="volume" />
      </form>
    );
    const form = document.querySelector("form") as HTMLFormElement;
    expect(new FormData(form).get("volume")).toBe("60");
  });

  it("does not move when disabled", () => {
    render(<Slider aria-label="Volume" defaultValue={30} disabled />);
    const input = slider();
    expect(input).toBeDisabled();
    expect(part("slider-control")[0]).toHaveAttribute("data-disabled");
  });

  it("lets className override root classes", () => {
    render(<Slider aria-label="Volume" className="w-64" />);
    const root = part("slider")[0];
    expect(root).toHaveClass("w-64");
    expect(root).not.toHaveClass("w-full");
  });
});
