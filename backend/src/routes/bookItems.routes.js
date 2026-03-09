import express from 'express'
import {
  getAllBookItems,
  getBookItemById
} from '../controllers/bookItems.controller.js'

const router = express.Router()

router.get('/', getAllBookItems)
router.get('/:id', getBookItemById)

export default router
