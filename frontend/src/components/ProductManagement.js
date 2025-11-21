import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";

function ProductManagement() {

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    nomProduit: "",
    reference: "",
    description: "",
    prixUnitaire: "",
    qte: "",
    qteMin: "",
    qteMax: "",
    qteInventaire: "",
    idCategorie: ""
  });

  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const API_PRODUITS = "http://localhost:8080/api/produits";
  const API_CATEGORIES = "http://localhost:8080/api/categories";

  useEffect(() => {
    chargerProduits();
    chargerCategories();
  }, []);

  const chargerProduits = () => {
    axios.get(API_PRODUITS)
      .then(res => setProduits(res.data))
      .catch(err => console.log("Erreur GET produits :", err));
  };

  const chargerCategories = () => {
    axios.get(API_CATEGORIES)
      .then(res => setCategories(res.data))
      .catch(() => console.log("Erreur chargement catégories"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      prixUnitaire: parseFloat(form.prixUnitaire),
      qte: parseInt(form.qte),
      qteMin: parseInt(form.qteMin),
      qteMax: parseInt(form.qteMax),
      qteInventaire: parseInt(form.qteInventaire),
      categorie: form.idCategorie ? { idCategorie: parseInt(form.idCategorie) } : null
    };

    if (editId) {
      axios.put(`${API_PRODUITS}/${editId}`, data)
        .then(() => {
          chargerProduits();
          resetForm();
          setEditId(null);
        })
        .catch(() => alert("Erreur modification"));
      return;
    }

    axios.post(API_PRODUITS, data)
      .then(() => {
        chargerProduits();
        resetForm();
      })
      .catch(() => alert("Erreur ajout"));
  };

  const resetForm = () => {
    setForm({
      nomProduit: "",
      reference: "",
      description: "",
      prixUnitaire: "",
      qte: "",
      qteMin: "",
      qteMax: "",
      qteInventaire: "",
      idCategorie: ""
    });
  };

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
      idCategorie: p.categorie ? p.categorie.idCategorie : ""
    });
  };

  const supprimerProduit = (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    axios.delete(`${API_PRODUITS}/${id}`)
      .then(() => chargerProduits())
      .catch(() => alert("Erreur suppression"));
  };

  return (
    <div className="produit-container">

      <div className="top-actions">
        <button className="btn-mvt" onClick={() => navigate("/mouvements")}>
          🔄 Gérer Mouvements
        </button>

        {/* 🔥 BOUTON GÉRER CATEGORIES */}
        <button className="btn-categorie" onClick={() => navigate("/categories")}>
          📂 Gérer Catégories
        </button>
      </div>

      <h2>Gestion des Produits</h2>

      <form className="form-produit" onSubmit={handleSubmit}>
        <h3>{editId ? "Modifier un Produit" : "Ajouter un Produit"}</h3>

        <input type="text" name="nomProduit" placeholder="Nom" value={form.nomProduit} onChange={handleChange} required />
        <input type="text" name="reference" placeholder="Référence" value={form.reference} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />

        <input type="number" name="prixUnitaire" placeholder="Prix" value={form.prixUnitaire} onChange={handleChange} required />
        <input type="number" name="qte" placeholder="Quantité actuelle" value={form.qte} onChange={handleChange} required />
        <input type="number" name="qteMin" placeholder="Quantité min" value={form.qteMin} onChange={handleChange} required />
        <input type="number" name="qteMax" placeholder="Quantité max" value={form.qteMax} onChange={handleChange} required />
        <input type="number" name="qteInventaire" placeholder="Inventaire" value={form.qteInventaire} onChange={handleChange} required />

        {/* 🔥 SELECT DES CATÉGORIES */}
        <select name="idCategorie" value={form.idCategorie} onChange={handleChange} required>
          <option value="">-- Choisir une catégorie --</option>
          {categories.map(cat => (
            <option key={cat.idCategorie} value={cat.idCategorie}>
              {cat.nomCategorie}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-ajouter">
          {editId ? "Enregistrer" : "Ajouter"}
        </button>
      </form>

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
            <th>Catégorie</th>
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
              <td>{p.categorie ? p.categorie.nomCategorie : "Aucune"}</td>

              <td>
                <button className="btn-edit" onClick={() => modifierProduit(p)}>Modifier</button>
                <button className="btn-supprimer" onClick={() => supprimerProduit(p.idProduit)}>Supprimer</button>
              </td>
            </tr>
          ))}

          {produits.length === 0 && (
            <tr>
              <td colSpan="9">Aucun produit.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
