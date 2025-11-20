import React, { useEffect, useState } from "react";
import axios from "axios";
import MouvementEntree from "./MouvementEntree";
import MouvementSortie from "./MouvementSortie";
import "./Mouvement.css";
import { useNavigate } from "react-router-dom"; 

function MouvementManagement() {
  const [produits, setProduits] = useState([]);
  const [mouvements, setMouvements] = useState([]);

  const API_PRODUITS = "http://localhost:8080/api/produits";
  const API_MVT = "http://localhost:8080/api/mouvements";
  const navigate = useNavigate();

  // Charger produits + historique
  useEffect(() => {
    rafraichirProduits();
    chargerMouvements();
  }, []);

  const rafraichirProduits = () => {
    axios.get(API_PRODUITS)
      .then(res => setProduits(res.data))
      .catch(() => alert("Erreur chargement produits"));
  };

  const chargerMouvements = () => {
    axios.get(API_MVT)
      .then(res => setMouvements(res.data))
      .catch(() => alert("Erreur chargement mouvements"));
  };

  return (
    <div className="mvt-container">
      {/* 🔙 Bouton retour */}
      <button 
        className="btn-retour" 
        onClick={() => navigate("/produits")}
      >
        ⬅ Retour Produits
      </button>
      <h2>Gestion des Mouvements</h2>

      <div className="mvt-flex">
        <MouvementEntree
          produits={produits}
          rafraichirProduits={rafraichirProduits}
          chargerMouvements={chargerMouvements}
        />

        <MouvementSortie
          produits={produits}
          rafraichirProduits={rafraichirProduits}
          chargerMouvements={chargerMouvements}
        />
      </div>

      <h3>Historique des mouvements</h3>

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
  {mouvements.length === 0 ? (
    <tr>
      <td colSpan="4" style={{ textAlign: "center" }}>Aucun mouvement.</td>
    </tr>
  ) : (
    mouvements.map((m) => (
      <tr key={m.idMouvement}>
        <td className={m["@type"] === "MouvementSortie" ? "red" : "green"}>
          {m["@type"] === "MouvementSortie" ? "SORTIE" : "ENTREE"}
        </td>

        <td>{m.produit?.nomProduit}</td>

        <td>{m.quantite}</td>

        <td>{m.dateMouvement}</td>
      </tr>
    ))
  )}
</tbody>

</table>

    </div>
  );
}

export default MouvementManagement;
