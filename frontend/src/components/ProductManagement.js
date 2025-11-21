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
  const API_PRODUITS = "http://localhost:8080/api/produits";

  // Charger les produits au démarrage
  useEffect(() => {
    chargerProduits();
  }, []);

  // 🔥 VERSION FINALE — A GARDER
  const chargerProduits = () => {
    axios.get(API_PRODUITS)
      .then(res => {
        console.log("Réponse produits =", res.data);
        console.log("Type =", typeof res.data);
        setProduits(res.data);
      })
      .catch(err => {
        console.log("Erreur GET produits :", err);
      });
  };

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

    if (editId) {
      axios
        .put(`${API_PRODUITS}/${editId}`, data)
        .then(() => {
          chargerProduits();
          resetForm();
          setEditId(null);
        })
        .catch(() => alert("Erreur modification"));
      return;
    }

    axios
      .post(API_PRODUITS, data)
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

    axios
      .delete(`${API_PRODUITS}/${id}`)
      .then(() => chargerProduits())
      .catch(() => alert("Erreur suppression"));
  };

  return (
    <div className="produit-container">

      <div className="top-actions">
        <button className="btn-mvt" onClick={() => navigate("/mouvements")}>
          🔄 Gérer Mouvements
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
                <button className="btn-edit" onClick={() => modifierProduit(p)}>Modifier</button>
                <button className="btn-supprimer" onClick={() => supprimerProduit(p.idProduit)}>Supprimer</button>

                <button
                  className="btn-cat"
                  onClick={() => navigate(`/categories?produit=${p.idProduit}`)}
                >
                  📁 Gérer Catégorie
                </button>
              </td>
            </tr>
          ))}

          {produits.length === 0 && (
            <tr>
              <td colSpan="8">Aucun produit.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
