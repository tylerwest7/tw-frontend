"use client";

import { getProjects } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";

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

export default function About() {
  const [projects, setProjects] = useState<Project[]>([]);
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

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {projects.map((project, index) => (
        <div key={index}>{project.title}</div>
      ))}
    </div>
  );
}
