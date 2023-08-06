import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;
  createdAt: Date;
  title: string;
  slug: string;
  image: string;
  altText: string;
  tag: string;
  url: string;
  content: PortableTextBlock[];
};
