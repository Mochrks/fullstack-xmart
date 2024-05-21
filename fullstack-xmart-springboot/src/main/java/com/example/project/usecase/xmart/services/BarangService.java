package com.example.project.usecase.xmart.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.project.usecase.xmart.dto.request.AddBarangDTO;
import com.example.project.usecase.xmart.dto.request.EditBarangDTO;
import com.example.project.usecase.xmart.dto.response.ResponseBarangDTO;
import com.example.project.usecase.xmart.dto.response.ResponseBodyDTO;
import com.example.project.usecase.xmart.model.Barang;
import com.example.project.usecase.xmart.repository.BarangRepository;
import com.example.project.usecase.xmart.repository.TransaksiRepository;

import java.util.stream.Collectors;

@Service
public class BarangService {

    @Autowired
    private BarangRepository barangRepository;

    @Autowired
    private TransaksiRepository transaksiRepository;

    public ResponseEntity<Object> getAllBarang() {

        HttpStatus status = HttpStatus.OK;

        try {

            List<Barang> barangs = barangRepository.findAll();

            List<ResponseBarangDTO> responseBarangDTOList = barangs.stream()
                    .map(barang -> new ResponseBarangDTO(
                            barang.getRfid(),
                            barang.getNamaBarang(),
                            barang.getHargaSatuan()))
                    .collect(Collectors.toList());

            String message = "Berhasil memuat data";

            ResponseBodyDTO result = ResponseBodyDTO.builder()
                    .total(barangs.size())
                    .data(responseBarangDTOList)
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

    public ResponseEntity<Object> getBarangById(UUID id) {
        HttpStatus status = HttpStatus.OK;

        try {
            Optional<Barang> optionalBarang = barangRepository.findById(id);

            if (optionalBarang.isPresent()) {
                Barang barang = optionalBarang.get();
                ResponseBarangDTO responseBarangDTO = new ResponseBarangDTO(
                        barang.getRfid(),
                        barang.getNamaBarang(),
                        barang.getHargaSatuan());

                String message = "Berhasil memuat data";

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .data(responseBarangDTO)
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

    public ResponseEntity<Object> addToBarang(AddBarangDTO addBarang) {
        HttpStatus status = HttpStatus.CREATED;

        try {

            Barang barang = Barang.builder()
                    .namaBarang(addBarang.getNamaBarang())
                    .hargaSatuan(addBarang.getHargaSatuan())
                    .build();

            barangRepository.save(barang);
            String message = "Berhasil menambahkan barang";

            ResponseBarangDTO responseData = new ResponseBarangDTO(
                    barang.getRfid(),
                    barang.getNamaBarang(),
                    barang.getHargaSatuan());

            ResponseBodyDTO result = ResponseBodyDTO.builder()
                    .total(1)
                    .data(responseData)
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

    public ResponseEntity<Object> editBarang(UUID rfid, EditBarangDTO editBarang) {
        HttpStatus status = HttpStatus.OK;

        try {

            Optional<Barang> optionalBarang = barangRepository.findById(rfid);

            if (optionalBarang.isPresent()) {
                Barang barang = optionalBarang.get();
                barang.setNamaBarang(editBarang.getNamaBarang());
                barang.setHargaSatuan(editBarang.getHargaSatuan());

                barangRepository.save(barang);

                String message = "Berhasil mengedit data customer";

                ResponseBarangDTO responseData = new ResponseBarangDTO(
                        barang.getRfid(),
                        barang.getNamaBarang(),
                        barang.getHargaSatuan());

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .data(responseData)
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(result);
            } else {

                status = HttpStatus.NOT_FOUND;
                String message = "Barang tidak ditemukan";
                ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(errorResult);
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

    public ResponseEntity<Object> deleteBarangByRfid(UUID rfid) {
        HttpStatus status = HttpStatus.OK;

        try {

            Optional<Barang> barangOptional = barangRepository.findById(rfid);

            if (barangOptional.isPresent()) {
                Barang barang = barangOptional.get();

                // // Delete associated entries in the transaksi table
                // transaksiRepository.deleteByBarang(barang);

                // Delete the barang record
                barangRepository.delete(barang);

                String message = "Berhasil menghapus barang dengan RFID: " + rfid;

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(result);
            } else {

                status = HttpStatus.NOT_FOUND;
                String message = "Barang dengan RFID " + rfid + " tidak ditemukan";
                ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(errorResult);
            }
        } catch (Exception e) {

            status = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "Terjadi kesalahan server saat menghapus barang dengan RFID: " + rfid;
            ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(errorResult);
        }
    }

}
