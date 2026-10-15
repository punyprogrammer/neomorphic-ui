"use client";

import {
  DataTable,
  DataTableColumnHeader,
  DataTableViewOptions,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface Release {
  author: string;
  downloads: number;
  released: string;
  version: string;
}

const releases: Release[] = [
  {
    version: "3.2.0",
    released: "2 Jun 2026",
    author: "Mina Cho",
    downloads: 18_240,
  },
  {
    version: "3.1.4",
    released: "19 May 2026",
    author: "Joel Ekström",
    downloads: 26_915,
  },
  {
    version: "3.1.3",
    released: "8 May 2026",
    author: "Mina Cho",
    downloads: 9402,
  },
  {
    version: "3.1.2",
    released: "27 Apr 2026",
    author: "Rafael Ortiz",
    downloads: 31_077,
  },
];

const columns: ColumnDef<Release>[] = [
  { accessorKey: "version", header: "Version", enableHiding: false },
  { accessorKey: "released", header: "Released" },
  { accessorKey: "author", header: "Author" },
  {
    accessorKey: "downloads",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Downloads" />
    ),
    cell: ({ row }) => row.original.downloads.toLocaleString("en-GB"),
  },
];

export default function DataTableColumns() {
  const table = useDataTable({
    columns,
    data: releases,
    initialState: { columnVisibility: { author: false } },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DataTableViewOptions labels={{ downloads: "Downloads" }} table={table} />
      <DataTable aria-label="Releases" table={table} />
    </div>
  );
}
