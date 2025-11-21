import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./CategoryManagement.css";

function CategorieManagement() {

  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const idProduit = params.get("produit"); // 👈 récupéré depuis l’URL

  const API_URL = "http://localhost:8080/api/categories";

  useEffect(() => {
    chargerCategories();
  }, []);

  const chargerCategories = () => {
    axios.get(API_URL)
      .then(res => setCategories(res.data))
      .catch(() => alert("Erreur lors du chargement des catégories"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categorie = {
      nomCategorie,
      description,
      idProduit: idProduit ? Number(idProduit) : null // 👈 envoyé au backend
    };

    if (editId) {
      axios.put(`${API_URL}/${editId}`, categorie)
        .then(() => {
          chargerCategories();
          setEditId(null);
          setNomCategorie("");
          setDescription("");
        })
        .catch(() => alert("Erreur lors de la modification"));
    } else {
      axios.post(API_URL, categorie)
        .then(() => {
          chargerCategories();
          setNomCategorie("");
          setDescription("");
        })
        .catch(() => alert("Erreur lors de l'ajout"));
    }
  };

  const modifierCategorie = (cat) => {
    setNomCategorie(cat.nomCategorie);
    setDescription(cat.description);
    setEditId(cat.idCategorie);
  };

  const supprimerCategorie = (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    axios.delete(`${API_URL}/${id}`)
      .then(() => chargerCategories())
      .catch(() => alert("Erreur lors de la suppression"));
  };

  return (
    <div className="categorie-container">

      <button
        onClick={() => navigate("/produits")}
        className="btn-retour"
      >
        ← Retour Produits
      </button>

      <h2>Gestion des Catégories</h2>

      <form className="form-categorie" onSubmit={handleSubmit}>
        <h3>{editId ? "Modifier la Catégorie" : "Ajouter une Catégorie"}</h3>

        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={nomCategorie}
          onChange={(e) => setNomCategorie(e.target.value)}
          required
        />

        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        <button type="submit" className="btn-ajouter">
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <h3>Liste des Catégories</h3>

      <table className="table-categorie">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Produits associés</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr><td colSpan="4">Aucune catégorie trouvée.</td></tr>
          ) : (
            categories.map(cat => (
              <tr key={cat.idCategorie}>
                <td>{cat.nomCategorie}</td>
                <td>{cat.description}</td>

                <td>
                  {cat.produits && cat.produits.length > 0
                    ? cat.produits.map(p => p.nomProduit).join(", ")
                    : "Aucun produit"}
                </td>

                <td>
                  <button className="btn-modifier" onClick={() => modifierCategorie(cat)}>
                    Modifier
                  </button>

                  <button className="btn-supprimer" onClick={() => supprimerCategorie(cat.idCategorie)}>
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

export default CategorieManagement;
