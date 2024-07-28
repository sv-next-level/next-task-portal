"use client";

import React from "react";

import { PlusIcon } from "@/nextjs/assets";

import { Button } from "@/nextjs/components/ui/button";
import {
  DialogResponsive,
  DialogResponsiveTrigger,
} from "@/nextjs/components/ui/dialog-responsive";

import { TaskModal } from "@/components/task-modal";

export function AddTask() {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogResponsive open={open} onOpenChange={setOpen}>
      <DialogResponsiveTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 size-4" />
          Add
        </Button>
      </DialogResponsiveTrigger>
      <TaskModal setOpen={setOpen} />
    </DialogResponsive>
  );
}
