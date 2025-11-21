package com.sddi.gestProduit.controller;

import com.sddi.gestProduit.model.Mouvement;
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

    // ---------------------- ENTREE ---------------------------
    @PostMapping("/entree")
    public Mouvement entree(@RequestParam Long idProduit,
                            @RequestParam int quantite) {
        return service.enregistrerEntree(idProduit, quantite);
    }

    // ---------------------- SORTIE ---------------------------
    @PostMapping("/sortie")
    public Mouvement sortie(@RequestParam Long idProduit,
                            @RequestParam int quantite) {
        return service.enregistrerSortie(idProduit, quantite);
    }

    // ---------------------- LISTE ---------------------------
    @GetMapping
    public List<Mouvement> all() {
        return service.findAll();
    }
}
