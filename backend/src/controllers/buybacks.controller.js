import pool from '../config/db.js'
import { calculatePrices } from '../services/pricing.service.js'

export const createBuyback = async (req, res) => {
  const { isbn, condition } = req.body
  const userId = req.user.id

  if (!isbn || !condition) {
    return res.status(400).json({
      message: 'ISBN and condition are required'
    })
  }

  try {
    //Trouver le livre via l’ISBN
    const bookResult = await pool.query(
      'SELECT id, price_new_ref FROM books WHERE isbn = $1',
      [isbn]
    )

    const book = bookResult.rows[0]

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    }

    //Calcul des prix
    const { buyPrice, sellPrice } = calculatePrices(
      book.price_new_ref,
      condition
    )

    //Création de la demande de rachat
    const result = await pool.query(
      `
      INSERT INTO buybacks (user_id, book_id, condition, buy_price, sell_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [userId, book.id, condition, buyPrice, sellPrice]
    )

    res.status(201).json({
      message: 'Buyback request created',
      buyback: result.rows[0]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const getMyBuybacks = async (req, res) => {
  const userId = req.user.id

  try {
    const result = await pool.query(
      `
      SELECT
        bb.id,
        bb.condition,
        bb.buy_price,
        bb.sell_price,
        bb.status,
        bb.created_at,
        b.title,
        b.author,
        b.isbn
      FROM buybacks bb
      JOIN books b ON bb.book_id = b.id
      WHERE bb.user_id = $1
      ORDER BY bb.created_at DESC
      `,
      [userId]
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const getAllBuybacks = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        bb.id,
        bb.condition,
        bb.buy_price,
        bb.sell_price,
        bb.status,
        bb.created_at,
        u.email AS user_email,
        b.title,
        b.author,
        b.isbn
      FROM buybacks bb
      JOIN users u ON bb.user_id = u.id
      JOIN books b ON bb.book_id = b.id
      ORDER BY bb.created_at DESC
      `
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const validateBuyback = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({
      message: 'Invalid status'
    })
  }

  try {
    //Récupération du rachat
    const buybackResult = await pool.query(
      'SELECT * FROM buybacks WHERE id = $1',
      [id]
    )

    const buyback = buybackResult.rows[0]

    if (!buyback) {
      return res.status(404).json({
        message: 'Buyback not found'
      })
    }

    //Mise à jour du statut
    await pool.query(
      'UPDATE buybacks SET status = $1 WHERE id = $2',
      [status, id]
    )

    //Si accepté → gestion du stock
    if (status === 'accepted') {
      // vérifier si un book_item existe déjà
      const itemResult = await pool.query(
        `
        SELECT id, stock FROM book_items
        WHERE book_id = $1 AND condition = $2
        `,
        [buyback.book_id, buyback.condition]
      )

      if (itemResult.rows.length > 0) {
        // stock existant → +1
        const item = itemResult.rows[0]

        await pool.query(
          'UPDATE book_items SET stock = stock + 1 WHERE id = $1',
          [item.id]
        )
      } else {
        // pas encore en stock → création
        await pool.query(
          `
          INSERT INTO book_items (book_id, condition, buy_price, sell_price, stock)
          VALUES ($1, $2, $3, $4, 1)
          `,
          [
            buyback.book_id,
            buyback.condition,
            buyback.buy_price,
            buyback.sell_price
          ]
        )
      }
    }

    res.json({
      message: `Buyback ${status}`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const estimateBuyback = async (req, res) => {
  const { isbn, condition } = req.body

  if (!isbn || !condition) {
    return res.status(400).json({
      message: 'ISBN and condition are required'
    })
  }

  try {
    // Trouver le livre via ISBN
    const bookResult = await pool.query(
      'SELECT id, title, author, price_new_ref FROM books WHERE isbn = $1',
      [isbn]
    )

    const book = bookResult.rows[0]

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    }

    // Calcul des prix estimés
    const { buyPrice, sellPrice } = calculatePrices(
      book.price_new_ref,
      condition
    )

    // Retour estimation (sans insertion)
    res.json({
      isbn,
      title: book.title,
      author: book.author,
      condition,
      buy_price: buyPrice,
      sell_price: sellPrice
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}

