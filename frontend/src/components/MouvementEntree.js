import React, { useState } from "react";
import axios from "axios";
import "./Mouvement.css";

function MouvementEntree({ produits, rafraichirProduits, chargerMouvements }) {
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");

  const API_URL = "http://localhost:8080/api/mouvements/entree";

  const enregistrerEntree = (e) => {
    e.preventDefault();

    const prod = produits.find(p => p.idProduit === parseInt(produitId));
    if (!prod) return;

    const newStock = prod.qte + parseInt(quantite);

    // 🔴 Si dépassement du stock max → bloquer
    if (newStock > prod.qteMax) {
      return alert(
        `Impossible : la quantité entrée dépasse le stock maximum autorisé !\n` +
        `Stock max : ${prod.qteMax}\n` +
        `Stock final si ajouté : ${newStock}`
      );
    }

    axios.post(API_URL, null, {
      params: {
        idProduit: produitId,
        quantite: quantite
      }
    })
      .then(() => {
        rafraichirProduits();
        chargerMouvements();
        setQuantite("");
        setProduitId("");
      })
      .catch(() => alert("Erreur lors de l'entrée de stock"));
  };

  return (
    <div className="mvt-box">
      <h3>Mouvement Entrée</h3>

      <form onSubmit={enregistrerEntree}>
        <label>Produit :</label>
        <select value={produitId} onChange={(e) => setProduitId(e.target.value)}>
          <option value="">-- Choisir un produit --</option>
          {produits.map(p => (
            <option key={p.idProduit} value={p.idProduit}>
              {p.nomProduit}
            </option>
          ))}
        </select>

        <label>Quantité à ajouter :</label>
        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          required
        />

        <button type="submit" className="btn-entree">Ajouter</button>
      </form>
    </div>
  );
}

export default MouvementEntree;
