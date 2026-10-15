import type { ColumnDef } from "@tanstack/react-table";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  DataTable,
  DataTableColumnHeader,
  DataTableFilter,
  DataTablePagination,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTableViewOptions,
  useDataTable,
} from "./data-table";

interface Trip {
  city: string;
  id: string;
  price: number;
}

const TRIPS: Trip[] = Array.from({ length: 25 }, (_, index) => ({
  id: `t${index + 1}`,
  city: `City ${String(index + 1).padStart(2, "0")}`,
  price: (index * 7) % 50,
}));

const COLUMNS: ColumnDef<Trip>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectAll table={table} />,
    cell: ({ row }) => (
      <DataTableSelectRow
        aria-label={`Select ${row.original.city}`}
        row={row}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  { accessorKey: "price", header: "Price", enableSorting: false },
];

function Trips({ data = TRIPS }: { data?: Trip[] }) {
  const table = useDataTable({
    columns: COLUMNS,
    data,
    getRowId: (row) => row.id,
    pageSize: 5,
  });
  return (
    <div>
      <DataTableFilter
        aria-label="Filter cities"
        column={table.getColumn("city")}
      />
      <DataTableViewOptions labels={{ city: "City name" }} table={table} />
      <DataTable aria-label="Trips" emptyMessage="No trips." table={table} />
      <DataTablePagination label="Trip pages" showSelection table={table} />
    </div>
  );
}

const bodyRows = () =>
  within(screen.getByRole("table", { name: "Trips" }))
    .getAllByRole("row")
    .slice(1);

describe("DataTable", () => {
  it("renders one page with data slots", () => {
    render(<Trips />);
    const table = screen.getByRole("table", { name: "Trips" });
    expect(table.closest("[data-slot=table-container]")).toBeInTheDocument();
    expect(bodyRows()).toHaveLength(5);
    expect(
      screen.getByRole("navigation", { name: "Trip pages" })
    ).toBeInTheDocument();
  });

  it("sorts from the header and sets aria-sort", async () => {
    const user = userEvent.setup();
    render(<Trips />);
    const city = screen.getByRole("button", { name: "City" });
    await user.click(city);
    await user.click(city);
    expect(city.closest("th")).toHaveAttribute("aria-sort", "descending");
    expect(bodyRows()[0]).toHaveTextContent("City 25");
    expect(city).toHaveAttribute("data-sorted", "desc");
  });

  it("filters a column and shows the empty message", async () => {
    const user = userEvent.setup();
    render(<Trips />);
    const filter = screen.getByRole("textbox", { name: "Filter cities" });
    await user.type(filter, "City 07");
    expect(bodyRows()).toHaveLength(1);
    await user.clear(filter);
    await user.type(filter, "Nowhere");
    expect(screen.getByText("No trips.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to next page" })
    ).toBeDisabled();
  });

  it("selects rows and reports the count", async () => {
    const user = userEvent.setup();
    render(<Trips />);
    await user.click(screen.getByRole("checkbox", { name: "Select City 02" }));
    expect(bodyRows()[1]).toHaveAttribute("data-selected");
    expect(
      screen.getByRole("checkbox", { name: "Select all on this page" })
    ).toHaveAttribute("aria-checked", "mixed");
    await user.click(
      screen.getByRole("checkbox", { name: "Select all on this page" })
    );
    expect(screen.getByText("5 of 25 row(s) selected.")).toBeInTheDocument();
  });

  it("collapses long page ranges and moves between pages", async () => {
    const user = userEvent.setup();
    render(
      <Trips
        data={[...TRIPS, ...TRIPS.map((t) => ({ ...t, id: `${t.id}b` }))]}
      />
    );
    // 50 rows, 10 pages: 1, 2, …, 10.
    expect(screen.getByRole("button", { name: "Page 10" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 6" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to previous page" })
    ).toBeEnabled();
  });

  it("hides columns from the view options menu", async () => {
    const user = userEvent.setup();
    render(<Trips />);
    await user.click(screen.getByRole("button", { name: "Columns" }));
    await user.click(
      await screen.findByRole("menuitemcheckbox", { name: "City name" })
    );
    expect(
      screen.queryByRole("columnheader", { name: "City" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("menuitemcheckbox", { name: "select" })
    ).not.toBeInTheDocument();
  });
});
