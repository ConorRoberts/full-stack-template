import * as z from "zod"

export const TodoModel = z.object({
  id: z.number().int(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  creationLatency: z.number().nullish(),
})
