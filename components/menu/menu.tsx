import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AnimatedTextWord from "../animatedTextWord";
import { AppContext } from "@/app/layout";
import { useRouter } from "next/router";

interface Props {
  // Any props you might need
}

const Menu: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const appContext = useContext(AppContext);

  // Check if appContext is null before destructuring lenis
  const lenis = appContext?.lenis;

  const openMenu = (): void => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    //console.log(lenis?.velocity);
  }, []);

  useEffect(() => {
    if (showMenu) {
      lenis?.stop();
      //console.log("freeze scroll");
    } else {
      lenis?.start();
      //console.log("start scroll");
    }
  }, [showMenu]);

  const handleLeave = () => {
    const page = document.getElementById("page");

    // Add class
    if (page) {
      page.classList.add("opacity-0");
    }

    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div
        id="header"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24 fixed left-0 top-0 right-0 pt-6 pb-6 z-[998]"
        style={{
          borderBottomWidth: "4px",
          borderColor: "black",
          backgroundColor: "#E1DFDD",
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 text-xl font-medium">
          <Link href="/" className="order-1">
            <h1 className="lg:text-2xl font-medium">Tyler West</h1>
          </Link>
          <div
            onClick={openMenu}
            className="ml-auto cursor-pointer order-2 lg:order-4"
          >
            <h1 className="lg:text-2xl font-medium ml-auto">Menu</h1>
          </div>
          <h1 className="lg:text-2xl font-medium hidden lg:block order-3 lg:text-left">
            Designer
          </h1>
          <Link href="/home" className="grid-col-1 order-4 lg:order-2">
            <h1 className="lg:text-2xl font-medium hidden lg:block lg:text-left">
              Midwest, USA
            </h1>
          </Link>
        </div>
      </div>
      <div
        id="sidebar"
        className="w-[100vw] h-screen fixed right-0 z-[1000]"
        style={{
          transform: showMenu ? "translateX(0vw)" : "translateX(100vw)",
          transition: "all 1s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div className="h-screen" style={{ backgroundColor: "#E1DFDD" }}>
          <div className="h-full grid grid-col-1 ml-9 mr-9 lg:ml-24 lg:mr-24 pt-9 pb-9">
            <h1
              className="text-2xl ml-auto font-medium cursor-pointer"
              onClick={openMenu}
            >
              Close
            </h1>
            <div className="mt-auto text-[3rem] lg:text-[6rem] pb-[10vh] font-medium">
              <Link onClick={openMenu} href="/">
                <h1>Home</h1>
              </Link>
              <Link onClick={handleLeave} href="/projects">
                <h1>Projects</h1>
              </Link>
              <Link onClick={openMenu} href="/about">
                <h1>About</h1>
              </Link>
              <Link
                onClick={openMenu}
                href="https://www.instagram.com/tylerwest.design/"
              >
                <h1>Instagram</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
