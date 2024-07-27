"use client";

import { Table } from "@tanstack/react-table";

import { CrossIcon } from "@/nextjs/assets";

import { Button } from "@/nextjs/components/ui/button";
import { Input } from "@/nextjs/components/ui/input";

import { AddTask } from "@/components/task-add";
import { DataTableFacetedFilter } from "@/nextjs/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/nextjs/components/data-table/data-table-view-options";

import { priorities, statuses } from "@/data/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center overflow-x-scroll p-px">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={table.getColumn("title")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 size-4" />
          </Button>
        )}
        <div className="flex flex-1 justify-end space-x-2">
          <AddTask />
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
