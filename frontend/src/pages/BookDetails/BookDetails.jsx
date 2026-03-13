import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import OfferSelector from "../../components/OfferSelector/OfferSelector";
import { fetchBookById, fetchBookOffers } from "../../services/api";
import { CartContext } from "../../context/CartContext";

import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    async function loadData() {
      try {
        const bookData = await fetchBookById(id);
        setBook(bookData);

        const offersData = await fetchBookOffers(id);
        setOffers(offersData);
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    }

    loadData();
  }, [id]);

  if (!book) {
    return <p>En chargement...</p>;
  }

  return (
    <div className="book-detail-page">

      <div className="book-detail-container">

        {/* Cover */}
        <div className="book-detail-image">
          <img src={book.image_url} alt={book.title} />
        </div>

        {/* Right side */}
        <div className="book-detail-info">

          <h1 className="book-title">{book.title}</h1>

          <p className="book-author">{book.author}</p>

          <p className="book-summary">{book.summary}</p>

          <div className="book-meta">
            <p><strong>Format:</strong> {book.format}</p>
            <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
            <p><strong>Prix neuf:</strong> {book.price_new_ref} €</p>
          </div>

          {offers.length === 0 ? (
            <p className="no-stock">Pas de Stock</p>
          ) : (
            <>
              <OfferSelector
                offers={offers}
                selectedOffer={selectedOffer}
                onSelect={setSelectedOffer}
              />

              <button
  className={`add-cart-btn ${added ? "added" : ""}`}
  disabled={!selectedOffer}
  onClick={() => {
    addToCart({
      id: selectedOffer.id,
      title: book.title,
      author: book.author,
      condition: selectedOffer.condition,
      price: selectedOffer.sell_price,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }}
>
  {added ? "✓ Ajouté!" : "Ajouter au panier"}
</button>

              {!selectedOffer && (
                <p className="select-condition">
                  Selectionner un état pour ajouter au panier.
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookDetails;