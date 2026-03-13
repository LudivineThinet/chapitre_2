import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


import { AuthContext } from "../../context/AuthContext";

//components
import ProfileOrdersTab from "../../components/ProfileOrdersTab/ProfileOrdersTab";
import ProfileBuybacksTab from "../../components/ProfileBuybacksTab/ProfileBuybacksTab";
import ProfileInfosTab from "../../components/ProfileInfosTab/ProfileInfosTab";
import ProfileAddressesTab from "../../components/ProfileAddressesTab/ProfileAddressesTab";
import ProfilePayoutTab from "../../components/ProfilePayoutTab/ProfilePayoutTab";

function Profile() {
  const navigate = useNavigate();
  const { userEmail, userRole, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("infos");

  function handleLogout() {
    logout();
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
    logout();
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
          Connecté avec : <strong>{userEmail}</strong>
        </p>
        <span className="role-badge">{userRole}</span>
      </div>

      {/* NAV ONGLET */}
      <div className="profile-layout">
  {/* MENU GAUCHE */}
  <div className="profile-sidebar">
    <button
      className={activeTab === "infos" ? "active" : ""}
      onClick={() => setActiveTab("infos")}
    >
      Mes infos
    </button>

    <button
      className={activeTab === "orders" ? "active" : ""}
      onClick={() => setActiveTab("orders")}
    >
      Mes commandes
    </button>

    <button
      className={activeTab === "buybacks" ? "active" : ""}
      onClick={() => setActiveTab("buybacks")}
    >
      Mes ventes
    </button>

    <button
      className={activeTab === "addresses" ? "active" : ""}
      onClick={() => setActiveTab("addresses")}
    >
      Mes adresses
    </button>

    <button
      className={activeTab === "payout" ? "active" : ""}
      onClick={() => setActiveTab("payout")}
    >
      Recevoir mes paiements
    </button>

    {userRole === "admin" && (
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

      
<div className="profile-actions">
      <button className="logout-btn" onClick={handleLogout}>
        Se déconnecter
      </button>

      <button
        className="delete-account-btn"
        onClick={handleDeleteAccount}>
        Supprimer mon compte
      </button>
    </div>
    </div>
  );
}

export default Profile;