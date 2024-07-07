import { z } from 'zod'

export const orderSchemaValidation = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
})
