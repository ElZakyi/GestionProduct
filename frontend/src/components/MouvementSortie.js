import React, { useState } from "react";
import axios from "axios";
import "./Mouvement.css";

function MouvementSortie({ produits, rafraichirProduits, chargerMouvements }) {
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");

  const API_URL = "http://localhost:8080/api/mouvements/sortie";

  const enregistrerSortie = (e) => {
    e.preventDefault();

    const prod = produits.find(p => p.idProduit === parseInt(produitId));
    if (!prod) return;

    const newStock = prod.qte - parseInt(quantite);

    // 🔴 Si on descend sous qteMin → bloquer
    if (newStock < prod.qteMin) {
      return alert(
        `Attention : cette sortie va descendre sous le stock minimum !\n` +
        `Stock min : ${prod.qteMin}\n` +
        `Stock final si retiré : ${newStock}`
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
        setProduitId("");
        setQuantite("");
      })
      .catch(() => alert("Erreur lors de la sortie du stock"));
  };

  return (
    <div className="mvt-box">
      <h3>Mouvement Sortie</h3>

      <form onSubmit={enregistrerSortie}>
        <label>Produit :</label>
        <select value={produitId} onChange={(e) => setProduitId(e.target.value)}>
          <option value="">-- Choisir un produit --</option>
          {produits.map(p => (
            <option key={p.idProduit} value={p.idProduit}>
              {p.nomProduit}
            </option>
          ))}
        </select>

        <label>Quantité à retirer :</label>
        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          required
        />

        <button type="submit" className="btn-sortie">Retirer</button>
      </form>
    </div>
  );
}

export default MouvementSortie;
