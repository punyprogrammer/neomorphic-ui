"use client";

import {
  DataTable,
  DataTablePagination,
  DataTableSelectAll,
  DataTableSelectRow,
  useDataTable,
} from "@neomorphic-react/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface Photo {
  file: string;
  size: string;
}

const photos: Photo[] = [
  { file: "harbour-dawn.jpg", size: "4.2 MB" },
  { file: "market-stalls.jpg", size: "3.8 MB" },
  { file: "lighthouse.jpg", size: "5.1 MB" },
  { file: "fishing-nets.jpg", size: "2.9 MB" },
  { file: "cliff-path.jpg", size: "4.6 MB" },
  { file: "rock-pools.jpg", size: "3.3 MB" },
  { file: "sea-wall.jpg", size: "4.0 MB" },
];

const columns: ColumnDef<Photo>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectAll table={table} />,
    cell: ({ row }) => (
      <DataTableSelectRow
        aria-label={`Select ${row.original.file}`}
        row={row}
      />
    ),
  },
  { accessorKey: "file", header: "File" },
  { accessorKey: "size", header: "Size" },
];

export default function DataTableSelection() {
  const table = useDataTable({
    columns,
    data: photos,
    getRowId: (photo) => photo.file,
    pageSize: 4,
  });

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <DataTable aria-label="Photos" table={table} />
      <DataTablePagination label="Photo pages" showSelection table={table} />
    </div>
  );
}
