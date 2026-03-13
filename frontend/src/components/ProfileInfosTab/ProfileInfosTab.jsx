import { useEffect, useState } from "react";
import "./ProfileInfosTab.css";

function ProfileInfosTab() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Chargement des infos user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);

        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          birth_date: data.birth_date
            ? data.birth_date.slice(0, 10)
            : "",
        });
      } catch (err) {
        console.error("Erreur chargement profil :", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  // 🔹 gestion saisie
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 sauvegarde
  async function handleSave() {
  try {
    const res = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // 🔴 très important
    if (!res.ok) {
      console.error("Erreur update :", data);
      return;
    }

    // ✅ mise à jour locale
    setUser(data);
    setEditing(false);
  } catch (err) {
    console.error("Erreur update profil :", err);
  }
}

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Erreur de chargement.</p>;

  return (
    <div className="infos-tab">
      <h3>Mes informations</h3>

      <p>
        <strong>Email :</strong> {user.email}
      </p>

      <div className="form-group">
        <label>Prénom</label>
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="form-group">
        <label>Nom</label>
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="form-group">
        <label>Date de naissance</label>
        <input
          type="date"
          name="birth_date"
          value={form.birth_date}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      {!editing ? (
        <button onClick={() => setEditing(true)}>
          Modifier
        </button>
      ) : (
        <button onClick={handleSave}>
          Enregistrer
        </button>
      )}
    </div>
  );
}

export default ProfileInfosTab;