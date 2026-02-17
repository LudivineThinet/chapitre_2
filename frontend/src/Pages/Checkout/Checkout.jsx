import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const [address, setAddress] = useState("");

  // Total
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  const token = localStorage.getItem("token");

  async function handleStripeCheckout() {
    // Appel backend Stripe
    const response = await fetch(
      "http://localhost:3000/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      }
    );

    const data = await response.json();
    console.log("Stripe response:", data);

    if (!data.url) {
  console.error("Erreur Stripe :", data);
  return;
}


    // Redirection vers Stripe Checkout
    window.location.href = data.url;
  }

  if (cartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div>
      <h1>Validation de commande</h1>

      {/* Adresse */}
      <h2>Adresse de livraison</h2>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Entrez votre adresse..."
      />

      {/* Récap */}
      <h2>Récapitulatif</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} ({item.condition}) x {item.quantity} —{" "}
            {item.price} €
          </li>
        ))}
      </ul>

      <h3>Total : {total.toFixed(2)} €</h3>

      {/* Paiement */}
      <button onClick={handleStripeCheckout}>
        Payer avec Stripe
      </button>
    </div>
  );
}

export default Checkout;
