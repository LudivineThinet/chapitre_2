import express from 'express'
import {
  createOrder,
  getMyOrders
} from '../controllers/orders.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', authMiddleware, createOrder)
router.get('/me', authMiddleware, getMyOrders)

export default router
