import { useEffect, useState } from "react";
import {
  fetchAdminStock,
  fetchAdminBooks,
  updateAdminStockItem,
  createAdminStockItem
} from "../../services/api";
import "./AdminStockTab.css";

function AdminStockTab() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);

  // MODALE AJOUT
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState({
    book_id: "",
    condition: "good",
    stock: 1,
  });

  // Charger le stock
  async function loadStock() {
  try {
    const data = await fetchAdminStock();
    setItems(data);
  } catch (err) {
    setError(err.message);
  }
}

 async function loadBooks() {
  try {
    const data = await fetchAdminBooks();
    setBooks(data);
  } catch (err) {
    console.error("Erreur chargement livres");
  }
}

  // Modifier stock
  async function handleUpdateStock(id, newStock) {
  try {
    await updateAdminStockItem(id, newStock);
    loadStock();
  } catch (err) {
    console.error(err);
  }
}

  // Ajouter un exemplaire
  async function handleAddItem(e) {
  e.preventDefault();

  try {
    await createAdminStockItem(newItem);

    alert("Exemplaire ajouté !");
    loadStock();
    setShowAddModal(false);

    setNewItem({
      book_id: "",
      condition: "good",
      stock: 1,
    });
  } catch (err) {
    alert(err.message);
  }
}

  useEffect(() => {
    loadStock();
    loadBooks();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Admin — Stock</h1>

        <h2
          className="add-book-trigger"
          onClick={() => setShowAddModal(true)}
        >
          + Ajouter un exemplaire
        </h2>
      </div>

      {error && <p className="error">{error}</p>}

      {/* ================= TABLEAU ================= */}

      <table>
        <thead>
          <tr>
            <th>Livre</th>
            <th>État</th>
            <th>Prix vente</th>
            <th>Stock</th>
            <th>Modifier</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                {it.title} — {it.author}
              </td>

              <td>{it.condition}</td>
              <td>{it.sell_price} €</td>
              <td>{it.stock}</td>

              <td>
                <button
                  onClick={() => handleUpdateStock(it.id, it.stock + 1)}
                >
                  +1
                </button>

                <button
                  onClick={() =>
                    handleUpdateStock(it.id, Math.max(0, it.stock - 1))
                  }
                >
                  -1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODALE AJOUT ================= */}

      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Ajouter un exemplaire</h2>

            <form onSubmit={handleAddItem} className="admin-form">

              <label>Livre</label>

              <select
                value={newItem.book_id}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    book_id: Number(e.target.value),
                  })
                }
                required
              >
                <option value="">-- Sélectionner un livre --</option>

                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {b.author} (ISBN : {b.isbn})
                  </option>
                ))}
              </select>

              <label>État</label>

              <select
                value={newItem.condition}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    condition: e.target.value,
                  })
                }
              >
                <option value="like_new">Comme neuf</option>
                <option value="very_good">Très bon</option>
                <option value="good">Bon</option>
                <option value="acceptable">Acceptable</option>
              </select>

              <input
                type="number"
                min="1"
                value={newItem.stock}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stock: Number(e.target.value),
                  })
                }
                required
              />

              <button type="submit">Ajouter</button>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
              >
                Annuler
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminStockTab;