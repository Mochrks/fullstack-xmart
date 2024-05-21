package com.example.project.usecase.xmart.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.usecase.xmart.model.Barang;

@Repository
public interface BarangRepository extends JpaRepository<Barang, UUID> {

}
