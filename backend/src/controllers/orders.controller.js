import pool from '../config/db.js'

export const createOrder = async (req, res) => {
  console.log("CREATE ORDER HIT");
  const userId = req.user.id
  const { items, address_id } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: 'Order items are required'
    })
  }
  if (!address_id) {
  return res.status(400).json({
    message: "Address is required"
  })
}

  try {
    let total = 0

    //Vérifier stock + calcul total
    for (const item of items) {
      const result = await pool.query(
        'SELECT sell_price, stock FROM book_items WHERE id = $1',
        [item.book_item_id]
      )

      const bookItem = result.rows[0]

      if (!bookItem) {
        return res.status(404).json({
          message: `Book item ${item.book_item_id} not found`
        })
      }

      if (bookItem.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for item ${item.book_item_id}`
        })
      }

      total += bookItem.sell_price * item.quantity
    }

    //Créer la commande
    const orderResult = await pool.query(
  `
  INSERT INTO orders (user_id, total, address_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `,
  [userId, total, address_id]
)

    const order = orderResult.rows[0]

    //Créer les lignes + diminuer le stock
    for (const item of items) {
      const bookItemResult = await pool.query(
        'SELECT sell_price FROM book_items WHERE id = $1',
        [item.book_item_id]
      )

      const unitPrice = bookItemResult.rows[0].sell_price

      // ligne de commande
      await pool.query(
        `
        INSERT INTO order_items (order_id, book_item_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4)
        `,
        [order.id, item.book_item_id, item.quantity, unitPrice]
      )

      // stock - quantity
      await pool.query(
        `
        UPDATE book_items
        SET stock = stock - $1
        WHERE id = $2
        `,
        [item.quantity, item.book_item_id]
      )
    }

    res.status(201).json({
      message: 'Order created',
      order
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}


export const getMyOrders = async (req, res) => {
  const userId = req.user.id

  try {
    const result = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        o.id,
        o.total,
        o.status,
        o.created_at,
        u.email AS user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      `
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}
