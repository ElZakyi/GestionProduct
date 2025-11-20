package com.sddi.gestProduit.repository;

import com.sddi.gestProduit.model.Mouvement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MouvementRepository extends JpaRepository<Mouvement, Long> {
}
