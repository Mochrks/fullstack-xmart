package com.example.project.usecase.xmart.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditCustomerDTO {
    private String nama;
    private String wallet;
}
