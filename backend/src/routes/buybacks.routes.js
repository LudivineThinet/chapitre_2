import express from 'express'
import {
  createBuyback,
  getMyBuybacks,
  estimateBuyback
} from '../controllers/buybacks.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()


router.post('/', authMiddleware, createBuyback)
router.post("/estimate", estimateBuyback)
router.get('/me', authMiddleware, getMyBuybacks)

export default router
