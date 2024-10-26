import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MagnifyingGlassIcon,
  ArrowsPointingInIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

import { Sidebar } from "./Sidebar";

import { formatRupiah } from "@/utils/formatIDR";
import { getCustomers } from "@/service/customerService";
import { getProducts } from "@/service/productService";
import { getTransactions } from "@/service/transactionService";

export default function Data() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
        console.log("Customers data:", response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        console.log("Products data:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransaction(response.data);
        console.log("Transactions data:", response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-neutral-100">
      <div className="flex flex-row w-full h-full mx-auto gap-5 p-5 ">
        {/* Sidebar */}
        <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] ">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-full items-center justify-center mx-auto">
          <div className="flex flex-row w-full h-full gap-3 p-5 m-1 rounded-xl shadow-blue-gray-900/5 bg-slate-700 ">
            <a href="#">
              <MagnifyingGlassIcon className="text-white w-5 h-5" />
            </a>
            <a href="#">
              <ArrowsPointingInIcon className="text-white w-5 h-5" />
            </a>
            <a href="#">
              <BellIcon className="text-white w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-row w-full h-full items-center justify-center mx-auto mt-14 ">
            <div className=" rounded-2xl w-1/1 p-5 overflow-auto bg-white shadow-xl">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                  Data
                </h1>
              </div>
              <div className="mx-auto w-[70rem] max-w-[70rem] py-6 sm:px-6 lg:px-8 ">
                <div className="bg-white">
                  <Tabs defaultValue="customer" className="max-w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-200 ">
                      <TabsTrigger value="customer">Customer</TabsTrigger>
                      <TabsTrigger value="product">Product</TabsTrigger>
                      <TabsTrigger value="transaction">Transaction</TabsTrigger>
                    </TabsList>
                    <TabsContent value="customer" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Customer Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Qrcode</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="text-right">
                                    Wallet
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {customers.map((customer, index) => (
                                  <TableRow
                                    key={customer.qrcode}
                                    className={
                                      index % 2 === 0 ? "bg-blue-100" : ""
                                    }
                                  >
                                    <TableCell className="font-medium">
                                      {customer.qrcode}
                                    </TableCell>
                                    <TableCell>{customer.nama}</TableCell>
                                    <TableCell className="text-right">
                                      {customer.wallet}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="product" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Products Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Rfid</TableHead>
                                  <TableHead>Name Product</TableHead>
                                  <TableHead className="text-right">
                                    Qty
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {products.map((products, index) => (
                                  <TableRow
                                    key={products.rfid}
                                    className={
                                      index % 2 === 0 ? "bg-blue-100" : ""
                                    }
                                  >
                                    <TableCell className="font-medium">
                                      {products.rfid}
                                    </TableCell>
                                    <TableCell>{products.namaBarang}</TableCell>
                                    <TableCell className="text-right">
                                      {formatRupiah(products.hargaSatuan)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="transaction" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Transaction Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Qrcode</TableHead>
                                  <TableHead>Rfid</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Qty</TableHead>
                                  <TableHead className="text-right">
                                    Date
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {transaction.map((transaction, index) => (
                                  <TableRow
                                    key={transaction.id}
                                    className={
                                      index % 2 === 0 ? "bg-blue-100" : ""
                                    }
                                  >
                                    <TableCell className="font-medium">
                                      {transaction.qrcode}
                                    </TableCell>
                                    <TableCell>{transaction.rfid}</TableCell>
                                    <TableCell>
                                      {formatRupiah(transaction.hargaSatuan)}
                                    </TableCell>
                                    <TableCell>{transaction.jumlah}</TableCell>
                                    <TableCell className="text-right">
                                      {new Date().toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                      })}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
