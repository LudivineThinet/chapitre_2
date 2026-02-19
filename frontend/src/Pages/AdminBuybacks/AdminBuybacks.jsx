import { useEffect, useState } from "react";
import "./AdminBuybacks.css";

function AdminBuybacks() {
  const [buybacks, setBuybacks] = useState([]);
  const [error, setError] = useState("");

  // Charger toutes les demandes
  async function loadBuybacks() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/admin/buybacks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur chargement");
      }

      setBuybacks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // Valider ou refuser
  async function handleValidate(id, status) {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3000/admin/buybacks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      // Recharger la liste après action
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
              <th>Status</th>
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
                <td>{bb.condition}</td>
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

export default AdminBuybacks;
