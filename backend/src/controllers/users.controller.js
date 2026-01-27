import pool from '../config/db.js'

export const getMe = async (req, res) => {
  // Authentification simulée
  const userId = 1

  try {
    const result = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [userId]
    )

    const user = result.rows[0]

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
