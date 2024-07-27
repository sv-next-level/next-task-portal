import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  due: z.number(),
  priority: z.string(),
  description: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
