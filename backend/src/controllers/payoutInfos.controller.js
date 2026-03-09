import pool from "../config/db.js";

// 🔹 Récupérer l'IBAN du user connecté
export const getMyPayoutInfo = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT id, iban, account_holder, created_at
      FROM payout_infos
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json(result.rows[0] || null);
  } catch (error) {
    console.error("Get payout info error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// 🔹 Créer ou mettre à jour (UPSERT)
export const upsertMyPayoutInfo = async (req, res) => {
  const userId = req.user.id;
  const { iban, account_holder } = req.body;

  if (!iban || !account_holder) {
    return res.status(400).json({
      message: "IBAN and account holder are required",
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO payout_infos (user_id, iban, account_holder)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET
        iban = EXCLUDED.iban,
        account_holder = EXCLUDED.account_holder
      RETURNING id, iban, account_holder, created_at
      `,
      [userId, iban, account_holder]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Upsert payout info error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};