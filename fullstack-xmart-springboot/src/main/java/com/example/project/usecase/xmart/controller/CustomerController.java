package com.example.project.usecase.xmart.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.usecase.xmart.dto.request.AddCustomerDTO;
import com.example.project.usecase.xmart.dto.request.EditCustomerDTO;
import com.example.project.usecase.xmart.services.CustomerService;

@RestController
@RequestMapping("/api/")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("customers")
    public ResponseEntity<Object> findAllCustomer() {
        return customerService.getAllCustomer();
    }

    @GetMapping("customers/{id}")
    public ResponseEntity<Object> findByIdCustomer(@PathVariable("id") UUID id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping("customers/add")
    public ResponseEntity<Object> createCustomer(@RequestBody AddCustomerDTO addCustomer) {
        return customerService.addToCustomer(addCustomer);
    }

    @PutMapping("customers/edit/{qrcode}")
    public ResponseEntity<Object> editCustomer(@PathVariable UUID qrcode,
            @RequestBody EditCustomerDTO editCustomer) {
        return customerService.editCustomer(qrcode, editCustomer);
    }

    @DeleteMapping("customers/delete/{qrcode}")
    public ResponseEntity<Object> deleteByIdCustomer(@PathVariable UUID qrcode) {

        return customerService.deleteCustomerById(qrcode);
    }

}