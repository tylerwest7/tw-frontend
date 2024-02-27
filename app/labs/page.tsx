"use client";

import { getLabs } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";

//Create project object
interface Project {
  altText: string;
  bio?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  projectImages?: string;
  // Other properties...
}

export default function Labs() {
  //Loading
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading state as true
  //Use state
  const [projects, setProjects] = useState<Project[]>([]);

  //Set data
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const fetchedProjects = await getLabs();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data (whether successful or not)
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div
      id="page"
      className="ml-9 mr-9 lg:ml-24 lg:mr-24  tracking-[-0.025rem] lg:tracking-[-0.05rem]"
    >
      <div
        id="labs-intro"
        className="grid grid-cols-1 lg:grid-cols-2 pt-[20vh] pb-[20vh]"
      >
        <h1>
          ⌝ FutureResearch is an expressive research-driven creative practice &
          think tank within FutureDeluxe ⌞ With a focus on experimentation it
          serves as a framework to drive exploration at the edges of emergent
          visual and technical cultures.
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {projects.map((project, index) => (
          <div
            key={index}
            className="h-[50vh]"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {project.bio}
          </div>
        ))}
      </div>
    </div>
  );
}
