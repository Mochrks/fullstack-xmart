package com.example.project.usecase.xmart.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCustomerDTO {
    private UUID qrcode;
    private String nama;
    private String wallet;

}
