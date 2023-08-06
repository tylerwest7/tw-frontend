"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LenisScroller from "@/components/lenis-scroller";
import { getPortraits, getProjects } from "@/sanity/sanity-utils";
import { getClients } from "@/sanity/sanity-utils";

interface Project {
  altText?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  // Other properties...
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState([]);
  const [portraits, setPortraits] = useState([]);
  const [awards, setAwards] = useState([
    { title: "Designers are scary!", link: "https://example.com/item1" },
    { title: "Stache feature", link: "https://example.com/item2" },
    { title: "WMAA Addy Association", link: "https://example.com/item3" },
  ]);

  const paragraphOne =
    "Tyler is an experienced designer with a solid background in 2D/3D motion design, boasting four years of industry expertise. Throughout his career, he has demonstrated a remarkable talent for crafting captivating visual narratives and bringing ideas to life through stunning animations. Notable projects include commercials and interactive visual effects, where Tyler's contributions have consistently delivered creative solutions that leave a lasting impression.";

  const paragraphTwo =
    "Recently, Tyler has set his sights on exploring the dynamic realm of UI/UX design. Drawing upon his extensive motion design expertise, he brings a fresh perspective to designing seamless and user-friendly interfaces. His aim is to create visually striking experiences that not only delight users but also enhance usability and functionality. By blending his creative flair with a keen understanding of end-user needs, Tyler is poised to make a significant impact in the world of digital design. As he embarks on this new chapter, he looks forward to pushing boundaries, solving complex design challenges, and making a meaningful contribution to the ever-evolving landscape of UI/UX design.";

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      const fetchedClients = await getClients();
      const fetchedPortraits = await getPortraits();

      setProjects(fetchedProjects);
      setClients(fetchedClients);
      setPortraits(fetchedPortraits);

      console.log(projects);
    };

    fetchProjects();
  }, []);

  console.log(projects); // This will log the projects array in the browser's console.

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24">
      <div id="landing" className=" grid grid-cols-2 content-end h-screen">
        <div className="col-span-2 lg:col-span-1 pb-[8vh]">
          <h2 className="text-xl">01/</h2>
          <h1 className="lg:text-[10rem] leading-none">
            Tyler West <br /> UI Designer
          </h1>
        </div>
      </div>
      <div
        id="projects"
        className="flex items-center flex-wrap pt-[20vh] pb-[20vh]"
      >
        <h1 className=" text-xl">02/</h1>
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="border-b border-white w-screen grid grid-cols-4 items-center"
          >
            {project.image && (
              <Image
                className="p-4"
                src={project.image}
                alt={project.altText}
                height={250}
                width={250}
              />
            )}
            <h1 className=" lg:text-4xl">{project.title}</h1>
            <h1 className=" lg:text-4xl text-left">{project.tag}</h1>
            <h1 className=" lg:text-4xl text-right">Right</h1>
          </Link>
        ))}
      </div>
      <div id="about" className="">
        <h1 className=" text-xl">03/</h1>
        <div id="aboutContainer" className="grid grid-cols-2 ">
          <div className="col-span-2 lg:col-span-1">
            {portraits.map((portrait, index) => (
              <div
                style={{
                  backgroundImage: `url(${portrait.image})`,
                  backgroundSize: "cover",
                }}
                key={index}
                className="h-[40vh] lg:h-[80vh] w-full lg:w-6/12"
              ></div>
            ))}
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="lg:text-5xl">
              Tyler is an experienced designer combining 2D/3D motion design
              expertise with UI/UX skills to create visually striking and
              user-friendly experiences.
            </h1>
            <div className="grid lg:grid-cols-2 pt-[4vh] text-sm gap-4">
              <p>{paragraphOne}</p>
              <p>{paragraphTwo}</p>
            </div>
            <div className="pt-[10vh]">
              <h1 className="">Notable clients I have helped create for</h1>
              <div className="flex overflow-x-auto space-x-4 p-2 items-center">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="min-w-[8rem] min-h-[4rem] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${client.image})` }}
                  ></div>
                ))}
              </div>
            </div>
            <div>
              <h1>Press and awards</h1>
              <div className="grid grid-cols-2 underline text-xl">
                {awards.map((award, index) => (
                  <h1 key={index}>{award.title}</h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className=" pt-[35vh] pb-[10vh]">
        <div className="grid grid-cols-4 pb-[10vh]">
          <h1 className="col-span-1">04/</h1>
          <h1 className="col-span-1">Hello world</h1>
          <h1 className="col-span-1">Hello world</h1>
          <h1 className="col-span-1">Hello world</h1>
        </div>
        <div className="grid grid-cols-3">
          <h1 className="col-span-2 lg:text-[8rem] uppercase underline break-words pt-[10vh] pb-[10vh]">
            tyler@tylerwest.co
          </h1>
        </div>
        <div className="grid grid-cols-4 pt-[10vh]">
          <h1 className="col-span-1">Hello world</h1>
          <h1 className="col-span-1">Hello world</h1>
          <h1 className="col-span-1">Hello world</h1>
          <h1 className="col-span-1">Hello world</h1>
        </div>
      </div>
      <LenisScroller />
    </div>
  );
}
