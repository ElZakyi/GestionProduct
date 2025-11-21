package com.sddi.gestProduit.service;

import com.sddi.gestProduit.model.Produit;
import com.sddi.gestProduit.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository repo;

    // 🔹 Lire tous les produits
    public List<Produit> findAll() {
        return repo.findAll();
    }

    // 🔹 Trouver un produit par ID
    public Produit findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    // 🔹 Ajouter un produit avec BUILDER
    public Produit save(Produit p) {

        // ⚠ IMPORTANT : On utilise le Builder pour reconstruire proprement le produit
        Produit produit = new Produit.Builder()
                .nomProduit(p.getNomProduit())
                .reference(p.getReference())
                .description(p.getDescription())
                .prixUnitaire(p.getPrixUnitaire())
                .qte(p.getQte())
                .qteMin(p.getQteMin())
                .qteMax(p.getQteMax())
                .qteInventaire(p.getQteInventaire())
                .categorie(p.getCategorie())
                .build();

        return repo.save(produit);
    }

    // 🔹 Modifier un produit (pas besoin du builder ici)
    public Produit update(Long id, Produit p) {

        Produit exist = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        exist.setNomProduit(p.getNomProduit());
        exist.setReference(p.getReference());
        exist.setDescription(p.getDescription());
        exist.setPrixUnitaire(p.getPrixUnitaire());

        exist.setQte(p.getQte());
        exist.setQteMin(p.getQteMin());
        exist.setQteMax(p.getQteMax());
        exist.setQteInventaire(p.getQteInventaire());

        exist.setCategorie(p.getCategorie());

        return repo.save(exist);
    }

    // 🔹 Supprimer un produit
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
