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
    <div className="ml-24 mr-24 text-white">
      <div className="grid grid-cols-4 pt-[10vh]">
        <h1>01/</h1>
        <h1></h1>
        <h1>{project.title}</h1>
      </div>
      {project.image && (
        <Image
          src={project.image}
          alt={project.altText}
          height={500}
          width={500}
        />
      )}
      <h1 className="text-white">This is the {project.slug}</h1>
    </div>
  );
}
