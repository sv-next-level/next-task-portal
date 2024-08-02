import { useQuery } from "@tanstack/react-query";

import { getTasks } from "@/server/action";

export function useReadTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    initialData: [],
  });
}
