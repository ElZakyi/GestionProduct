import React, { useState } from "react";
import "./Mouvement.css";

function MouvementEntree({ produits, setProduits, mouvements, setMouvements }) {
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");

  const enregistrerEntree = (e) => {
    e.preventDefault();

    const prod = produits.find(p => p.idProduit === parseInt(produitId));
    if (!prod) return;

    const newStock = prod.stockFinal + parseInt(quantite);

    const updatedProduit = {
      ...prod,
      stockFinal: newStock,
      qte: newStock,
      messageAlerte: newStock < prod.qteMin ? "Stock bas !" : "",
    };

    const updatedList = produits.map(p =>
      p.idProduit === prod.idProduit ? updatedProduit : p
    );

    setProduits(updatedList);

    const mouvement = {
      idMouvement: Date.now(),
      type: "ENTREE",
      produit: prod.nomProduit,
      quantite: parseInt(quantite),
      dateMouvement: new Date().toLocaleString(),
    };

    setMouvements([...mouvements, mouvement]);

    setQuantite("");
    setProduitId("");
  };

  return (
    <div className="mvt-box">
      <h3>Mouvement Entrée</h3>

      <form onSubmit={enregistrerEntree}>
        <label>Produit :</label>
        <select value={produitId} onChange={(e) => setProduitId(e.target.value)}>
          <option value="">-- Choisir un produit --</option>
          {produits.map((p) => (
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
