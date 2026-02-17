import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // Récupération des infos utilisateur
  const email = localStorage.getItem("userEmail");

  function handleLogout() {
    // Suppression du token + infos user
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    // Redirection vers accueil
    navigate("/");
  }

  return (
    <div className="profile-page">
      <h1>Mon profil</h1>

      <p>
        Connecté avec : <strong>{email}</strong>
      </p>

      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Profile;
