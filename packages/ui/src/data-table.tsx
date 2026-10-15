"use client";

import {
  type Column,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type Table as TableInstance,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown as ArrowDownIcon,
  ArrowUpDown as ArrowUpDownIcon,
  ArrowUp as ArrowUpIcon,
  Columns3 as ColumnsIcon,
} from "lucide-react";
import type * as React from "react";
import { useCallback } from "react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input, type InputProps } from "./input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  type TableProps,
  TableRow,
} from "./table";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// useDataTable
// ---------------------------------------------------------------------------

type UseDataTableOptions<TData> = Omit<TableOptions<TData>, "getCoreRowModel"> &
  Partial<Pick<TableOptions<TData>, "getCoreRowModel">> & {
    /**
     * Rows per page.
     * @default 10
     */
    pageSize?: number;
  };

/**
 * A TanStack table with sorting, filtering, pagination, row selection and
 * column visibility switched on. State is kept internally; pass `state` and
 * the matching `on*Change` options to control any part of it.
 */
function useDataTable<TData>({
  initialState,
  pageSize = 10,
  ...options
}: UseDataTableOptions<TData>) {
  return useReactTable<TData>({
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...options,
    initialState: {
      ...initialState,
      pagination: { pageIndex: 0, pageSize, ...initialState?.pagination },
    },
  });
}

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------

interface DataTableProps<TData> extends Omit<TableProps, "children"> {
  /** Shown in a full-width row when no rows match. */
  emptyMessage?: React.ReactNode;
  /** The instance from `useDataTable` (or `useReactTable`). */
  table: TableInstance<TData>;
}

function sortOrder(column: Column<unknown>) {
  const sorted = column.getIsSorted();
  if (!sorted) {
    return;
  }
  return sorted === "asc" ? "ascending" : "descending";
}

/**
 * Draws a table instance as a `Table`: header cells carry `aria-sort` while
 * sorted, selected rows take the primary tint and edge bar, and an empty
 * result shows `emptyMessage`. Name it with `aria-label`.
 */
