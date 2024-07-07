/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'

import { Request, Response } from 'express'
import { orderSchemaValidation } from './order.validation'
import { OrderServices } from './order.service'

import { ProductServices } from '../product/product.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body
    const zodParsedData = orderSchemaValidation.parse(req.body)
    const product = await ProductServices.getSingleProductFromDB(productId)
    if ((product?.inventory?.quantity as number) - quantity < 0) {
      res.status(StatusCodes.OK).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    } else {
      const result = await OrderServices.createOrderIntoDB(zodParsedData)

      if ((product?.inventory?.quantity as number) - quantity == 0) {
        await ProductServices.updateSignleProductFromDB(productId, {
          inStock: false,
        })
      }
      if ((product?.inventory?.quantity as number) - quantity > 0) {
        await ProductServices.updateSignleProductFromDB(productId, {
          quantity: (product?.inventory?.quantity as number) - quantity,
        })
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    }
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.email
    const result2 = await OrderServices.getAllOrderFromDB()
    if (req.query.email) {
      const result = await OrderServices.getAllOrderUsingEmailFromDB(
        searchTerm as string,
      )
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result2,
      })
    }
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrders,
}
