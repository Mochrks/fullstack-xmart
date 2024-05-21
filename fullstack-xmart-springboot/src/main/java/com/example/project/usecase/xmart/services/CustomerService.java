package com.example.project.usecase.xmart.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.project.usecase.xmart.dto.request.AddCustomerDTO;
import com.example.project.usecase.xmart.dto.request.EditCustomerDTO;
import com.example.project.usecase.xmart.dto.response.ResponseBodyDTO;
import com.example.project.usecase.xmart.dto.response.ResponseCustomerDTO;
import com.example.project.usecase.xmart.model.Customer;
import com.example.project.usecase.xmart.repository.CustomerRepository;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public ResponseEntity<Object> getAllCustomer() {

        HttpStatus status = HttpStatus.OK;

        try {
            List<Customer> customers = customerRepository.findAll();

            List<ResponseCustomerDTO> responseCustomerDTOList = customers.stream()
                    .map(customer -> new ResponseCustomerDTO(
                            customer.getQrcode(),
                            customer.getNama(),
                            customer.getWallet()))
                    .collect(Collectors.toList());

            String message = "Berhasil memuat data";

            ResponseBodyDTO result = ResponseBodyDTO.builder()
                    .total(customers.size())
                    .data(responseCustomerDTOList)
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

    public ResponseEntity<Object> getCustomerById(UUID id) {
        HttpStatus status = HttpStatus.OK;

        try {
            Optional<Customer> optionalCustomer = customerRepository.findById(id);

            if (optionalCustomer.isPresent()) {
                Customer customer = optionalCustomer.get();
                ResponseCustomerDTO responseCustomerDTO = new ResponseCustomerDTO(
                        customer.getQrcode(),
                        customer.getNama(),
                        customer.getWallet());

                String message = "Berhasil memuat data";

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .data(responseCustomerDTO)
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

    public ResponseEntity<Object> addToCustomer(AddCustomerDTO addCustomer) {
        HttpStatus status = HttpStatus.CREATED;

        try {

            Customer customer = Customer.builder()
                    .nama(addCustomer.getNama())
                    .wallet(addCustomer.getWallet())
                    .build();

            customerRepository.save(customer);

            String message = "Berhasil menambahkan customer";

            ResponseCustomerDTO responseData = new ResponseCustomerDTO(
                    customer.getQrcode(),
                    customer.getNama(),
                    customer.getWallet());

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

    public ResponseEntity<Object> editCustomer(UUID qrcode, EditCustomerDTO editCustomer) {
        HttpStatus status = HttpStatus.OK;

        try {

            Optional<Customer> optionalCustomer = customerRepository.findById(qrcode);

            if (optionalCustomer.isPresent()) {
                Customer customer = optionalCustomer.get();
                customer.setNama(editCustomer.getNama());
                customer.setWallet(editCustomer.getWallet());

                customerRepository.save(customer);

                String message = "Berhasil mengedit data customer";

                ResponseCustomerDTO responseData = new ResponseCustomerDTO(
                        customer.getQrcode(),
                        customer.getNama(),
                        customer.getWallet());

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
                String message = "Customer tidak ditemukan";
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

    public ResponseEntity<Object> deleteCustomerById(UUID qrcode) {
        HttpStatus status = HttpStatus.OK;

        try {

            Optional<Customer> customerOptional = customerRepository.findById(qrcode);

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                customerRepository.delete(customer);

                String message = "Berhasil menghapus customer dengan qrcode: " + qrcode;

                ResponseBodyDTO result = ResponseBodyDTO.builder()
                        .total(1)
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(result);
            } else {

                status = HttpStatus.NOT_FOUND;
                String message = "Customer dengan qrcode " + qrcode + " tidak ditemukan";
                ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                        .message(message)
                        .statusCode(status.value())
                        .status(status.name())
                        .build();
                return ResponseEntity.status(status).body(errorResult);
            }
        } catch (Exception e) {

            status = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "Terjadi kesalahan server saat menghapus customer dengan qrcode: " + qrcode;
            ResponseBodyDTO errorResult = ResponseBodyDTO.builder()
                    .message(message)
                    .statusCode(status.value())
                    .status(status.name())
                    .build();
            return ResponseEntity.status(status).body(errorResult);
        }
    }

}
