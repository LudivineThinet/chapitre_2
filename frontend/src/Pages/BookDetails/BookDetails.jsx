import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OfferSelector from "../../components/OfferSelector/OfferSelector";
import { fetchBookById, fetchBookOffers } from "../../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Book info
        const bookData = await fetchBookById(id);
        setBook(bookData);

        // Offers
        const offersData = await fetchBookOffers(id);
        setOffers(offersData);
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    }

    loadData();
  }, [id]);

  if (!book) {
    return <p>Loading book...</p>;
  }

  return (
    <div>
      {/* ✅ Cover image */}
      <img
        src={book.image_url}
        alt={book.title}
        width="200"
      />

      {/* ✅ Title + Author */}
      <h1>{book.title}</h1>
      <p>{book.author}</p>

      {/* ✅ Format */}
      <p>
        Format: <strong>{book.format}</strong>
      </p>

      {/* ✅ Genres */}
      <p>
        Genres: <strong>{book.genres.join(", ")}</strong>
      </p>

      {/* ✅ Summary */}
      <p>{book.summary}</p>

      {/* ✅ Reference new price */}
      <p>
        Prix neuf : {book.price_new_ref} €
      </p>

      {/* ✅ Offers section */}
{offers.length === 0 ? (
  <p><strong>No stock available.</strong></p>
) : (
  <>
    {/* Offers selector */}
    <OfferSelector
      offers={offers}
      selectedOffer={selectedOffer}
      onSelect={setSelectedOffer}
    />

    {/* Add to cart button */}
    <button disabled={!selectedOffer}>
  {selectedOffer
    ? `Add to cart (${selectedOffer.sell_price} €)`
    : "Add to cart"}
</button>


    {/* Small helper message */}
    {!selectedOffer && (
      <p>Please select a condition before adding to cart.</p>
    )}
  </>
)}

    </div>
  );
}

export default BookDetails;
