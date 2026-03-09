import express from 'express'
import {
  getAllBooks,
  getBookById,
  getBookItemsByBookId
} from '../controllers/books.controller.js'

const router = express.Router()

// Catalogue : tous les livres
router.get('/', getAllBooks)

// Offres disponibles pour un livre (états/prix)
router.get('/:id/items', getBookItemsByBookId)

// Détail d’un livre (fiche complète)
router.get('/:id', getBookById)

export default router
