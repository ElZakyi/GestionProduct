package com.sddi.gestProduit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategorie;

    private String nomCategorie;
    private String description;

    // Relation 1..* avec Produit
    @OneToMany(mappedBy = "categorie")
    private List<Produit> produits;
}

