import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { fetchBooks } from "../../services/api";
import BookCard from "../../components/BookCard/BookCard";

import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const genre = searchParams.get("genre");
  const search = searchParams.get("search");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    if (genre && !book.genres.includes(genre)) {
      return false;
    }

    if (
      search &&
      !book.title.toLowerCase().includes(search.toLowerCase()) &&
      !book.author.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (loading) return <p>Chargement en cours...</p>;

  
  return (
    <div className="books-page">
      <h1>
  {genre
    ? `${genre}`
    : search
    ? `Results for "${search}"`
    : "Tous les livres"}
</h1>
{(genre || search) && (
  <button onClick={() => navigate("/books")}>
    Afficher tous les livres
  </button>
)}



      {/* Small filter info */}
      {genre && <p>Categorie: {genre}</p>}
      {search && <p>Recherche: {search}</p>}

      {filteredBooks.length === 0 ? (
        <p>Aucun livre ne correspond à vos critères.</p>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
