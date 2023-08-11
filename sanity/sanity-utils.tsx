import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Project } from "@/types/Project";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
        _id,
        _createdAt,
        title,
        altText,
        tag,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      altText,
      desc,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      "projectImages": projectImages[].asset->url,
      videoLink,
      "video": video.asset->url,
      "projectVideos": projectVideos[]{
        "videoFile": videoFile.asset->url,
        "videoUrl": videoUrl
      }
    }`,
    { slug }
  );
}

export async function getClients() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "client"]{
        _id,
        _createdAt,
        name,
        alt,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`
  );
}

export async function getPortraits() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "portrait"]{
        _id,
        _createdAt,
        name,
        alt,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`
  );
}
