import React, { useState } from "react";
import "./StockManagement.css";

function StockManagement() {
  const [stock, setStock] = useState([]);

  const [nomProduit, setNomProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [type, setType] = useState("ENTREE"); // ENTREE ou SORTIE

  // ================================
  // Ajouter un mouvement au stock
  // ================================
  const enregistrerMouvement = (e) => {
    e.preventDefault();

    // Chercher si ce produit existe déjà dans le stock
    const produitExiste = stock.find(
      (item) => item.nomProduit === nomProduit
    );

    let nouveauStock;

    if (produitExiste) {
      // Mise à jour du stock existant
      const updated = {
        ...produitExiste,
        quantite:
          type === "ENTREE"
            ? produitExiste.quantite + parseInt(quantite)
            : produitExiste.quantite - parseInt(quantite),
      };

      nouveauStock = stock.map((item) =>
        item.nomProduit === nomProduit ? updated : item
      );
    } else {
      // Nouveau produit dans le stock
      const newItem = {
        id: Date.now(),
        nomProduit,
        quantite: parseInt(quantite),
        seuil: 10, // valeur par défaut (tu peux modifier)
      };

      nouveauStock = [...stock, newItem];
    }

    setStock(nouveauStock);

    // ➤ À connecter au backend plus tard :
    // axios.post("http://localhost:8080/api/mouvements", {...})

    setNomProduit("");
    setQuantite("");
  };

  return (
    <div className="stock-container">
      <h2>Gestion du Stock</h2>

      {/* Formulaire */}
      <form className="stock-form" onSubmit={enregistrerMouvement}>
        <h3>Nouvelle opération</h3>

        <input
          type="text"
          placeholder="Nom du produit"
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantité"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ENTREE">Entrée (Ajouter)</option>
          <option value="SORTIE">Sortie (Retirer)</option>
        </select>

        <button type="submit" className="btn-valider">
          Valider
        </button>
      </form>

      {/* Tableau */}
      <h3>Stock actuel</h3>
      <table className="table-stock">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Seuil</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {stock.length === 0 ? (
            <tr>
              <td colSpan="4">Aucun produit dans le stock.</td>
            </tr>
          ) : (
            stock.map((item) => (
              <tr key={item.id}>
                <td>{item.nomProduit}</td>
                <td>{item.quantite}</td>
                <td>{item.seuil}</td>
                <td>
                  {item.quantite < item.seuil ? (
                    <span className="alerte">Stock bas ⚠️</span>
                  ) : (
                    <span className="ok">OK ✔️</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;
