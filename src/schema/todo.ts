import * as z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .max(100, { message: "Max 100 characters are allowed" }),
  expiry: z.date().max(new Date(), {
    message: "Expire date should be in the future",
  }),
});
