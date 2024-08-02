import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteTasks } from "@/server/action";

export function useDeleteTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTasks,
    onSuccess: () => {
      // Handle success
      toast.success("Task(s) has been deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // queryClient.setQueryData(["tasks", {id: data.id}], data);
    },
    onError: () => {
      // Handle error
      toast.error("Failed to delete task(s)");
    },
  });
}
