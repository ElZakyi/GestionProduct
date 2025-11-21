package com.sddi.gestProduit.service;

import com.sddi.gestProduit.Factory.MouvementFactory;
import com.sddi.gestProduit.model.*;
import com.sddi.gestProduit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MouvementService {

    @Autowired
    private ProduitRepository produitRepo;

    @Autowired
    private MouvementRepository mouvementRepo;

    @Autowired
    private MouvementFactory mouvementFactory;

    public Mouvement enregistrerEntree(Long idProduit, int quantite) {

        Produit p = produitRepo.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // --- appliquer l'entrée ---
        p.setQte(p.getQte() + quantite);
        p.setQteInventaire(p.getQte());
        produitRepo.save(p);

        // --- créer mouvement via Factory ---
        Mouvement m = mouvementFactory.creerMouvement("ENTREE");
        m.setProduit(p);
        m.setQuantite(quantite);
        m.setDateMouvement(LocalDateTime.now());

        return mouvementRepo.save(m);
    }

    public Mouvement enregistrerSortie(Long idProduit, int quantite) {

        Produit p = produitRepo.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        if (quantite > p.getQte()) {
            throw new RuntimeException("Stock insuffisant !");
        }

        // --- appliquer la sortie ---
        p.setQte(p.getQte() - quantite);
        p.setQteInventaire(p.getQte());
        produitRepo.save(p);

        // --- créer mouvement via Factory ---
        Mouvement m = mouvementFactory.creerMouvement("SORTIE");
        m.setProduit(p);
        m.setQuantite(quantite);
        m.setDateMouvement(LocalDateTime.now());

        return mouvementRepo.save(m);
    }

    public List<Mouvement> findAll() {
        return mouvementRepo.findAll();
    }
}

