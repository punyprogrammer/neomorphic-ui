"use client";

import {
  DataTable,
  DataTableColumnHeader,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface Product {
  name: string;
  sold: number;
  stock: number;
}

const products: Product[] = [
  { name: "Linen apron", sold: 182, stock: 40 },
  { name: "Stoneware mug", sold: 341, stock: 12 },
  { name: "Walnut board", sold: 96, stock: 25 },
  { name: "Beeswax candle", sold: 254, stock: 88 },
  { name: "Wool throw", sold: 61, stock: 7 },
];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
  },
  {
    accessorKey: "sold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In stock" />
    ),
  },
];

export default function DataTableDemo() {
  const table = useDataTable({ columns, data: products });

  return (
    <div className="w-full max-w-lg">
      <DataTable aria-label="Best sellers" table={table} />
    </div>
  );
}
