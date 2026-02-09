import express from 'express'
import { createCheckoutSession } from '../controllers/payments.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/create-checkout-session', authMiddleware, createCheckoutSession)

export default router
