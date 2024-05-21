import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Sidebar } from "./Sidebar";

export default function ItemList() {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [getClient, setClient] = useState(null);

  // plus qty
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // min qty
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item lists:", error);
      });
  }, []);

  function formatRupiah(angka) {
    let number_string = angka.toString();
    let sisa = number_string.length % 3;
    let rupiah = number_string.substr(0, sisa);
    let ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return "Rp " + rupiah;
  }

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/api/customers/a2c90816-de95-44f5-8dec-ebe3e300d8a7"
      )
      .then((response) => {
        setClient(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item lists:", error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row w-full h-full mx-auto gap-5 p-5 ">
        {/* Sidebar */}
        <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] ">
          <Sidebar />
        </div>

        <div className="flex flex-row w-full h-full items-center justify-center mx-auto mt-14">
          <div className=" rounded-2xl w-1/1 p-5 overflow-auto ">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                Item List
              </h1>
            </div>
            <div className="flex flex-row flex-wrap flex h-[750px] flex-col overflow-y-scroll gap-5  ">
              <div>
                <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full  ">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((products) => (
                      <div
                        key={products.rfid}
                        className="aspect-h-1 aspect-w-1 w-[200px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-10 xl:aspect-w-10 p-3"
                      >
                        <a href="#" className="group">
                          <img
                            src="../src/assets/img/market.png"
                            alt="Qrcode"
                            className="object-cover w-[180px] h-[180px] rounded-md flex w-30 h-30 text-center items-center justify-center"
                          />
                        </a>
                        <div className="flex justify-between">
                          <div>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                              {products.namaBarang}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              {formatRupiah(products.hargaSatuan)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Button variant="outline">
                              <img
                                src="../src/assets/img/addcart.png"
                                alt="Qrcode"
                                className="object-cover w-7 h-7 rounded-md "
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl w-1/4 p-5 ">
            <div className="flex h-[850px] flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    My Cart
                  </h3>
                </div>

                <div className="mt-8">
                  <hr className="border-t-2 border-gray-200" />
                  <div className="flow-root pt-5">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      <li className="flex py-6">
                        <div className="ml-4 flex flex-1 flex-col gap-2">
                          <div className="flex justify-between text-base font-medium text-gray-900 pt-3 bg-gray-200 p-5">
                            <div>
                              <h3>T-SHIRT</h3>
                              <p>Rp12.000</p>
                            </div>
                            <div className="flex items-center justify-between p-2">
                              <button
                                className="px-2 py-1 bg-white rounded-md mr-1"
                                onClick={handleDecrement}
                              >
                                <MinusIcon className="h-5 w-5 text-black-500" />
                              </button>
                              <h4 className="px-2 py-1 bg-white rounded-md text-black mx-2">
                                {quantity}
                              </h4>
                              <button
                                className="px-2 py-1 bg-white rounded-md ml-1"
                                onClick={handleIncrement}
                              >
                                <PlusIcon className="h-5 w-5 text-black-500" />
                              </button>
                              <button className="px-2 py-1 bg-white rounded-md ml-2">
                                <TrashIcon className="h-7 w-7 text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between text-base font-medium text-gray-900 pt-3 bg-gray-200 p-5">
                            <div>
                              <h3>T-SHIRT</h3>
                              <p>Rp12.000</p>
                            </div>
                            <div className="flex items-center justify-between p-2">
                              <button
                                className="px-2 py-1 bg-white rounded-md mr-1"
                                onClick={handleDecrement}
                              >
                                <MinusIcon className="h-5 w-5 text-black-500" />
                              </button>
                              <h4 className="px-2 py-1 bg-white rounded-md text-black mx-2">
                                {quantity}
                              </h4>
                              <button
                                className="px-2 py-1 bg-white rounded-md ml-1"
                                onClick={handleIncrement}
                              >
                                <PlusIcon className="h-5 w-5 text-black-500" />
                              </button>
                              <button className="px-2 py-1 bg-white rounded-md ml-2">
                                <TrashIcon className="h-7 w-7 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {getClient && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-start text-base font-medium text-gray-900">
                    <p>Customer : {getClient.nama}</p>
                  </div>
                  <div className="flex justify-start text-base font-medium text-gray-500">
                    <p>
                      Wallet :<Badge>{getClient.wallet}</Badge>
                    </p>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Payment</p>
                    <p>Rp. 123.131</p>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="default"
                      className="w-full flex items-center h-[40px] justify-center rounded-md border border-transparent  px-3  text-base font-medium text-white shadow-sm "
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
