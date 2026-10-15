"use client";

import {
  DataTable,
  DataTableFilter,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface Customer {
  city: string;
  email: string;
  name: string;
}

const customers: Customer[] = [
  { name: "Aisha Rahman", email: "aisha@larkspur.co", city: "Leeds" },
  { name: "Bruno Costa", email: "bruno@tidewater.pt", city: "Porto" },
  { name: "Clara Nilsson", email: "clara@fjord.se", city: "Malmö" },
  { name: "Daniel Okafor", email: "daniel@kiln.studio", city: "Lagos" },
  { name: "Emma Laurent", email: "emma@atelier.fr", city: "Lyon" },
];

const columns: ColumnDef<Customer>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "city", header: "City" },
];

export default function DataTableFilterExample() {
  const table = useDataTable({ columns, data: customers });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DataTableFilter
        aria-label="Filter by name"
        column={table.getColumn("name")}
        placeholder="Filter by name…"
      />
      <DataTable
        aria-label="Customers"
        emptyMessage="No customers match that name."
        table={table}
      />
    </div>
  );
}
