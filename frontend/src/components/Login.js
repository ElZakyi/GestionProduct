import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/login", {
        email,
        motDePasse,
      })
      .then((res) => {
        alert("Connexion réussie !");
        console.log("Utilisateur connecté :", res.data);

        navigate("/produits"); // 🔥 redirection vers page produit
      })
      .catch((err) => {
        alert("Erreur : " + err.response.data.message);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        <div className="input-group">
          <label>Email :</label>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-auth">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
