package com.example.project.usecase.xmart.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.usecase.xmart.dto.request.AddBarangDTO;
import com.example.project.usecase.xmart.dto.request.EditBarangDTO;
import com.example.project.usecase.xmart.services.BarangService;

@RestController
@RequestMapping("/api/")
public class BarangController {

    @Autowired
    private BarangService barangService;

    @GetMapping("products")
    public ResponseEntity<Object> findAllProduct() {
        return barangService.getAllBarang();
    }

    @GetMapping("products/{id}")
    public ResponseEntity<Object> findByIdProduct(@PathVariable("id") UUID id) {
        return barangService.getBarangById(id);
    }

    @PostMapping("products/add")
    public ResponseEntity<Object> createProduct(@RequestBody AddBarangDTO addBarang) {
        return barangService.addToBarang(addBarang);
    }

    @PutMapping("products/edit/{rfid}")
    public ResponseEntity<Object> editProduct(@PathVariable UUID rfid,
            @RequestBody EditBarangDTO editProducts) {
        return barangService.editBarang(rfid, editProducts);
    }

    @DeleteMapping("products/delete/{rfid}")
    public ResponseEntity<Object> deleteByIdProduct(@PathVariable UUID rfid) {
        return barangService.deleteBarangByRfid(rfid);
    }

    

}