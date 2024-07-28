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
}

export function TaskAlert(props: DeleteTaskProps) {
  return (
    <AlertDialogResponsive open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogResponsiveContent>
        <AlertDialogResponsiveHeader>
          <AlertDialogResponsiveTitle>
            Are you absolutely sure?
          </AlertDialogResponsiveTitle>
          <AlertDialogResponsiveDescription>
            This action cannot be undone. This will permanently delete task from
            our servers.
          </AlertDialogResponsiveDescription>
        </AlertDialogResponsiveHeader>
        <AlertDialogResponsiveFooter>
          <AlertDialogResponsiveClose asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogResponsiveClose>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => props.setOpen(false)}
          >
            Delete
          </Button>
        </AlertDialogResponsiveFooter>
      </AlertDialogResponsiveContent>
    </AlertDialogResponsive>
  );
}
