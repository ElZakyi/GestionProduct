import React, { useState } from "react";
import MouvementEntree from "./MouvementEntree";
import MouvementSortie from "./MouvementSortie";
import "./Mouvement.css";

function MouvementManagement({ produits, setProduits }) {
  const [mouvements, setMouvements] = useState([]);

  return (
    <div className="mvt-container">
      <h2>Gestion des Mouvements</h2>

      <div className="mvt-flex">
        <MouvementEntree
          produits={produits}
          setProduits={setProduits}
          mouvements={mouvements}
          setMouvements={setMouvements}
        />

        <MouvementSortie
          produits={produits}
          setProduits={setProduits}
          mouvements={mouvements}
          setMouvements={setMouvements}
        />
      </div>

      <h3>Historique des mouvements</h3>

      <table className="mvt-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {mouvements.map((m) => (
            <tr key={m.idMouvement}>
              <td className={m.type === "SORTIE" ? "red" : "green"}>{m.type}</td>
              <td>{m.produit}</td>
              <td>{m.quantite}</td>
              <td>{m.dateMouvement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MouvementManagement;
