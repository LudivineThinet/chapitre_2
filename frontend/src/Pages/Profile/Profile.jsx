import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

//components
import ProfileOrdersTab from "../../components/ProfileOrdersTab/ProfileOrdersTab";
import ProfileBuybacksTab from "../../components/ProfileBuybacksTab/ProfileBuybacksTab";
import ProfileInfosTab from "../../components/ProfileInfosTab/ProfileInfosTab";
import ProfileAddressesTab from "../../components/ProfileAddressesTab/ProfileAddressesTab";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  const [activeTab, setActiveTab] = useState("infos");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
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
  </div>
</div>

      

      <button className="logout-btn" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;