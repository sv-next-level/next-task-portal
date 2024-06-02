import * as z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  expiry: z.date(),
  description: z
    .string()
    .max(5000, { message: "Max 500 characters are allowed" }),
});
