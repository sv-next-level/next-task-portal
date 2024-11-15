"use client";

import React from "react";
import type { Row } from "@tanstack/table-core";

import { useDeleteTasks } from "@/server/queries/tasks";
import { TrashIcon } from "@/nextjs/assets";

import {
  AlertDialogResponsive,
  AlertDialogResponsiveTrigger,
} from "@/nextjs/components/ui/alert-dialog-responsive";
import { Button } from "@/nextjs/components/ui/button";
import { DialogResponsive } from "@/nextjs/components/ui/dialog-responsive";

import { TaskAlert } from "@/components/task-alert";

import { Task } from "@/data/schema";

interface DeleteTaskProps {
  selected: Row<any>[];
}

export function DeleteTask(props: DeleteTaskProps) {
  const count = props.selected.length;
  const { mutate } = useDeleteTasks();
  const [open, setOpen] = React.useState(false);

  const deleteTasksOnConfirm = () => {
    const taskIds = props.selected.map(
      (task) => (task.original as Task).id as string,
    );
    mutate(taskIds);
  };

  return (
    <DialogResponsive>
      <AlertDialogResponsive>
        <AlertDialogResponsiveTrigger>
          <Button
            size="sm"
            variant={"destructive"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <TrashIcon className="mr-2 size-4" />
            <span className="pt-0.5">Delete({count})</span>
          </Button>
        </AlertDialogResponsiveTrigger>
        <TaskAlert
          open={open}
          setOpen={setOpen}
          onConfirm={deleteTasksOnConfirm}
        />
      </AlertDialogResponsive>
    </DialogResponsive>
  );
}
