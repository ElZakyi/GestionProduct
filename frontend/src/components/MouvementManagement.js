import React, { useState } from "react";
import "./MouvementManagement.css";

function MouvementManagement() {
  const [stock, setStock] = useState([]);
  const [mouvements, setMouvements] = useState([]);

  const [nomProduit, setNomProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [type, setType] = useState("ENTREE");

  // ================================
  // 1) Enregistrer un mouvement
  // ================================
  const enregistrerMouvement = (e) => {
    e.preventDefault();

    // --- Mise à jour du stock ---
    const produitExiste = stock.find(
      (item) => item.nomProduit === nomProduit
    );

    let stockMisAJour;

    if (produitExiste) {
      const updated = {
        ...produitExiste,
        quantite:
          type === "ENTREE"
            ? produitExiste.quantite + parseInt(quantite)
            : produitExiste.quantite - parseInt(quantite),
      };

      stockMisAJour = stock.map((item) =>
        item.nomProduit === nomProduit ? updated : item
      );
    } else {
      stockMisAJour = [
        ...stock,
        {
          id: Date.now(),
          nomProduit,
          quantite: parseInt(quantite),
          seuil: 10,
        },
      ];
    }

    setStock(stockMisAJour);

    // --- Ajout au tableau des mouvements ---
    const nouveauMouvement = {
      id: Date.now(),
      nomProduit,
      quantite,
      type,
      date: new Date().toLocaleString(),
      stockApres: stockMisAJour.find((p) => p.nomProduit === nomProduit)
        .quantite,
    };

    // ➤ À connecter au backend plus tard :
    // axios.post("http://localhost:8080/api/mouvements", nouveauMouvement)

    setMouvements([nouveauMouvement, ...mouvements]);

    setNomProduit("");
    setQuantite("");
  };

  // ================================
  // 2) Supprimer un mouvement
  // ================================
  const supprimerMouvement = (id) => {
    // ➤ Plus tard backend :
    // axios.delete(`http://localhost:8080/api/mouvements/${id}`)

    setMouvements(mouvements.filter((m) => m.id !== id));
  };

  return (
    <div className="mouvement-container">
      <h2>Historique des Mouvements</h2>

      {/* FORMULAIRE */}
      <form className="mouvement-form" onSubmit={enregistrerMouvement}>
        <h3>Nouvelle Opération</h3>

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

        <button type="submit" className="btn-valider">Valider</button>
      </form>

      {/* TABLEAU DES MOUVEMENTS */}
      <h3>Liste des Mouvements</h3>
      <table className="table-mouvements">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Type</th>
            <th>Date</th>
            <th>Stock après</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {mouvements.length === 0 ? (
            <tr>
              <td colSpan="6">Aucun mouvement enregistré.</td>
            </tr>
          ) : (
            mouvements.map((m) => (
              <tr key={m.id}>
                <td>{m.nomProduit}</td>
                <td>{m.quantite}</td>
                <td
                  className={
                    m.type === "ENTREE" ? "entree" : "sortie"
                  }
                >
                  {m.type}
                </td>
                <td>{m.date}</td>
                <td>{m.stockApres}</td>
                <td>
                  <button
                    className="btn-supprimer"
                    onClick={() => supprimerMouvement(m.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MouvementManagement;
