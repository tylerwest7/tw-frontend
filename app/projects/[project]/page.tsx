import { getProject } from "@/sanity/sanity-utils";
import Image from "next/image";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;

  const project = await getProject(slug);

  console.log(project);

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24 text-white">
      <div className="grid grid-cols-4 pt-[10vh]">
        <h1>01/</h1>
        <h1></h1>
        <h1>{project.title}</h1>
      </div>
      <div className="grid grid-cols-2">
        {project.image && (
          <div className="col-span-1">
            <Image
              src={project.image}
              alt={project.altText}
              height={500}
              width={500}
            />
          </div>
        )}
      </div>
      {project.projectImages.map((project, index) => (
        <h1 key={project.key}>{project.asset._ref}</h1>
      ))}
    </div>
  );
}
