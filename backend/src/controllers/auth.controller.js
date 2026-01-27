import pool from '../config/db.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  try {
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, role',
      [email, password]
    )

    res.status(201).json({
      message: 'User registered',
      user: result.rows[0]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  try {
    const result = await pool.query(
      'SELECT id, email, password, role FROM users WHERE email = $1',
      [email]
    )

    const user = result.rows[0]

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    res.json({
      message: 'User logged in',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
