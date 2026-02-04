import express from 'express'
import { createBook } from '../controllers/admin.books.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'

const router = express.Router()

router.post('/', authMiddleware, adminMiddleware, createBook)

export default router
