import { z } from 'zod'

export const variantSchemaValidation = z.object({
  type: z.string(),
  value: z.string(),
})

export const inventorySchemaValidation = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

export const productSchemaValidation = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchemaValidation),
  inventory: inventorySchemaValidation,
})
