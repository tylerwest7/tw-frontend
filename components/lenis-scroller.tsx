"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export const LenisScroller = () => {
  const contentRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top", // Trigger when top of the content reaches the top of the viewport
      end: "bottom bottom", // Trigger when bottom of the content reaches the bottom of the viewport
      onEnter: () => {
        // Load more content here
        console.log("Loading more content...");
      },
      onEnterBack: () => {
        // Load more content when scrolling back up (optional)
        console.log("Loading more content when scrolling back up...");
      },
    });
  }, []);

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

  return (
    <>
      <div ref={contentRef}></div>
    </>
  );
};
