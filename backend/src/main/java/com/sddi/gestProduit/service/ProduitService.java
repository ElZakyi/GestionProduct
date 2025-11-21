package com.sddi.gestProduit.service;

import com.sddi.gestProduit.model.Categorie;
import com.sddi.gestProduit.model.Produit;
import com.sddi.gestProduit.repository.CategorieRepository;
import com.sddi.gestProduit.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepo;

    @Autowired
    private CategorieRepository categorieRepo;

    public List<Produit> findAll() {
        return produitRepo.findAll();
    }

    public Produit save(Produit p) {

        if (p.getCategorie() != null && p.getCategorie().getIdCategorie() != null) {
            Categorie c = categorieRepo.findById(p.getCategorie().getIdCategorie())
                    .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
            p.setCategorie(c);
        }

        return produitRepo.save(p);
    }

    public Produit update(Long id, Produit newData) {

        Produit exist = produitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        exist.setNomProduit(newData.getNomProduit());
        exist.setReference(newData.getReference());
        exist.setDescription(newData.getDescription());
        exist.setPrixUnitaire(newData.getPrixUnitaire());
        exist.setQte(newData.getQte());
        exist.setQteMin(newData.getQteMin());
        exist.setQteMax(newData.getQteMax());
        exist.setQteInventaire(newData.getQteInventaire());

        if (newData.getCategorie() != null && newData.getCategorie().getIdCategorie() != null) {
            Categorie c = categorieRepo.findById(newData.getCategorie().getIdCategorie())
                    .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
            exist.setCategorie(c);
        } else {
            exist.setCategorie(null);
        }

        return produitRepo.save(exist);
    }

    public void delete(Long id) {
        produitRepo.deleteById(id);
    }
}
