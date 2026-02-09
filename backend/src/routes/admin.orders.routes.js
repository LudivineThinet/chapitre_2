import express from 'express'
import { getAllOrders } from '../controllers/orders.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, adminMiddleware, getAllOrders)

export default router
