import { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "../../services/api";
import "./Success.css";

import { CartContext } from "../../context/CartContext";

function Success() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState(null);

  // 🔒 Empêche le double appel en StrictMode (dev)
  const hasCreatedOrder = useRef(false);

  useEffect(() => {
    // garde-fou React
    if (hasCreatedOrder.current) return;
    hasCreatedOrder.current = true;

    async function handleCreateOrder() {
      const storedAddressId = sessionStorage.getItem("selectedAddressId");
      const token = localStorage.getItem("token");

      if (!storedAddressId) {
  console.error("Adresse manquante pour la commande");
  setStatus("error");
  return;
}

      if (!token) {
        setStatus("error");
        return;
      }

      // format attendu par le backend
      const items = cartItems.map((item) => ({
        book_item_id: item.id,
        quantity: item.quantity,
      }));

      try {
        const data = await createOrder(items, Number(storedAddressId));

        // stocke l'id de commande
        setOrderId(data.order.id);

        // vide le panier
        clearCart();
        sessionStorage.removeItem("selectedAddressId");

        setStatus("success");
      } catch (error) {
        console.error("Erreur serveur :", error);
        setStatus("error");
      }
    }

    handleCreateOrder();
  }, [cartItems, clearCart]);

  return (
    <div className="success-page">
      <h1>Paiement réussi ✅</h1>

      {status === "loading" && (
        <p>Enregistrement de votre commande...</p>
      )}

      {status === "success" && (
        <>
          <p>Merci pour votre achat !</p>
          <p>
            Votre commande numéro <strong>#{orderId}</strong> a bien été
            enregistrée.
          </p>

          <Link to="/books">
            <button>Retour au catalogue</button>
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <p>Une erreur est survenue lors de la commande.</p>
          <Link to="/cart">
            <button>Retour au panier</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Success;