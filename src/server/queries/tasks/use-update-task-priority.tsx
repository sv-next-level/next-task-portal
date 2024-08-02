import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTaskPriority } from "@/server/action";

export function useUpdateTaskPriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { taskId: string; data: any }) =>
      updateTaskPriority(variables.taskId, variables.data),

    onSuccess: () => {
      // Handle success
      toast.success("Task priority has been updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // queryClient.setQueryData(["tasks", {id: data.id}], data);
    },
    onError: () => {
      // Handle error
      toast.error("Failed to update task priority");
    },
  });
}
