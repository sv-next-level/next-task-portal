import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTask } from "@/server/action";

export function useUpdateTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { taskId: string; data: any }) =>
      updateTask(variables.taskId, variables.data),

    onSuccess: () => {
      // Handle success
      toast.success("Task has been updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // queryClient.setQueryData(["tasks", {id: data.id}], data);
    },
    onError: () => {
      // Handle error
      toast.error("Failed to update task");
    },
  });
}
