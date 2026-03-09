import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BookCard from "../../components/BookCard/BookCard";

import { fetchBooks } from "../../services/api";

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
    <div>


      <div className="home-page">
        {/* Hero */}
        <section className="hero">
          <h1>Chapitre 2</h1>
          <p>Donnez une seconde vie aux livres d’occasion 📚</p>
        </section>

        {/* Sell promo */}
        <section className="sell-banner">
          <h2>Revendez vos livres facilement</h2>
          <p>
            Estimez votre rachat en quelques secondes et envoyez vos livres.
          </p>

          <Link to="/sell">
            <button>Vendre mes livres</button>
          </Link>
        </section>

        {/* Nouveautés */}
        <section>
        <h2>Nouveautés</h2>

        <div className="home-books">
          {books.slice(0, 4).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>


        {/* Best sellers */}
        <section>
          <h2>Meilleures ventes</h2>

          <div className="home-books">
            {books.slice(4, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Box teaser */}
        <section className="box-teaser">
          <h2>Bientôt disponible ✨</h2>
          <p>
            Des box de livres surprise, livrées chaque trimestre, selon vos goûts.
          </p>
        </section>
      </div>

      
    </div>
  );
}

export default Home;
