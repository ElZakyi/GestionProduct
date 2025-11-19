import React, { useState } from "react";
import "./ProductManagement.css";

function ProductManagement() {
  const [produits, setProduits] = useState([]);
  const [nomProduit, setNomProduit] = useState("");
  const [reference, setReference] = useState("");
  const [prix, setPrix] = useState("");
  const [seuil, setSeuil] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // ==============================
  // AJOUT PRODUIT (front seulement)
  // ==============================
  const ajouterProduit = (e) => {
    e.preventDefault();

    const nouveauProduit = {
      id: Date.now(),
      nomProduit,
      reference,
      prix,
      seuil,
    };

    // ➤ ICI tu vas appeler ton backend plus tard (POST)
    // axios.post("http://localhost:8080/api/produits", nouveauProduit)

    setProduits([...produits, nouveauProduit]);

    setNomProduit("");
    setReference("");
    setPrix("");
    setSeuil("");
  };

  // ==============================
  // SUPPRIMER PRODUIT
  // ==============================
  const supprimerProduit = (id) => {
    // ➤ ICI tu vas appeler ton backend plus tard (DELETE)
    // axios.delete(`http://localhost:8080/api/produits/${id}`)

    setProduits(produits.filter((p) => p.id !== id));
  };

  // ==============================
  // LANCER MODIFICATION
  // ==============================
  const lancerModification = (p) => {
    setIsEditing(true);
    setEditId(p.id);
    setNomProduit(p.nomProduit);
    setReference(p.reference);
    setPrix(p.prix);
    setSeuil(p.seuil);
  };

  // ==============================
  // MODIFIER PRODUIT
  // ==============================
  const modifierProduit = (e) => {
    e.preventDefault();

    const produitModifie = {
      id: editId,
      nomProduit,
      reference,
      prix,
      seuil,
    };

    // ➤ ICI tu vas appeler ton backend plus tard (PUT)
    // axios.put(`http://localhost:8080/api/produits/${editId}`, produitModifie)

    setProduits(
      produits.map((p) =>
        p.id === editId ? produitModifie : p
      )
    );

    setIsEditing(false);
    setEditId(null);
    setNomProduit("");
    setReference("");
    setPrix("");
    setSeuil("");
  };

  return (
    <div className="produit-container">
      <h2>Gestion des Produits</h2>

      {/* Formulaire */}
      <form className="form-produit" onSubmit={isEditing ? modifierProduit : ajouterProduit}>
        <h3>{isEditing ? "Modifier le Produit" : "Ajouter un Produit"}</h3>

        <input
          type="text"
          placeholder="Nom du produit"
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Référence"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Prix unitaire"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Seuil minimum"
          value={seuil}
          onChange={(e) => setSeuil(e.target.value)}
          required
        />

        <button type="submit" className="btn-ajouter">
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* LISTE PRODUITS */}
      <h3>Liste des Produits</h3>
      <table className="table-produit">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Référence</th>
            <th>Prix</th>
            <th>Seuil</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {produits.length === 0 ? (
            <tr><td colSpan="5">Aucun produit.</td></tr>
          ) : (
            produits.map((p) => (
              <tr key={p.id}>
                <td>{p.nomProduit}</td>
                <td>{p.reference}</td>
                <td>{p.prix} DH</td>
                <td>{p.seuil}</td>
                <td>
                  <button className="btn-edit" onClick={() => lancerModification(p)}>Modifier</button>
                  <button className="btn-supprimer" onClick={() => supprimerProduit(p.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
