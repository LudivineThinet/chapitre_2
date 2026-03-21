import "./Privacy.css";

function Privacy() {
  return (
    <div className="legal-page">
      <h1>Politique de confidentialité</h1>
      <p className="legal-date">Dernière mise à jour : mars 2025</p>

      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Ludivine Thinet — contact@chapitre2.fr<br />
          Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).
        </p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <ul>
          <li><strong>Données de compte :</strong> adresse email, mot de passe (chiffré), prénom, nom, date de naissance.</li>
          <li><strong>Données de livraison :</strong> nom complet, adresse postale, ville, code postal, pays.</li>
          <li><strong>Données bancaires :</strong> IBAN et titulaire du compte (uniquement pour le versement des rachats acceptés).</li>
          <li><strong>Token d'authentification :</strong> JWT stocké en local storage.</li>
          <li><strong>Historique :</strong> commandes passées et demandes de rachat soumises.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités des traitements</h2>
        <ul>
          <li>Création et gestion de votre compte utilisateur</li>
          <li>Traitement et suivi de vos commandes</li>
          <li>Traitement de vos demandes de rachat de livres</li>
          <li>Versement du montant de vos rachats acceptés</li>
        </ul>
      </section>

      <section>
        <h2>4. Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant toute la durée de vie de votre compte.
          En cas de suppression de compte, vos données sont effacées dans un délai raisonnable,
          sauf obligation légale contraire.
        </p>
      </section>

      <section>
        <h2>5. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles.</li>
          <li><strong>Droit de rectification :</strong> modifier vos informations depuis votre profil.</li>
          <li><strong>Droit à l'effacement :</strong> supprimer votre compte depuis votre profil.</li>
          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format lisible.</li>
          <li><strong>Droit d'opposition :</strong> vous opposer à certains traitements.</li>
        </ul>
        <p>
          Contact : <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a><br />
          Réclamation CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>
        </p>
      </section>

      <section>
        <h2>6. Sécurité</h2>
        <p>
          Les mots de passe sont chiffrés avec bcrypt. Les communications sont sécurisées par HTTPS.
          Les données de paiement par carte sont traitées directement par Stripe (certifié PCI-DSS)
          et ne transitent jamais par nos serveurs.
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>
          Ce site utilise un token d'authentification (JWT) stocké dans le local storage
          de votre navigateur. Ce token est nécessaire au fonctionnement du site et
          n'est partagé avec aucun tiers.
        </p>
      </section>
    </div>
  );
}

export default Privacy;