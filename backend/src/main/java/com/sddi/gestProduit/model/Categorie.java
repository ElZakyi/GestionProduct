package com.sddi.gestProduit.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategorie;

    private String nomCategorie;
    private String description;

    // 👇 NE PAS mettre @JsonIgnore ici sinon React ne voit jamais les produits !
    @OneToMany(mappedBy = "categorie", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"categorie", "mouvements"})  // empêche les boucles, mais garde les produits
    private List<Produit> produits;
}
