"use client";

import React from "react";
import { Row } from "@tanstack/react-table";

import { EllipsisHorizontalIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { AlertDialog } from "@/nextjs/components/ui/alert-dialog";
import { AlertDialogResponsiveTrigger } from "@/nextjs/components/ui/alert-dialog-responsive";
import { Button } from "@/nextjs/components/ui/button";
import {
  DialogResponsive,
  DialogResponsiveTrigger,
} from "@/nextjs/components/ui/dialog-responsive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/nextjs/components/ui/dropdown-menu";

import { DeleteTask } from "@/components/task-delete";
import { TaskModal } from "@/components/task-modal";

import { priorities, statuses } from "@/data/data";
import { taskSchema } from "@/data/schema";
import { getPriorityColor, getStatusColor } from "@/functions";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <DialogResponsive open={openEdit} onOpenChange={setOpenEdit}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <EllipsisHorizontalIcon className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => setOpenEdit((prev) => !prev)}>
              <DialogResponsiveTrigger asChild>
                <p>Edit</p>
              </DialogResponsiveTrigger>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={task.status}>
                  {statuses.map((item) => (
                    <DropdownMenuRadioItem key={item.label} value={item.value}>
                      <div className="flex w-[100px] items-center">
                        {item.icon && (
                          <item.icon
                            className={cn(
                              "mr-2 size-4",
                              getStatusColor(item.value),
                            )}
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={task.priority}>
                  {priorities.map((item) => (
                    <DropdownMenuRadioItem key={item.label} value={item.value}>
                      <div className="flex w-[100px] items-center">
                        {item.icon && (
                          <item.icon
                            className={cn(
                              "mr-2 size-4",
                              getPriorityColor(item.value),
                            )}
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenDelete((prev) => !prev)}>
              <AlertDialogResponsiveTrigger asChild>
                <p>Delete</p>
              </AlertDialogResponsiveTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TaskModal task={task} />
        <DeleteTask open={openDelete} setOpen={setOpenDelete} />
      </AlertDialog>
    </DialogResponsive>
  );
}
