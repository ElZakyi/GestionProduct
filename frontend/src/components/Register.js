import React, { useState } from "react";
import "./Auth.css";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("employe");

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      nom,
      prenom,
      email,
      motDePasse,
      role
    };

    // À connecter plus tard :
    // axios.post("http://localhost:8080/register", newUser)

    console.log("Nouvel utilisateur :", newUser);
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Inscription</h2>

        <div className="input-group">
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="input-group">
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Votre prénom"
            required
          />
        </div>

        <div className="input-group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
          />
        </div>

        <div className="input-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <div className="input-group">
          <label>Rôle :</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employe">Employé</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn-auth">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
