import pool from '../config/db.js'

export const getAllGenres = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM genres
      ORDER BY name ASC
      `
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
