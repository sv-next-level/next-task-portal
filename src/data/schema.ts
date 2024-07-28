import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  due: z.number(),
  title: z.string(),
  status: z.string().optional(),
  priority: z.string(),
  description: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
