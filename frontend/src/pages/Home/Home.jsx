import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { fetchBooks } from "../../services/api";
import treeLogo from "../../assets/Image/tree.png";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const data = await fetchBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero">
        <img className="hero-bg" src={treeLogo} alt="" aria-hidden="true" />
        <span className="hero-eyebrow">Librairie d'occasion</span>
        <h1>Chapitre <em>2</em></h1>
        <p className="hero-sub">Donnez une seconde vie aux livres d'occasion 📚</p>
      </section>

      {/* ── Sell banner ── */}
      <section className="sell-banner">
        <div className="sell-banner-content">
          <h2>Revendez vos livres facilement</h2>
          <p>Estimez votre rachat en quelques secondes et envoyez vos livres.</p>
        </div>
        <Link to="/sell">
          <button>Vendre mes livres</button>
        </Link>
      </section>

      {/* ── Nouveautés ── */}
      <section className="books-section">
        <div className="section-header">
          <h2>Nouveautés</h2>
          <span className="section-label">Arrivages récents</span>
        </div>
        <div className="home-books">
          {books.slice(0, 4).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ── Best sellers ── */}
      <section className="books-section">
        <div className="section-header">
          <h2>Meilleures ventes</h2>
          <span className="section-label">Les favoris</span>
        </div>
        <div className="home-books">
          {books.slice(4, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ── Box teaser ── */}
      <section className="box-teaser">
        <div className="box-teaser-dot">✨</div>
        <div>
          <span className="box-teaser-tag">Bientôt disponible</span>
          <h2>Des box surprise trimestrielles</h2>
          <p>
            Des sélections de livres livrées chaque trimestre, choisies selon vos goûts et vos coups de cœur.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;