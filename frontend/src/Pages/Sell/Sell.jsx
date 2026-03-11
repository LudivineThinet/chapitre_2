import { useState } from "react";
import { estimateBuyback, createBuyback } from "../../services/api";

import "./Sell.css";

function Sell() {
  const [isbn, setIsbn] = useState("");
  const [condition, setCondition] = useState("good");
  const [success, setSuccess] = useState(false);


  // Liste des livres ajoutés au recap
  const [recapItems, setRecapItems] = useState([]);

  const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");

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



  return (
    <div className="sell-layout">
      {/* Formulaire */}
      <div className="sell-form-box">
        <h1>Revendre vos livres</h1>

        <form onSubmit={handleAddBook} className="sell-form">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Entrez l'ISBN"
            required
          />

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
    État : {item.condition} <br />
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
