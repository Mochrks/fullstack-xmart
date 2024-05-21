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
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "qrcode", unique = true, nullable = false)
    private UUID qrcode;

    public Customer(UUID qrcode) {
        this.qrcode = qrcode;
    }

    @Column(name = "nama")
    private String nama;

    @Column(name = "wallet")
    private String wallet;

    @OneToMany(mappedBy = "customer")
    private Set<Transaksi> transaksies;

}
