import { getProject } from "@/sanity/sanity-utils";
import Image from "next/image";

type Props = {
  params: { project: string; projectImages: [] };
};

export default async function Project({ params }: Props) {
  const slug = params.project;

  const work = await getProject(slug);

  console.log(work);

  return (
    <div className="ml-9 mr-9 lg:ml-24 lg:mr-24 text-white">
      <div className="grid grid-cols-4 pt-[10vh]">
        <h1>01/</h1>
        <h1></h1>
        <h1>{work.title}</h1>
      </div>
      <div className="grid grid-cols-2">
        {work.image && (
          <div className="col-span-1">
            <Image
              src={work.image}
              alt={work.altText}
              height={500}
              width={500}
            />
          </div>
        )}
      </div>
      {work.projectImages.map((project: any, index: any) => (
        <h1 key={project.key}>{project.asset._ref}</h1>
      ))}
    </div>
  );
}
