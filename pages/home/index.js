"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import LenisScroller from "@/components/lenis-scroller";
import "../../styles/globals.css";
import Menu from "../../components/menu/menu.tsx";
import React from "react";
import useAnimateSections from "../../components/useAnimateSections";

//Scroll animation

export default function Home({ projects, clients, portraits }) {
  const router = useRouter();
  const [myProjects, setMyProjects] = useState([]);
  const [myClients, setMyClients] = useState([]);
  const [myPortraits, setMyPortraits] = useState([]);
  useAnimateSections();

  useEffect(() => {
    setMyProjects(projects);
    setMyClients(clients);
    setMyPortraits(portraits);
    console.log(projects);
  }, []);

  const logos = [
    "Meta",
    "Spotify",
    "Microsoft",
    "Nickelodeon",
    "Kohler",
    "Kroger",
    "Adobe",
  ];

  const handleWork = (index, project) => {
    console.log(`${project.imageUrl}`);
    router.push(`work/${index}`);
    // router.push(
    //   {
    //     pathname: "/work",
    //     query: { image: project.imageUrl },
    //   },
    //   `work/${index}`
    // );
  };

  return (
    <main id="scrollsection" className="text-white haas">
      <Menu />
      <div id="container" className="ml-6 mr-6 mb-6">
        <div
          id="header"
          className="w-screen fixed left-[1.5rem] right-[1.5rem] top-0 pt-4 pb-4"
        >
          <div id="logo" className="font-bold text-2xl">
            Logo
          </div>
        </div>
        <div id="content" className="h-[100vh] flex items-end lg:items-center">
          <div className="pb-8">
            <h1 className="text-2xl leading-none lg:text-[12rem] font-medium">
              Tyler West
            </h1>
            <h1 className="text-2xl leading-none lg:text-[12rem] font-medium">
              UI Designer
            </h1>
            <p className="pt-[4vh]">
              Hi, my name is Tyler West and Im a designer focusing on the merger
              of UI and 3D.
            </p>
            <p className="max-w-4xl">
              With a strong background in 3D Motion Design, I am currently
              pushing my skillset into the interactive fields of XR Design at
              Carnevale in Grand Rapids, MI. Im excited to learn new
              technologies and create amazing experiences.
            </p>
          </div>

          <div className="lg:w-6/12 bg-red-500"></div>
        </div>
        <div id="work" className="pt-[10vh] pb-[10vh]">
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
          {myProjects.map((project, index) => (
            <div key={index} className="">
              <div onClick={() => handleWork(index, project)} className="">
                <div id="border" className="w-full h-[0.5px] bg-[white]"></div>
                <div className="flex items-center">
                  <div
                    id="workImage"
                    className="h-[8rem] w-[8rem] lg:h-[15rem] lg:w-[15rem] mt-4 mb-4 bg-cover"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  ></div>
                  <div className="max-w-[100px] lg:max-w-[400px]">
                    <h1 className="pl-4 lg:text-[4rem] truncate">
                      {project.title}
                    </h1>
                  </div>
                  <h1 className="ml-auto"></h1>
                </div>
                <div className="w-full bg-[white]"></div>
              </div>
            </div>
          ))}
        </div>
        <div id="animateSection" className="pt-[10vh] pb-[10vh]">
          <div id="clients" className="">
            <h1 className="pb-[5vh] text-2xl w-3/4">Who Ive worked with</h1>
            <div
              id="animateSection"
              className="flex flex-wrap items-center gap-4"
            >
              {myClients.map((client, index) => (
                <Image
                  key={index}
                  src={client.imageUrl}
                  alt={client.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ height: "100%", width: "250px" }}
                />
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
        <div className="pt-[10vh]">
          <div id="Footer" className="w-6/12">
            <h1 className="pb-[5vh] text-2xl w-3/4">Say hi</h1>
            <div
              className="w-screen lg:w-9/12 h-[80vh]"
              style={{
                backgroundImage: myPortraits[0]?.imageUrl
                  ? `url("${myPortraits[0].imageUrl}")`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <h1 className="pb-[2vh]">tyler@tylerwest.co</h1>
            <p>
              With a strong background in 3D Motion Design, I am currently
              pushing my skillset into the interactive fields of XR Design at
              Carnevale in Grand Rapids, MI. Im excited to learn new
              technologies and create amazing experiences.
            </p>
          </div>
        </div>
        <div id="footerContentRight" className="w-0 lg:w-6/12"></div>
      </div>
      <LenisScroller />
    </main>
  );
}

const client = createClient({
  projectId: "xbxlgxej",
  dataset: "production",
  apiVersion: "2021-10-14",
  useCdn: false,
});

export async function getStaticProps() {
  const projects = await client.fetch(
    `*[_type == "project"]{title, tags, "imageUrl": image.asset->url}`
  );
  const clients = await client.fetch(
    `*[_type == "client"]{name, alt, "imageUrl": image.asset->url}`
  );
  const portraits = await client.fetch(
    `*[_type == "portrait"]{name, alt, "imageUrl": image.asset->url}`
  );

  return {
    props: {
      projects,
      clients,
      portraits,
    },
  };
}
