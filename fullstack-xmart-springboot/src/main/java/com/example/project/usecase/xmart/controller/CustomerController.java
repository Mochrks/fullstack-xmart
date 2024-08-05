package com.example.project.usecase.xmart.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.usecase.xmart.dto.request.AddCustomerDTO;
import com.example.project.usecase.xmart.dto.request.EditCustomerDTO;
import com.example.project.usecase.xmart.services.CustomerService;
import com.example.project.usecase.xmart.common.Urls;

@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(Urls.FIND_ALL_CUSTOMERS)
    public ResponseEntity<Object> findAllCustomer() {
        return customerService.getAllCustomer();
    }

    @GetMapping(Urls.FIND_BY_ID_CUSTOMER)
    public ResponseEntity<Object> findByIdCustomer(@PathVariable("id") UUID id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping(Urls.CREATE_CUSTOMER)
    public ResponseEntity<Object> createCustomer(@RequestBody AddCustomerDTO addCustomer) {
        return customerService.addToCustomer(addCustomer);
    }

    @PutMapping(Urls.EDIT_CUSTOMER)
    public ResponseEntity<Object> editCustomer(@PathVariable UUID qrcode,
            @RequestBody EditCustomerDTO editCustomer) {
        return customerService.editCustomer(qrcode, editCustomer);
    }

    @DeleteMapping(Urls.DELETE_CUSTOMER)
    public ResponseEntity<Object> deleteByIdCustomer(@PathVariable UUID qrcode) {

        return customerService.deleteCustomerById(qrcode);
    }

}