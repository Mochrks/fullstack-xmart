import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Sidebar } from "./Sidebar";
import {
  MagnifyingGlassIcon,
  ArrowsPointingInIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const invoices = [
  {
    qrcode: "a2c90816-de95-44f5-8dec-ebe3e300d8a7",
    rfid: "0bd0693f-6d4d-4941-ac08-8476110c3a50",
    hargaSatuan: "Rp.100.000",
    jumlah: "1",
    waktu: "14-05-2024",
  },
  {
    qrcode: "a2c90816-de95-44f5-8dec-ebe3e300d8a7",
    rfid: "fc09ba8a-6407-49f8-a06a-1f52cb4492fc",
    hargaSatuan: "Rp.200.000",
    jumlah: "1",
    waktu: "14-05-2024",
  },
];

export default function DetailTransaction() {
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
            <div className=" rounded-2xl w-1/1 p-5 overflow-auto bg-white shadow-xl">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                  Detail Transaction
                </h1>
              </div>

              <div className="flex flex-row flex-wrap w-[70rem] max-w-[70rem] gap-5 ">
                <div>
                  <div className="flex items-center justify-center mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-gray-200 mt-6">
                    <div className="flex-grow ml-4 ">
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Customer : Jane Smith
                      </h4>
                      <p>a2c90816-de95-44f5-8dec-ebe3e300d8a7</p>
                      <p>
                        Wallet : <Badge>BCA</Badge>
                      </p>
                    </div>
                    <div className="flex-grow text-right">
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Total Payment : Rp. 300.000
                      </h4>
                    </div>
                  </div>
                  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Qrcode</TableHead>
                            <TableHead>Rfid</TableHead>
                            <TableHead>Harga satuan</TableHead>
                            <TableHead>Jumlah</TableHead>
                            <TableHead className="text-right">Waktu</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map((invoice, index) => (
                            <TableRow
                              key={invoice.qrcode}
                              className={index % 2 === 0 ? "bg-blue-100" : ""}
                            >
                              <TableCell className="font-medium">
                                {invoice.qrcode}
                              </TableCell>
                              <TableCell>{invoice.rfid}</TableCell>
                              <TableCell>{invoice.hargaSatuan}</TableCell>
                              <TableCell>{invoice.jumlah}</TableCell>
                              <TableCell className="text-right">
                                {invoice.waktu}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="flex item-center justify-center pt-10">
                        <Button>Save transaction</Button>
                      </div>
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
