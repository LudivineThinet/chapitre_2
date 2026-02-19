import pool from '../config/db.js'

export const createBook = async (req, res) => {
  const {
    isbn,
    title,
    author,
    price_new_ref,
    summary,
    image_url,
    format,
    genres
  } = req.body

  // Vérification des champs obligatoires
  if (
    !isbn ||
    !title ||
    !author ||
    !price_new_ref ||
    !summary ||
    !image_url ||
    !format
  ) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  // Vérification genres obligatoire
  if (!genres || genres.length === 0) {
    return res.status(400).json({
      message: 'At least one genre is required'
    })
  }

  try {
    // Vérification si le livre existe déjà
    const existingBook = await pool.query(
      'SELECT id FROM books WHERE isbn = $1',
      [isbn]
    )

    if (existingBook.rows.length > 0) {
      return res.status(409).json({
        message: 'Book already exists'
      })
    }

    // Création du livre
    const result = await pool.query(
      `
      INSERT INTO books (isbn, title, author, price_new_ref, summary, image_url, format)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [isbn, title, author, price_new_ref, summary, image_url, format]
    )

    const newBook = result.rows[0]

    // Insertion des genres dans la table pivot
    for (const genreId of genres) {
      await pool.query(
        `
        INSERT INTO book_genres (book_id, genre_id)
        VALUES ($1, $2)
        `,
        [newBook.id, genreId]
      )
    }

    // Réponse finale
    res.status(201).json({
      message: 'Book created',
      book: newBook,
      genres
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
}

export const getAllAdminBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id,
        b.title,
        b.author,
        b.isbn,
        b.price_new_ref,
        b.summary,
        b.image_url,
        b.format,
        ARRAY_AGG(DISTINCT g.name) AS genres
      FROM books b
      LEFT JOIN book_genres bg ON bg.book_id = b.id
      LEFT JOIN genres g ON g.id = bg.genre_id
      GROUP BY b.id
      ORDER BY b.title ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


