import { Link } from "react-router-dom";
import "./Cancel.css";

function Cancel() {
  return (
    <div className="cancel-page">
      <h1>Paiement annulé ❌</h1>

      <p>Votre paiement n’a pas été validé.</p>
      <p>Vous pouvez revenir à votre panier pour réessayer.</p>

      <Link to="/cart">
        <button>Retour au panier</button>
      </Link>
    </div>
  );
}

export default Cancel;
