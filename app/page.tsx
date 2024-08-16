"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import CursorFollower from "@/components/useCursorFollow";
import Link from "next/link"; // Importing Link from next/link
import Marquee from "react-fast-marquee";
import PageWrapper from "@/components/pageWrapper";
import Footer from "@/components/footer/footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProjectContext } from "@/components/contexts/ProjectContext";
import { AppContext } from "./layout";

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
  const appContext = useContext(AppContext);
  // Check if appContext is null before destructuring lenis
  const lenis = appContext?.lenis;

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

  //Landing animation
  useEffect(() => {
    const h1Elements = document.querySelectorAll("#landing .stagger");

    gsap.fromTo(
      h1Elements,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, // Adjust the stagger duration as needed
        scrollTrigger: {
          trigger: "#landing",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      "#tag",
      { y: 50 },
      {
        y: 0, // Adjust the y value as needed for the translation
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top center",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <PageWrapper>
      <div
        id="page"
        className="ml-9 mr-9 lg:ml-24 lg:mr-24 tracking-[-0.025rem] lg:tracking-[-0.05rem]"
      >
        <div
          onClick={() => {
            console.log("Back to top");
            // window.scrollTo({
            //   top: 0,
            //   behavior: "smooth",
            // });
            lenis?.scrollTo(0);
          }}
          id="tag"
          className="pl-10 pr-10 pt-2 pb-4 bg-black fixed bottom-0 right-0 text-gray-50 order-[9999]"
        >
          Back to top
        </div>
        <CursorFollower size={cursorSize} hovering={isHovering} />
        <div className="pointer-events-none"></div>
        <div
          id="landing"
          className="grid grid-cols-1 md:grid-cols-5 content-center pointer-events-none relative lg:pt-32 xl:pt-44 pt-28 pb-28"
        >
          <div className="md:col-span-2 relative">
            <h1 className="text-xl hidden md:text-6xl xl:text-7xl md:block font-medium stagger">
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
                <path d="M37.5 0V78" stroke="#333" strokeWidth="8" />
                <path
                  d="M3 48.5L37.5 83L72 48.5"
                  stroke="#333"
                  strokeWidth="8"
                />
              </svg>
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-medium md:pb-10 stagger">
              Tyler is a design generalist with a focus on creating memorable
              visual experiences.
            </h1>
            <h1 className="text-1xl md:text-3xl xl:text-5xl font-medium pt-5 pb-16 lg:pb-20 md:pb-44 md:pb-24 stagger">
              Tyler excels primarily in 3D including lighting, texturing,
              simulations, and motion design. With an additional focus on 2D
              motion design, typography, and layout.
            </h1>

            <div className="grid grid-cols-5 gap-4 ">
              <div
                className="col-span-3 h-40 lg:h-64 xl:h-96 stagger"
                style={{
                  backgroundImage: portraits[0]
                    ? `url(${portraits[0].image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="col-span-2 h-40 lg:h-64 xl:h-96 stagger"
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
          <div id="ProjectImage" className="col-span-2 hidden lg:block">
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
          className="grid md:grid-cols-5 content-center pt-[10vh] pb-[10vh] lg:pt-[20vh] lg:pb-[20vh]"
        >
          <div className="col-span-2 pb-10 pt-5 lg:pt-0 lg:pb-0">
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
            <h1 className="text-2xl lg:text-5xl xl:text-7xl font-medium pb-10">
              Tyler is a design generalist with a focus on creating memorable
              visual experiences.
            </h1>
            <h1 className="text-1xl lg:text-4xl xl:text-5xl font-medium pt-2 pb-8 xl:pt-10 xl:pb-20">
              With extensive 3D/2D motion design experience, Tyler excels in 3D
              simulations, animation, lighting, and texturing, crafting visually
              captivating experiences.
            </h1>
            {/* <h1 className="text-1xl lg:text-4xl xl:text-5xl font-medium">
              Additionally, with a history in UI/UX design, Tyler is proficient
              in designing, prototyping, and developing user-friendly interfaces
              that enhance the immersive quality of 3D based XR projects.
            </h1> */}
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
          <Marquee direction="right" autoFill speed={250}>
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
          className="grid md:grid-cols-5 pt-[10vh] pb-[10vh] lg:pt-[20vh] lg:pb-[20vh]"
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
                  <h1 className="font-medium">
                    <a
                      href="https://www.figma.com/community/plugin/1366469161957463273/figmajson"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FigmaJSON
                    </a>
                  </h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">
                    <a
                      href="https://www.figma.com/community/plugin/1377288866548711521/removelinks"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RemoveLinks
                    </a>
                  </h1>
                </li>
                <li>
                  <h1 className="pt-3 font-medium">
                    <a href="mailto:tyler@tylerwest.co">Request a plugin</a>
                  </h1>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-4xl xl:text-7xl pt-10 lg:pt-0 font-medium">
                Design Assets
              </h1>
              <ul className="pt-1 pb-5 text-1xl lg:text-3xl opacity-50">
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
