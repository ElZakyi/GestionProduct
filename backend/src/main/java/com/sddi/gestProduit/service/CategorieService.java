package com.sddi.gestProduit.service;

import com.sddi.gestProduit.model.Categorie;
import com.sddi.gestProduit.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository repo;

    public List<Categorie> findAll() {
        return repo.findAll();
    }

    public Categorie findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
    }

    public Categorie save(Categorie categorie) {
        return repo.save(categorie);
    }

    public Categorie update(Long id, Categorie c) {
        Categorie exist = findById(id);

        exist.setNomCategorie(c.getNomCategorie());
        exist.setDescription(c.getDescription());

        return repo.save(exist);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
