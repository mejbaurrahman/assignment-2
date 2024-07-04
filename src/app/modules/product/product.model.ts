import { Schema } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>({
  name: {
    type: 'string',
    required: true,
  },
  description: { type: 'string', required: true },
})
