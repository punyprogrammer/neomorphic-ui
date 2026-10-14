import { Calendar, type DateRange } from "@neomorphic-ui/react/calendar";
import { Card, CardContent } from "@neomorphic-ui/react/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

// The kit's calendar shows March 2020; pin "today" so stories don't drift.
const MARCH_2020 = new Date(2020, 2, 1);
const TODAY = new Date(2020, 2, 15);
const MARCH_20 = /March 20th/;
const NEXT_MONTH = /next month/i;

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: `
A month grid for picking a day, several days or a range, from the kit's March
2020 calendar. Days lie flat and rise under the pointer, today sits in a sunken
well with a dot, and the selection is raised and filled. Built on
[react-day-picker](https://daypicker.dev): every DayPicker prop passes through.

\`\`\`tsx
import { Calendar } from "@neomorphic-ui/react/calendar";

const [date, setDate] = useState<Date>();

<Calendar mode="single" onSelect={setDate} selected={date} />
\`\`\`

Days are only buttons once there's a \`mode\`. The fill is \`--primary\`; set
\`--calendar-fill\` (and \`--calendar-fill-foreground\`) for another colour, and
\`--cell-size\` to resize the grid. The calendar is raised from the page like a
\`Surface\`; inside a card, pass \`className="bg-transparent shadow-neu-flat"\` to
lay it flat.
`,
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SingleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date(2020, 2, 10));
  return (
    <Calendar
      defaultMonth={MARCH_2020}
      mode="single"
      onSelect={setDate}
      selected={date}
      today={TODAY}
    />
  );
}

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <SingleCalendar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("grid", { name: "March 2020" })
    ).toBeVisible();
    const day = canvas.getByRole("button", { name: MARCH_20 });
    await userEvent.click(day);
    await expect(day).toHaveAttribute("data-selected-single");
    await expect(getComputedStyle(day).boxShadow).not.toBe("none");
    await userEvent.click(canvas.getByRole("button", { name: NEXT_MONTH }));
    await expect(
      canvas.getByRole("grid", { name: "April 2020" })
    ).toBeVisible();
  },
};

/** The kit's calendar card. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <SingleCalendar />
    </div>
  ),
};

/** Laid flat inside a card that already lifts it. */
export const InCard: Story = {
  render: () => (
    <div className="p-12">
      <Card className="w-fit">
        <CardContent>
          <Calendar
            className="bg-transparent p-0 shadow-neu-flat"
            defaultMonth={MARCH_2020}
            mode="single"
            today={TODAY}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2020, 2, 18),
    to: new Date(2020, 2, 25),
  });
  return (
    <Calendar
      defaultMonth={MARCH_2020}
      mode="range"
      numberOfMonths={2}
      onSelect={setRange}
      selected={range}
      today={TODAY}
    />
  );
}

/** A tinted band joins the raised ends of a range. */
export const Range: Story = {
  render: () => (
    <div className="p-10">
      <RangeCalendar />
    </div>
  ),
};

/** Month and year as raised pills over native selects. */
export const Dropdowns: Story = {
  render: () => (
    <div className="p-10">
      <Calendar
        captionLayout="dropdown"
        defaultMonth={MARCH_2020}
        endMonth={new Date(2030, 11)}
        mode="single"
        startMonth={new Date(2010, 0)}
        today={TODAY}
      />
    </div>
  ),
};

/** Weekends and past days off, with a custom fill and larger cells. */
export const DisabledDays: Story = {
  render: () => (
    <div className="p-10">
      <Calendar
        className="[--calendar-fill:oklch(0.62_0.14_245)] [--cell-size:--spacing(10)]"
        defaultMonth={MARCH_2020}
        disabled={[{ before: TODAY }, { dayOfWeek: [0, 6] }]}
        mode="single"
        selected={new Date(2020, 2, 17)}
        today={TODAY}
      />
    </div>
  ),
};
