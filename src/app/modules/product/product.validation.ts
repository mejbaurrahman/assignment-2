import { z } from 'zod'

export const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
})

export const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
})
