package com.sddi.gestProduit.repository;

import com.sddi.gestProduit.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> { }
