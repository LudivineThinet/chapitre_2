import { useEffect, useState } from "react";
import "./ProfileAddressesTab.css";
import trash from "../../assets/icon/trash.svg";

function ProfileAddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 charger les adresses
  async function fetchAddresses() {
    try {
      const res = await fetch("http://localhost:3000/addresses/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error("Erreur chargement adresses :", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 🔹 gestion form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 ajout adresse
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Erreur création adresse :", data);
        return;
      }

      // reset form
      setForm({
        full_name: "",
        street: "",
        city: "",
        postal_code: "",
        country: "",
      });

      // refresh liste
      fetchAddresses();
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  }

  async function handleDeleteAddress(addressId) {
  const confirmDelete = window.confirm(
    "Supprimer cette adresse ?"
  );
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `http://localhost:3000/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      console.error("Erreur suppression :", data);
      return;
    }

    // 🔄 refresh liste
    fetchAddresses();
  } catch (err) {
    console.error("Erreur serveur suppression :", err);
  }
}

  if (loading) return <p>Chargement des adresses...</p>;

  return (
    <div className="addresses-tab">
      <h3>Mes adresses</h3>

      {/* LISTE */}
      {addresses.length === 0 ? (
        <p>Aucune adresse enregistrée.</p>
      ) : (
        <div className="addresses-list">
          {addresses.map((addr) => (
  <div key={addr.id} className="address-card">
    <p><strong>{addr.full_name}</strong></p>
    <p>{addr.street}</p>
    <p>
      {addr.postal_code} {addr.city}
    </p>
    <p>{addr.country}</p>

    <button
      onClick={() => handleDeleteAddress(addr.id)}
      style={{ marginTop: "8px" }}
    > 
      <img src={trash} alt="Supprimer" style={{ width: "18px", marginLeft: "4px" }} />
    </button>
  </div>
))}
        </div>
      )}

      {/* FORMULAIRE */}
      <h4>Ajouter une adresse</h4>

      <form onSubmit={handleSubmit} className="address-form">
        <input
          name="full_name"
          placeholder="Nom de l'adresse"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Rue"
          value={form.street}
          onChange={handleChange}
          required
        />

        <input
          name="postal_code"
          placeholder="Code postal"
          value={form.postal_code}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="Ville"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          name="country"
          placeholder="Pays"
          value={form.country}
          onChange={handleChange}
          required
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default ProfileAddressesTab;