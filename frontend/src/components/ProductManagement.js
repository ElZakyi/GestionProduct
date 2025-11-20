import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";

function ProductManagement() {
  const navigate = useNavigate();

  const [produits, setProduits] = useState([]);
  const [editId, setEditId] = useState(null);

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
    axios.get("http://localhost:8080/api/produits")
      .then(res => setProduits(res.data))
      .catch(err => console.error("Erreur chargement produits", err));
  }, []);

  // Gestion des inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajouter ou modifier un produit
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      prixUnitaire: parseFloat(form.prixUnitaire),
      qte: parseInt(form.qte),
      qteMin: parseInt(form.qteMin),
      qteMax: parseInt(form.qteMax),
      qteInventaire: parseInt(form.qteInventaire),
    };

    // MODE MODIFICATION
    if (editId) {
      axios.put(`http://localhost:8080/api/produits/${editId}`, data)
        .then(() => {
          alert("Produit modifié !");
          window.location.reload();
        });
      return;
    }

    // MODE AJOUT
    axios.post("http://localhost:8080/api/produits", data)
      .then(res => {
        setProduits([...produits, res.data]);
        alert("Produit ajouté !");
      });

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

  // Préparer modification
  const modifierProduit = (p) => {
    setEditId(p.idProduit);
    setForm({
      nomProduit: p.nomProduit,
      reference: p.reference,
      description: p.description,
      prixUnitaire: p.prixUnitaire,
      qte: p.qte,
      qteMin: p.qteMin,
      qteMax: p.qteMax,
      qteInventaire: p.qteInventaire,
    });
  };

  // Supprimer un produit
  const supprimerProduit = (id) => {
    axios.delete(`http://localhost:8080/api/produits/${id}`)
      .then(() => {
        setProduits(produits.filter((p) => p.idProduit !== id));
      });
  };

  return (
    <div className="produit-container">

      <h2>Gestion des Produits</h2>
      {/* Formulaire */}
      <form className="form-produit" onSubmit={handleSubmit}>
        <h3>{editId ? "Modifier Produit" : "Ajouter un produit"}</h3>

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

        <input type="number" name="qteMin" placeholder="Qté min"
               value={form.qteMin} onChange={handleChange} required />

        <input type="number" name="qteMax" placeholder="Qté max"
               value={form.qteMax} onChange={handleChange} required />

        <input type="number" name="qteInventaire" placeholder="Inventaire"
               value={form.qteInventaire} onChange={handleChange} required />

        <button type="submit" className="btn-ajouter">
          {editId ? "Modifier" : "Ajouter"}
        </button>
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
                <button className="btn-modifier"
                        onClick={() => modifierProduit(p)}>
                  Modifier
                </button>

                <button className="btn-supprimer"
                        onClick={() => supprimerProduit(p.idProduit)}>
                  Supprimer
                </button>
                <button
                  className="btn-categorie"
                  onClick={() => navigate("/categories")}
                >
                  Gérer Catégories
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
