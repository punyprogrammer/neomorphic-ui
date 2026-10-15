"use client";

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
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";

type Status = "paid" | "pending" | "refunded";

interface Order {
  customer: string;
  id: string;
  status: Status;
  total: number;
}

const orders: Order[] = [
  { id: "#3021", customer: "Hannah Price", status: "paid", total: 84.0 },
  { id: "#3022", customer: "Kofi Mensah", status: "pending", total: 129.5 },
  { id: "#3023", customer: "Ines Moreau", status: "paid", total: 42.75 },
  { id: "#3024", customer: "Oliver Grant", status: "refunded", total: 18.0 },
  { id: "#3025", customer: "Yuki Tanaka", status: "paid", total: 230.2 },
  { id: "#3026", customer: "Sofia Bianchi", status: "pending", total: 66.4 },
  { id: "#3027", customer: "Liam Walsh", status: "paid", total: 97.0 },
];

const statusChip = {
  paid: "default",
  pending: "default",
  refunded: "inset",
} as const;
const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectAll table={table} />,
    cell: ({ row }) => (
      <DataTableSelectRow
        aria-label={`Select order ${row.original.id}`}
        row={row}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  { accessorKey: "id", header: "Order", enableSorting: false },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Chip
        className="capitalize"
        size="sm"
        variant={statusChip[row.original.status]}
      >
        {row.original.status}
      </Chip>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{gbp.format(row.original.total)}</span>
    ),
  },
];

export default function DataTableInContext() {
  const table = useDataTable({
    columns,
    data: orders,
    getRowId: (order) => order.id,
    pageSize: 5,
  });
  const selected = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <DataTableFilter
          aria-label="Filter customers"
          column={table.getColumn("customer")}
          placeholder="Filter customers…"
        />
        <DataTableViewOptions
          labels={{ customer: "Customer", total: "Total" }}
          table={table}
        />
        <Button disabled={selected === 0} icon={<Download />} size="sm">
          Export{selected ? ` ${selected}` : ""}
        </Button>
      </div>
      <DataTable
        aria-label="Orders"
        emptyMessage="No orders match."
        table={table}
      />
      <DataTablePagination label="Order pages" showSelection table={table} />
    </div>
  );
}
