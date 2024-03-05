"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import LenisScroller from "@/components/lenis-scroller";
import { getLabs, getPortraits, getProjects } from "@/sanity/sanity-utils";
import { getClients } from "@/sanity/sanity-utils";
import AnimatedTextCharacter from "@/components/animatedTextCharacter";
import AnimatedTextWord from "@/components/animatedTextWord";
import LottieAnimation from "@/components/lottie/arrow";
import CursorFollower from "@/components/useCursorFollow";
import SpinningCube from "@/components/FallingCubes";
import FallingCubes from "@/components/FallingCubes";
import Link from "@/components/Link";
import Arrow from "@/components/arrow";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/router";
import PageWrapper from "@/components/pageWrapper";
import ThreeLogo from "@/components/threeLogo";
import { AppContext } from "./layout";
import project from "@/sanity/schemas/project-schema";

//Create project object
interface Project {
  altText: string;
  imagePreview?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  projectImages?: string;
  //labs?: string;
  // Other properties...
}

interface Client {
  name: string;
}

export default function Home() {
  //Use state
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [portraits, setPortraits] = useState([]);
  const [labs, setLabs] = useState<Project[]>([]);

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
    //console.log("Element is in view: ", threeInView);
    //console.log(threeInView);
  }, [threeInView]);

  //Loading
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading state as true

  //Set data
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const fetchedProjects = await getProjects();
        const fetchedClients = await getClients();
        const fetchedPortraits = await getPortraits();
        const fetchedLabs = await getLabs();
        setLabs(fetchedLabs);
        setProjects(fetchedProjects);
        setClients(fetchedClients);
        setPortraits(fetchedPortraits);
        //console.log(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data (whether successful or not)
      }
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

  const appContext = useContext(AppContext);
  const lenis = appContext?.lenis;

  //Back to top
  const handleTop = () => {
    console.log("Going back to top");
    const topOfPage = document.getElementById("#landing");
    lenis?.scrollTo("top");
  };

  return (
    <PageWrapper>
      <div
        id="page"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24  tracking-[-0.025rem] lg:tracking-[-0.05rem]"
      >
        <CursorFollower size={cursorSize} hovering={isHovering} />
        <div
          className="pointer-events-none"
          style={{ zIndex: threeInView ? "1" : "-1" }}
        >
          {/* <ThreeLogo /> */}
        </div>
        <div
          id="landing"
          className="grid grid-cols-1 content-end h-screen pointer-events-none relative"
        >
          <div className="col-span-2 pb-[20vh] lg:pb-[10vh] overflow-hidden z-[9]">
            <h2 className="text-4xl pb-4 font-medium">01/</h2>
            <h1 className="text-4xl font-medium lg:text-[10rem] leading-none">
              Tyler West
            </h1>
            <h1 className="text-4xl font-medium lg:text-[10rem] leading-none">
              Designer
            </h1>
          </div>
          <div
            id="landing-videos"
            className="h-full w-full absolute top-0 right-0 bottom-0 left-0 lg:grid grid-cols-1 lg:grid-cols-3 gap-40 items-center"
          >
            {projects.slice(0, 3).map((project, index) => {
              let translateY;
              let translateX;

              if (window.innerWidth < 1080) {
                if (index === 0) {
                  translateY = "100%";
                  translateX = "100%";
                } else if (index === 1) {
                  translateY = "80%";
                  translateX = "-10%";
                } else {
                  translateY = "100%";
                  translateX = "100%";
                }
              } else {
                if (index === 0) {
                  translateY = 0;
                  translateX = "0%";
                } else if (index === 1) {
                  translateY = "75%";
                  translateX = "0%";
                } else {
                  translateY = "-35%";
                  translateX = "0%";
                }
              }

              const divStyle = {
                transform: `translateY(${translateY}) translateX(${translateX})`,
                //backgroundImage: `url(${project.imagePreview})`,
                backgroundImage: `url(${labs[index].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              };

              return (
                <div
                  className="lg:w-full w-6/12 h-48 lg:h-[20rem] z-[-10]" // Keep the classes here
                  style={divStyle} // Apply the styles here
                  key={index}
                ></div>
              );
            })}
          </div>
        </div>
        <div
          id="projects"
          onMouseEnter={() => cursorHovering()}
          onMouseLeave={() => cursorLeaving()}
          className="flex items-center flex-wrap pt-[20vh] pb-[20vh] min-h-[20vh]"
        >
          <h1 className="pb-4 text-xl font-medium">02/ Favorite Projects</h1>
          {projects.map((project, index) => (
            <Link
              scroll={true}
              key={index}
              href={`/projects/${project.slug}`}
              className="w-screen grid grid-cols-3 lg:grid-cols-4 items-center font-medium"
              style={{
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
                transition: "all 0.25s cubic-bezier(0.65, 0, 0.35, 1)",
                borderBottomWidth: hoveredIndex === index ? "4px" : "1px",
                borderColor: "black",
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
              <div className="lg:text-4xl ml-auto hidden lg:block">
                {/* <LottieAnimation animHovered={playAnim} index={index} /> */}
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
        <div id="about" ref={ref} className="about">
          <h1 className="text-xl pb-4 font-medium">03/ About</h1>
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
                      backgroundColor: "#E1DFDD",
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
              <h1 className="lg:text-5xl pt-[4vh] font-medium">
                Tyler is an experienced designer combining 2D/3D motion design
                expertise with UI/UX skills to create visually striking and
                user-friendly experiences.
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 text-md lg:text-md text-black pt-[4vh] lg:pt-[10vh] gap-9 font-medium">
                <h1>
                  With 3+ years of 2D/3D motion design experience. Tylers
                  strongest skillset is in 3D simulations, animation, lighting,
                  and texturing.
                </h1>
                <h1>
                  With an additional 3 years in UI/UX design, Tyler is
                  experienced with designing, prototyping, and producing
                  functioning interfaces for software used by thousands.
                </h1>
              </div>
              <div id="awards" className="pt-[5vh] lg:pt-[10vh]">
                <h1 className="pb-4 pt-4 font-medium text-lg lg:text-2xl">
                  Press and awards
                </h1>
                <div className="grid grid-cols-2 underline font-medium text-md lg:text-1xl gap-2">
                  {awards.map((award, index) => (
                    <h1 key={index}>{award.title}</h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="clients"
          className="pt-[25vh] pb-[25vh] lg:pt-[35vh] lg:pb-[35vh]"
        >
          <h1 className="text-xl pb-4 font-medium">04/ Brands Ive Worked On</h1>
          <Marquee autoFill speed={250}>
            {clients.map((client) => (
              <div className="marquee_element" key={client.name}>
                <h1 className="text-[3rem] lg:text-[10rem] font-medium pl-9 pr-9 ">
                  {client.name}
                </h1>
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" autoFill speed={250}>
            {clients.map((client) => (
              <div className="marquee_element" key={client.name}>
                <h1 className="text-[3rem] lg:text-[10rem] font-medium pl-9 pr-9  tracking-[-0.05rem]">
                  {client.name}
                </h1>
              </div>
            ))}
          </Marquee>
          <Marquee autoFill speed={250}>
            {clients.map((client) => (
              <div className="marquee_element" key={client.name}>
                <h1 className="text-[3rem] lg:text-[10rem] font-medium pl-9 pr-9 ">
                  {client.name}
                </h1>
              </div>
            ))}
          </Marquee>
        </div>
        <div id="footer" className="pb-[10vh] relative text-lg lg:text-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 pb-[10vh] font-medium">
            <h1 className="col-span-1">04/ Contact Me</h1>
            <h1 className="col-span-1">Lets work together</h1>
            <h1 className="col-span-1"></h1>
            <h1 className="col-span-1"></h1>
          </div>
          <div className="grid grid-cols-3 pt-[5vh] pb-[5vh]">
            <h1
              ref={threeRef}
              className="col-span-3 lg:col-span-2 text-5xl lg:text-[8rem] uppercase underline break-words pt-[2vh] pb-[2vh] lg:pt-[10vh] lg:pb-[10vh] leading-[1] font-medium"
            >
              tyler@tylerwest.co
            </h1>
          </div>
          <div className="grid grid-cols-4 pt-[10vh] font-medium">
            <h1 className="col-span-2 lg:col-span-1">Tyler West</h1>
            <h1 className="hidden lg:block lg:col-span-1">
              <a
                href="https://www.instagram.com/tylerwest.design/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </h1>
            <h1 className="hidden lg:block lg:col-span-1"></h1>
            <h1
              onClick={() => handleTop()}
              className="col-span-2 lg:col-span-1 text-right"
            >
              Back to Top
            </h1>
          </div>
          {/* <FallingCubes threeVisible={threeInView} /> */}
        </div>
      </div>
    </PageWrapper>
  );
}
