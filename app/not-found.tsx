"use client";

import AnimatedTextCharacter from "@/components/animatedTextCharacter";
import "../styles/globals.css";
import LenisScroller from "@/components/lenis-scroller";
import Link from "next/link";
import Menu from "@/components/menu/menu";

export default function Custom404() {
  return (
    <div>
      <div
        className="h-screen w-screen flex flex-wrap items-center justify-center"
        style={{
          backgroundColor: "#E1DFDD",
        }}
      >
        <h1 className="w-full text-8xl font-medium text-center mt-auto pb-9">
          You seem lost
        </h1>
        <Link
          href={"/"}
          className="pl-9 pt-3 pr-9 pb-3 mb-auto rounded-full border border-black"
        >
          Lets go back
        </Link>
      </div>
    </div>
  );
}
