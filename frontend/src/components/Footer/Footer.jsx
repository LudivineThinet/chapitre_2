import { Link } from "react-router-dom";
import "./Footer.css";

import logo from "../../assets/Image/logo.png";
import instagramIcon from "../../assets/Icon/instagram.svg";
import tiktokIcon from "../../assets/Icon/tiktok.svg";
import facebookIcon from "../../assets/Icon/facebook.svg";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-section">
          <img src={logo} alt="Chapitre 2" className="footer-logo" />
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h3>Navigation</h3>
          <Link to="/">Accueil</Link>
          <Link to="/books">Tout les livres</Link>
          <Link to="/sell">Vendre vos livres</Link>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Nous contacter</Link>
          <Link to="/about">À propos</Link>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <Link to="/terms">Conditions d'utilisation</Link>
          <Link to="/privacy">Politique de confidentialité</Link>
          <Link to="/legal">Mentions légales</Link>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Inscrivez-vous à notre newsletter</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre email" />
            <button type="submit">S'abonner</button>
          </form>
        </div>

        {/* Socials */}
       <div className="social-links">
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
            <img src={tiktokIcon} alt="TikTok" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="Facebook" />
        </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Chapitre 2 — Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
