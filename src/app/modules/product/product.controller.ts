/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'
import { productSchemaValidation } from './product.validation'
import { Request, Response } from 'express'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParsedData = productSchemaValidation.parse(req.body)
    const result = await ProductServices.createProductIntoDB(zodParsedData)
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB()
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
}
