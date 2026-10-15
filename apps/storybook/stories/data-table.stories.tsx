import { Button } from "@neomorphic-react/ui/button";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableFilter,
  DataTablePagination,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTableViewOptions,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal as MoreHorizontalIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type BookingStatus = "confirmed" | "pending" | "cancelled";

interface Booking {
  amount: number;
  id: string;
  passenger: string;
  route: string;
  status: BookingStatus;
}

const BOOKINGS: Booking[] = [
  {
    id: "BK-1042",
    passenger: "Ana Sousa",
    route: "Lisbon → Porto",
    status: "confirmed",
    amount: 42,
  },
  {
    id: "BK-1043",
    passenger: "Bruno Lima",
    route: "Porto → Braga",
    status: "pending",
    amount: 12.5,
  },
  {
    id: "BK-1044",
    passenger: "Carla Reis",
    route: "Lisbon → Faro",
    status: "confirmed",
    amount: 58,
  },
  {
    id: "BK-1045",
    passenger: "Diogo Alves",
    route: "Coimbra → Lisbon",
    status: "cancelled",
    amount: 31,
  },
  {
    id: "BK-1046",
    passenger: "Eva Martins",
    route: "Faro → Lagos",
    status: "confirmed",
    amount: 9.8,
  },
  {
    id: "BK-1047",
    passenger: "Filipe Costa",
    route: "Porto → Lisbon",
    status: "pending",
    amount: 42,
  },
  {
    id: "BK-1048",
    passenger: "Gabriela Nunes",
    route: "Évora → Lisbon",
    status: "confirmed",
    amount: 17.2,
  },
  {
    id: "BK-1049",
    passenger: "Hugo Pinto",
    route: "Lisbon → Sintra",
    status: "confirmed",
    amount: 4.6,
  },
  {
    id: "BK-1050",
    passenger: "Inês Rocha",
    route: "Braga → Porto",
    status: "cancelled",
    amount: 12.5,
  },
  {
    id: "BK-1051",
    passenger: "João Ferreira",
    route: "Lisbon → Coimbra",
    status: "pending",
    amount: 26,
  },
  {
    id: "BK-1052",
    passenger: "Luísa Gomes",
    route: "Porto → Aveiro",
    status: "confirmed",
    amount: 8.9,
  },
  {
    id: "BK-1053",
    passenger: "Miguel Santos",
    route: "Lisbon → Évora",
    status: "confirmed",
    amount: 21.4,
  },
];

const STATUS_CHIP = {
  confirmed: "success",
  pending: "warning",
  cancelled: "destructive",
} as const;

const COLUMN_LABELS = { passenger: "Passenger", amount: "Amount" };

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

function RowActions({ row }: { row: Row<Booking> }) {
  const copyId = useCallback(
    () => navigator.clipboard?.writeText(row.original.id),
    [row]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={`Actions for ${row.original.passenger}`}
            icon={<MoreHorizontalIcon />}
            size="sm"
            variant="ghost"
          />
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Booking {row.original.id}</DropdownMenuLabel>
          <DropdownMenuItem onClick={copyId}>Copy booking ID</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View passenger</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          Cancel booking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const COLUMNS: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectAll table={table} />,
    cell: ({ row }) => (
      <DataTableSelectRow
        aria-label={`Select ${row.original.passenger}`}
        row={row}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "passenger",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Passenger" />
    ),
    cell: ({ row }) => (
      <div className="grid leading-tight">
        <span className="font-medium">{row.original.passenger}</span>
        <span className="text-muted-foreground text-xs">{row.original.id}</span>
      </div>
    ),
  },
  { accessorKey: "route", header: "Route", enableSorting: false },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Chip size="sm" variant={STATUS_CHIP[row.original.status]}>
        {row.original.status[0]?.toUpperCase()}
        {row.original.status.slice(1)}
      </Chip>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-end"
        column={column}
        title="Amount"
      />
    ),
    cell: ({ row }) => (
      <div className="text-end font-medium tabular-nums">
        {euro.format(row.original.amount)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
    enableHiding: false,
  },
];

