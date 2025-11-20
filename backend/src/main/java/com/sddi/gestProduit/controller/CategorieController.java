package com.sddi.gestProduit.controller;

import com.sddi.gestProduit.model.Categorie;
import com.sddi.gestProduit.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategorieController {

    @Autowired
    private CategorieService service;

    @GetMapping
    public List<Categorie> getCategories() {
        return service.findAll();
    }

    @PostMapping
    public Categorie addCategorie(@RequestBody Categorie c) {
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Categorie updateCategorie(@PathVariable Long id, @RequestBody Categorie c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable Long id) {
        service.delete(id);
    }
}
