import { Button } from "@neomorphic-ui/react/button";
import { Checkbox } from "@neomorphic-ui/react/checkbox";
import { Chip } from "@neomorphic-ui/react/chip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-ui/react/dropdown-menu";
import { Input } from "@neomorphic-ui/react/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@neomorphic-ui/react/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-ui/react/table";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as TableInstance,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDown as ArrowDownIcon,
  ArrowUpDown as ArrowUpDownIcon,
  ArrowUp as ArrowUpIcon,
  Columns3 as ColumnsIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

// ---------------------------------------------------------------------------
// Cells
// ---------------------------------------------------------------------------

function SelectAll({ table }: { table: TableInstance<Booking> }) {
  const handleChange = useCallback(
    (checked: boolean) => table.toggleAllPageRowsSelected(checked),
    [table]
  );
  return (
    <Checkbox
      aria-label="Select all on this page"
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={
        table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
      }
      onCheckedChange={handleChange}
      size="sm"
    />
  );
}

function SelectRow({ row }: { row: Row<Booking> }) {
  const handleChange = useCallback(
    (checked: boolean) => row.toggleSelected(checked),
    [row]
  );
  return (
    <Checkbox
      aria-label={`Select ${row.original.passenger}`}
      checked={row.getIsSelected()}
      onCheckedChange={handleChange}
      size="sm"
    />
  );
}

function SortHeader({
  column,
  title,
}: {
  column: Column<Booking>;
  title: string;
}) {
  const sorted = column.getIsSorted();
  const handleClick = useCallback(
    () => column.toggleSorting(sorted === "asc"),
    [column, sorted]
  );
  let icon = <ArrowUpDownIcon />;
  if (sorted === "asc") {
    icon = <ArrowUpIcon />;
  } else if (sorted === "desc") {
    icon = <ArrowDownIcon />;
  }
  return (
    <Button
      className="-ms-3 font-semibold text-xs data-[sorted]:text-primary"
      data-sorted={sorted || undefined}
      icon={icon}
      iconPosition="end"
      onClick={handleClick}
      size="sm"
      variant="ghost"
    >
      {title}
    </Button>
  );
}

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
        <DropdownMenuLabel>Booking {row.original.id}</DropdownMenuLabel>
        <DropdownMenuItem onClick={copyId}>Copy booking ID</DropdownMenuItem>
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
    header: ({ table }) => <SelectAll table={table} />,
    cell: ({ row }) => <SelectRow row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "passenger",
    header: ({ column }) => <SortHeader column={column} title="Passenger" />,
    cell: ({ row }) => (
      <div className="grid leading-tight">
        <span className="font-medium">{row.original.passenger}</span>
        <span className="text-muted-foreground text-xs">{row.original.id}</span>
      </div>
    ),
  },
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "status",
    header: "Status",
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
      <div className="flex justify-end">
        <SortHeader column={column} title="Amount" />
      </div>
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

const COLUMN_LABELS: Record<string, string> = {
  passenger: "Passenger",
  route: "Route",
  status: "Status",
  amount: "Amount",
};

// ---------------------------------------------------------------------------
// Toolbar and footer parts
// ---------------------------------------------------------------------------

function ColumnToggle({ column }: { column: Column<Booking> }) {
  const handleChange = useCallback(
    (checked: boolean) => column.toggleVisibility(checked),
    [column]
  );
  return (
    <DropdownMenuCheckboxItem
      checked={column.getIsVisible()}
      onCheckedChange={handleChange}
    >
      {COLUMN_LABELS[column.id] ?? column.id}
    </DropdownMenuCheckboxItem>
  );
}

function PageButton({
  index,
  table,
}: {
  index: number;
  table: TableInstance<Booking>;
}) {
  const handleClick = useCallback(
    () => table.setPageIndex(index),
    [index, table]
  );
  const current = table.getState().pagination.pageIndex === index;
  return (
    <PaginationItem>
      <PaginationLink
        aria-label={`Page ${index + 1}`}
        isActive={current}
        onClick={handleClick}
        render={<button type="button" />}
        size="sm"
      >
        {index + 1}
      </PaginationLink>
    </PaginationItem>
  );
}

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------

interface DataTableProps {
  /** Called with the selected booking IDs whenever the selection changes. */
  onSelectionChange?: (ids: string[]) => void;
  /** Rows per page. @default 5 */
  pageSize?: number;
}

/**
 * Bookings in a raised `Table` with sortable headers, a passenger filter,
 * a column visibility menu, row selection and pagination, all driven by
 * TanStack Table.
 */
export function DataTable({ onSelectionChange, pageSize = 5 }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns: COLUMNS,
    data: BOOKINGS,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize } },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: { columnFilters, columnVisibility, rowSelection, sorting },
  });

  useEffect(() => {
    onSelectionChange?.(Object.keys(rowSelection));
  }, [onSelectionChange, rowSelection]);

  const passenger = table.getColumn("passenger");
  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      passenger?.setFilterValue(event.target.value),
    [passenger]
  );

  const rows = table.getRowModel().rows;
  const pageCount = table.getPageCount();
  const selected = table.getFilteredSelectedRowModel().rows.length;
  const total = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <Input
          aria-label="Filter passengers"
          className="max-w-xs"
          onChange={handleFilter}
          placeholder="Filter passengers…"
          size="sm"
          value={(passenger?.getFilterValue() as string | undefined) ?? ""}
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="ms-auto"
                icon={<ColumnsIcon />}
                size="sm"
                variant="default"
              >
                Columns
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <ColumnToggle column={column} key={column.id} />
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table aria-label="Bookings" variant="raised">
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                let ariaSort: "ascending" | "descending" | undefined;
                if (sorted) {
                  ariaSort = sorted === "asc" ? "ascending" : "descending";
                }
                return (
                  <TableHead aria-sort={ariaSort} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                data-selected={row.getIsSelected() || undefined}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center text-muted-foreground"
                colSpan={table.getVisibleLeafColumns().length}
              >
                No bookings match.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="text-muted-foreground text-sm">
          {selected} of {total} row(s) selected.
        </p>
        <Pagination aria-label="Bookings pages" className="ms-auto w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={table.previousPage}
                render={
                  <button
                    disabled={!table.getCanPreviousPage()}
                    type="button"
                  />
                }
                size="sm"
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, index) => (
              <PageButton index={index} key={index} table={table} />
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={table.nextPage}
                render={
                  <button disabled={!table.getCanNextPage()} type="button" />
                }
                size="sm"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
