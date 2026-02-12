import pool from '../config/db.js'

export const getAllBooks = async (req, res) => {
  const { genre } = req.query

  try {
    let query = `
      SELECT
        b.id,
        b.title,
        b.author,
        b.image_url,
        b.format,
        MIN(bi.sell_price) AS starting_price,
        ARRAY_AGG(DISTINCT g.name) AS genres
      FROM books b
      JOIN book_items bi ON bi.book_id = b.id
      LEFT JOIN book_genres bg ON bg.book_id = b.id
      LEFT JOIN genres g ON g.id = bg.genre_id
      WHERE bi.stock > 0
    `

    const values = []

    // Filtre genre optionnel
    if (genre) {
      query += ` AND g.name = $1 `
      values.push(genre)
    }

    query += `
      GROUP BY b.id
      ORDER BY b.title ASC
    `

    const result = await pool.query(query, values)

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}



export const getBookById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
      SELECT
        b.*,
        ARRAY_AGG(DISTINCT g.name) AS genres
      FROM books b
      LEFT JOIN book_genres bg ON bg.book_id = b.id
      LEFT JOIN genres g ON g.id = bg.genre_id
      WHERE b.id = $1
      GROUP BY b.id
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}


export const getBookItemsByBookId = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
      SELECT
        bi.id,
        bi.condition,
        bi.sell_price,
        bi.stock
      FROM book_items bi
      WHERE bi.book_id = $1
        AND bi.stock > 0
      ORDER BY bi.sell_price ASC
      `,
      [id]
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
