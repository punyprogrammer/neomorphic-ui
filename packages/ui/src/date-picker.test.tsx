import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  DatePicker,
  DatePickerInput,
  type DateRange,
  DateRangePicker,
} from "./date-picker";

const MAY_2026 = new Date(2026, 4, 1);
const formatLocal = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatLocalRange = (range: DateRange) =>
  `${range.from ? formatLocal(range.from) : ""}/${range.to ? formatLocal(range.to) : ""}`;

const dayButton = (isoDate: string) =>
  document.querySelector(
    `[data-slot="calendar-day-button"][data-day="${isoDate}"]`
  ) as HTMLElement;

describe("DatePicker", () => {
  it("shows the placeholder, opens a calendar and closes on a pick", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        aria-label="Departure"
        calendarProps={{ defaultMonth: MAY_2026 }}
        formatDate={formatLocal}
        name="departure"
        onValueChange={onValueChange}
      />
    );
    const trigger = screen.getByRole("button", { name: "Departure" });
    expect(trigger).toHaveTextContent("Pick a date");
    expect(trigger).toHaveAttribute("data-placeholder");
    await user.click(trigger);
    await waitFor(() => expect(dayButton("2026-05-12")).toBeInTheDocument());
    await user.click(dayButton("2026-05-12"));
    expect(onValueChange.mock.calls[0][0]).toEqual(new Date(2026, 4, 12));
    expect(trigger).toHaveTextContent("2026-05-12");
    expect(trigger).not.toHaveAttribute("data-placeholder");
    expect(document.querySelector('input[name="departure"]')).toHaveValue(
      "2026-05-12"
    );
    await waitFor(() =>
      expect(
        document.querySelector('[data-slot="date-picker-content"]')
      ).not.toBeInTheDocument()
    );
  });

  it("picks a preset and presses it in", async () => {
    const user = userEvent.setup();
    const tomorrow = new Date(2026, 4, 13);
    render(
      <DatePicker
        aria-label="Departure"
        defaultValue={new Date(2026, 4, 12)}
        presets={[
          { label: "Today", value: new Date(2026, 4, 12) },
          { label: "Tomorrow", value: tomorrow },
        ]}
      />
    );
    await user.click(screen.getByRole("button", { name: "Departure" }));
    const today = await screen.findByRole("button", { name: "Today" });
    expect(today).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Tomorrow" }));
    expect(screen.getByRole("button", { name: "Departure" })).toHaveTextContent(
      new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        tomorrow
      )
    );
  });
});

describe("DateRangePicker", () => {
  it("picks a range across two months and stays open", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateRangePicker
        aria-label="Stay"
        calendarProps={{ defaultMonth: MAY_2026 }}
        formatRange={formatLocalRange}
        onValueChange={onValueChange}
      />
    );
    await user.click(screen.getByRole("button", { name: "Stay" }));
    await waitFor(() => expect(screen.getAllByRole("grid")).toHaveLength(2));
    await user.click(dayButton("2026-05-12"));
    await user.click(dayButton("2026-05-19"));
    const last = onValueChange.mock.lastCall?.[0];
    expect(last.from).toEqual(new Date(2026, 4, 12));
    expect(last.to).toEqual(new Date(2026, 4, 19));
    expect(
      document.querySelector('[data-slot="date-picker-content"]')
    ).toBeInTheDocument();
  });
});

describe("DatePickerInput", () => {
  it("syncs typed dates to the calendar and picked days to the text", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePickerInput
        aria-label="Return"
        formatDate={formatLocal}
        onValueChange={onValueChange}
      />
    );
    const input = screen.getByRole("textbox", { name: "Return" });
    await user.type(input, "2026-05-20");
    expect(onValueChange.mock.lastCall?.[0]).toEqual(new Date(2026, 4, 20));
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    await waitFor(() =>
      expect(screen.getByRole("grid", { name: "May 2026" })).toBeInTheDocument()
    );
    expect(dayButton("2026-05-20")).toHaveAttribute("data-selected-single");
    await user.click(dayButton("2026-05-22"));
    expect(input).toHaveValue("2026-05-22");
  });

  it("marks text that isn't a date as invalid on blur", async () => {
    const user = userEvent.setup();
    render(<DatePickerInput aria-label="Return" />);
    const input = screen.getByRole("textbox", { name: "Return" });
    await user.type(input, "next tuesday-ish");
    expect(input).not.toHaveAttribute("aria-invalid");
    await user.tab();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
