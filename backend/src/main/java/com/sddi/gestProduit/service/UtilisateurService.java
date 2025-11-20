package com.sddi.gestProduit.service;

import com.sddi.gestProduit.model.Utilisateur;
import com.sddi.gestProduit.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository repo;

    public Utilisateur inscrire(Utilisateur utilisateur) {

        if (repo.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé !");
        }

        return repo.save(utilisateur); // insertion DB automatique
    }
    public Utilisateur login(String email, String motDePasse) {

        Optional<Utilisateur> utilisateurOpt = repo.findByEmail(email);

        if (utilisateurOpt.isEmpty()) {
            throw new RuntimeException("Email incorrect !");
        }

        Utilisateur utilisateur = utilisateurOpt.get();

        if (!utilisateur.getMotDePasse().equals(motDePasse)) {
            throw new RuntimeException("Mot de passe incorrect !");
        }

        return utilisateur;
    }

}
