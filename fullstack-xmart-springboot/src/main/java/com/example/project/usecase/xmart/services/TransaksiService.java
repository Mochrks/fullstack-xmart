package com.example.project.usecase.xmart.services;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.project.usecase.xmart.dto.request.AddTransaksiDTO;
import com.example.project.usecase.xmart.dto.response.ResponseBodyDTO;
import com.example.project.usecase.xmart.dto.response.ResponseTransaksiDTO;
import com.example.project.usecase.xmart.model.Barang;
import com.example.project.usecase.xmart.model.Customer;
import com.example.project.usecase.xmart.model.Transaksi;
import com.example.project.usecase.xmart.repository.TransaksiRepository;
import java.util.stream.Collectors;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransaksiService {

    @Autowired
    private TransaksiRepository transaksiRepository;

    public ResponseEntity<Object> getAllTransactions() {

        HttpStatus status = HttpStatus.OK;

        try {
            List<Transaksi> transaksis = transaksiRepository.findAll();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH", Locale.getDefault());

            List<ResponseTransaksiDTO> responseTransaksiDTOList = transaksis.stream()
                    .map(transaksi -> new ResponseTransaksiDTO(
                            transaksi.getId(),
                            transaksi.getCustomer().getQrcode(),
                            transaksi.getBarang().getRfid(),
                            transaksi.getHargaSatuan(),
                            transaksi.getJumlah(),
                            formatter.format(transaksi.getWaktu())))
                    .collect(Collectors.toList());

            String message = "Berhasil memuat data";

            ResponseBodyDTO result = ResponseBodyDTO.builder()
                    .total(transaksis.size())
                    .data(responseTransaksiDTOList)
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "Terjadi kesalahan server";
            ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(errorResult);
        }

    }

    public ResponseEntity<Object> getTransactionsById(UUID id) {
        HttpStatus status = HttpStatus.OK;

        try {
            Optional<Transaksi> optionalTransaksi = transaksiRepository.findById(id);

            if (optionalTransaksi.isPresent()) {
                Transaksi transaksi = optionalTransaksi.get();
                ResponseTransaksiDTO responseTransaksiDTO = convertToResponseDTO(transaksi);

                String message = "Berhasil memuat data";

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .data(responseTransaksiDTO)
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();

                return ResponseEntity.ok(result);
            } else {

                status = HttpStatus.NOT_FOUND;
                String message = "Data tidak ditemukan";
                ResponseBodyDTO notFoundResult = ResponseBodyDTO.builder()
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(notFoundResult);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "Terjadi kesalahan server";
            ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(errorResult);
        }
    }

    public ResponseEntity<Object> addToTransaksi(AddTransaksiDTO addTransaksi) {
        HttpStatus status = HttpStatus.CREATED;

        try {
            Transaksi transaksi = Transaksi.builder()
                    .customer(new Customer(addTransaksi.getQrcode()))
                    .barang(new Barang(addTransaksi.getRfid()))
                    .hargaSatuan(addTransaksi.getHargaSatuan())
                    .jumlah(addTransaksi.getJumlah())
                    .waktu(new Timestamp(addTransaksi.getWaktu().getTime()))
                    .build();

            transaksiRepository.save(transaksi);

            ResponseTransaksiDTO responseTransaksiDTO = convertToResponseDTO(transaksi);
            String message = "Berhasil menambahkan transaksi";

            ResponseBodyDTO result = ResponseBodyDTO.builder()
                    .total(1)
                    .data(responseTransaksiDTO)
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(result);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "Terjadi kesalahan server";
            ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(errorResult);
        }

    }

    private ResponseTransaksiDTO convertToResponseDTO(Transaksi transaksi) {
        ResponseTransaksiDTO responseTransaksiDTO = new ResponseTransaksiDTO();
        responseTransaksiDTO.setId(transaksi.getId());
        responseTransaksiDTO.setQrcode(transaksi.getCustomer().getQrcode());
        responseTransaksiDTO.setRfid(transaksi.getBarang().getRfid());
        responseTransaksiDTO.setHargaSatuan(transaksi.getHargaSatuan());
        responseTransaksiDTO.setJumlah(transaksi.getJumlah());

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault());
        String formattedDate = formatter.format(transaksi.getWaktu());
        responseTransaksiDTO.setWaktu(formattedDate);

        return responseTransaksiDTO;
    }

}
