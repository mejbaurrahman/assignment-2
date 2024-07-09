/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder } from './order.interface'
import { Order } from './order.model'

// import { Types } from 'mongoose'

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData)
  return result
}

const getAllOrderFromDB = async () => {
  const result = await Order.find({})
  return result
}

const getAllOrderUsingEmailFromDB = async (email: string) => {
  const result = await Order.find({ email: email })
  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderUsingEmailFromDB,
  getAllOrderFromDB,
}
