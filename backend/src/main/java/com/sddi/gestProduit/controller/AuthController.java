package com.sddi.gestProduit.controller;

import com.sddi.gestProduit.model.Utilisateur;
import com.sddi.gestProduit.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // autorise React
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UtilisateurService service;

    @PostMapping("/register")
    public Utilisateur register(@RequestBody Utilisateur utilisateur) {
        return service.inscrire(utilisateur);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String motDePasse = body.get("motDePasse");

        try {
            Utilisateur utilisateur = service.login(email, motDePasse);
            return ResponseEntity.ok(utilisateur);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}
