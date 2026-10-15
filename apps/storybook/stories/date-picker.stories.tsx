import {
  DatePicker,
  DatePickerInput,
  type DateRange,
  DateRangePicker,
} from "@neomorphic-ui/react/date-picker";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

// Stories pin "today" so the plays are stable.
const TODAY = new Date(2026, 4, 12);
const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const medium = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

const dayButton = (isoDate: string) =>
  document.querySelector(
    `[data-slot="calendar-day-button"][data-day="${isoDate}"]`
  ) as HTMLElement;

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: `
A \`Calendar\` in a \`Popover\`. The trigger is the kit's raised field
button; the calendar lies flat on the popup's raised card.

\`\`\`tsx
import {
  DatePicker, DatePickerInput, DateRangePicker,
} from "@neomorphic-ui/react/date-picker";

<DatePicker aria-label="Departure" onValueChange={setDate} value={date} />
<DateRangePicker aria-label="Stay" numberOfMonths={2} presets={presets} />
<DatePickerInput aria-label="Return" />
\`\`\`

- \`DatePicker\` closes once a day is picked; \`presets\` add quick picks
  (Today, Tomorrow) beside the calendar, the matching one pressed in.
- \`DateRangePicker\` stays open while the range is adjusted.
- \`DatePickerInput\` is a typed date in an \`InputGroup\` well. Typing a
  whole date moves the calendar to it, picking a day writes it back, and
  text that isn't a date is marked invalid on blur. \`parseDate\` and
  \`formatDate\` change the format.

\`name\` adds a hidden input holding \`yyyy-mm-dd\`; \`calendarProps\`
reach the \`Calendar\` (disabled days, \`startMonth\`, …).
`,
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-[30rem] items-start justify-center p-10">
      <Field className="w-64">
        <FieldLabel htmlFor="date-picker-departure">Departure</FieldLabel>
        <DatePicker
          calendarProps={{
            defaultMonth: TODAY,
            disabled: { before: TODAY },
            today: TODAY,
          }}
          className="w-full"
          id="date-picker-departure"
        />
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Departure",
    });
    await expect(trigger).toHaveTextContent("Pick a date");
    await userEvent.click(trigger);
    await waitFor(() => expect(dayButton("2026-05-20")).toBeVisible());
    await expect(dayButton("2026-05-10")).toBeDisabled();
    await userEvent.click(dayButton("2026-05-20"));
    await expect(trigger).toHaveTextContent(medium.format(addDays(TODAY, 8)));
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 4000 });
  },
};

export const WithPresets: Story = {
  render: () => (
    <div className="flex min-h-[30rem] items-start justify-center p-10">
      <DatePicker
        aria-label="Departure"
        calendarProps={{ today: TODAY }}
        className="w-64"
        defaultValue={TODAY}
        presets={[
          { label: "Today", value: TODAY },
          { label: "Tomorrow", value: addDays(TODAY, 1) },
          { label: "In a week", value: addDays(TODAY, 7) },
          { label: "In a month", value: addDays(TODAY, 30) },
        ]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Departure",
    });
    await userEvent.click(trigger);
    const today = await screen.findByRole("button", { name: "Today" });
    await expect(today).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "In a week" }));
    await expect(trigger).toHaveTextContent(medium.format(addDays(TODAY, 7)));
  },
};

const PRESET_RANGES: { label: string; value: DateRange }[] = [
  {
    label: "This weekend",
    value: { from: addDays(TODAY, 4), to: addDays(TODAY, 5) },
  },
  { label: "Next 7 days", value: { from: TODAY, to: addDays(TODAY, 6) } },
  { label: "Next 14 days", value: { from: TODAY, to: addDays(TODAY, 13) } },
];

export const Range: Story = {
  render: () => (
    <div className="flex min-h-[30rem] items-start justify-center p-10">
      <DateRangePicker
        aria-label="Stay"
        calendarProps={{
          defaultMonth: TODAY,
          disabled: { before: TODAY },
          today: TODAY,
        }}
        className="w-72"
        presets={PRESET_RANGES}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Stay" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getAllByRole("grid")).toHaveLength(2));
    await userEvent.click(dayButton("2026-05-28"));
    await userEvent.click(dayButton("2026-06-02"));
    await expect(trigger).toHaveTextContent(
      medium.formatRange(new Date(2026, 4, 28), new Date(2026, 5, 2))
    );
    await expect(
      screen.getByRole("grid", { name: "June 2026" })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Next 7 days" }));
    await expect(trigger).toHaveTextContent(
      medium.formatRange(TODAY, addDays(TODAY, 6))
    );
  },
};

export const TypedInput: Story = {
  render: () => (
    <div className="flex min-h-[30rem] items-start justify-center p-10">
      <Field className="w-64">
        <FieldLabel htmlFor="date-picker-return">Return</FieldLabel>
        <DatePickerInput
          calendarProps={{ today: TODAY }}
          id="date-picker-return"
          placeholder="yyyy-mm-dd"
        />
        <FieldDescription>Type a date or pick one.</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Return" });
    await userEvent.type(input, "2026-07-04");
    await userEvent.click(
      canvas.getByRole("button", { name: "Open calendar" })
    );
    await expect(
      await screen.findByRole("grid", { name: "July 2026" })
    ).toBeInTheDocument();
    await expect(dayButton("2026-07-04")).toHaveAttribute(
      "data-selected-single"
    );
    await userEvent.click(dayButton("2026-07-09"));
    await expect(input).toHaveValue(medium.format(new Date(2026, 6, 9)));
    await userEvent.clear(input);
    await userEvent.type(input, "soon");
    await userEvent.tab();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};
