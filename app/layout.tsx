//https://codesandbox.io/p/sandbox/old-snowflake-q3x4x5?file=%2Ftsconfig.json%3A1%2C1
//import "./globals.css";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import LenisScroller from "@/components/lenis-scroller";

//const inter = Inter({ subsets: ["latin"] });
//<body className={inter.className}>

export const metadata = {
  title: "Tyler West",
  description: "Tyler West Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black" lang="en">
      <head>
        <link href="https://use.typekit.net/pgl6tup.css" rel="stylesheet" />
      </head>
      <body className="text-white">
        {children}
        <LenisScroller />
      </body>
    </html>
  );
}
