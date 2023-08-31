"use client";

import Arrow from "@/components/arrow";
import PageWrapper from "@/components/pageWrapper";
import { getProject, getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";

type Props = {
  params: {
    project: string;
    projectImages: [];
    desc: string;
    role: string;
    videolink: string;
    projectVideos: string;
    agencies: string;
  };
};

export default function Project({ params }: Props) {
  const [work, setWork] = useState<any>({});
  const [works, setWorks] = useState<any[]>([]);
  const [sound, setSound] = useState<boolean>(true);
  const [nextProjectSlug, setNextProjectSlug] = useState<string | null>(null);
  const [nextProjectTitle, setNextProjectTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const slug = params.project;
      setIsLoading(true);
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

      setIsLoading(false);
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

  return (
    <PageWrapper>
      <div className="ml-9 mr-9 lg:ml-24 lg:mr-24 text-black min-h-[100vh]">
        <div className="grid grid-cols-4 pt-[20vh] pb-[10vh] gap-4">
          <h1 className="col-span-4 lg:col-span-1">01/</h1>
          <h1 className="col-span-4 lg:col-span-1">
            {work.agencies && work.agencies}
          </h1>
          <div className="col-span-4 lg:col-span-2">
            <h1 className="pb-9">{work.title && work.title}</h1>
            <h1 className="pb-9">{work.desc && work.desc}</h1>
            <h1 className="text-sm opacity-50">{work.role && work.role}</h1>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-red-500">
              Were loading the content
            </div>
          }
        >
          <div className="grid grid-cols-1 pb-4">
            {work.video ? (
              <div className="col-span-1">
                {isLoading ? (
                  <h1>Loading video...</h1>
                ) : (
                  <video
                    className="w-full"
                    controls={true}
                    autoPlay
                    muted
                    loop
                    src={work.video}
                  />
                )}
              </div>
            ) : work.videoLink ? (
              <div className="col-span-1">
                {isLoading ? (
                  <h1>Loading video...</h1>
                ) : (
                  <video
                    className="w-full"
                    controls={true}
                    autoPlay
                    muted={sound}
                    loop
                    src={work.videoLink}
                  />
                )}
              </div>
            ) : (
              work.image && (
                <div className="col-span-1 max-h-[80vh] overflow-hidden flex justify-center items-center">
                  {isLoading ? (
                    <h1>Loading video...</h1>
                  ) : (
                    <img
                      className="w-full"
                      src={work.image}
                      alt={work.altText}
                      height={500}
                      width={500}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </Suspense>
        <div id="videos">
          <div className="grid grid-cols-2 gap-4">
            {work.projectVideos &&
              work.projectVideos.map((videoItem: any, index: any) => (
                <div key={index} className="col-span-1">
                  {videoItem.videoFile && (
                    <div>
                      {isLoading ? (
                        <h1>Loading video...</h1>
                      ) : (
                        <video
                          className="w-full"
                          controls={false}
                          autoPlay
                          muted
                          loop
                          src={videoItem.videoFile}
                        />
                      )}
                    </div>
                  )}
                  {videoItem.videoUrl && (
                    <div>
                      {isLoading ? (
                        <h1>Loading video...</h1>
                      ) : (
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
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {work.projectImages &&
            work.projectImages.map((project: any, index: any) => (
              <div key={index} className="col-span-1">
                {isLoading ? (
                  <div>Loading image...</div>
                ) : (
                  <img
                    className="w-full"
                    src={project}
                    alt={project.altText || "Default Alt Text"}
                    height={250}
                    width={250}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 pt-[20vh] pb-[10vh] pt-[10vh] lg:pb-[20vh] items-start">
          <h1 className="col-span-2 lg:col-span-1 text-xl lg:text-8xl pb-2 lg:pb-0">
            View next project
          </h1>
          <div className="col-span-2 lg:col-span-1 h-full">
            {nextProjectSlug && (
              <Link
                className="flex flex-wrap justify-end w-full h-full"
                href={nextProjectSlug}
              >
                <h1 className="text-left text-xl lg:text-right lg:text-md w-full pb-9 lg:pb-0">
                  {nextProjectTitle}
                </h1>

                <div className="mt-auto mr-auto lg:ml-auto lg:mr-0 w-[10px]">
                  <Arrow />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
