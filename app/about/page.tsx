"use client";

import { getPortraits, getProjects } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/pageWrapper";

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
  const [portraits, setPortraits] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading state as true

  //Set data
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const fetchedPortraits = await getPortraits();
        setPortraits(fetchedPortraits);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data (whether successful or not)
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log(portraits);
  }, [portraits]);

  return (
    <PageWrapper>
      <div className="ml-9 mr-9 lg:ml-24 lg:mr-24  tracking-[-0.025rem] lg:tracking-[-0.05rem] pt-[10vh] pb-[10vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {portraits.map((portrait: { image: string }, index) => (
            <div key={index} className="mt-9">
              <div
                className="h-[45vh] lg:h-[80vh] w-full lg:w-[75%]"
                style={{
                  backgroundImage: `url(${portrait?.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))}
          <div className="">
            <h1 className="text-4xl lg:text-[4rem] pt-9 pb-9 font-medium">
              About
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-1">
              <h1 className="p-1">
                Introducing Tyler, a proficient 3D designer with roots in
                Michigan. Starting as a motion design intern at Hornet, he
                swiftly honed his craft. His expertise lies in the realm of 3D
                simulations, with Houdini as his go to tool.
              </h1>
              <h1 className="p-1">
                During his off hours, he enjoys the tranquility of Lake Michigan
                and experiencing live music. Currently, he works at Carnevale,
                seamlessly blending the worlds of 3D design and UI design,
                showcasing his commitment to pushing creative boundaries.
              </h1>
              <h1 className="pt-3">- Chat GPT</h1>
            </div>
            <h1 className="font-medium pt-9">
              TLDR - Cool guy you wanna work with
            </h1>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
