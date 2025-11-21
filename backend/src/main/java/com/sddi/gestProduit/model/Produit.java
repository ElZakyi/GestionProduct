package com.sddi.gestProduit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})   // 👈 IMPORTANT
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

    @ManyToOne
    @JoinColumn(name = "idCategorie")
    @JsonIgnoreProperties({"produits"})
    private Categorie categorie;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mouvement> mouvements;

    // 🔥 Constructeur vide obligatoire
    public Produit() {}

    // ---------------- BUILDER ----------------
    private Produit(Builder b) {
        this.nomProduit = b.nomProduit;
        this.reference = b.reference;
        this.description = b.description;
        this.prixUnitaire = b.prixUnitaire;
        this.qte = b.qte;
        this.qteMin = b.qteMin;
        this.qteMax = b.qteMax;
        this.qteInventaire = b.qteInventaire;
        this.categorie = b.categorie;
    }

    public static class Builder {

        private String nomProduit;
        private String reference;
        private String description;
        private double prixUnitaire;

        private int qte;
        private int qteMin;
        private int qteMax;
        private int qteInventaire;

        private Categorie categorie;

        public Builder nomProduit(String v) { this.nomProduit = v; return this; }
        public Builder reference(String v) { this.reference = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder prixUnitaire(double v) { this.prixUnitaire = v; return this; }

        public Builder qte(int v) { this.qte = v; return this; }
        public Builder qteMin(int v) { this.qteMin = v; return this; }
        public Builder qteMax(int v) { this.qteMax = v; return this; }
        public Builder qteInventaire(int v) { this.qteInventaire = v; return this; }

        public Builder categorie(Categorie v) { this.categorie = v; return this; }

        public Produit build() {
            return new Produit(this);
        }
    }
}
