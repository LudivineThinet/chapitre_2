import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

import { CartContext } from "../../context/CartContext";

//components
import ProfileOrdersTab from "../../components/ProfileOrdersTab/ProfileOrdersTab";
import ProfileBuybacksTab from "../../components/ProfileBuybacksTab/ProfileBuybacksTab";
import ProfileInfosTab from "../../components/ProfileInfosTab/ProfileInfosTab";
import ProfileAddressesTab from "../../components/ProfileAddressesTab/ProfileAddressesTab";
import ProfilePayoutTab from "../../components/ProfilePayoutTab/ProfilePayoutTab";

function Profile() {
  const navigate = useNavigate();
  const { setUserEmail } = useContext(CartContext);
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  const [activeTab, setActiveTab] = useState("infos");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUserEmail(null);
    navigate("/");
  }

  async function handleDeleteAccount() {
  const confirmDelete = window.confirm(
    "Voulez-vous vraiment supprimer votre compte ?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // logout post supression
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUserEmail(null);

    // redirection accueil
    navigate("/");

  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="profile-page">
      <h1>Mon profil</h1>

      {/* HEADER USER */}
      <div className="profile-header">
        <p>
          Connecté avec : <strong>{email}</strong>
        </p>
        <span className="role-badge">{role}</span>
      </div>

      {/* NAV ONGLET */}
      <div className="profile-layout">
  {/* MENU GAUCHE */}
  <div className="profile-sidebar">
    <button onClick={() => setActiveTab("infos")}>
      Mes infos
    </button>

    <button onClick={() => setActiveTab("orders")}>
      Mes commandes
    </button>

    <button onClick={() => setActiveTab("buybacks")}>
      Mes ventes
    </button>

    <button onClick={() => setActiveTab("addresses")}>
      Mes adresses
    </button>

    <button onClick={() => setActiveTab("payout")}>
      Recevoir mes paiements
    </button>

    {role === "admin" && (
      <button onClick={() => navigate("/admin")}>
        🔐 Admin
      </button>
    )}
  </div>

  {/* CONTENU DROIT */}
  <div className="profile-main">
    {activeTab === "infos" && <ProfileInfosTab />}
    {activeTab === "orders" && <ProfileOrdersTab />}
    {activeTab === "buybacks" && <ProfileBuybacksTab />}
    {activeTab === "addresses" && <ProfileAddressesTab />}
    {activeTab === "payout" && <ProfilePayoutTab />}
  </div>
</div>

      

      <button className="logout-btn" onClick={handleLogout}>
        Se déconnecter
      </button>

      <button
        className="delete-account-btn"
        onClick={handleDeleteAccount}
      >
        Supprimer mon compte
      </button>
    </div>
  );
}

export default Profile;