package com.sddi.gestProduit.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduit;

    private String nomProduit;
    private String reference;
    private String description;
    private double prixUnitaire;

    private int qte;
    private int qteMin;
    private int qteMax;
    private int qteInventaire;

    // Relation avec catégorie (plus tard)
    // @ManyToOne
    // private Categorie categorie;
    @ManyToOne
    @JoinColumn(name = "idCategorie")
    private Categorie categorie;
}

