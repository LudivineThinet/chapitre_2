import { useEffect, useState } from "react";
import {
  fetchAdminBuybacks,
  updateAdminBuybackStatus
} from "../../services/api";
import "./AdminBuybacksTab.css";

const conditionTranslations = {
  like_new: "Comme neuf",
  very_good: "Très bon",
  good: "Bon",
  acceptable: "Acceptable"
};

function AdminBuybacksTab() {
  const [buybacks, setBuybacks] = useState([]);
  const [error, setError] = useState("");

  // Charger toutes les demandes
  async function loadBuybacks() {
  try {
    const data = await fetchAdminBuybacks();
    setBuybacks(data);
  } catch (err) {
    setError(err.message);
  }
}

  // Valider ou refuser
  async function handleValidate(id, status) {
  try {
    await updateAdminBuybackStatus(id, status);
    loadBuybacks();
  } catch (err) {
    console.error(err);
  }
}

  useEffect(() => {
    loadBuybacks();
  }, []);

  return (
    <div>
      <h1>Demandes de rachat</h1>

      {error && <p className="error">{error}</p>}

      {buybacks.length === 0 ? (
        <p>Aucune demande pour le moment.</p>
      ) : (
        <table className="buybacks-table">
          <thead>
            <tr>
              <th>Livre</th>
              <th>Utilisateur</th>
              <th>État</th>
              <th>Prix rachat</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buybacks.map((bb) => (
              <tr key={bb.id}>
                <td>
                  {bb.title} — {bb.author}
                </td>
                <td>{bb.user_email}</td>
                <td>{conditionTranslations[bb.condition] || bb.condition}</td>
                <td>{bb.buy_price} €</td>
                <td>{bb.status}</td>

                <td>
                  {bb.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleValidate(bb.id, "accepted")
                        }
                      >
                        Accepter
                      </button>

                      <button
                        onClick={() =>
                          handleValidate(bb.id, "rejected")
                        }
                      >
                        Refuser
                      </button>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminBuybacksTab;