"use client";
import Menu from "@/components/menu";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { text } from "stream/consumers";

export default function Home() {
  const router = useRouter();

  const [menu, setMenu] = useState();

  useEffect(() => {
    console.log("Hello");
  }, []);

  const logos = [
    "Meta",
    "Spotify",
    "Microsoft",
    "Nickelodeon",
    "Kohler",
    "Kroger",
  ];

  const handleMenu = () => {
    console.log("Menu handling");
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  return (
    <main className="text-white">
      <Menu menu={menu} />
      <div id="container" className="ml-6 mr-6 mb-6">
        <div
          id="menu"
          className="fixed right-0 top-0 pt-2 pb-2 pl-8 pr-8 m-4 pointer-events rounded-full border-2 border-white"
          onClick={() => handleMenu()}
        >
          Menu
        </div>
        <div id="landing" className="h-[100vh] flex">
          <div className="self-end pb-[3vh]">
            <h1 className="text-2xl lg:text-8xl">Tyler West</h1>
            <div
              id="textContainer"
              className="text-2xl relative min-h-[50px] flex items-center lg:text-8xl"
            >
              <h1 className="absolute">UI Designer</h1>
              <h1 className="absolute">3D Designer</h1>
              <h1 className="absolute">Frontend Developer</h1>
            </div>
            <p className="pt-6">
              Hi, my name is Tyler West and I&apos;m a designer focusing on the
              merger of UI and 3D.
            </p>
            <p>
              With a strong background in 3D Motion Design, I am currently
              pushing my skillset into the interactive fields of XR Design at
              Carnevale in Grand Rapids, MI. I&apos;m excited to learn new
              technologies and create amazing experiences.
            </p>
          </div>
        </div>
        <div id="projects" className="pt-[10vh] pb-[10vh]">
          <div className="">
            <div className="flex pb-6">
              <label htmlFor="dropdown">Select an option:</label>
              <select id="dropdown" className="border rounded-md ml-auto">
                <option value="">-- Select --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          {logos.map((logo, index) => (
            <div key={index} className="">
              <div className="">
                <div className="w-full h-[0.5px] bg-[white]"></div>
                <div className="flex items-center">
                  <div className="h-[100px] w-[100px] bg-green-500 mt-4 mb-4"></div>
                  <h1 className="pl-4">Hello world</h1>
                  <h1 className="ml-auto"></h1>
                </div>
                <div className="w-full bg-[white]"></div>
              </div>
            </div>
          ))}
        </div>
        <div id="about" className="pt-[10vh] pb-[10vh]">
          <div id="clients" className="">
            <h1 className="pb-[5vh] text-2xl w-3/4">Who I've worked with</h1>
            <div className="flex flex-wrap justify-center w-3/4">
              {logos.map((logo, index) => (
                <div key={index} className="w-2/4 md:w-1/3 lg:w-1/3 p-2">
                  <Image
                    src="/brand_logo.png"
                    alt="Brand Logo"
                    width={250}
                    height={100}
                    layout="responsive"
                  />
                </div>
              ))}
            </div>
          </div>
          <div id="awards" className="pt-[10vh]">
            <h1 className="pb-[5vh] text-2xl w-3/4">Press and awards</h1>
            <div className="flex flex-wrap">
              {logos.map((logo, index) => (
                <div key={index} className="w-2/4 md:w-1/3 lg:w-1/3">
                  <div className="">
                    <h1 className="underline">{logo}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="footer" className="pt-[10vh]">
          <h1 className="pb-[5vh] text-2xl w-3/4">Say hi</h1>
          <h1 className="pb-[2vh]">tyler@tylerwest.co</h1>
          <p>
            With a strong background in 3D Motion Design, I am currently pushing
            my skillset into the interactive fields of XR Design at Carnevale in
            Grand Rapids, MI. I&apos;m excited to learn new technologies and
            create amazing experiences.
          </p>
        </div>
      </div>
    </main>
  );
}
