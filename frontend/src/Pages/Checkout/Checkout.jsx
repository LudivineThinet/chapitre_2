import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

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

  const token = localStorage.getItem("token");

  // 🔹 Total
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  // 🔹 Charger les adresses
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const res = await fetch("http://localhost:3000/addresses/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAddresses(data);

        // sélection auto de la première
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
  }, [token]);

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
        const res = await fetch("http://localhost:3000/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAddress),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Erreur création adresse :", data);
          alert("Erreur lors de la création de l'adresse.");
          return;
        }

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
    <div>
      <h1>Validation de commande</h1>

      {/* ================= ADRESSE ================= */}
      <h2>Adresse de livraison</h2>

      {/* 🔹 choix mode */}
      <div style={{ marginBottom: "16px" }}>
        <label>
          <input
            type="radio"
            checked={addressMode === "saved"}
            onChange={() => setAddressMode("saved")}
          />
          Utiliser une adresse enregistrée
        </label>

        <br />

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
          <div>
            {addresses.map((addr) => (
              <label
                key={addr.id}
                style={{ display: "block", marginBottom: "8px" }}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                />
                {" "}
                {addr.full_name} — {addr.street}, {addr.postal_code}{" "}
                {addr.city}
              </label>
            ))}
          </div>
        )
      ) : (
        // ===== NOUVELLE ADRESSE =====
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxWidth: "400px",
          }}
        >
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

      {/* ================= RÉCAP ================= */}
      <h2>Récapitulatif</h2>

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} ({item.condition}) x {item.quantity} — {item.price} €
          </li>
        ))}
      </ul>

      <h3>Total : {total.toFixed(2)} €</h3>

      {/* ================= PAIEMENT ================= */}
      <button onClick={handleStripeCheckout}>
        Paiement
      </button>
    </div>
  );
}

export default Checkout;