import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./calendar";

const MARCH_2020 = new Date(2020, 2, 1);
const TODAY = new Date(2020, 2, 15);
const NEXT_MONTH = /next month/i;
const PREVIOUS_MONTH = /previous month/i;
const MONTH = /month/i;

const dayButton = (isoDate: string) =>
  document.querySelector(
    `[data-slot="calendar-day-button"][data-day="${isoDate}"]`
  ) as HTMLElement;

describe("Calendar", () => {
  it("renders a month grid with flat days", () => {
    render(<Calendar defaultMonth={MARCH_2020} mode="single" today={TODAY} />);
    expect(document.querySelector('[data-slot="calendar"]')).toBeTruthy();
    expect(screen.getByRole("grid", { name: "March 2020" })).toBeTruthy();
    expect(dayButton("2020-03-10")).toHaveClass(
      "rounded-full",
      "shadow-neu-flat",
      "inset-shadow-neu-flat",
      "enabled:hover:shadow-neu-sm"
    );
    // Outside days fill out the last week, muted.
    expect(dayButton("2020-04-01")).toHaveClass("text-muted-foreground/70");
    expect(dayButton("2020-03-31")).not.toHaveClass("text-muted-foreground/70");
  });

  it("sinks today into a well", () => {
    render(<Calendar defaultMonth={MARCH_2020} mode="single" today={TODAY} />);
    const today = dayButton("2020-03-15");
    expect(today).toHaveAttribute("data-today");
    expect(today).toHaveClass("inset-shadow-neu-sm", "shadow-neu-flat");
  });

  it("reports the day picked", () => {
    const onSelect = vi.fn();
    render(
      <Calendar
        defaultMonth={MARCH_2020}
        mode="single"
        onSelect={onSelect}
        today={TODAY}
      />
    );
    fireEvent.click(dayButton("2020-03-10"));
    expect(onSelect.mock.calls[0][0]).toEqual(new Date(2020, 2, 10));
  });

  it("raises and fills the selected day", () => {
    render(<Calendar defaultMonth={MARCH_2020} mode="single" today={TODAY} />);
    fireEvent.click(dayButton("2020-03-10"));
    const selected = dayButton("2020-03-10");
    expect(selected).toHaveAttribute("data-selected-single");
    expect(selected).toHaveClass("shadow-neu-sm", "inset-shadow-neu-flat");
    expect(selected.closest("td")).toHaveAttribute("aria-selected", "true");
  });

  it("draws a band behind a range, with raised ends", () => {
    render(
      <Calendar
        defaultMonth={MARCH_2020}
        mode="range"
        selected={{ from: new Date(2020, 2, 3), to: new Date(2020, 2, 6) }}
        today={TODAY}
      />
    );
    const start = dayButton("2020-03-03");
    const middle = dayButton("2020-03-04");
    const end = dayButton("2020-03-06");
    expect(start).toHaveAttribute("data-range-start");
    expect(start).toHaveAttribute("data-selected");
    expect(start).not.toHaveAttribute("data-selected-single");
    expect(start).toHaveClass("shadow-neu-sm");
    expect(end).toHaveAttribute("data-range-end");
    expect(middle).toHaveAttribute("data-range-middle");
    expect(middle).not.toHaveAttribute("data-selected");
    expect(middle).toHaveClass("shadow-neu-flat");
    expect(start.closest("td")).toHaveClass("rounded-s-full");
    expect(end.closest("td")).toHaveClass("rounded-e-full");
  });

  it("moves between months with raised nav buttons", () => {
    render(<Calendar defaultMonth={MARCH_2020} today={TODAY} />);
    const next = screen.getByRole("button", { name: NEXT_MONTH });
    expect(next).toHaveClass("shadow-neu", "rounded-full");
    fireEvent.click(next);
    expect(screen.getByRole("grid", { name: "April 2020" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: PREVIOUS_MONTH }));
    expect(screen.getByRole("grid", { name: "March 2020" })).toBeTruthy();
  });

  it("offers month and year dropdowns as raised pills", () => {
    render(
      <Calendar
        captionLayout="dropdown"
        defaultMonth={MARCH_2020}
        endMonth={new Date(2021, 11)}
        startMonth={new Date(2019, 0)}
        today={TODAY}
      />
    );
    const month = screen.getByRole("combobox", { name: MONTH });
    expect(month.parentElement).toHaveClass("bg-neu-convex", "shadow-neu-sm");
    expect(month).toHaveClass("opacity-0");
    fireEvent.change(month, { target: { value: "6" } });
    expect(screen.getByRole("grid", { name: "July 2020" })).toBeTruthy();
  });

  it("disables days it is told to", () => {
    render(
      <Calendar
        defaultMonth={MARCH_2020}
        disabled={{ dayOfWeek: [0, 6] }}
        mode="single"
        today={TODAY}
      />
    );
    expect(dayButton("2020-03-07")).toBeDisabled();
    expect(dayButton("2020-03-09")).toBeEnabled();
  });

  it("takes a fill colour and extra classes on the root", () => {
    render(
      <Calendar
        className="[--calendar-fill:red]"
        defaultMonth={MARCH_2020}
        today={TODAY}
      />
    );
    const root = document.querySelector('[data-slot="calendar"]');
    expect(root).toHaveClass(
      "[--calendar-fill:red]",
      "p-4",
      "rounded-2xl",
      "bg-neu-convex",
      "shadow-neu",
      "inset-shadow-neu-flat"
    );
  });
});
