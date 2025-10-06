import z from "zod"

export const ItemIdSchema = z.object({
  itemId: z.string()
})