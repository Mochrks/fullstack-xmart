import React from "react";
import { NavLink } from "react-router-dom";

import { Card } from "@/components/ui/card";

import {
  CircleStackIcon,
  ShoppingBagIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export function Sidebar() {
  return (
    <Card className="fixed h-screen w-full max-w-[20rem] p-5 shadow-xl shadow-blue-gray-900/5 bg-slate-700">
      <div className="mb-2 p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl text-white">
          Xmart
        </h1>
      </div>

      {/* list Navigate*/}
      <nav>
        <ul className="space-y-2 ">
          <li className="p-2">
            <NavLink
              to="/shop"
              className="block  hover:text-white-800 text-white"
            >
              <ShoppingBagIcon className="h-5 w-5 inline-block mr-2 text-white" />
              Shop
            </NavLink>
            <hr className="my-1" />
          </li>
          <li className="p-2">
            <NavLink
              to="/history"
              className="block  hover:text-white-800 text-white"
            >
              <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
              History
            </NavLink>
            <hr className="my-1" />
          </li>
          <li className="p-2">
            <NavLink
              to="/data"
              className="block  hover:text-white-800 text-white"
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
