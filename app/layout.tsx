"use client";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import LenisScroller from "@/components/lenis-scroller";
import Menu from "@/components/menu/menu";
import { createContext, useCallback, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useRouter } from "next/router";
import PageWrapper from "@/components/pageWrapper";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer/footer";
import {
  ProjectProvider,
  useProjectContext,
} from "@/components/contexts/ProjectContext";

// Create context
export const AppContext = createContext<{
  lenis: Lenis | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

const Content = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useProjectContext();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, 20); // Adjust the interval time for speed of animation
    } else {
      setPercentage(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{ backgroundColor: "#CBC9C7" }}
      >
        <h1>{percentage}%</h1>
      </div>
    );
  }

  return (
    <>
      <PageWrapper>
        <Menu />
      </PageWrapper>
      {children}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Lenis
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
      // console.log("direction set");
    }
    requestAnimationFrame(raf);
  }, [lenis]);

  return (
    <AppContext.Provider value={{ lenis, darkMode, toggleDarkMode }}>
      <ProjectProvider>
        <html
          className=""
          lang="en"
          style={{
            backgroundColor: darkMode ? "#E1DFDD" : "#E1DFDD",
            borderBottomColor: darkMode ? "#E1DFDD" : "#333",
          }}
        >
          <head>
            <title>Tyler West</title>
            <link rel="icon" href="/icon.ico" />
            <link
              rel="icon"
              href="/icon.ico"
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
          </head>
          <body className="text-black">
            <Content>{children}</Content>
            {/* <Footer /> */}
          </body>
        </html>
        <Analytics />
      </ProjectProvider>
    </AppContext.Provider>
  );
}
