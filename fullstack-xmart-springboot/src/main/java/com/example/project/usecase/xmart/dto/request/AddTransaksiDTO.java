package com.example.project.usecase.xmart.dto.request;

import java.sql.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddTransaksiDTO {
    private UUID qrcode;
    private UUID rfid;
    private int hargaSatuan;
    private int jumlah;
    private Date waktu;
}
