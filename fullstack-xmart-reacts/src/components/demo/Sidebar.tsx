import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Card } from "@/components/ui/card";

import {
  CircleStackIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-slate-700">
      <div className="mb-2 p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl text-white">
          Xmart
        </h1>
      </div>

      {/* Daftar Menu */}
      <nav>
        <ul className="space-y-2 ">
          <li className="p-2">
            <NavLink
              to="/shop"
              className="block text-gray-600 hover:text-white-800 text-white"
            >
              <ShoppingBagIcon className="h-5 w-5 inline-block mr-2 text-white" />
              Item List
            </NavLink>
            <hr className="my-1" />
          </li>
          <li className="p-2">
            <NavLink
              to="/shop/detail-transaction"
              className="block text-gray-600 hover:text-white-800 text-white"
            >
              <ArchiveBoxIcon className="h-5 w-5 inline-block mr-2" />
              Detail Transaction
            </NavLink>
            <hr className="my-1" />
          </li>
          <li className="p-2">
            <NavLink
              to="/history"
              className="block text-gray-600 hover:text-white-800 text-white"
            >
              <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
              History
            </NavLink>
            <hr className="my-1" />
          </li>
          <li className="p-2">
            <NavLink
              to="/data"
              className="block text-gray-600 hover:text-white-800 text-white"
            >
              <CircleStackIcon className="h-5 w-5 inline-block mr-2" />
              Data
            </NavLink>
            <hr className="my-1 " />
          </li>
        </ul>
      </nav>
    </Card>
  );
}
