import pool from '../config/db.js'

export const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, isbn, title, author, price_new_ref, summary, image_url FROM books ORDER BY title'
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}

export const getBookById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'SELECT id, isbn, title, author, price_new_ref FROM books WHERE id = $1',
      [id]
    )

    const book = result.rows[0]

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    }

    res.json(book)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
