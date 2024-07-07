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
      message: 'Product created successfully!',
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
    const searchTerm = req.query.searchTerm
    const result = await ProductServices.getAllProductFromDB()
    if (req.query.searchTerm) {
      const filteredProducts = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm as string),
      )
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Products fetched successfully!',
        data: filteredProducts,
      })
    } else {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Products fetched successfully!',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId
    const result = await ProductServices.getSingleProductFromDB(id)
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product fetched successfully!',
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

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId
    const productData = req.body
    const result = await ProductServices.updateSignleProductFromDB(
      id,
      productData,
    )
    if (result.modifiedCount) {
      const result2 = await ProductServices.getSingleProductFromDB(id)
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Product updated successfully!',
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
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId
    await ProductServices.deleteSingleProductFromDB(id)
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  // searchProducts,
}
