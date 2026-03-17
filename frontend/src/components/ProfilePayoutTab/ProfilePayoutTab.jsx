import { useEffect, useState } from "react";
import {
  fetchUserPayout,
  updateUserPayout
} from "../../services/api";
import "./ProfilePayoutTab.css";

function maskIban(iban) {
  if (!iban) return "";
  const visible = iban.slice(-4);
  return "**** **** **** **** **** " + visible;
}

function ProfilePayoutTab() {
  const [payout, setPayout] = useState(null);
  const [form, setForm] = useState({
    iban: "",
    account_holder: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 charger IBAN
  useEffect(() => {
    async function fetchPayout() {
  try {
    const data = await fetchUserPayout();

    setPayout(data);

    if (data) {
      setForm({
        iban: data.iban || "",
        account_holder: data.account_holder || "",
      });
    }
  } catch (err) {
    console.error("Erreur chargement payout :", err);
  } finally {
    setLoading(false);
  }
}

    fetchPayout();
  }, [token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
  try {
    const data = await updateUserPayout(form);

    setPayout(data);
    setEditing(false);
  } catch (err) {
    console.error("Erreur update payout :", err);
  }
}

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="payout-tab">
      <h3>Mes informations de paiement</h3>

      {!editing && payout && (
        <div className="payout-display">
          <p>
            <strong>Titulaire :</strong> {payout.account_holder}
          </p>
          <p>
            <strong>IBAN :</strong> {maskIban(payout.iban)}
          </p>
        </div>
      )}
      {editing && (
      <div className="payout-form">
        <label>Titulaire du compte</label>
        <input
          name="account_holder"
          value={form.account_holder}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>IBAN</label>
        <input
          name="iban"
          value={form.iban}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      )}

      {!editing ? (
        <button onClick={() => setEditing(true)}>
          {payout ? "Modifier" : "Ajouter"}
        </button>
      ) : (
        <button onClick={handleSave}>
          Enregistrer
        </button>
      )}
    </div>
  );
}

export default ProfilePayoutTab;