import { createContext, useState, useEffect } from "react";

// Contexte du panier
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Charger le panier depuis localStorage au démarrage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter un item au panier
function addToCart(item) {
  setCartItems((prev) => {
    // Vérifier si cet item existe déjà (même book_item_id)
    const existingItem = prev.find((i) => i.id === item.id);

    if (existingItem) {
      // Si oui → augmenter la quantité
      return prev.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    // Sinon → ajouter avec quantity = 1
    return [...prev, { ...item, quantity: 1 }];
  });
}


  // Supprimer un item du panier
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Vider le panier
function clearCart() {
  setCartItems([]);
}


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
