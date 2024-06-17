"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import CursorFollower from "@/components/useCursorFollow";
import Link from "next/link"; // Importing Link from next/link
import Marquee from "react-fast-marquee";
import PageWrapper from "@/components/pageWrapper";
import Footer from "@/components/footer/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProjectContext } from "@/components/contexts/ProjectContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { projects, clients, portraits } = useProjectContext();
  const [hoveredProject, setHoveredProject] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [cursorSize, setCursorSize] = useState<number>(1);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cursorHovering = () => {
    setCursorSize(3);
    setIsHovering(true);
  };

  const cursorLeaving = () => {
    setCursorSize(1);
    setIsHovering(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
        console.log(
          `Div is ${entry.isIntersecting ? "visible" : "not visible"}`
        );
      },
      {
        threshold: 0.1,
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  // GSAP animation
  const landingRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (landingRef.current) {
      elementRefs.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, []);

  return (
    <PageWrapper>
      <div
        id="page"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24 tracking-[-0.025rem] lg:tracking-[-0.05rem]"
      >
        <div className="pl-10 pr-10 pt-2 pb-4 bg-black fixed bottom-0 right-0 text-gray-50">
          Home
        </div>
        <CursorFollower size={cursorSize} hovering={isHovering} />
        <div className="pointer-events-none"></div>
        <div
          id="landing"
          className="grid grid-cols-1 md:grid-cols-5 content-center pointer-events-none relative lg:pt-32 xl:pt-44 pb-44 "
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
                <path d="M37.5 0V78" stroke="black" strokeWidth="8" />
                <path
                  d="M3 48.5L37.5 83L72 48.5"
                  stroke="black"
                  strokeWidth="8"
                />
              </svg>
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-medium md:pb-10">
              Tyler is a UI/UX designer with a focus on creating immersive XR
              experiences.
            </h1>
            <h1 className="text-1xl md:text-3xl xl:text-5xl font-medium pt-5 pb-16 lg:pb-28 md:pb-44 md:pb-24">
              In addition to his expertise in XR, Tyler is also a skilled 3D
              designer. He creates detailed models and environments that bring
              concepts to life with precision and creativity.
            </h1>

            <div className="grid grid-cols-5 gap-4 ">
              <div
                className="col-span-3 h-40 lg:h-64 xl:h-96"
                style={{
                  backgroundImage: portraits[0]
                    ? `url(${portraits[0].image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="col-span-2 h-40 lg:h-64 xl:h-96"
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
          onMouseEnter={cursorHovering}
          onMouseLeave={cursorLeaving}
          className="grid md:grid-cols-5"
          ref={divRef}
        >
          <div id="ProjectImage" className="col-span-2">
            <div style={{ position: "sticky", top: "100px" }}>
              <div
                className="block h-80 w-80"
                style={{
                  backgroundImage: `url(${hoveredProject.name})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <h1 className="text-3xl font-medium w-6/12 lg:block">
                {hoveredProject.id}
              </h1>
            </div>
          </div>
          <div id="Projects" className="col-span-3 content-start">
            <h1 className="text-3xl font-medium pb-5">Client Work</h1>
            {projects.map((project, index) => (
              <Link
                scroll={true}
                key={index}
                href={`/projects/${project.slug}`}
                className="grid grid-cols-2 lg:grid-cols-2 items-center font-medium relative pt-8 pb-8"
                id={`/projects/${project.title}`}
                onMouseOver={() => {
                  const elementId = project.title || "";
                  const elementName = project.imagePreview || "";
                  setHoveredProject({ id: elementId, name: elementName });
                  console.log("Hovered over project:", {
                    id: project.title,
                    name: project.imagePreview || "",
                  });
                }}
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
                <h1 className="text-3xl pt-3 font-medium">
                  Designers are scary!
                </h1>
              </li>
              <li>
                <h1 className="text-3xl pt-3 font-medium">
                  WMAA Addy Association
                </h1>
              </li>
              <li>
                <h1 className="text-3xl pt-3 font-medium">Stache feature</h1>
              </li>
            </ul>
          </div>
          <div className="col-span-3">
            <h1 className="text-2xl lg:text-5xl xl:text-7xl font-medium pb-20">
              Tyler is an experienced designer combining 2D/3D motion design
              expertise with UI/UX skills to create visually striking and
              user-friendly experiences.
            </h1>
            <h1 className="text-1xl lg:text-4xl xl:text-5xl font-medium pt-8 pb-8 xl:pt-10 xl:pb-10">
              With 3+ years of 2D/3D motion design experience. Tyler's strongest
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
          className="grid md:grid-cols-5 pt-[25vh] pb-[25vh] lg:pt-[20vh] lg:pb-[20vh]"
        >
          <div className="col-span-2 pb-10">
            <h1 className="text-5xl xl:text-7xl font-medium">Freebies</h1>
          </div>
          <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl xl:text-7xl font-medium">
                Figma Plugins
              </h1>
              <ul className="pt-5 pb-5 text-1xl lg:text-3xl">
                <li>
                  <h1 className="font-medium">FIGMAJSON</h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">RemoveLinks</h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">Request a plugin</h1>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-4xl xl:text-7xl pt-10 lg:pt-0 font-medium">
                Design Assets
              </h1>
              <ul className="pt-1 pb-5 text-1xl lg:text-3xl">
                <li>
                  <h1 className="pt-3 font-medium">Houdini Files</h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">Free models</h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">More coming soon</h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
