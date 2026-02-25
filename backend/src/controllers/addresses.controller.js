import pool from "../config/db.js";

// 🔹 Récupérer les adresses du user connecté
export const getMyAddresses = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT id, full_name, street, city, postal_code,country, is_default, created_at
      FROM addresses
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// 🔹 Ajouter une adresse
export const createAddress = async (req, res) => {
  const userId = req.user.id;
  const { full_name, street, city, postal_code, country } = req.body;

  if (!full_name || !street || !city || !postal_code || !country) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO addresses (
        user_id,
        full_name,
        street,
        city,
        postal_code,
        country,
        is_default
      )
      VALUES ($1, $2, $3, $4, $5, $6, false)
      RETURNING *
      `,
      [userId, full_name, street, city, postal_code, country]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create address error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
// 🔹 Supprimer une adresse du user connecté
export const deleteAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.id;

  try {
    const result = await pool.query(
      `
      DELETE FROM addresses
      WHERE id = $1 AND user_id = $2
      RETURNING id
      `,
      [addressId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json({ message: "Address deleted" });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};