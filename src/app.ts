import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
// app.use('/api/v1/students', StudentRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
