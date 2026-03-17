import { useState } from "react";
import { estimateBuyback, createBuyback, fetchBooks } from "../../services/api";

import "./Sell.css";

const conditionTranslations = {
  like_new: "Comme neuf",
  very_good: "Très bon",
  good: "Bon",
  acceptable: "Acceptable"
};

function Sell() {
  const [isbn, setIsbn] = useState("");
  const [condition, setCondition] = useState("good");
  const [success, setSuccess] = useState(false);
  const [recapItems, setRecapItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);

  async function handleAddBook(e) {
    e.preventDefault();
    setError("");

    try {
      const estimated = await estimateBuyback(isbn, condition);

      // Ajouter au recap
      setRecapItems((prev) => [...prev, estimated]);

      // Reset input
      setIsbn("");
      setCondition("good");
    } catch (err) {
      setError(err.message);
    }
  }

  // Total provisoire
  const total = recapItems.reduce((sum, item) => {
    return sum + Number(item.buy_price);
  }, 0);

  // Retirer un livre du récapitulatif
function handleRemoveBook(indexToRemove) {
  setRecapItems((prev) =>
    prev.filter((_, index) => index !== indexToRemove)
  );
}

// Confirmer la vente : création des demandes en base
async function handleConfirmSell() {
  setLoading(true);
  setError("");
  setSuccess(false);

  try {
    // Envoyer chaque livre au backend
    for (const item of recapItems) {
      await createBuyback(item.isbn, item.condition);
    }

    // Succès
    setSuccess(true);

    // Vider le récap
    setRecapItems([]);
  } catch (err) {
    setError("Erreur lors de l'envoi des demandes.");
  } finally {
    setLoading(false);
  }
}

async function handleShowBooks() {
  if (showBooks) {
    setShowBooks(false);
    return;
  }

  try {
    const data = await fetchBooks();
    setBooks(data);
    setShowBooks(true);
  } catch (err) {
    console.error(err);
  }
}

  return (
    <div className="sell-layout">
      {/* Formulaire */}
      <div className="sell-form-box">
        <h1>Revendez vos livres</h1>

        <form onSubmit={handleAddBook} className="sell-form">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Entrez l'ISBN"
            required
          />
          <p className="sell-note">
            Pour cette version MVP, seuls les livres présents dans notre catalogue peuvent être revendus.
          </p>
          {showBooks && (
            <div className="catalog-list">
              <h3>Livres disponibles</h3>

              {books.map((book) => (
  <div
    key={book.id}
    className="catalog-item"
    onClick={() => setIsbn(book.isbn)}
  >
    <strong>{book.title}</strong>
    <span>{book.author} · ISBN : {book.isbn}</span>
  </div>
))}

              
            </div>
          )}


          <button
  type="button"
  className="catalog-btn"
  onClick={handleShowBooks}
>
  {showBooks ? "Masquer la liste" : "Voir les livres acceptés"}
</button>

          <label>État du livre</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="like_new">Comme neuf</option>
            <option value="very_good">Très bon</option>
            <option value="good">Bon</option>
            <option value="acceptable">Acceptable</option>
          </select>

          <button type="submit">Ajouter le livre</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {/* Recap */}
      <div className="sell-recap">
        <h2>Récapitulatif</h2>

        {recapItems.length === 0 ? (
          <p>Aucun livre ajouté.</p>
        ) : (
          <>
            <ul>
              {recapItems.map((item, index) => (
  <li key={index}>
    <strong>{item.title}</strong> — {item.author}
    <br />
    État : {conditionTranslations[item.condition] || item.condition} <br />
    Prix estimé : {item.buy_price} € <br />

    {/* Bouton retirer */}
    <button
      type="button"
      onClick={() => handleRemoveBook(index)}
      className="remove-btn"
    >
      Retirer
    </button>
  </li>
))}

            </ul>

            <h3>Total estimé : {total.toFixed(2)} €</h3>

            <button
  type="button"
  onClick={() => {
    setSuccess(false);
    setShowModal(true);
  }}
>
  Vendre ses livres
</button>


          </>
        )}
      </div>


      {/* Modal instructions */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-box">

      {success ? (
        <>
          <h2>Demande envoyée ✅</h2>
          <p>
            Votre demande de rachat a bien été enregistrée.
            <br />
            Vous recevrez une validation après réception des livres.
          </p>

          <button type="button" onClick={() => setShowModal(false)}>
            Fermer
          </button>
        </>
      ) : (
        <>
          <h2>Instructions d’envoi 📦</h2>

          <p>
            Veuillez envoyer vos livres sous <strong>7 jours</strong> à
            l’adresse suivante :
          </p>

          <p className="address">
            Chapitre 2 — Service Rachat <br />
            12 rue des Livres <br />
            69000 Lyon <br />
            France
          </p>

          <p>
            Prix estimé total : <strong>{total.toFixed(2)} €</strong>
          </p>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={() => setShowModal(false)}>
              Annuler
            </button>

            <button
              type="button"
              onClick={handleConfirmSell}
              disabled={loading}
            >
              {loading ? "Envoi..." : "Confirmer la demande"}
            </button>
          </div>
        </>
      )}

    </div>
  </div>
)}


    </div>
  );
}

export default Sell;
