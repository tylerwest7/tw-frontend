"use client";

import Link from "next/link";
import "../../styles/globals.css";
import { useState } from "react";
import AnimatedTextWord from "../animatedTextWord";

export default function Menu() {
  const [testState, setTestState] = useState();

  return (
    <div
      id="header"
      className="ml-9 mr-9 lg:ml-24 lg:mr-24 absolute left-0 top-0 right-0 pt-9"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 text-md font-regular">
        {/* <h1>Tyler West</h1> */}
        {/* <h1 className="hidden lg:block">UI Designer at Carnevale</h1>
          <h1 className="hidden lg:block">Grand Rapids, MI</h1>
          <h1 className="text-right">Menu</h1> */}
        <Link href="/">
          <AnimatedTextWord
            text="Tyler West"
            classes="overflow-hidden flex text-xl lg:text-xl font-regular"
          />
        </Link>
        <AnimatedTextWord
          text="UI Designer at Carnevale"
          classes="hidden lg:flex overflow-hidden flex text-xl lg:text-xl font-regular"
        />
        <AnimatedTextWord
          text="Grand Rapids, MI"
          classes="hidden lg:flex overflow-hidden flex text-xl lg:text-xl font-regular"
        />
        <Link href="/about" className="ml-auto">
          <AnimatedTextWord
            text="Menu"
            classes="text-right overflow-hidden flex text-xl lg:text-xl font-regular ml-auto lg:mr-0"
          />
        </Link>
      </div>
    </div>
  );
}
