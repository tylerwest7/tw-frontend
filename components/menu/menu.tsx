"use client";

import Link from "next/link";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import AnimatedTextWord from "../animatedTextWord";

export default function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  function openMenu() {
    console.log("open menu");
    setShowMenu(!showMenu);
  }

  function handleMenu(showMenu: boolean) {
    // Scroll to the #about div
    const aboutDiv = document.getElementById("about");
    if (aboutDiv) {
      aboutDiv.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  return (
    <div>
      <div
        id="header"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24 fixed left-0 top-0 right-0 pt-9"
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
          <div onClick={() => openMenu()}>
            <AnimatedTextWord
              text="Menu"
              classes="text-right overflow-hidden flex text-xl lg:text-xl font-regular ml-auto lg:mr-0"
            />
          </div>
        </div>
      </div>
      <div
        id="sidebar"
        className="w-[20vw] h-screen bg-black fixed right-0 z-[999]"
        style={{
          transform: showMenu ? "translateX(0vw)" : "translateX(20vw)",
          transition: "all 0.25s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div className="grid grid-cols-1 p-9 gap-4 justify-end h-full">
          <div className="flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h1 onClick={() => handleMenu(!showMenu)} className="text-4xl">
                About
              </h1>
              <h1 className="text-4xl">Hello world</h1>
              <h1 className="text-4xl">Hello world</h1>
              <h1 className="text-4xl">Hello world</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-0 top-0 right-0 bottom-0 bg-black z-[998] pointer-events-none"
        style={{
          opacity: showMenu ? "50%" : "0%",
          transition: "all 0.25s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      ></div>
    </div>
  );
}
