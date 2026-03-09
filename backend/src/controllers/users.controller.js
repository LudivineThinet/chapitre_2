import pool from '../config/db.js'

export const getMe = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT
        id,
        email,
        role,
        first_name,
        last_name,
        birth_date
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateMe = async (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, birth_date } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        birth_date = $3
      WHERE id = $4
      RETURNING
        id,
        email,
        role,
        first_name,
        last_name,
        birth_date
      `,
      [
        first_name || null,
        last_name || null,
        birth_date || null,
        userId,
      ]
    );

    const user = result.rows[0];

    res.json(user);
  } catch (error) {
    console.error("Update me error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteMyAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [userId]
    );

    res.json({
      message: "Account deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};