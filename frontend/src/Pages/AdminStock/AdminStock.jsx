import { useEffect, useState } from "react";
import "./AdminStock.css";

function AdminStock() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);


  // Formulaire ajout exemplaire
  const [newItem, setNewItem] = useState({
    book_id: "",
    condition: "good",
    stock: 1,
  });

  // ============================
  // Charger le stock
  // ============================
  async function loadStock() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/admin/book-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur chargement stock");
      }

      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadBooks() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/admin/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setBooks(data);
  } catch (err) {
    console.error("Erreur chargement livres");
  }
}


  // ============================
  // Modifier stock (+1 / -1)
  // ============================
  async function handleUpdateStock(id, newStock) {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3000/admin/book-items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stock: newStock }),
      });

      loadStock();
    } catch (err) {
      console.error(err);
    }
  }

  // ============================
  // Ajouter un exemplaire
  // ============================
  async function handleAddItem(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/admin/book-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItem),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur ajout exemplaire");
      }

      alert("Exemplaire ajouté !");
      loadStock();

      // Reset formulaire
      setNewItem({
        book_id: "",
        condition: "good",
        stock: 1,
      });
    } catch (err) {
      alert(err.message);
    }
  }

  // ============================
  // On load
  // ============================
  useEffect(() => {
    loadStock();
    loadBooks();
  }, []);

  return (
    <div>
      <h1>Admin — Stock</h1>

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

      {/* ================= FORMULAIRE AJOUT ================= */}
      <h2>Ajouter un exemplaire</h2>

      <form onSubmit={handleAddItem} className="admin-form">
        <label>Livre</label>

<select
  value={newItem.book_id}
  onChange={(e) =>
    setNewItem({ ...newItem, book_id: Number(e.target.value) })
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
            setNewItem({ ...newItem, condition: e.target.value })
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
            setNewItem({ ...newItem, stock: Number(e.target.value) })
          }
          required
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AdminStock;

