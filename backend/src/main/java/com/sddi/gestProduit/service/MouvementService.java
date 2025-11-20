package com.sddi.gestProduit.service;

import com.sddi.gestProduit.model.Mouvement;
import com.sddi.gestProduit.model.MouvementEntree;
import com.sddi.gestProduit.model.MouvementSortie;
import com.sddi.gestProduit.model.Produit;
import com.sddi.gestProduit.repository.MouvementEntreeRepository;
import com.sddi.gestProduit.repository.MouvementRepository;
import com.sddi.gestProduit.repository.MouvementSortieRepository;
import com.sddi.gestProduit.repository.ProduitRepository;
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
    private MouvementEntreeRepository mouvementEntreeRepo;

    @Autowired
    private MouvementSortieRepository mouvementSortieRepo;

    // 🔹 ENTRÉE DE STOCK
    public MouvementEntree enregistrerEntree(Long idProduit, int quantite) {

        Produit p = produitRepo.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // mise à jour du stock (on utilise le champ qte existant)
        p.setQte(p.getQte() + quantite);
        p.setQteInventaire(p.getQte());
        produitRepo.save(p);

        MouvementEntree m = new MouvementEntree();
        m.setProduit(p);
        m.setQuantite(quantite);
        m.setDateMouvement(LocalDateTime.now());

        return mouvementEntreeRepo.save(m);
    }

    // 🔹 SORTIE DE STOCK
    public MouvementSortie enregistrerSortie(Long idProduit, int quantite) {

        Produit p = produitRepo.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        if (p.getQte() < quantite) {
            throw new RuntimeException("Stock insuffisant pour ce produit");
        }

        p.setQte(p.getQte() - quantite);
        p.setQteInventaire(p.getQte());
        produitRepo.save(p);

        MouvementSortie m = new MouvementSortie();
        m.setProduit(p);
        m.setQuantite(quantite);
        m.setDateMouvement(LocalDateTime.now());

        return mouvementSortieRepo.save(m);
    }

    // 🔹 LISTE DE TOUS LES MOUVEMENTS (entrées + sorties)
    public List<Mouvement> findAll() {
        return mouvementRepo.findAll();
    }
}
