import { useEffect, useState } from "react";
import "./AdminBooksTab.css";

function AdminBooksTab() {
  const [books, setBooks] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [error, setError] = useState("");
  const [selectedSummary, setSelectedSummary] = useState(null);

  // 🔥 édition via modal
  const [editingBook, setEditingBook] = useState(null);

  // ================= MODAL AJOUT =================
  const [showAddModal, setShowAddModal] = useState(false);

  // ================= AJOUT =================
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    price_new_ref: "",
    summary: "",
    image_url: "",
    format: "",
    genres: [],
  });

  // ================= EDIT =================
  const [editForm, setEditForm] = useState({
    isbn: "",
    title: "",
    author: "",
    price_new_ref: "",
    summary: "",
    image_url: "",
    format: "",
    genres: [],
  });

  // ============================
  // Charger les livres
  // ============================
  async function loadBooks() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/admin/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur chargement livres");
      }

      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // ============================
  // Charger les genres
  // ============================
  async function loadGenres() {
    try {
      const response = await fetch("http://localhost:3000/genres");
      const data = await response.json();
      setGenresList(data);
    } catch (err) {
      console.error("Erreur chargement genres");
    }
  }

  // ============================
  // AJOUT livre
  // ============================
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/admin/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Livre ajouté !");
      loadBooks();
      setShowAddModal(false);

      setForm({
        isbn: "",
        title: "",
        author: "",
        price_new_ref: "",
        summary: "",
        image_url: "",
        format: "",
        genres: [],
      });
    } catch (err) {
      alert(err.message);
    }
  }

  // ============================
  // EDIT livre
  // ============================
  async function handleEditSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/admin/books/${editingBook.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Livre modifié avec succès !");
      setEditingBook(null);
      loadBooks();
    } catch (err) {
      alert(err.message);
    }
  }

  // ============================
  // On load
  // ============================
  useEffect(() => {
    loadBooks();
    loadGenres();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Admin — Livres</h1>
        <h2 className="add-book-trigger" onClick={() => setShowAddModal(true)}>
          + Ajouter un livre
        </h2>
      </div>

      {error && <p className="error">{error}</p>}

      {/* ================= TABLEAU ================= */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>ISBN</th>
            <th>Prix neuf</th>
            <th>Genres</th>
            <th>Format</th>
            <th>Image</th>
            <th>Résumé</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.price_new_ref} €</td>
              <td>{b.genres?.join(", ")}</td>
              <td>{b.format}</td>
              <td>
                <img src={b.image_url} alt={b.title} width="50" />
              </td>

              <td
                className="summary-cell clickable"
                onClick={() => setSelectedSummary(b.summary)}
              >
                {b.summary ? b.summary.slice(0, 120) + "..." : "—"}
              </td>

              <td>
                <button
                  onClick={() => {
                    const selectedGenreIds = genresList
                      .filter((g) => b.genres?.includes(g.name))
                      .map((g) => g.id);

                    setEditingBook(b);

                    setEditForm({
                      isbn: b.isbn,
                      title: b.title,
                      author: b.author,
                      price_new_ref: b.price_new_ref,
                      summary: b.summary,
                      image_url: b.image_url,
                      format: b.format,
                      genres: selectedGenreIds,
                    });
                  }}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAL RESUME ===== */}
      {selectedSummary && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedSummary(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Résumé complet</h2>
            <p>{selectedSummary}</p>
            <button onClick={() => setSelectedSummary(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* ===== MODAL AJOUT ===== */}
      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Ajouter un livre</h2>
            <form onSubmit={handleSubmit} className="admin-form admin-form-grid">
              <input
                placeholder="ISBN"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                required
              />

              <input
                placeholder="Titre"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />

              <input
                placeholder="Auteur"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />

              <input
                placeholder="Prix neuf"
                value={form.price_new_ref}
                onChange={(e) =>
                  setForm({ ...form, price_new_ref: e.target.value })
                }
                required
              />

              <input
                placeholder="Format"
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                required
              />

              <input
                placeholder="Image URL"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                required
              />

              <textarea
                className="full-width"
                placeholder="Résumé"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                required
              />

              <label className="full-width">Genres (Ctrl + clic pour plusieurs)</label>

              <select
                className="full-width"
                multiple
                value={form.genres}
                onChange={(e) =>
                  setForm({
                    ...form,
                    genres: Array.from(e.target.selectedOptions, (opt) =>
                      Number(opt.value)
                    ),
                  })
                }
                required
              >
                {genresList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="full-width">Ajouter</button>
              <button type="button" className="full-width" onClick={() => setShowAddModal(false)}>
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL EDIT ===== */}
      {editingBook && (
        <div
          className="modal-overlay"
          onClick={() => setEditingBook(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Modifier le livre</h2>
            <form onSubmit={handleEditSubmit} className="admin-form admin-form-grid">
              <input
                placeholder="ISBN"
                value={editForm.isbn}
                onChange={(e) =>
                  setEditForm({ ...editForm, isbn: e.target.value })
                }
                required
              />

              <input
                placeholder="Titre"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                required
              />

              <input
                placeholder="Auteur"
                value={editForm.author}
                onChange={(e) =>
                  setEditForm({ ...editForm, author: e.target.value })
                }
                required
              />

              <input
                placeholder="Prix neuf"
                value={editForm.price_new_ref}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price_new_ref: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Format"
                value={editForm.format}
                onChange={(e) =>
                  setEditForm({ ...editForm, format: e.target.value })
                }
                required
              />

              <input
                placeholder="Image URL"
                value={editForm.image_url}
                onChange={(e) =>
                  setEditForm({ ...editForm, image_url: e.target.value })
                }
                required
              />

              <textarea
                className="full-width"
                placeholder="Résumé"
                value={editForm.summary}
                onChange={(e) =>
                  setEditForm({ ...editForm, summary: e.target.value })
                }
                required
              />

              <label className="full-width">Genres (Ctrl + clic pour plusieurs)</label>

              <select
                className="full-width"
                multiple
                value={editForm.genres}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    genres: Array.from(e.target.selectedOptions, (opt) =>
                      Number(opt.value)
                    ),
                  })
                }
                required
              >
                {genresList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="full-width">Enregistrer</button>

              <button type="button" className="full-width" onClick={() => setEditingBook(null)}>
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBooksTab;