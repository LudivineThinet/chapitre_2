import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../services/api";
import "./ProfileOrdersTab.css";

function ProfileOrdersTab() {
  // stocke les commandes
  const [orders, setOrders] = useState([]);

  // état de chargement (UX propre pour le jury)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchOrders() {
    try {
      const data = await fetchUserOrders();
      setOrders(data);
    } catch (error) {
      console.error("Erreur chargement commandes :", error);
    } finally {
      setLoading(false);
    }
  }

  fetchOrders();
}, []);

  // affichage pendant chargement
  if (loading) {
    return <p>Chargement des commandes...</p>;
  }

  return (
  <div className="orders-tab">
    <h3>Mes commandes</h3>

    {orders.length === 0 ? (
      <p>Vous n'avez aucune commande.</p>
    ) : (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <p>
              <strong>Commande :</strong> #{order.id}
            </p>

            <p>
              <strong>Date :</strong>{" "}
              {new Date(order.created_at).toLocaleDateString()}
            </p>

            <p>
              <strong>Total :</strong> {order.total} €
            </p>

            <p>
              <strong>Statut :</strong>{" "}
              <span className="order-status">
                {order.status || "—"}
              </span>
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default ProfileOrdersTab;