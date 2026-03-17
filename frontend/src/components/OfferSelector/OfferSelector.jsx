import "./OfferSelector.css";

const conditionTranslations = {
  like_new: "Comme neuf",
  very_good: "Très bon",
  good: "Bon",
  acceptable: "Acceptable"
};

function OfferSelector({ offers, selectedOffer, onSelect }) {
  if (!offers || offers.length === 0) {
    return <p>Pas d'offres disponibles.</p>;
  }

  return (
    <div className="offer-selector">

      <h2 className="offer-title">Selectionnez l'état souhaitée</h2>

      <div className="offer-list">
        {offers.map((offer) => (
          <label
            key={offer.id}
            className={`offer-card ${
              selectedOffer?.id === offer.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="offer"
              value={offer.id}
              checked={selectedOffer?.id === offer.id}
              onChange={() => onSelect(offer)}
            />

            <div className="offer-condition">
              {conditionTranslations[offer.condition] || offer.condition}
            </div>

            <div className="offer-price">
              {offer.sell_price} €
            </div>

            <div className="offer-stock">
              Stock : {offer.stock}
            </div>

          </label>
        ))}
      </div>

    </div>
  );
}

export default OfferSelector;
