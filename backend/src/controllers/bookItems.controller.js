import pool from '../config/db.js'

export const getAllBookItems = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        bi.id,
        bi.condition,
        bi.buy_price,
        bi.sell_price,
        bi.stock,
        b.id AS book_id,
        b.title,
        b.author
      FROM book_items bi
      JOIN books b ON bi.book_id = b.id
      ORDER BY b.title
    `)

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const getBookItemById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
      SELECT 
        bi.id,
        bi.condition,
        bi.buy_price,
        bi.sell_price,
        bi.stock,
        b.id AS book_id,
        b.title,
        b.author
      FROM book_items bi
      JOIN books b ON bi.book_id = b.id
      WHERE bi.id = $1
      `,
      [id]
    )

    const bookItem = result.rows[0]

    if (!bookItem) {
      return res.status(404).json({
        message: 'Book item not found'
      })
    }

    res.json(bookItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
