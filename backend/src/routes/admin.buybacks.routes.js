import express from 'express'
import {
  getAllBuybacks,
  validateBuyback
} from '../controllers/buybacks.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

//pour le MVP : auth simple
router.get('/', authMiddleware, getAllBuybacks)
router.put('/:id', authMiddleware, validateBuyback)

export default router
