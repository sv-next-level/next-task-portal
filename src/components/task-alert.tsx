"use client";

import {
  AlertDialogResponsive,
  AlertDialogResponsiveClose,
  AlertDialogResponsiveContent,
  AlertDialogResponsiveDescription,
  AlertDialogResponsiveFooter,
  AlertDialogResponsiveHeader,
  AlertDialogResponsiveTitle,
} from "@/nextjs/components/ui/alert-dialog-responsive";
import { Button } from "@/nextjs/components/ui/button";

interface DeleteTaskProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => any;
}

export function TaskAlert(props: DeleteTaskProps) {
  return (
    <AlertDialogResponsive open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogResponsiveContent>
        <AlertDialogResponsiveHeader>
          <AlertDialogResponsiveTitle className="mb-3 md:mb-0">
            Are you absolutely sure?
          </AlertDialogResponsiveTitle>
          <AlertDialogResponsiveDescription className="max-h-96 overflow-scroll">
            <p className="flex text-left">
              This action cannot be undone. This will permanently delete task
              from our servers.
            </p>
          </AlertDialogResponsiveDescription>
        </AlertDialogResponsiveHeader>
        <AlertDialogResponsiveFooter>
          <AlertDialogResponsiveClose asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogResponsiveClose>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => {
              props.onConfirm();
              props.setOpen(false);
            }}
          >
            Delete
          </Button>
        </AlertDialogResponsiveFooter>
      </AlertDialogResponsiveContent>
    </AlertDialogResponsive>
  );
}
