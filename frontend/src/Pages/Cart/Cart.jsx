import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcul du total du panier
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Votre panier</h1>

      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> ({item.condition}) —{" "}
                {item.price} € <br />
                Quantité : {item.quantity}
                <br />
                <button onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <h2>Total : {total.toFixed(2)} €</h2>

          {/* Checkout button */}
          <button onClick={() => navigate("/checkout")}>
  Valider la commande
</button>

        </>
      )}
    </div>
  );
}

export default Cart;

