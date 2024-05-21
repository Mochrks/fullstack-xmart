package com.example.project.usecase.xmart.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.project.usecase.xmart.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

}