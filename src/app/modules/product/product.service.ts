import { TProduct } from './product.interface'
import { Product } from './product.model'
import { Types } from 'mongoose'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData)
  return result
}

const getAllProductFromDB = async () => {
  const result = await Product.find()
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: new Types.ObjectId(id) })
  return result
}
const updateSignleProductFromDB = async (id: string, productData: TProduct) => {
  const result = await Product.updateOne(
    { _id: new Types.ObjectId(id) },
    productData,
  )
  return result
}
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSignleProductFromDB,
}
