"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const LenisScroller = () => {
  const contentRef = useRef(null);

  // Smoothscroll using Lenis
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", (e: any) => {
      // console.log(e);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return <></>;
};

export default LenisScroller;
