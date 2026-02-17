import { Link } from "react-router-dom";
import "./Footer.css";

import logo from "../../assets/Image/logo.png";
import instagramIcon from "../../assets/icon/instagram.svg";
import tiktokIcon from "../../assets/icon/tiktok.svg";
import facebookIcon from "../../assets/icon/facebook.svg";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-section">
          <img src={logo} alt="Chapitre 2" className="footer-logo" />
          <p>Give books a second life 📚</p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h3>Navigation</h3>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/sell">Sell your books</Link>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <Link to="/terms">Terms of use</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/legal">Legal notice</Link>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Get updates about new arrivals.</p>

          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
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
        <p>© {new Date().getFullYear()} Chapitre 2 — All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
