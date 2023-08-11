"use client";
import { getProject, getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import scrollToTop from "@/components/useScrollToTop";

type Props = {
  params: {
    project: string;
    projectImages: [];
    desc: string;
    videolink: string;
    projectVideos: string;
  };
};

export default function Project({ params }: Props) {
  const [work, setWork] = useState<any>({});
  const [works, setWorks] = useState<any[]>([]);
  const [sound, setSound] = useState<boolean>(true); // Default value is true

  const [nextProjectSlug, setNextProjectSlug] = useState<string | null>(null);
  const [nextProjectTitle, setNextProjectTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      const slug = params.project;
      console.log("Loading started");
      setIsLoading(true); // Set loading to true
      const fetchedWork = await getProject(slug);
      setWork(fetchedWork);

      const fetchedWorks = await getProjects();
      setWorks(fetchedWorks);

      const currentSlug = slug;
      const nextProject = numberOfProjects(currentSlug, fetchedWorks);
      if (nextProject) {
        setNextProjectSlug(nextProject.slug);
        setNextProjectTitle(nextProject.title);
      }

      setIsLoading(false); // Set loading to false once data is fetched
      console.log("Loading finished");
    };

    fetchData();
  }, [params.project]);

  const numberOfProjects = (currentSlug: string, fetchedWorks: any[]) => {
    const currentIndex = fetchedWorks.findIndex(
      (soloWork) => soloWork.slug === currentSlug
    );

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % fetchedWorks.length;
      const nextProject = fetchedWorks[nextIndex];
      return nextProject;
    }

    return null;
  };

  const activateSound = () => {
    setSound((prevSound) => !prevSound); // Toggle the sound state
  };

  // Return loading state if isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24 text-white">
      <div className="grid grid-cols-4 pt-[10vh] pb-[10vh] gap-4">
        <h1 className="col-span-4 lg:col-span-1">01/</h1>
        <h1 className="col-span-4 lg:col-span-1">{work.title}</h1>
        <h1 className="col-span-4 lg:col-span-2">{work.desc}</h1>
      </div>
      <div className="grid grid-cols-1 pb-4">
        {work.video ? (
          <div className="col-span-1" onClick={() => activateSound()}>
            <video
              className="w-full"
              controls={false}
              autoPlay
              muted
              loop
              src={work.video}
            />
          </div>
        ) : work.videoLink ? (
          <div className="col-span-1" onClick={() => activateSound()}>
            <video
              className="w-full"
              controls={false}
              autoPlay
              muted={sound}
              loop
              src={work.videoLink}
            />
          </div>
        ) : (
          work.image && (
            <div className="col-span-1 max-h-[80vh] overflow-hidden flex justify-center items-center">
              <img
                className="w-full"
                src={work.image}
                alt={work.altText}
                height={500}
                width={500}
              />
            </div>
          )
        )}
      </div>
      <div id="videos">
        <div className="grid grid-cols-2">
          {work.projectVideos &&
            work.projectVideos.map((videoItem: any, index: any) => (
              <div key={index} className="col-span-1">
                {videoItem.videoFile && (
                  <video
                    className="w-full"
                    controls={false}
                    autoPlay
                    muted
                    loop
                    src={videoItem.videoFile}
                  />
                )}
                {videoItem.videoUrl && (
                  <video
                    className="w-full"
                    controls={false}
                    autoPlay
                    muted
                    loop
                    src={videoItem.videoUrl}
                  />
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {work.projectImages &&
          work.projectImages.map((project: any, index: any) => (
            <img
              key={index}
              className="w-full"
              src={project}
              alt={project.altText || "Default Alt Text"}
              height={250}
              width={250}
            />
          ))}
      </div>
      <div className="grid grid-cols-2 pt-[20vh] pb-[20vh] items-start">
        <h1 className="col-span-2 lg:col-span-1 text-xl lg:text-8xl pb-9">
          View next project
        </h1>
        {nextProjectSlug && (
          <Link
            className="col-span-2 lg:col-span-1 text-left lg:text-right text-lg lg:text-md"
            href={nextProjectSlug}
          >
            <h1>{nextProjectTitle}</h1>
          </Link>
        )}
      </div>
    </div>
  );
}
