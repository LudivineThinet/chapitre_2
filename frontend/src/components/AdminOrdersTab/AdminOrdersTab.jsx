import { useEffect, useState } from "react";
import "./AdminOrdersTab.css";

function AdminOrdersTab() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur chargement commandes");
      }

      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateStatus(orderId, newStatus) {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:3000/admin/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    // recharge les commandes
    loadOrders();
  } catch (err) {
    console.error(err);
  }
}
  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1>Commandes</h1>

      {error && <p className="error">{error}</p>}

      {orders.length === 0 ? (
        <p>Aucune commande enregistrée.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
  {orders.map((order) => (
    <tr key={order.id}>
      <td>#{order.id}</td>
      <td>{order.user_email}</td>
      <td>{order.total} €</td>
      <td>{order.status}</td>
      <td>
        {new Date(order.created_at).toLocaleDateString()}
      </td>

      <td>
        {order.status === "paid" && (
          <button
            onClick={() => updateStatus(order.id, "shipped")}
          >
            Expédié
          </button>
        )}

        {order.status === "shipped" && (
          <button
            onClick={() => updateStatus(order.id, "delivered")}
          >
            Livré
          </button>
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

export default AdminOrdersTab;