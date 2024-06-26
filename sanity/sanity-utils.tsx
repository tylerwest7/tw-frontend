import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Project } from "@/types/Project";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"] | order(order asc) {
        _id,
        _createdAt,
        title,
        altText,
        tag,
        "slug": slug.current,
        "image": image.asset->url,
        "imagePreview": imagePreview.asset->url,
        url,
        content,
        order
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
      role,
      agencies,
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

export async function getLabs() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "labs"]{
        _id,
        _createdAt,
        name,
        alt,
        bio,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`
  );
}
