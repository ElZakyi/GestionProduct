import React, { useState } from "react";
import "./Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // À connecter plus tard avec Spring :
    // axios.post("http://localhost:8080/login", { email, motDePasse })
    //   .then(res => onLogin(res.data));

    console.log("Tentative de connexion :", email, motDePasse);

    if (onLogin) {
      onLogin({ email });
    }
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

        <button type="submit" className="btn-auth">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
