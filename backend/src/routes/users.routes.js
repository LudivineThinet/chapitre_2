import express from 'express'
import { getMe, updateMe } from '../controllers/users.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/me', authMiddleware, getMe)
router.put('/me', authMiddleware, updateMe)

export default router
