"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronDownIcon, ChevronRightIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Checkbox } from "@/nextjs/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";

import { priorities, statuses } from "@/data/data";
import { Task } from "@/data/schema";
import { getPriorityColor, getStatusColor } from "@/functions";
import { Button } from "@/shared/nextjs/src/components/ui/button";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          onClick={() => row.getToggleExpandedHandler()}
          className="p-0 hover:bg-inherit"
          variant="ghost"
        >
          {row.getIsExpanded() ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronRightIcon className="size-4" />
          )}
        </Button>
      ) : null;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status: any) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={cn("mr-2 size-4", getStatusColor(status.value))}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    // cell: info => info.getValue(),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority: any) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon
              className={cn("mr-2 size-4", getPriorityColor(priority.value))}
            />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    // accessorFn: row => row.priority,
  },
  {
    accessorKey: "due",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    // cell: info => info.getValue(),
    cell: ({ row }) => {
      const date: string = new Date(row.getValue("due")).toLocaleDateString();
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{date}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
