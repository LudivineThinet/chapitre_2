import "./TermsOfSale.css";

function TermsOfSale() {
  return (
    <div className="legal-page">
      <h1>Conditions Générales de Vente</h1>
      <p className="legal-date">Dernière mise à jour : mars 2025</p>

      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes CGV régissent les ventes de livres d'occasion et les opérations
          de rachat aux particuliers réalisées sur la plateforme Chapitre 2.
        </p>
      </section>

      <section>
        <h2>2. Prix</h2>
        <p>Les prix sont indiqués en euros TTC et calculés selon l'état du livre :</p>
        <ul>
          <li><strong>Comme neuf :</strong> 70% du prix neuf</li>
          <li><strong>Très bon état :</strong> 60% du prix neuf</li>
          <li><strong>Bon état :</strong> 50% du prix neuf</li>
          <li><strong>État acceptable :</strong> 40% du prix neuf</li>
        </ul>
      </section>

      <section>
        <h2>3. Commande et paiement</h2>
        <p>
          La commande est validée après confirmation du paiement via Stripe.
          Les données bancaires ne transitent pas par les serveurs de Chapitre 2.
          Moyens acceptés : Visa, Mastercard, American Express.
        </p>
      </section>

      <section>
        <h2>4. Livraison</h2>
        <p>
          Les commandes sont expédiées à l'adresse renseignée lors du passage de commande.
          Chapitre 2 ne saurait être tenu responsable des retards imputables au transporteur.
        </p>
      </section>

      <section>
        <h2>5. Droit de rétractation</h2>
        <p>
          Conformément à l'article L221-18 du Code de la consommation, vous disposez
          d'un délai de 14 jours à compter de la réception pour exercer votre droit de rétractation.
          Contact : <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a>
        </p>
      </section>

      <section>
        <h2>6. Rachat de livres</h2>
        <p>
          Le prix de rachat est calculé automatiquement selon l'état déclaré du livre.
          L'administrateur se réserve le droit de refuser un rachat si l'état réel
          ne correspond pas à la déclaration. En cas d'acceptation, le versement
          est effectué sur l'IBAN renseigné dans le profil.
        </p>
      </section>

      <section>
        <h2>7. Service client</h2>
        <p>
          <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a>
        </p>
      </section>
    </div>
  );
}

export default TermsOfSale;