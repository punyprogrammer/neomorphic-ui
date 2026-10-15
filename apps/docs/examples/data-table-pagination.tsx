"use client";

import {
  DataTable,
  DataTablePagination,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface Payment {
  amount: string;
  id: string;
  merchant: string;
  week: string;
}

const merchants = [
  "Corner Shop",
  "City Bikes",
  "Daily Bread",
  "Bookworm",
  "Green Grocer",
  "Night Bus",
];

const payments: Payment[] = Array.from({ length: 8 }, (_, week) =>
  merchants.map((merchant, index) => ({
    id: `TX-${1000 + week * merchants.length + index}`,
    merchant,
    week: `Week ${week + 1}`,
    amount: `£${(((week + 3) * (index + 5)) % 40) + 2}.50`,
  }))
).flat();

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "Reference" },
  { accessorKey: "merchant", header: "Merchant" },
  { accessorKey: "week", header: "Week" },
  { accessorKey: "amount", header: "Amount" },
];

export default function DataTablePaginationExample() {
  const table = useDataTable({ columns, data: payments, pageSize: 5 });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DataTable aria-label="Payments" table={table} />
      <DataTablePagination label="Payment pages" table={table} />
    </div>
  );
}
