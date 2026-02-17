import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Success.css";

import { CartContext } from "../../context/CartContext";

function Success() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function createOrder() {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("error");
        return;
      }

      // Format attendu par le backend
      const items = cartItems.map((item) => ({
        book_item_id: item.id,
        quantity: item.quantity,
      }));

      try {
        const response = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Erreur commande :", data);
          setStatus("error");
          return;
        }

        // Stocker l'ID de commande
        setOrderId(data.order.id);

        // Vider le panier
        clearCart();

        setStatus("success");
      } catch (error) {
        console.error("Erreur serveur :", error);
        setStatus("error");
      }
    }

    createOrder();
  }, []);

  // Empêcher la création de plusieurs commandes en cas de rafraîchissement
  const alreadyOrdered = sessionStorage.getItem("orderCreated");

if (alreadyOrdered) return;

sessionStorage.setItem("orderCreated", "true");


  return (
    <div className="success-container">
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
