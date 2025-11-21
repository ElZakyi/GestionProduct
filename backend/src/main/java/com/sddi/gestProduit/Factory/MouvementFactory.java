package com.sddi.gestProduit.Factory;

import com.sddi.gestProduit.model.Mouvement;
import com.sddi.gestProduit.model.MouvementEntree;
import com.sddi.gestProduit.model.MouvementSortie;
import org.springframework.stereotype.Component;

@Component
public class MouvementFactory {

    public Mouvement creerMouvement(String type) {

        return switch (type.toUpperCase()) {
            case "ENTREE" -> new MouvementEntree();
            case "SORTIE" -> new MouvementSortie();
            default -> throw new IllegalArgumentException("Type mouvement invalide");
        };
    }
}

