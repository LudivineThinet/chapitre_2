import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookieBanner.css";

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <p>
          Ce site utilise un token d'authentification (JWT) stocké dans votre
          navigateur pour assurer votre connexion. Aucun cookie publicitaire
          n'est utilisé.{" "}
          <Link to="/privacy">En savoir plus</Link>
        </p>
        <div className="cookie-banner-actions">
          <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
            Refuser
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;