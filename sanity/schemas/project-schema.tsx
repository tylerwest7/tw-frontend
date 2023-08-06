// schema.js

const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: "Alternative text for the image (for accessibility)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "Description",
      type: "string",
      description: "Project description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "agencies",
      title: "Agencies",
      type: "string",
      description: "Project description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      description: "Project description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Type of project",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables image hotspot to focus on a specific area of the image
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "videoLink",
      title: "Video link",
      type: "string",
      description: "Ex. Youtube, Vimeo, Google Drive",
    },
  ],
};

export default project;
