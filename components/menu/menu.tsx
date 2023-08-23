import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AnimatedTextWord from "../animatedTextWord";
import { AppContext } from "@/app/layout";

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
    console.log(lenis?.velocity);
  }, []);

  useEffect(() => {
    if (showMenu) {
      lenis?.stop();
      console.log("freeze scroll");
    } else {
      lenis?.start();
      console.log("start scroll");
    }
  }, [showMenu]);

  const handleMenu = (): void => {
    // Scroll to the #about div
    const aboutDiv = document.getElementById("about");
    if (aboutDiv) {
      aboutDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        id="header"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24 fixed left-0 top-0 right-0 pt-9 z-[998] pb-9"
        style={{
          borderBottomWidth: "4px",
          borderColor: "black",
          backgroundColor: "#E1DFDD",
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 text-xl font-medium">
          <Link href="/">
            <h1 className="overflow-hidden flex text-xl lg:text-2xl font-medium">
              Tyler West
            </h1>
          </Link>
          <h1 className="overflow-hidden flex text-xl lg:text-2xl font-medium">
            Tyler West
          </h1>
          <Link href="/home">
            <h1 className="overflow-hidden flex text-xl lg:text-2xl font-medium">
              Grand Rapids, MI
            </h1>
          </Link>
          <div onClick={openMenu} className="ml-auto cursor-pointer">
            <h1 className="overflow-hidden flex text-xl lg:text-2xl font-medium">
              Menu
            </h1>
          </div>
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
            <div className="mt-auto text-[9rem] pb-[10vh] font-medium">
              <h1 onClick={handleMenu}>Home</h1>
              <h1>Projects</h1>
              <h1>About</h1>
              <h1>Instagram</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
