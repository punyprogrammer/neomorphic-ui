import { render, screen } from "@testing-library/react";
import type * as React from "react";
import type { TooltipPayload } from "recharts";
import { describe, expect, it, vi } from "vitest";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "./chart";

// jsdom has no layout, so the real container measures 0×0 and renders nothing.
vi.mock("recharts", async (importOriginal) => ({
  ...(await importOriginal<typeof import("recharts")>()),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div className="recharts-responsive-container">{children}</div>
  ),
}));

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  "mobile users": { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const SIZE = { initialDimension: { width: 400, height: 200 } };

const payload = [
  {
    dataKey: "desktop",
    name: "desktop",
    value: 1860,
    color: "var(--fill-desktop)",
    payload: { month: "January" },
    graphicalItemId: "a",
  },
  {
    dataKey: "mobile users",
    name: "mobile users",
    value: 80,
    color: "var(--fill-mobile_users)",
    payload: { month: "January" },
    graphicalItemId: "b",
  },
] as TooltipPayload;

describe("Chart", () => {
  it("turns the config into colour, fill and area variables", () => {
    render(
      <ChartContainer config={config} id="sales" responsiveProps={SIZE}>
        <div />
      </ChartContainer>
    );
    const chart = document.querySelector('[data-slot="chart"]') as HTMLElement;
    expect(chart).toHaveAttribute("data-chart", "chart-sales");
    expect(chart.style.getPropertyValue("--color-desktop")).toBe(
      "var(--chart-1)"
    );
    expect(chart.style.getPropertyValue("--fill-mobile_users")).toBe(
      "url(#chart-sales-fill-mobile_users)"
    );
    expect(chart.style.getPropertyValue("--area-desktop")).toBe(
      "url(#chart-sales-area-desktop)"
    );
    expect(document.getElementById("chart-sales-fill-desktop")?.tagName).toBe(
      "linearGradient"
    );
  });

  it("lists the hovered series in a raised tooltip", () => {
    render(
      <ChartContainer config={config} responsiveProps={SIZE}>
        <ChartTooltipContent active label="January" payload={payload} />
      </ChartContainer>
    );
    const tooltip = document.querySelector('[data-slot="chart-tooltip"]');
    expect(tooltip).toHaveClass("bg-neu-convex", "shadow-neu");
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("Desktop")).toBeInTheDocument();
    expect(screen.getByText("1,860")).toBeInTheDocument();
    const [indicator] = document.querySelectorAll(
      '[data-slot="chart-tooltip-indicator"]'
    );
    expect(
      (indicator as HTMLElement).style.getPropertyValue("--indicator")
    ).toBe("var(--chart-1)");
  });

  it("renders nothing while inactive", () => {
    render(
      <ChartContainer config={config} responsiveProps={SIZE}>
        <ChartTooltipContent active={false} payload={payload} />
      </ChartContainer>
    );
    expect(
      document.querySelector('[data-slot="chart-tooltip"]')
    ).not.toBeInTheDocument();
  });

  it("labels legend entries from the config", () => {
    render(
      <ChartContainer config={config} responsiveProps={SIZE}>
        <ChartLegendContent
          payload={[
            { value: "desktop", dataKey: "desktop", color: "url(#x)" },
            { value: "mobile users", dataKey: "mobile users" },
          ]}
        />
      </ChartContainer>
    );
    expect(screen.getByText("Desktop")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(
      document.querySelectorAll('[data-slot="chart-legend-item"]')
    ).toHaveLength(2);
  });
});