function DataTable<TData>({
  className,
  emptyMessage = "No results.",
  table,
  variant = "raised",
  ...props
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  return (
    <Table
      className={className}
      data-slot="data-table"
      variant={variant}
      {...props}
    >
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead
                aria-sort={sortOrder(header.column as Column<unknown>)}
                colSpan={header.colSpan > 1 ? header.colSpan : undefined}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length > 0 ? (
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
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// ---------------------------------------------------------------------------
// DataTableColumnHeader
// ---------------------------------------------------------------------------

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<"div"> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * A header label. On a sortable column it's a ghost button that cycles
 * ascending → descending and turns primary while sorted, with an arrow
 * showing the order.
 */
function DataTableColumnHeader<TData, TValue>({
  className,
  column,
  title,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();
  const toggle = useCallback(
    () => column.toggleSorting(sorted === "asc"),
    [column, sorted]
  );
  if (!column.getCanSort()) {
    return (
      <div
        className={className}
        data-slot="data-table-column-header"
        {...props}
      >
        {title}
      </div>
    );
  }
  let icon = <ArrowUpDownIcon />;
  if (sorted === "asc") {
    icon = <ArrowUpIcon />;
  } else if (sorted === "desc") {
    icon = <ArrowDownIcon />;
  }
  return (
    <div className={className} data-slot="data-table-column-header" {...props}>
      <Button
        className="-ms-3 font-semibold text-xs data-sorted:text-primary"
        data-sorted={sorted || undefined}
        icon={icon}
        iconPosition="end"
        onClick={toggle}
        size="sm"
        variant="ghost"
      >
        {title}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Row selection
// ---------------------------------------------------------------------------

interface DataTableSelectAllProps<TData> {
  /** @default "Select all on this page" */
  "aria-label"?: string;
  table: TableInstance<TData>;
}

/** A checkbox selecting every row on the page; indeterminate when some are. */
function DataTableSelectAll<TData>({
  "aria-label": ariaLabel = "Select all on this page",
  table,
}: DataTableSelectAllProps<TData>) {
  const all = table.getIsAllPageRowsSelected();
  const toggle = useCallback(
    (checked: boolean) => table.toggleAllPageRowsSelected(checked),
    [table]
  );
  return (
    <Checkbox
      aria-label={ariaLabel}
      checked={all}
      data-slot="data-table-select-all"
      indeterminate={table.getIsSomePageRowsSelected() && !all}
      onCheckedChange={toggle}
      size="sm"
    />
  );
}

interface DataTableSelectRowProps<TData> {
  /** Names the checkbox, e.g. "Select Carla Reis". */
  "aria-label": string;
  row: Row<TData>;
}

/** A checkbox selecting one row. */
function DataTableSelectRow<TData>({
  "aria-label": ariaLabel,
  row,
}: DataTableSelectRowProps<TData>) {
  const toggle = useCallback(
    (checked: boolean) => row.toggleSelected(checked),
    [row]
  );
  return (
    <Checkbox
      aria-label={ariaLabel}
      checked={row.getIsSelected()}
      data-slot="data-table-select-row"
      disabled={!row.getCanSelect()}
      onCheckedChange={toggle}
      size="sm"
    />
  );
}

// ---------------------------------------------------------------------------
// DataTableFilter
// ---------------------------------------------------------------------------

interface DataTableFilterProps<TData, TValue>
  extends Omit<InputProps, "onChange" | "value" | "defaultValue"> {
  column: Column<TData, TValue> | undefined;
}

/** A text input filtering one column. Name it with `aria-label`. */
function DataTableFilter<TData, TValue>({
  className,
  column,
  size = "sm",
  ...props
}: DataTableFilterProps<TData, TValue>) {
  const change = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      column?.setFilterValue(event.target.value),
    [column]
  );
  return (
    <Input
      className={cn("max-w-xs", className)}
      data-slot="data-table-filter"
      onChange={change}
      size={size}
      value={(column?.getFilterValue() as string | undefined) ?? ""}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// DataTableViewOptions
// ---------------------------------------------------------------------------

function columnLabel<TData>(
  column: Column<TData>,
  labels: Record<string, string> | undefined
) {
  const header = column.columnDef.header;
  return (
    labels?.[column.id] ?? (typeof header === "string" ? header : column.id)
  );
}

function ColumnToggle<TData>({
  column,
  label,
}: {
  column: Column<TData>;
  label: string;
}) {
  const toggle = useCallback(
    (checked: boolean) => column.toggleVisibility(checked),
    [column]
  );
  return (
    <DropdownMenuCheckboxItem
      checked={column.getIsVisible()}
      onCheckedChange={toggle}
    >
      {label}
    </DropdownMenuCheckboxItem>
  );
}

interface DataTableViewOptionsProps<TData> {
  className?: string;
  /**
   * Menu labels by column id. Falls back to a string `header`, then the id.
   */
  labels?: Record<string, string>;
  table: TableInstance<TData>;
}

/** A "Columns" menu of checkbox items that show and hide columns. */
function DataTableViewOptions<TData>({
  className,
  labels,
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={cn("ms-auto", className)}
            data-slot="data-table-view-options"
            icon={<ColumnsIcon />}
            size="sm"
          >
            Columns
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ColumnToggle
              column={column}
              key={column.id}
              label={columnLabel(column, labels)}
            />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// DataTablePagination
// ---------------------------------------------------------------------------

const GAP = -1;

/** Page indexes to show: all of them up to 7, else ends and neighbours. */
function pageWindow(current: number, count: number) {
  if (count <= 7) {
    return Array.from({ length: count }, (_, index) => index);
  }
  const pages = new Set([0, count - 1, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((page) => page >= 0 && page < count)
    .sort((a, b) => a - b);
  const result: number[] = [];
  for (const page of sorted) {
    const previous = result.at(-1);
    if (previous !== undefined && page - previous > 1) {
      result.push(GAP);
    }
    result.push(page);
  }
  return result;
}

function PageButton<TData>({
  index,
  table,
}: {
  index: number;
  table: TableInstance<TData>;
}) {
  const go = useCallback(() => table.setPageIndex(index), [index, table]);
  return (
    <PaginationItem>
      <PaginationLink
        aria-label={`Page ${index + 1}`}
        isActive={table.getState().pagination.pageIndex === index}
        onClick={go}
        render={<button type="button" />}
        size="sm"
      >
        {index + 1}
      </PaginationLink>
    </PaginationItem>
  );
}

interface DataTablePaginationProps<TData>
  extends Omit<React.ComponentProps<"div">, "children"> {
  /**
   * Names the page navigation.
   * @default "Pagination"
   */
  label?: string;
  /**
   * Shows "n of m row(s) selected." (announced politely) on the left.
   * @default false
   */
  showSelection?: boolean;
  table: TableInstance<TData>;
}

/**
 * Previous/next and page buttons (the current page pressed in, long ranges
 * collapsed with an ellipsis), optionally with the selection count.
 */
function DataTablePagination<TData>({
  className,
  label,
  showSelection = false,
  table,
  ...props
}: DataTablePaginationProps<TData>) {
  const pages = pageWindow(
    table.getState().pagination.pageIndex,
    table.getPageCount()
  );
  const selected = table.getFilteredSelectedRowModel().rows.length;
  const total = table.getFilteredRowModel().rows.length;
  let gaps = 0;
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      data-slot="data-table-pagination"
      {...props}
    >
      {showSelection ? (
        <p aria-live="polite" className="text-muted-foreground text-sm">
          {selected} of {total} row(s) selected.
        </p>
      ) : null}
      <Pagination aria-label={label} className="ms-auto w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={table.previousPage}
              render={
                <button disabled={!table.getCanPreviousPage()} type="button" />
              }
              size="sm"
            />
          </PaginationItem>
          {pages.map((page) => {
            if (page === GAP) {
              gaps += 1;
              return (
                <PaginationItem key={`gap-${gaps}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return <PageButton index={page} key={page} table={table} />;
          })}
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
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  DataTableColumnHeaderProps,
  DataTableFilterProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableSelectAllProps,
  DataTableSelectRowProps,
  DataTableViewOptionsProps,
  UseDataTableOptions,
};
export {
  DataTable,
  DataTableColumnHeader,
  DataTableFilter,
  DataTablePagination,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTableViewOptions,
  useDataTable,
};
