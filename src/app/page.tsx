import { QueryClient } from "@tanstack/react-query";

import { getTasks } from "@/server/action";

import { tasks } from "@/data/tasks";
import { Resizable } from "@/templates";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    initialData: tasks,
  });

  return (
    <main className="h-screen max-h-screen w-screen max-w-full">
      <Resizable top={60} />
    </main>
  );
}
