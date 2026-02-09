import pool from '../config/db.js'

export const createBook = async (req, res) => {
  const { isbn, title, author, price_new_ref, summary, image_url } = req.body

  if (!isbn || !title || !author || !price_new_ref || !summary || !image_url) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  try {
    // Vérification si le livre existe déjà
    const existingBook = await pool.query(
      'SELECT id FROM books WHERE isbn = $1',
      [isbn]
    )

    if (existingBook.rows.length > 0) {
      return res.status(409).json({
        message: 'Book already exists'
      })
    }

    const result = await pool.query(
      `
      INSERT INTO books (isbn, title, author, price_new_ref, summary, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)

      RETURNING *
      `,
      [isbn, title, author, price_new_ref, summary, image_url]
    )

    res.status(201).json({
      message: 'Book created',
      book: result.rows[0]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
