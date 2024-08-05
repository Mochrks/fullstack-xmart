package com.example.project.usecase.xmart.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.project.usecase.xmart.common.Urls;
import com.example.project.usecase.xmart.dto.request.AddTransaksiDTO;
import com.example.project.usecase.xmart.services.TransaksiService;

@RestController
@RequestMapping("/api/")
public class TransaksiController {

    @Autowired
    private TransaksiService transaksiService;

    @GetMapping(Urls.FIND_ALL_TRANSACTIONS)
    public ResponseEntity<Object> findAllTransactions() {
        return transaksiService.getAllTransactions();
    }

    @GetMapping(Urls.FIND_BY_ID_TRANSACTION)
    public ResponseEntity<Object> findByIdTransactions(@PathVariable("id") UUID id) {
        return transaksiService.getTransactionsById(id);
    }

    @PostMapping(Urls.CREATE_TRANSACTION)
    public ResponseEntity<Object> createTransactions(@RequestBody AddTransaksiDTO addTransaksi) {
        return transaksiService.addToTransaksi(addTransaksi);
    }

}