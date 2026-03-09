import express from 'express'
import { getAllOrders, updateOrderStatus } from '../controllers/orders.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, adminMiddleware, getAllOrders)
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus)
export default router
