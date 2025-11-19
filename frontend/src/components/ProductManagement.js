import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductManagement.css";

function ProductManagement() {
  const [produits, setProduits] = useState([]);

  const [form, setForm] = useState({
    nomProduit: "",
    reference: "",
    description: "",
    prixUnitaire: "",
    qte: "",
    qteMin: "",
    qteMax: "",
    qteInventaire: "",
  });

  // Charger liste des produits
  useEffect(() => {
    // Backend 🡆 GET /produits
    // axios.get("http://localhost:8080/produits")
    //      .then(res => setProduits(res.data));

    console.log("Chargement des produits depuis le backend…");
  }, []);

  // Gestion des inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajouter un produit
  const ajouterProduit = (e) => {
    e.preventDefault();

    const nouveau = {
      ...form,
      prixUnitaire: parseFloat(form.prixUnitaire),
      qte: parseInt(form.qte),
      qteMin: parseInt(form.qteMin),
      qteMax: parseInt(form.qteMax),
      qteInventaire: parseInt(form.qteInventaire),
    };

    // Backend 🡆 POST /produits
    // axios.post("http://localhost:8080/produits", nouveau)
    //      .then(res => setProduits([...produits, res.data]));

    setProduits([...produits, { idProduit: Date.now(), ...nouveau }]);

    setForm({
      nomProduit: "",
      reference: "",
      description: "",
      prixUnitaire: "",
      qte: "",
      qteMin: "",
      qteMax: "",
      qteInventaire: "",
    });
  };

  // Supprimer un produit
  const supprimerProduit = (id) => {
    // Backend DELETE /produits/{id}
    // axios.delete(`http://localhost:8080/produits/${id}`)
    //      .then(() => setProduits(produits.filter(p => p.idProduit !== id)));

    setProduits(produits.filter((p) => p.idProduit !== id));
  };

  return (
    <div className="produit-container">

      <h2>Gestion des Produits</h2>

      {/* Formulaire */}
      <form className="form-produit" onSubmit={ajouterProduit}>
        <h3>Ajouter un produit</h3>

        <input type="text" name="nomProduit" placeholder="Nom"
               value={form.nomProduit} onChange={handleChange} required />

        <input type="text" name="reference" placeholder="Référence"
               value={form.reference} onChange={handleChange} required />

        <input type="text" name="description" placeholder="Description"
               value={form.description} onChange={handleChange} required />

        <input type="number" name="prixUnitaire" placeholder="Prix unitaire"
               value={form.prixUnitaire} onChange={handleChange} required />

        <input type="number" name="qte" placeholder="Quantité actuelle"
               value={form.qte} onChange={handleChange} required />

        <input type="number" name="qteMin" placeholder="Quantité minimum"
               value={form.qteMin} onChange={handleChange} required />

        <input type="number" name="qteMax" placeholder="Quantité maximum"
               value={form.qteMax} onChange={handleChange} required />

        <input type="number" name="qteInventaire" placeholder="Inventaire"
               value={form.qteInventaire} onChange={handleChange} required />

        <button type="submit" className="btn-ajouter">Ajouter</button>
      </form>

      {/* Liste */}
      <h3>Liste des Produits</h3>

      <table className="table-produit">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Réf</th>
            <th>Prix</th>
            <th>Qté</th>
            <th>Min</th>
            <th>Max</th>
            <th>Inventaire</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {produits.map((p) => (
            <tr key={p.idProduit}>
              <td>{p.nomProduit}</td>
              <td>{p.reference}</td>
              <td>{p.prixUnitaire} DH</td>
              <td>{p.qte}</td>
              <td>{p.qteMin}</td>
              <td>{p.qteMax}</td>
              <td>{p.qteInventaire}</td>

              <td>
                <button className="btn-supprimer"
                        onClick={() => supprimerProduit(p.idProduit)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {produits.length === 0 && (
            <tr><td colSpan="8">Aucun produit.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
