import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // 👈 pour la redirection
import "./CategoryManagement.css";

function CategorieManagement() {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate(); // 👈 redirection
  const API_URL = "http://localhost:8080/api/categories";

  // 🔹 Charger la liste au démarrage
  useEffect(() => {
    chargerCategories();
  }, []);

  const chargerCategories = () => {
    axios
      .get(API_URL)
      .then((res) => setCategories(res.data))
      .catch(() => alert("Erreur lors du chargement des catégories"));
  };

  // 🔹 Ajouter ou modifier
  const handleSubmit = (e) => {
    e.preventDefault();

    const categorie = {
      nomCategorie,
      description,
    };

    if (editId) {
      axios
        .put(`${API_URL}/${editId}`, categorie)
        .then(() => {
          chargerCategories();
          setEditId(null);
          setNomCategorie("");
          setDescription("");
        })
        .catch(() => alert("Erreur lors de la modification"));
    } else {
      axios
        .post(API_URL, categorie)
        .then(() => {
          chargerCategories();
          setNomCategorie("");
          setDescription("");
        })
        .catch(() => alert("Erreur lors de l'ajout"));
    }
  };

  // 🔹 Remplir le formulaire
  const modifierCategorie = (cat) => {
    setNomCategorie(cat.nomCategorie);
    setDescription(cat.description);
    setEditId(cat.idCategorie);
  };

  // 🔹 Supprimer
  const supprimerCategorie = (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    axios
      .delete(`${API_URL}/${id}`)
      .then(() => chargerCategories())
      .catch(() => alert("Erreur lors de la suppression"));
  };

  return (
    <div className="categorie-container">

      {/* 🔙 BOUTON RETOUR */}
      <button
        onClick={() => navigate("/produits")}
        className="btn-retour"
        style={{
          background: "#6c757d",
          color: "white",
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px"
        }}
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
        ></textarea>

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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3">Aucune catégorie trouvée.</td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.idCategorie}>
                <td>{cat.nomCategorie}</td>
                <td>{cat.description}</td>
                <td>
                  <button
                    className="btn-modifier"
                    onClick={() => modifierCategorie(cat)}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn-supprimer"
                    onClick={() => supprimerCategorie(cat.idCategorie)}
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

export default CategorieManagement;
