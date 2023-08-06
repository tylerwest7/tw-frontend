"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import LenisScroller from "@/components/lenis-scroller";
import { getPortraits, getProjects } from "@/sanity/sanity-utils";
import { getClients } from "@/sanity/sanity-utils";
import AnimatedTextCharacter from "@/components/animatedTextCharacter";

interface Project {
  altText: string;
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

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
    };

    fetchProjects();
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24">
      <div
        id="header"
        className="absolute top-9 left-[2.25rem] right-[2.25rem] lg:left-[9rem] lg:right-[9rem]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 text-md font-regular">
          <h1>Tyler West</h1>
          <h1 className="hidden lg:block">UI Designer at Carnevale</h1>
          <h1 className="hidden lg:block">Grand Rapids, MI</h1>
          <h1 className="text-right">Menu</h1>
        </div>
      </div>
      <div id="landing" className=" grid grid-cols-2 content-end h-screen">
        <div className="col-span-2 lg:col-span-1 pb-[8vh] overflow-hidden">
          <h2 className="text-4xl pb-4">01/</h2>
          {/* <h1 className="text-4xl lg:text-[10rem] leading-none">Tyler West</h1>
          <h1 className="text-4xl lg:text-[10rem] leading-none">UI Designer</h1> */}
          <AnimatedTextCharacter text="Tyler West" />
          <AnimatedTextCharacter text="UI Designer" />
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
            className="w-screen grid grid-cols-4 items-center"
            style={{
              opacity:
                hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
              transition: "all 0.25s cubic-bezier(0.65, 0, 0.35, 1)",
              borderBottomWidth: hoveredIndex === index ? "4px" : "1px",
              borderBottomColor: "white",
            }}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleMouseLeave}
          >
            {project.image && (
              <Image
                className="pl-0 p-4"
                src={project.image}
                alt={project.altText || "Default Alt Text"}
                height={250}
                width={250}
              />
            )}
            <h1 className="lg:text-4xl line-clamp-2">{project.title}</h1>
            <h1 className="lg:text-4xl text-left pl-9 line-clamp-2">
              {project.tag}
            </h1>
            <h1 className="lg:text-4xl text-right line-clamp-2">Right</h1>
          </Link>
        ))}
      </div>
      <div id="about" ref={ref} className="">
        <h1 className="text-xl pb-4">03/</h1>
        <div id="aboutContainer" className="grid grid-cols-2">
          <div className="col-span-2 lg:col-span-1">
            {portraits.map((portrait, index) => (
              <div
                key={index}
                className="h-[50vh] lg:h-full w-full lg:w-6/12 relative"
              >
                {/* The mask element */}
                <div
                  id="mask"
                  className="h-full w-full absolute top-0 left-0"
                  style={{
                    backgroundColor: "black",
                    height: isInView ? "0%" : "100%",
                    transition: "height 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                    transitionDelay: "0.25s",
                  }}
                ></div>

                {/* The actual image */}
                <div
                  style={{
                    backgroundImage: `url(${(portrait as Project).image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="lg:text-5xl pt-4 font-medium">
              Tyler is an experienced designer combining 2D/3D motion design
              expertise with UI/UX skills to create visually striking and
              user-friendly experiences.
            </h1>
            <div className="grid lg:grid-cols-2 pt-[4vh] text-sm gap-4">
              <p>{paragraphOne}</p>
              <p>{paragraphTwo}</p>
            </div>
            <div id="awards" className="pt-[10vh]">
              <h1 className="pb-4 pt-4">Press and awards</h1>
              <div className="grid grid-cols-2 underline text-xl gap-4">
                {awards.map((award, index) => (
                  <h1 key={index}>{award.title}</h1>
                ))}
              </div>
            </div>
            <div id="clients" className="pt-[20vh]">
              <h1 className="">Notable clients I have helped create for</h1>
              <div className="flex overflow-x-auto space-x-4 p-2 items-center">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="min-w-[8rem] min-h-[4rem] bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${(client as Project).image})`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className=" pt-[35vh] pb-[10vh]">
        <div className="grid grid-cols-4 pb-[10vh]">
          <h1 className="col-span-1">04/</h1>
          <h1 className="col-span-1">Let's work together</h1>
          <h1 className="col-span-1"></h1>
          <h1 className="col-span-1"></h1>
        </div>
        <div className="grid grid-cols-3">
          <h1 className="col-span-2 lg:text-[8rem] uppercase underline break-words pt-[10vh] pb-[10vh]">
            tyler@tylerwest.co
          </h1>
        </div>
        <div className="grid grid-cols-4 pt-[10vh]">
          <h1 className="col-span-1">
            Tyler West <br /> UI Designer
          </h1>
          <h1 className="col-span-1">Instagram</h1>
          <h1 className="col-span-1"></h1>
          <h1 className="col-span-1 text-right">Designed and developed</h1>
        </div>
      </div>
      <LenisScroller />
    </div>
  );
}
