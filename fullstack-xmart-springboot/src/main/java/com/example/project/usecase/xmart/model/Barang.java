package com.example.project.usecase.xmart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "barang")
public class Barang {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rfid", unique = true, nullable = false)
    private UUID rfid;

    public Barang(UUID rfid) {
        this.rfid = rfid;
    }

    @Column(name = "nama_barang")
    private String namaBarang;

    @Column(name = "harga_satuan")
    private int hargaSatuan;

    @OneToMany(mappedBy = "barang")
    private Set<Transaksi> transaksies;

}