package com.sddi.gestProduit.repository;

import com.sddi.gestProduit.model.MouvementSortie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MouvementSortieRepository extends JpaRepository<MouvementSortie, Long> {
}
