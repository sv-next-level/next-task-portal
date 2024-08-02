import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTaskStatus } from "@/server/action";

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { taskId: string; data: any }) =>
      updateTaskStatus(variables.taskId, variables.data),

    onSuccess: () => {
      // Handle success
      toast.success("Task status has been updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // queryClient.setQueryData(["tasks", {id: data.id}], data);
    },
    onError: () => {
      // Handle error
      toast.error("Failed to update task status");
    },
  });
}
