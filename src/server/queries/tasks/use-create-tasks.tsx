import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createTask } from "@/server/action";

export function useCreateTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Handle success
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task has been created");
      // queryClient.setQueryData(["tasks", {id: data.id}], data);
    },
    onError: () => {
      // Handle error
      toast.error("Failed to create task");
    },
  });
}
