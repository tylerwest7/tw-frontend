"use client";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import LenisScroller from "@/components/lenis-scroller";
import Menu from "@/components/menu/menu";
import GoogleTagManager from "@/components/GoogleTagManager";
import { createContext, useCallback, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useRouter } from "next/router";
import PageWrapper from "@/components/pageWrapper";

//Create context
export const AppContext = createContext<{
  lenis: Lenis | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  //Lenis
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const raf = useCallback(
    (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    },
    [lenis]
  );

  useEffect(() => {
    if (!lenis) {
      const newLenis = new Lenis({});
      setLenis(newLenis);
      //console.log("direction set");
    }
    requestAnimationFrame(raf);
  }, [lenis]);

  return (
    <AppContext.Provider value={{ lenis, darkMode, toggleDarkMode }}>
      <html
        className=""
        lang="en"
        style={{
          backgroundColor: darkMode ? "#E1DFDD" : "#E1DFDD",
          borderBottomColor: darkMode ? "#E1DFDD" : "black",
        }}
      >
        <head>
          <title>Tyler West</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            href="/favicon.ico"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/favicon.ico"
            type="image/<generated>"
            sizes="<generated>"
          />
          <meta name="description" content="Tyler West Portfolio" />
          <link href="https://use.typekit.net/pgl6tup.css" rel="stylesheet" />
          <GoogleTagManager />
        </head>
        <body
          className="text-black"
          style={{ color: darkMode ? "black" : "black" }}
        >
          <PageWrapper>
            <Menu />
          </PageWrapper>

          {children}
          {/* <LenisScroller /> */}
        </body>
      </html>
    </AppContext.Provider>
  );
}
