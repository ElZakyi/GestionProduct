import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/produits";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProduits(res.data))
      .catch(err => console.log("Erreur chargement produits"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const produitData = {
      ...form,
      prixUnitaire: parseFloat(form.prixUnitaire),
      qte: parseInt(form.qte),
      qteMin: parseInt(form.qteMin),
      qteMax: parseInt(form.qteMax),
      qteInventaire: parseInt(form.qteInventaire),
    };

    if (editId) {
      axios.put(`${API_URL}/${editId}`, produitData)
        .then(res => {
          setProduits(produits.map(p => (p.idProduit === editId ? res.data : p)));
          setEditId(null);
          resetForm();
        })
        .catch(() => alert("Erreur lors de la modification"));
      return;
    }

    axios.post(API_URL, produitData)
      .then(res => setProduits([...produits, res.data]))
      .catch(() => alert("Erreur lors de l'ajout"));

    resetForm();
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
    });
  };

  const supprimerProduit = (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    axios.delete(`${API_URL}/${id}`)
      .then(() => setProduits(produits.filter(p => p.idProduit !== id)))
      .catch(() => alert("Erreur suppression"));
  };

  return (
    <div className="produit-container">
      <h2>Gestion des Produits</h2>
      <div className="top-actions">
        <button className="btn-mvt" onClick={() => navigate("/mouvements")}>
          🔄 Gérer Mouvements
        </button>
      </div>


      <form className="form-produit" onSubmit={handleSubmit}>
        <h3>{editId ? "Modifier le Produit" : "Ajouter un Produit"}</h3>

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

        <button type="submit" className="btn-ajouter">
          {editId ? "Enregistrer Modification" : "Ajouter"}
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
                <button className="btn-edit" onClick={() => modifierProduit(p)}>
                  Modifier
                </button>

                <button className="btn-supprimer"
                        onClick={() => supprimerProduit(p.idProduit)}>
                  Supprimer
                </button>

                {/* 🔵 Bouton Gérer Catégorie pour CE produit */}
                <button className="btn-cat"
                        onClick={() => navigate(`/categories?produit=${p.idProduit}`)}>
                  📁 Gérer Catégorie
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
