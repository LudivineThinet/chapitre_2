import pool from '../config/db.js'
import { calculatePrices } from '../services/pricing.service.js'

export const createBookItem = async (req, res) => {
  const { book_id, condition, stock } = req.body

  if (!book_id || !condition || stock === undefined) {
    return res.status(400).json({
      message: 'book_id, condition and stock are required'
    })
  }

  try {
    // 1️⃣ Récupérer le prix neuf depuis books
    const bookResult = await pool.query(
      'SELECT price_new_ref FROM books WHERE id = $1',
      [book_id]
    )

    const book = bookResult.rows[0]

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    }

    // 2️⃣ Calcul automatique des prix
    const { buyPrice, sellPrice } = calculatePrices(
      book.price_new_ref,
      condition
    )

    // 3️⃣ Vérifier si un item existe déjà (même book + même état)
    const existingItem = await pool.query(
      `
      SELECT id, stock FROM book_items
      WHERE book_id = $1 AND condition = $2
      `,
      [book_id, condition]
    )

    if (existingItem.rows.length > 0) {
      // stock existant → on ajoute
      const item = existingItem.rows[0]

      const updated = await pool.query(
        `
        UPDATE book_items
        SET stock = stock + $1
        WHERE id = $2
        RETURNING *
        `,
        [stock, item.id]
      )

      return res.json({
        message: 'Book item stock updated',
        bookItem: updated.rows[0]
      })
    }

    // 4️⃣ Sinon → création
    const result = await pool.query(
      `
      INSERT INTO book_items (book_id, condition, buy_price, sell_price, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [book_id, condition, buyPrice, sellPrice, stock]
    )

    res.status(201).json({
      message: 'Book item created',
      bookItem: result.rows[0]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
