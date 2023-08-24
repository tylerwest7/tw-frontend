"use client";
import PageWrapper from "@/components/pageWrapper";
import { getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

// Create project object
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

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  //Lenis
  const lenis = useLenis(({}) => {
    // called every scroll
  });

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24">
      <ReactLenis root options={{ orientation: "horizontal" }}>
        <PageWrapper>
          <div className="tracking-[-0.025rem] lg:tracking-[-0.05rem] pt-[15vh] flex items-center min-h-[100vh] max-h-[100vh]">
            <div
              id="gallery"
              className="flex flex-wrap lg:flex-nowrap gap-9 pt-[100vh] lg:pt-[0vh]"
            >
              {projects.map((project, index) => (
                <Link
                  style={{ overflow: "hidden" }}
                  key={index}
                  href={`/projects/${project.slug}`}
                >
                  <div
                    className="w-[35vw] h-[200px] lg:w-[500px] lg:h-[500px]"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      backgroundImage: `url(${
                        (project as Project).imagePreview
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      transition:
                        "transform 0.6s cubic-bezier(0.37, 0, 0.63, 1)",
                      transform: `scale(${hoveredIndex === index ? 1.15 : 1})`,
                    }}
                  >
                    {/* <h1>{project.title}</h1> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </PageWrapper>
      </ReactLenis>
    </div>
  );
}
