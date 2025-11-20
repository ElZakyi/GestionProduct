import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductManagement from "./components/ProductManagement";
import CategoryManagemnt from "./components/CategoryManagement";

function App() {
  return (
    <Router>
      <Routes>

        {/* Page par défaut → inscription */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produits" element={<ProductManagement />} />
        <Route path="/categories" element={<CategoryManagemnt />} />

      </Routes>
    </Router>
  );
}

export default App;