function Bookings({
  onSelectionChange,
}: {
  onSelectionChange?: (ids: string[]) => void;
}) {
  const table = useDataTable({
    columns: COLUMNS,
    data: BOOKINGS,
    getRowId: (row) => row.id,
    pageSize: 5,
  });
  const selection = table.getState().rowSelection;
  useEffect(() => {
    onSelectionChange?.(Object.keys(selection));
  }, [onSelectionChange, selection]);
  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <DataTableFilter
          aria-label="Filter passengers"
          column={table.getColumn("passenger")}
          placeholder="Filter passengers…"
        />
        <DataTableViewOptions labels={COLUMN_LABELS} table={table} />
      </div>
      <DataTable
        aria-label="Bookings"
        emptyMessage="No bookings match."
        table={table}
      />
      <DataTablePagination label="Bookings pages" showSelection table={table} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const meta = {
  title: "Components/Data Table",
  parameters: {
    docs: {
      description: {
        component: `
Parts for building a data table on \`@tanstack/react-table\` (an optional
peer dependency: install it to use this component). \`useDataTable\` creates
the table with sorting, filtering, pagination, row selection and column
visibility switched on; you write the columns, and the parts draw it.

\`\`\`tsx
import {
  DataTable, DataTableColumnHeader, DataTableFilter, DataTablePagination,
  DataTableSelectAll, DataTableSelectRow, DataTableViewOptions, useDataTable,
} from "@neomorphic-react/ui/data-table";

const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectAll table={table} />,
    cell: ({ row }) => (
      <DataTableSelectRow aria-label={\`Select \${row.original.passenger}\`} row={row} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "passenger",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Passenger" />,
  },
];

const table = useDataTable({ columns, data, pageSize: 10 });

<DataTableFilter aria-label="Filter passengers" column={table.getColumn("passenger")} />
<DataTableViewOptions labels={{ passenger: "Passenger" }} table={table} />
<DataTable aria-label="Bookings" table={table} />
<DataTablePagination showSelection table={table} />
\`\`\`

- \`DataTable\` draws a raised \`Table\` (any \`Table\` prop works): header cells
  carry \`aria-sort\` while sorted, selected rows take the primary tint and edge
  bar, and \`emptyMessage\` fills an empty result.
- \`DataTableColumnHeader\` is a ghost button on sortable columns that turns
  primary while sorted; plain text otherwise.
- \`DataTableSelectAll\` / \`DataTableSelectRow\` are \`Checkbox\`es; select-all
  is indeterminate while part of the page is chosen. Name each row's box.
- \`DataTableFilter\` is an \`Input\` bound to one column.
- \`DataTableViewOptions\` is a "Columns" \`DropdownMenu\` of checkbox items;
  \`labels\` names columns whose header isn't a string.
- \`DataTablePagination\` collapses long ranges with an ellipsis and can
  announce the selection count.
`,
      },
    },
  },
  args: { onSelectionChange: fn() },
} satisfies Meta<typeof Bookings>;

export default meta;
type Story = StoryObj<Meta<typeof Bookings>>;

const bodyRows = (table: HTMLElement) =>
  within(table).getAllByRole("row").slice(1);

/** Sorting, selection, pagination, filtering and column visibility. */
export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center p-10">
      <Bookings {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "Bookings" });
    await expect(bodyRows(table)).toHaveLength(5);

    // Sort by amount, highest first.
    const amount = canvas.getByRole("button", { name: "Amount" });
    await userEvent.click(amount);
    await userEvent.click(amount);
    await expect(amount.closest("th")).toHaveAttribute(
      "aria-sort",
      "descending"
    );
    await expect(bodyRows(table)[0]).toHaveTextContent("Carla Reis");

    // Select a row, then the rest of the page.
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select Carla Reis" })
    );
    await expect(bodyRows(table)[0]).toHaveAttribute("data-selected");
    await expect(
      canvas.getByRole("checkbox", { name: "Select all on this page" })
    ).toHaveAttribute("aria-checked", "mixed");
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith(["BK-1044"]);
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select all on this page" })
    );
    await expect(canvas.getByText("5 of 12 row(s) selected.")).toBeVisible();

    // Page two.
    await userEvent.click(canvas.getByRole("button", { name: "Page 2" }));
    await expect(
      canvas.getByRole("button", { name: "Page 2" })
    ).toHaveAttribute("aria-current", "page");
    await expect(
      canvas.getByRole("button", { name: "Go to previous page" })
    ).toBeEnabled();

    // Filter.
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Filter passengers" }),
      "inês"
    );
    await waitFor(() => expect(bodyRows(table)).toHaveLength(1));
    await expect(bodyRows(table)[0]).toHaveTextContent("Inês Rocha");
    await userEvent.clear(
      canvas.getByRole("textbox", { name: "Filter passengers" })
    );

    // Hide the route column.
    await userEvent.click(canvas.getByRole("button", { name: "Columns" }));
    const route = await screen.findByRole("menuitemcheckbox", {
      name: "Route",
    });
    await waitFor(() => expect(route).toBeVisible(), { timeout: 4000 });
    await userEvent.click(route);
    await expect(
      within(table).queryByRole("columnheader", { name: "Route" })
    ).toBeNull();
    await userEvent.keyboard("{Escape}");

    // Row actions.
    await userEvent.click(
      canvas.getByRole("button", { name: "Actions for Carla Reis" })
    );
    await expect(
      await screen.findByRole("group", { name: "Booking BK-1044" })
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("menuitem", { name: "Copy booking ID" })
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
  },
};

/** No matches: the empty message fills the body and paging is disabled. */
export const Empty: Story = {
  render: (args) => (
    <div className="flex justify-center p-10">
      <Bookings {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Filter passengers" }),
      "Zé"
    );
    await expect(canvas.getByText("No bookings match.")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Go to next page" })
    ).toBeDisabled();
  },
};
