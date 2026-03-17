import { useEffect, useState } from "react";
import { fetchUserBuybacks } from "../../services/api";
import "./ProfileBuybacksTab.css";

const conditionTranslations = {
  like_new: "Comme neuf",
  very_good: "Très bon",
  good: "Bon",
  acceptable: "Acceptable"
};

const statusTranslations = {
  accepted: "Accepté",
  rejected: "Rejeté"
};

function ProfileBuybacksTab() {
  const [buybacks, setBuybacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuybacks() {
      try {
        const data = await fetchUserBuybacks();
        setBuybacks(data);
      } catch (error) {
        console.error("Erreur chargement ventes :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBuybacks();
  }, []);

  if (loading) {
    return <p>Chargement des ventes...</p>;
  }

  return (
    <div className="buybacks-tab">
      <h3>Mes ventes</h3>

      {buybacks.length === 0 ? (
        <p>Vous n'avez proposé aucun livre.</p>
      ) : (
        <div className="buybacks-list">
          {buybacks.map((b) => (
            <div key={b.id} className="buyback-card">
              <p>
                <strong>Livre :</strong> {b.title}
              </p>

              <p>
                <strong>Auteur :</strong> {b.author}
              </p>

              <p>
                <strong>État :</strong> {conditionTranslations[b.condition] || b.condition}
              </p>

              <p>
                <strong>Estimation du prix de rachat :</strong> {b.buy_price} €
              </p>

              <p>
                <strong>Statut :</strong>{" "}
                <span className="buyback-status">
                  {statusTranslations[b.status] || b.status}
                </span>
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(b.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileBuybacksTab;