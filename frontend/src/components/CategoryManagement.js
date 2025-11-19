import React, { useState } from "react";
import "./CategoryManagement.css";

function CategorieManagement() {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // Ajouter ou modifier
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // Mode modification
      const updated = categories.map((cat) =>
        cat.idCategorie === editId
          ? { ...cat, nomCategorie, description }
          : cat
      );

      setCategories(updated);
      setEditId(null);

      // Backend :
      // axios.put("http://localhost:8080/categories/"+editId, {...})
    } else {
      // Mode ajout
      const nouvelleCategorie = {
        idCategorie: Date.now(),
        nomCategorie,
        description,
      };

      setCategories([...categories, nouvelleCategorie]);

      // Backend :
      // axios.post("http://localhost:8080/categories", nouvelleCategorie)
    }

    setNomCategorie("");
    setDescription("");
  };

  // Charger une catégorie dans le formulaire pour modification
  const modifierCategorie = (cat) => {
    setNomCategorie(cat.nomCategorie);
    setDescription(cat.description);
    setEditId(cat.idCategorie);
  };

  // Supprimer
  const supprimerCategorie = (id) => {
    setCategories(categories.filter((c) => c.idCategorie !== id));

    // Backend :
    // axios.delete("http://localhost:8080/categories/"+id)
  };

  return (
    <div className="categorie-container">
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

      {/* Tableau de catégories */}
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
