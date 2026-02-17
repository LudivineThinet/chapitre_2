import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Header.css";
import logo from "../../assets/Image/logo.png";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const categories = [
    "Fantasy",
    "Romance",
    "Thriller",
    "Horror",
    "Science Fiction",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
  ];

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!search.trim()) return;

    // Redirect to catalogue with search query
    navigate(`/books?search=${search}`);
  }

  return (
    <header className="header">
      {/* Top line */}
      <div className="header-top">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Chapitre 2" />
        </Link>

        {/* Sell */}
        <Link to="/sell" className="nav-link">
          Vendez vos livres
        </Link>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Rechercher un livre, un auteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="header-actions">
          {token ? (
  <Link to="/profile" className="nav-link">
    Profil
  </Link>
) : (
  <Link to="/login" className="nav-link">
    Connexion
  </Link>
)}


          <Link to="/cart" className="nav-link">
            Panier
          </Link>
        </div>
      </div>

      {/* Second line : Categories */}
      <nav className="header-categories">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/books?genre=${encodeURIComponent(cat)}`}
            className="category-link"
          >
            {cat}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;

