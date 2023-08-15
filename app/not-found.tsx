"use client";

import AnimatedTextCharacter from "@/components/animatedTextCharacter";
import "../styles/globals.css";
import LenisScroller from "@/components/lenis-scroller";

export default function Custom404() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <AnimatedTextCharacter padding="0rem" text="You seem lost" />
      <LenisScroller />
    </div>
  );
}
