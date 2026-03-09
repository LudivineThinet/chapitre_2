import express from 'express'
import { getMe, updateMe, deleteMyAccount } from '../controllers/users.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/me', authMiddleware, getMe)
router.put('/me', authMiddleware, updateMe)
router.delete('/me', authMiddleware, deleteMyAccount)

export default router
