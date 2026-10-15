import { Badge } from "@neomorphic-ui/react/badge";
import { Checkbox } from "@neomorphic-ui/react/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-ui/react/table";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `
A data table with grooves between rows. It sits flat on the surface, or in a
raised panel or a well with \`variant\`. Selected rows take a primary tint and
a bar at their leading edge.

\`\`\`tsx
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@neomorphic-ui/react/table";

<Table variant="raised">
  <TableHeader>
    <TableRow><TableHead>Route</TableHead><TableHead>Fare</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Lisbon to Porto</TableCell><TableCell>€24</TableCell></TableRow>
  </TableBody>
</Table>
\`\`\`

Mark a chosen row with \`aria-selected\`. \`stickyHeader\` pins the header row;
give the wrapper a height through \`containerProps\`. For sorting, filtering
and paging, use the Data Table block.
`,
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["flat", "raised", "inset"] },
    stickyHeader: { control: "boolean" },
  },
  args: {
    variant: "raised",
    stickyHeader: false,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const TRIPS = [
  {
    id: "LP-204",
    route: "Lisbon to Porto",
    date: "12 May",
    status: "Paid",
    fare: 24,
  },
  {
    id: "PF-311",
    route: "Porto to Faro",
    date: "18 May",
    status: "Pending",
    fare: 31,
  },
  {
    id: "FL-118",
    route: "Faro to Lisbon",
    date: "22 May",
    status: "Paid",
    fare: 19,
  },
  {
    id: "LC-402",
    route: "Lisbon to Coimbra",
    date: "2 Jun",
    status: "Refunded",
    fare: 14,
  },
];

const STATUS_VARIANT = {
  Paid: "success",
  Pending: "warning",
  Refunded: "default",
} as const;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-2xl p-10">
      <Table {...args}>
        <TableCaption>Your trips this month</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booking</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-end">Fare</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRIPS.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell className="font-medium">{trip.id}</TableCell>
              <TableCell>{trip.route}</TableCell>
              <TableCell>{trip.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    STATUS_VARIANT[trip.status as keyof typeof STATUS_VARIANT]
                  }
                >
                  {trip.status}
                </Badge>
              </TableCell>
              <TableCell className="text-end tabular-nums">
                €{trip.fare}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-end tabular-nums">€88</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "Your trips this month" });
    await expect(within(table).getAllByRole("columnheader")).toHaveLength(5);
    await expect(within(table).getAllByRole("row")).toHaveLength(6);
    const cell = canvas.getByText("Lisbon to Porto");
    await expect(getComputedStyle(cell).borderBottomWidth).toBe("1px");
  },
};

function SelectableTable(props: React.ComponentProps<typeof Table>) {
  const [selected, setSelected] = useState<string[]>(["PF-311"]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id]
    );
  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all trips"
              checked={selected.length === TRIPS.length}
              indeterminate={
                selected.length > 0 && selected.length < TRIPS.length
              }
              onCheckedChange={(checked) =>
                setSelected(checked ? TRIPS.map((t) => t.id) : [])
              }
            />
          </TableHead>
          <TableHead>Route</TableHead>
          <TableHead className="text-end">Fare</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRIPS.map((trip) => {
          const isSelected = selected.includes(trip.id);
          return (
            <TableRow aria-selected={isSelected} key={trip.id}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${trip.route}`}
                  checked={isSelected}
                  onCheckedChange={() => toggle(trip.id)}
                />
              </TableCell>
              <TableCell>{trip.route}</TableCell>
              <TableCell className="text-end tabular-nums">
                €{trip.fare}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export const Selectable: Story = {
  args: { variant: "flat" },
  render: (args) => (
    <div className="max-w-xl p-10">
      <SelectableTable {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = (name: string) =>
      canvas.getByText(name).closest("tr") as HTMLElement;
    await expect(row("Porto to Faro")).toHaveAttribute("aria-selected", "true");
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select Lisbon to Porto" })
    );
    await expect(row("Lisbon to Porto")).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select all trips" })
    );
    await waitFor(() =>
      expect(
        canvas
          .getAllByRole("row")
          .slice(1)
          .every((r) => r.getAttribute("aria-selected") === "true")
      ).toBe(true)
    );
  },
};

export const StickyHeader: Story = {
  args: { variant: "inset", stickyHeader: true },
  render: (args) => (
    <div className="max-w-xl p-10">
      <Table {...args} containerProps={{ className: "max-h-64" }}>
        <TableHeader>
          <TableRow>
            <TableHead>Departure</TableHead>
            <TableHead>Platform</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 16 }, (_, i) => {
            const time = `${String(6 + i).padStart(2, "0")}:15`;
            return (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
                <TableCell>{(i % 6) + 1}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector(
      '[data-slot="table-container"]'
    ) as HTMLElement;
    const head = within(canvasElement).getByRole("columnheader", {
      name: "Departure",
    });
    const top = head.getBoundingClientRect().top;
    container.scrollTop = 200;
    await waitFor(() =>
      expect(Math.round(head.getBoundingClientRect().top)).toBe(Math.round(top))
    );
  },
};
