import "./Terms.css";

function Terms() {
  return (
    <div className="legal-page">
      <h1>Conditions Générales d'Utilisation</h1>
      <p className="legal-date">Dernière mise à jour : mars 2025</p>

      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes CGU régissent l'accès et l'utilisation du site Chapitre 2,
          plateforme de vente et de rachat de livres d'occasion.
        </p>
      </section>

      <section>
        <h2>2. Accès au site</h2>
        <p>
          L'accès au catalogue est libre et gratuit. La création d'un compte est nécessaire
          pour passer une commande ou soumettre une demande de rachat.
          L'utilisateur doit être âgé d'au moins 18 ans.
        </p>
      </section>

      <section>
        <h2>3. Création de compte</h2>
        <p>
          L'utilisateur s'engage à fournir des informations exactes et à maintenir
          ses identifiants confidentiels. Il est seul responsable de leur utilisation.
        </p>
      </section>

      <section>
        <h2>4. Comportement de l'utilisateur</h2>
        <ul>
          <li>Ne pas soumettre de fausses déclarations sur l'état des livres lors d'un rachat.</li>
          <li>Ne pas tenter de contourner les mécanismes de sécurité du site.</li>
          <li>Ne pas utiliser le site à des fins illicites ou frauduleuses.</li>
        </ul>
      </section>

      <section>
        <h2>5. Disponibilité du service</h2>
        <p>
          Chapitre 2 s'efforce d'assurer la disponibilité du service 24h/24, 7j/7.
          Des interruptions peuvent survenir pour maintenance ou en cas de force majeure.
        </p>
      </section>

      <section>
        <h2>6. Droit applicable</h2>
        <p>
          Les présentes CGU sont soumises au droit français.
          Contact : <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a>
        </p>
      </section>
    </div>
  );
}

export default Terms;