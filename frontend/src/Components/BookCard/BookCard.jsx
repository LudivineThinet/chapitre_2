import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card">

      {/* Cover */}
      <img
        src={book.image_url}
        alt={book.title}
        width="150"
      />

      {/* Title */}
      <h2>{book.title}</h2>

      {/* Author */}
      <p>{book.author}</p>

      {/* Price */}
      <p>
        From <strong>{book.starting_price} €</strong>
      </p>

    </Link>
  );
}

export default BookCard;

