package com.sddi.gestProduit.controller;

import com.sddi.gestProduit.model.Produit;
import com.sddi.gestProduit.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduitController {

    @Autowired
    private ProduitService service;

    @GetMapping
    public List<Produit> getProduits() {
        return service.findAll();
    }

    @PostMapping
    public Produit addProduit(@RequestBody Produit p) {
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable Long id, @RequestBody Produit p) {
        return service.update(id, p);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable Long id) {
        service.delete(id);
    }
}
