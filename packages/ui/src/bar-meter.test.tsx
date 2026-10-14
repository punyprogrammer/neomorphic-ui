import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "./bar-meter";

const fills = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>('[data-slot="bar-meter-fill"]')
  );

describe("BarMeter", () => {
  it("is a labelled group of meters, each named by its label", () => {
    render(
      <BarMeter aria-label="This week">
        <BarMeterItem max={40} value={24}>
          <BarMeterLabel>Mon</BarMeterLabel>
        </BarMeterItem>
        <BarMeterItem max={40} value={30}>
          <BarMeterLabel>Tue</BarMeterLabel>
        </BarMeterItem>
      </BarMeter>
    );
    expect(screen.getByRole("group", { name: "This week" })).toBeVisible();
    const monday = screen.getByRole("meter", { name: "Mon" });
    expect(monday).toHaveAttribute("aria-valuenow", "24");
    expect(monday).toHaveAttribute("aria-valuemax", "40");
    expect(screen.getAllByRole("meter")).toHaveLength(2);
  });

  it("raises the fill to the value's share of min to max", () => {
    render(
      <BarMeter>
        <BarMeterItem max={40} min={0} value={10} />
        <BarMeterItem value={0} />
        <BarMeterItem value={150} />
      </BarMeter>
    );
    const [quarter, empty, over] = fills();
    expect(quarter.style.height).toBe(
      "max(var(--bar-meter-width, 0.75rem), 25%)"
    );
    expect(empty.style.height).toBe("0px");
    expect(over.style.height).toContain("100%");
  });

  it("prints the formatted reading above the bar", () => {
    render(
      <BarMeterItem
        format={{ style: "unit", unit: "celsius" }}
        max={40}
        value={24}
      >
        <BarMeterValue />
        <BarMeterLabel>Mon</BarMeterLabel>
      </BarMeterItem>
    );
    const value = document.querySelector('[data-slot="bar-meter-value"]');
    expect(value).toHaveTextContent("24°C");
    expect(value).toHaveClass("order-1");
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuetext", "24°C");
  });

  it("is a well holding a raised fill", () => {
    render(<BarMeterItem value={50} />);
    expect(document.querySelector('[data-slot="bar-meter-track"]')).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat",
      "order-2"
    );
    expect(fills()[0]).toHaveClass("shadow-neu-sm");
  });

  it("sizes the bars from the group", () => {
    render(<BarMeter size="lg" />);
    const group = document.querySelector('[data-slot="bar-meter"]');
    expect(group).toHaveAttribute("data-size", "lg");
    expect(group).toHaveClass("[--bar-meter-width:1rem]");
  });

  it("lets a consumer override the bar height", () => {
    render(<BarMeter className="[--bar-meter-height:4rem]" />);
    const group = document.querySelector('[data-slot="bar-meter"]');
    expect(group).toHaveClass("[--bar-meter-height:4rem]");
    expect(group).not.toHaveClass("[--bar-meter-height:8rem]");
  });
});
