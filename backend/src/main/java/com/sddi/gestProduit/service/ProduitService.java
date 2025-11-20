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

    // 🔹 Ajouter un produit
    public Produit save(Produit produit) {
        return repo.save(produit);
    }

    // 🔹 Modifier un produit
    public Produit update(Long id, Produit p) {

        Produit exist = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // Mise à jour des champs
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
