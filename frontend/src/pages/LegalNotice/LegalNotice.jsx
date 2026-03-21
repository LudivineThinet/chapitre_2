import "./LegalNotice.css";

function LegalNotice() {
  return (
    <div className="legal-page">
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          <strong>Ludivine Thinet</strong><br />
          Projet réalisé dans le cadre d'une formation Développeur Full Stack — IT-Akademy<br />
          Email : <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          <strong>Front-end :</strong> Vercel Inc. — 340 Pine Street, San Francisco, CA 94104, USA<br />
          <a href="https://vercel.com" target="_blank" rel="noreferrer">https://vercel.com</a>
        </p>
        <p>
          <strong>Back-end (API) :</strong> Render Services Inc. — 525 Brannan Street, San Francisco, CA 94107, USA<br />
          <a href="https://render.com" target="_blank" rel="noreferrer">https://render.com</a>
        </p>
        <p>
          <strong>Base de données :</strong> Neon Inc.<br />
          <a href="https://neon.tech" target="_blank" rel="noreferrer">https://neon.tech</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, logo, code source) est la propriété
          exclusive de Ludivine Thinet. Toute reproduction, même partielle, est interdite sans
          autorisation préalable.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative au site :<br />
          <a href="mailto:contact@chapitre2.fr">contact@chapitre2.fr</a>
        </p>
      </section>
    </div>
  );
}

export default LegalNotice;