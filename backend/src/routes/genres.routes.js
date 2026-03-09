import express from 'express'
import { getAllGenres } from '../controllers/genres.controller.js'

const router = express.Router()

router.get('/', getAllGenres)

export default router
