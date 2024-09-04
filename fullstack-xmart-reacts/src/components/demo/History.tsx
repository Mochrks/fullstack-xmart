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
import {
  MagnifyingGlassIcon,
  ArrowsPointingInIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

import { Sidebar } from "./Sidebar";

const invoices = [
  {
    qrcode: "1jqad2i1-13910-12acn3d-123123",
    rfid: "23fn3j-123kl9-231jklc3-23ojd1",
    hargaSatuan: "Rp.15.000",
    jumlah: "2",
    waktu: "14-05-2024",
  },
  {
    qrcode: "1jqad2i1-13910-12acn3d-123123",
    rfid: "23fn3j-123kl9-231jklc3-23ojd1",
    hargaSatuan: "Rp.15.000",
    jumlah: "5",
    waktu: "14-05-2024",
  },
  {
    qrcode: "1jqad2i1-13910-12acn3d-123123",
    rfid: "23fn3j-123kl9-231jklc3-23ojd1",
    hargaSatuan: "Rp.15.000",
    jumlah: "7",
    waktu: "14-05-2024",
  },
];
export default function History() {
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

              <div className="flex flex-row flex-wrap flex w-[70rem] max-w-[70rem] flex-col gap-5 ">
                <div>
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
