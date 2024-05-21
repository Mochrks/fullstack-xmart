package com.example.project.usecase.xmart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "transaksi")
public class Transaksi {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "qrcode", referencedColumnName = "qrcode")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "rfid", referencedColumnName = "rfid")
    private Barang barang;

    @Column(name = "harga_satuan")
    private int hargaSatuan;

    @Column(name = "jumlah")
    private int jumlah;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "waktu")
    private Timestamp waktu;

}
