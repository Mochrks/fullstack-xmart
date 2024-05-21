package com.example.project.usecase.xmart.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddBarangDTO {
    private String namaBarang;
    private int hargaSatuan;

}
