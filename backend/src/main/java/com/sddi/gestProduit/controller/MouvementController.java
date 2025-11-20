package com.sddi.gestProduit.controller;

import com.sddi.gestProduit.model.Mouvement;
import com.sddi.gestProduit.model.MouvementEntree;
import com.sddi.gestProduit.model.MouvementSortie;
import com.sddi.gestProduit.service.MouvementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mouvements")
@CrossOrigin(origins = "http://localhost:3000")
public class MouvementController {

    @Autowired
    private MouvementService service;

    // 🔹 ENTRÉE DE STOCK
    @PostMapping("/entree")
    public MouvementEntree entree(@RequestParam Long idProduit,
                                  @RequestParam int quantite) {
        return service.enregistrerEntree(idProduit, quantite);
    }

    // 🔹 SORTIE DE STOCK
    @PostMapping("/sortie")
    public MouvementSortie sortie(@RequestParam Long idProduit,
                                  @RequestParam int quantite) {
        return service.enregistrerSortie(idProduit, quantite);
    }

    // 🔹 LISTE DE TOUS LES MOUVEMENTS
    @GetMapping
    public List<Mouvement> all() {
        return service.findAll();
    }
}
