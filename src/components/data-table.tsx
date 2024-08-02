"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { useReadTasks } from "@/server/queries/tasks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/nextjs/components/ui/table";

import { DataTablePagination } from "@/nextjs/components/data-table/data-table-pagination";

import { Task } from "@/data/schema";

interface DataTableProps {
  columns: ColumnDef<Task>[];
  DataTableToolbar?: React.ElementType;
  pageSizes?: number[];
}

export function DataTable({
  columns,
  DataTableToolbar,
  pageSizes = [10, 20, 30, 40, 50],
}: DataTableProps) {
  const { data } = useReadTasks();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowCanExpand: () => true,
  });

  React.useEffect(() => {
    table.setPageSize(Number(pageSizes[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return (
    <div className="space-y-4">
      {DataTableToolbar ? <DataTableToolbar table={table} /> : null}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-secondary">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-secondary-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={`${row.id}-main`}>
                    <TableRow
                      key={`${row.id}-row`}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return ["select", "actions"].includes(
                          cell.column.id,
                        ) ? (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ) : (
                          <TableCell
                            key={cell.id}
                            onClick={row.getToggleExpandedHandler()}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow
                      key={`${row.id}-description`}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getIsExpanded() ? (
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="px-12 py-3"
                          key={row.id}
                        >
                          {(row.original as any).description}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pageSizes={pageSizes} />
    </div>
  );
}
