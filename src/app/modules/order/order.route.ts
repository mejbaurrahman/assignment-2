import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.post('/', OrderControllers.createOrder)
router.get('/', OrderControllers.getAllOrders)
// router.get('/:productId', ProductControllers.getSingleProduct)
// router.put('/:productId', ProductControllers.updateSingleProduct)
// router.delete('/:productId', ProductControllers.deleteSingleProduct)

export const OrderRoutes = router
