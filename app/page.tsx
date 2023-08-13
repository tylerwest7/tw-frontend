"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import LenisScroller from "@/components/lenis-scroller";
import { getPortraits, getProjects } from "@/sanity/sanity-utils";
import { getClients } from "@/sanity/sanity-utils";
import AnimatedTextCharacter from "@/components/animatedTextCharacter";
import AnimatedTextWord from "@/components/animatedTextWord";
import ThreeCube from "@/components/ThreeCube";
import LottieAnimation from "@/components/lottie/arrow";
import CursorFollower from "@/components/useCursorFollow";
import SpinningCube from "@/components/FallingCubes";
import FallingCubes from "@/components/FallingCubes";

//Create project object
interface Project {
  altText: string;
  imagePreview?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  projectImages?: string;
  // Other properties...
}

export default function Home() {
  //Use state
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState([]);
  const [portraits, setPortraits] = useState([]);
  const [awards, setAwards] = useState([
    { title: "Designers are scary!", link: "https://example.com/item1" },
    { title: "Stache feature", link: "https://example.com/item2" },
    { title: "WMAA Addy Association", link: "https://example.com/item3" },
  ]);

  //Image animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    //console.log("Element is in view: ", isInView);
  }, [isInView]);

  //3D animation
  const [mass, setMass] = useState<number>(0);
  const threeRef = useRef(null);
  const threeInView = useInView(threeRef, { once: true });
  useEffect(() => {
    console.log("Element is in view: ", threeInView);
    //console.log(threeInView);
  }, [threeInView]);

  //Loading
  const [isLoading, setIsLoading] = useState<boolean>();

  //Set data
  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      const fetchedClients = await getClients();
      const fetchedPortraits = await getPortraits();
      setProjects(fetchedProjects);
      setClients(fetchedClients);
      setPortraits(fetchedPortraits);
      console.log(fetchedProjects);
    };
    fetchProjects();
  }, []);

  //Project hover effects
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playAnim, setPlayAnim] = useState<boolean>(false);
  const handleHover = (index: any) => {
    setHoveredIndex(index);
    setPlayAnim(true);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setPlayAnim(false);
  };

  //Cursor hover
  const [cursorSize, setCursorSize] = useState<number>(1);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const cursorHovering = () => {
    setCursorSize(3);
    setIsHovering(true);
  };

  const cursorLeaving = () => {
    setCursorSize(1);
    setIsHovering(false);
  };

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24">
      <CursorFollower size={cursorSize} hovering={isHovering} />
      <ThreeCube />

      <div id="landing" className=" grid grid-cols-2 content-end h-screen">
        <div className="col-span-2 lg:col-span-1 pb-[8vh] overflow-hidden">
          {/* <h2 className="text-4xl pb-4">01/</h2> */}
          {/* <h1 className="text-4xl lg:text-[10rem] leading-none">Tyler West</h1>
          <h1 className="text-4xl lg:text-[10rem] leading-none">UI Designer</h1> */}
          <AnimatedTextCharacter padding="0rem" text="/01" />
          <AnimatedTextCharacter padding="0rem" text="Tyler West" />
          <AnimatedTextCharacter padding="1rem" text="UI Designer" />
        </div>
      </div>
      <div
        id="projects"
        onMouseEnter={() => cursorHovering()}
        onMouseLeave={() => cursorLeaving()}
        className="flex items-center flex-wrap pt-[20vh] pb-[20vh] min-h-[20vh]"
      >
        <h1 className=" text-xl">02/</h1>
        {projects.map((project, index) => (
          <Link
            scroll={true}
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
            {project.imagePreview && (
              <Image
                className="pl-0 p-4"
                src={project.imagePreview}
                alt={project.altText || "Default Alt Text"}
                height={250}
                width={250}
              />
            )}
            <h1 className="lg:text-4xl line-clamp-2">{project.title}</h1>
            <h1 className="lg:text-4xl text-left pl-9 line-clamp-2">
              {project.tag}
            </h1>
            <div className="lg:text-4xl text-right">
              <LottieAnimation animHovered={playAnim} index={index} />
            </div>
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
                    transitionDelay: "0.15s",
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
            <div id="awards" className="pt-[5vh] lg:pt-[10vh]">
              <h1 className="pb-4 pt-4">Press and awards</h1>
              <div className="grid grid-cols-2 underline text-xl gap-4">
                {awards.map((award, index) => (
                  <h1 key={index}>{award.title}</h1>
                ))}
              </div>
            </div>
            <div id="clients" className="pt-[10vh] lg:pt-[20vh]">
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
      <div id="footer" className="pt-[20vh] lg:pt-[35vh] pb-[10vh] relative">
        <div className="grid grid-cols-4 pb-[10vh]">
          <h1 className="col-span-1">04/</h1>
          <h1 className="col-span-1">Lets work together</h1>
          <h1 className="col-span-1"></h1>
          <h1 className="col-span-1"></h1>
        </div>
        <div className="grid grid-cols-3">
          <h1
            ref={threeRef}
            className="col-span-3 lg:col-span-2 text-4xl lg:text-[8rem] uppercase underline break-words pt-[10vh] pb-[10vh] leading-[1]"
          >
            tyler@tylerwest.co
          </h1>
        </div>
        <div className="grid grid-cols-4 pt-[10vh]">
          <h1 className="col-span-2 lg:col-span-1">
            Tyler West <br /> UI Designer
          </h1>
          <h1 className="hidden lg:block lg:col-span-1">Instagram</h1>
          <h1 className="hidden lg:block lg:col-span-1"></h1>
          <h1 className="col-span-2 lg:col-span-1 text-right">
            Designed and developed
          </h1>
        </div>
        <FallingCubes threeVisible={threeInView} />
      </div>
      <LenisScroller />
    </div>
  );
}
