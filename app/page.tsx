"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { getLabs, getPortraits, getProjects } from "@/sanity/sanity-utils";
import { getClients } from "@/sanity/sanity-utils";
import CursorFollower from "@/components/useCursorFollow";
import Link from "@/components/Link";
import Marquee from "react-fast-marquee";
import PageWrapper from "@/components/pageWrapper";
import { AppContext } from "./layout";
import Footer from "@/components/footer/footer";

//Create project object
interface Project {
  altText: string;
  imagePreview?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  projectImages?: string;
}

interface Portrait {
  alt: string;
  content: string | null;
  image: string;
  name: string;
  slug: string | null;
  url: string | null;
  _id: string;
  _createdAt: string;
}

interface Client {
  name: string;
}

export default function Home() {
  //Use state
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [portraits, setPortraits] = useState<Portrait[]>([]);
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

  useEffect(() => {
    console.log(portraits);
  }, [portraits]);

  const appContext = useContext(AppContext);
  const lenis = appContext?.lenis;

  return (
    <PageWrapper>
      <div
        id="page"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24  tracking-[-0.025rem] lg:tracking-[-0.05rem]"
      >
        <div className="pl-10 pr-10 pt-4 pb-4 bg-black fixed bottom-0 right-0 text-gray-50">
          Home
        </div>
        <CursorFollower size={cursorSize} hovering={isHovering} />
        <div className="pointer-events-none"></div>
        <div
          id="landing"
          className="grid grid-cols-1 md:grid-cols-5 content-center md:h-screen pointer-events-none relative pt-44 pb-44"
        >
          <div className="md:col-span-2 relative">
            <h1 className="text-xl hidden md:text-6xl xl:text-7xl md:block font-medium">
              Tyler West
            </h1>
            <div
              id="arrow"
              className="absolute bottom-0 left-0 hidden md:block"
            >
              <svg
                width="75"
                height="89"
                viewBox="0 0 75 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M37.5 0V78" stroke="black" stroke-width="8" />
                <path
                  d="M3 48.5L37.5 83L72 48.5"
                  stroke="black"
                  stroke-width="8"
                />
              </svg>
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-medium md:pb-10">
              Tyler is a UI/UX designer with a focus on creating immersive XR
              experiences.
            </h1>
            <h1 className="text-1xl md:text-3xl xl:text-5xl font-medium pt-5 pb-16 md:pb-44 md:pb-24">
              In addition to his expertise in XR, Tyler is also a skilled 3D
              designer. He creates detailed models and environments that bring
              concepts to life with precision and creativity.
            </h1>
            <div className="grid grid-cols-5 gap-4">
              <div
                className="col-span-3 h-40 xl:h-96"
                style={{
                  backgroundImage: portraits[0]
                    ? `url(${portraits[0].image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="col-span-2 h-40 xl:h-96"
                style={{
                  backgroundImage: portraits[2]
                    ? `url(${portraits[2].image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          id="projects"
          onMouseEnter={() => cursorHovering()}
          onMouseLeave={() => cursorLeaving()}
          className="grid md:grid-cols-5"
        >
          <div id="ProjectImage" className="col-span-2">
            <div className="hidden">
              {projects.map((project, index) => (
                <Link
                  scroll={true}
                  key={index}
                  href={`/projects/${project.slug}`}
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
                </Link>
              ))}
            </div>
            <h1 className="text-1xl font-medium w-6/12 hidden lg:block">
              Tyler is a UI/UX designer with a focus on creating immersive XR
              experiences.
            </h1>
          </div>
          <div id="Projects" className="col-span-3 content-start">
            <h1 className="text-3xl font-medium pb-5">Client Work</h1>
            {projects.map((project, index) => (
              <Link
                scroll={true}
                key={index}
                href={`/projects/${project.slug}`}
                className="grid grid-cols-2 lg:grid-cols-2 items-center font-medium relative pt-8 pb-8"
              >
                <h1 className="lg:text-3xl line-clamp-1">{project.title}</h1>
                <h1 className="lg:text-3xl text-left pl-9 line-clamp-1 overflow-ellipsis">
                  {project.tag}
                </h1>
                <div className="h-[2px] absolute bottom-0 w-full bg-black"></div>
              </Link>
            ))}
          </div>
        </div>
        <div
          id="about"
          ref={ref}
          className="grid md:grid-cols-5 content-center pt-[25vh] pb-[25vh] lg:pt-[20vh] lg:pb-[20vh]"
        >
          <div className="col-span-2 pb-10 pt-10 lg:pt-0 lg:pb-0">
            <h1 className="text-5xl xl:text-7xl font-medium">
              Press and Awards
            </h1>
            <ul className="pt-5 pb-5">
              <li>
                <h1 className="text-1xl font-medium">Designers are scary!</h1>
              </li>
              <li>
                <h1 className="text-1xl font-medium">WMAA Addy Association</h1>
              </li>
              <li>
                <h1 className="text-1xl font-medium">Stache feature</h1>
              </li>
            </ul>
            <h1 className="text-1xl font-medium">Discover more</h1>
          </div>
          <div className="col-span-3">
            <h1 className="text-2xl lg:text-5xl xl:text-7xl font-medium">
              Tyler is an experienced designer combining 2D/3D motion design
              expertise with UI/UX skills to create visually striking and
              user-friendly experiences.
            </h1>
            <h1 className="text-1xl lg:text-4xl xl:text-5xl font-medium pt-8 pb-8 xl:pt-10 xl:pb-10">
              With 3+ years of 2D/3D motion design experience. Tylers strongest
              skillset is in 3D simulations, animation, lighting, and texturing.
            </h1>
            <h1 className="text-1xl lg:text-4xl xl:text-5xl font-medium">
              With an additional 3 years in UI/UX design, Tyler is experienced
              with designing, prototyping, and producing functioning interfaces
              for software used by thousands.
            </h1>
          </div>
        </div>
        <div id="clients" className="">
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
        <div
          id="Freebies"
          className="grid md:grid-cols-5 pt-[25vh] pb-[25vh] lg:pt-[10vh] lg:pb-[10vh]"
        >
          <div className="col-span-2">
            <h1 className="text-5xl xl:text-7xl font-medium">Freebies</h1>
          </div>
          <div className="col-span-3">
            <div>
              <h1 className="text-5xl xl:text-7xl font-medium">
                Figma Plugins
              </h1>
              <ul className="pt-5 pb-5">
                <li>
                  <h1 className="text-1xl font-medium">FIGMAJSON</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">RemoveLinks</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">Request a plugin</h1>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-5xl xl:text-7xl font-medium">
                Design Assets
              </h1>
              <ul className="pt-5 pb-5">
                <li>
                  <h1 className="text-1xl font-medium">Houdini Files</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">Free models</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">More coming soon</h1>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-5xl xl:text-7xl font-medium">Mentoring</h1>
              <ul className="pt-5 pb-5">
                <li>
                  <h1 className="text-1xl font-medium">Contact me</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">Lets work together</h1>
                </li>
                <li>
                  <h1 className="text-1xl font-medium">Stache feature</h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageWrapper>
  );
}
