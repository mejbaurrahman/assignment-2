import express, { Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'
import { StatusCodes } from 'http-status-codes'

const app = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('*', function (req, res) {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
