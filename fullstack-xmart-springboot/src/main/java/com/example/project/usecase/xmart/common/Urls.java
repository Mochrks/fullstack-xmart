package com.example.project.usecase.xmart.common;

public class Urls {
    // products
    public static final String PRODUCTS_BASE = "/products";
    public static final String FIND_ALL_PRODUCTS = PRODUCTS_BASE;
    public static final String FIND_BY_ID_PRODUCT = PRODUCTS_BASE + "/{id}";
    public static final String CREATE_PRODUCT = PRODUCTS_BASE + "/add";
    public static final String EDIT_PRODUCT = PRODUCTS_BASE + "/edit/{rfid}";
    public static final String DELETE_PRODUCT = PRODUCTS_BASE + "/delete/{rfid}";

    // customers
    public static final String CUSTOMERS_BASE = "/customers";
    public static final String FIND_ALL_CUSTOMERS = CUSTOMERS_BASE;
    public static final String FIND_BY_ID_CUSTOMER = CUSTOMERS_BASE + "/{id}";
    public static final String CREATE_CUSTOMER = CUSTOMERS_BASE + "/add";
    public static final String EDIT_CUSTOMER = CUSTOMERS_BASE + "/edit/{qrcode}";
    public static final String DELETE_CUSTOMER = CUSTOMERS_BASE + "/delete/{qrcode}";

    // transactions
    public static final String TRANSACTIONS_BASE = "/transactions";
    public static final String FIND_ALL_TRANSACTIONS = TRANSACTIONS_BASE;
    public static final String FIND_BY_ID_TRANSACTION = TRANSACTIONS_BASE + "/{id}";
    public static final String CREATE_TRANSACTION = TRANSACTIONS_BASE + "/add";
}
