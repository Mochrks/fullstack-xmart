package com.example.project.usecase.xmart.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseBarangDTO {
    private UUID rfid;
    private String namaBarang;
    private int hargaSatuan;

}