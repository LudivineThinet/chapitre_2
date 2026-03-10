import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { userEmail } = useContext(AuthContext); // 👈 on lit le userEmail depuis AuthContext

  const [cartItems, setCartItems] = useState(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return [];

    try {
      const savedCart = localStorage.getItem("cart_" + email);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Erreur lors du chargement du panier :", e);
      return [];
    }
  });

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    if (!userEmail) return;

    localStorage.setItem(
      "cart_" + userEmail,
      JSON.stringify(cartItems)
    );
  }, [cartItems, userEmail]);

  // Recharger le panier si l'utilisateur change
  useEffect(() => {
    if (!userEmail) {
      setCartItems([]);
      return;
    }

    try {
      const savedCart = localStorage.getItem("cart_" + userEmail);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch (e) {
      console.error("Erreur lors du rechargement du panier :", e);
      setCartItems([]);
    }
  }, [userEmail]);

  // Ajouter un item au panier
  function addToCart(item) {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

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

    if (userEmail) {
      localStorage.removeItem("cart_" + userEmail);
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}