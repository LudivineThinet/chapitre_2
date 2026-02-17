import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/api";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(email, password);

      // Inscription réussie → redirection login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="ex: ludivine@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default Register;
