import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcul du total du panier
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
  <h1>Votre panier</h1>

  {cartItems.length === 0 ? (
    <p>Votre panier est vide.</p>
  ) : (
    <>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-info">
              <strong>{item.title}</strong>
              <span>{item.condition}</span>
              <span>Quantité : {item.quantity}</span>
              <span className="cart-price">{item.price} €</span>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div className="cart-total">
          Total : {total.toFixed(2)} €
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Valider la commande
        </button>
      </div>
    </>
  )}
</div>
  );
}

export default Cart;

