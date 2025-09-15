import { Router } from 'express'
import productRouter from './product.router.js'
import authRouter from './auth.router.js'
import noticeRouter from './notice.router.js'

const r = Router()

r.use('/products', productRouter)
r.use('/auth', authRouter)
r.use('/notices', noticeRouter)

// TODO: add routers for users, orders, campaigns, tickets

export default r
