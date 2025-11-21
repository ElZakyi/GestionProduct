package com.sddi.gestProduit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "@type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = MouvementEntree.class, name = "MouvementEntree"),
        @JsonSubTypes.Type(value = MouvementSortie.class, name = "MouvementSortie")
})

public class Mouvement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMouvement;

    private LocalDateTime dateMouvement;
    private int quantite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProduit", nullable = false)
    @JsonIgnoreProperties({"mouvements", "hibernateLazyInitializer", "handler"})
    private Produit produit;
    // un mouvement concerne un produit
}
