import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ProductManagement from "./components/ProductManagement";
import CategoryManagement from "./components/CategoryManagement";
import MouvementManagement from "./components/MouvementManagement";

import axios from "axios";

function App() {

  const [produits, setProduits] = useState([]);

  // Charger les produits une seule fois au démarrage
  useEffect(() => {
    axios.get("http://localhost:8080/api/produits")
      .then(res => setProduits(res.data))
      .catch(() => console.log("Erreur chargement global produits"));
  }, []);

  return (
    <Router>
      <Routes>

        {/* Page par défaut */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Produits → reçoit produits */}
        <Route
          path="/produits"
          element={
            <ProductManagement
              produits={produits}
              setProduits={setProduits}
            />
          }
        />

        {/* Catégories */}
        <Route path="/categories" element={<CategoryManagement />} />

        {/* Mouvements → reçoit les produits */}
        <Route
          path="/mouvements"
          element={
            <MouvementManagement
              produits={produits}
              setProduits={setProduits}
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
