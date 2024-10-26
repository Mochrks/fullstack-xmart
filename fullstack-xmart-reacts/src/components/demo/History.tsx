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
  MagnifyingGlassIcon,
  ArrowsPointingInIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

import { Sidebar } from "./Sidebar";
import { getTransactions } from "@/service/transactionService";
import { formatRupiah } from "@/utils/formatIDR";

export default function History() {
  const [transaction, setTransaction] = useState([]);

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
          <div className="flex flex-row w-full h-full items-center justify-center mx-auto mt-14">
            <div className=" rounded-2xl w-1/1 p-5 overflow-auto bg-white shadow-xl ">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                  History Transaction
                </h1>
              </div>

              <div className="flex flex-col flex-wrap  w-[70rem] max-w-[70rem]  gap-5 ">
                <div>
                  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Qrcode</TableHead>
                            <TableHead>Rfid</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">Date</TableHead>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
