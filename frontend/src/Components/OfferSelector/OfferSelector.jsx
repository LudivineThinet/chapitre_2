import "./OfferSelector.css";

function OfferSelector({ offers, selectedOffer, onSelect }) {
  if (!offers || offers.length === 0) {
    return <p>No offers available.</p>;
  }

  return (
    <div>
      <h2>Available conditions</h2>

      {offers.map((offer) => (
        <label key={offer.id}>
          <input
            type="radio"
            name="offer"
            value={offer.id}
            checked={selectedOffer?.id === offer.id}
            onChange={() => onSelect(offer)}
          />

          {offer.condition} — {offer.sell_price} €
          (stock: {offer.stock})
        </label>
      ))}
    </div>
  );
}

export default OfferSelector;
