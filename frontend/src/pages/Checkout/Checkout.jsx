import { useContext, useState, useEffect } from "react";
import {
  fetchUserAddresses,
  createUserAddress,
  createCheckoutSession
} from "../../services/api";
import { CartContext } from "../../context/CartContext";

import "./Checkout.css";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // 🔹 mode adresse
  const [addressMode, setAddressMode] = useState("saved"); // saved | new

  // 🔹 nouvelle adresse
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
  });

  // 🔹 Total
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  // 🔹 Charger les adresses
  useEffect(() => {
    async function fetchAddresses() {
  try {
    const data = await fetchUserAddresses();
    setAddresses(data);

    if (data.length > 0) {
      setSelectedAddressId(data[0].id);
    }
  } catch (err) {
    console.error("Erreur chargement adresses :", err);
  } finally {
    setLoadingAddresses(false);
  }
}

    fetchAddresses();
  }, []);

  // 🔹 form nouvelle adresse
  function handleNewAddressChange(e) {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  }

  // 🔹 Stripe checkout
  async function handleStripeCheckout() {
    let addressIdToUse = selectedAddressId;

    // ===== CAS NOUVELLE ADRESSE =====
    if (addressMode === "new") {
      try {
        const data = await createUserAddress(newAddress);

       

        addressIdToUse = data.id;
      } catch (err) {
        console.error("Erreur serveur adresse :", err);
        return;
      }
    }

    // 🔹 sécurité
    if (!addressIdToUse) {
      alert("Veuillez sélectionner une adresse.");
      return;
    }

    // 💾 stock pour Success
    sessionStorage.setItem("selectedAddressId", addressIdToUse);

    // ===== STRIPE =====
    const data = await createCheckoutSession(cartItems);

    if (!data.url) {
      console.error("Erreur Stripe :", data);
      return;
    }

    window.location.href = data.url;
  }

  if (cartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

    return (
  <div className="checkout-page">
    <h1>Validation de commande</h1>

    <div className="checkout-layout">

      {/* ================= ADRESSE ================= */}
      <div className="checkout-address">

        <h2>Adresse de livraison</h2>

        {/* choix mode */}
        <div className="address-mode">
          <label>
            <input
              type="radio"
              checked={addressMode === "saved"}
              onChange={() => setAddressMode("saved")}
            />
            Utiliser une adresse enregistrée
          </label>

          <label>
            <input
              type="radio"
              checked={addressMode === "new"}
              onChange={() => setAddressMode("new")}
            />
            Utiliser une nouvelle adresse
          </label>
        </div>

        {/* ===== ADRESSES EXISTANTES ===== */}
        {addressMode === "saved" ? (
          loadingAddresses ? (
            <p>Chargement des adresses...</p>
          ) : addresses.length === 0 ? (
            <p>Aucune adresse enregistrée. Passez en nouvelle adresse.</p>
          ) : (
            <div className="address-list">
              {addresses.map((addr) => (
                <label key={addr.id} className="address-card">
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                  />

                  <div className="address-content">
                    <strong>{addr.full_name}</strong>
                    <span>{addr.street}</span>
                    <span>
                      {addr.postal_code} {addr.city}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )
        ) : (

          /* ===== NOUVELLE ADRESSE ===== */
          <div className="address-form">
            <input
              name="full_name"
              placeholder="Nom et Prénom"
              value={newAddress.full_name}
              onChange={handleNewAddressChange}
            />

            <input
              name="street"
              placeholder="Rue"
              value={newAddress.street}
              onChange={handleNewAddressChange}
            />

            <input
              name="postal_code"
              placeholder="Code postal"
              value={newAddress.postal_code}
              onChange={handleNewAddressChange}
            />

            <input
              name="city"
              placeholder="Ville"
              value={newAddress.city}
              onChange={handleNewAddressChange}
            />

            <input
              name="country"
              placeholder="Pays"
              value={newAddress.country}
              onChange={handleNewAddressChange}
            />
          </div>
        )}
      </div>

      {/* ================= RÉCAP ================= */}
      <div className="checkout-summary">

        <h2>Récapitulatif</h2>

        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} ({item.condition}) x {item.quantity} — {item.price} €
            </li>
          ))}
        </ul>

        <h3>Total : {total.toFixed(2)} €</h3>

        <button className="checkout-btn" onClick={handleStripeCheckout}>
          Paiement
        </button>

      </div>

    </div>
  </div>
);
}

export default Checkout;