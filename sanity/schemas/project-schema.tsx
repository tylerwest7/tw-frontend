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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: "Alternative text for the image (for accessibility)",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "desc",
      title: "Description",
      type: "string",
      description: "Project description",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "agencies",
      title: "Agencies",
      type: "string",
      description: "Project description",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      description: "Project description",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Type of project",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "imagePreview",
      title: "imagePreview",
      type: "image",
      options: {
        hotspot: true, // Enables image hotspot to focus on a specific area of the image
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables image hotspot to focus on a specific area of the image
      },
      //validation: (Rule: any) => Rule.required(),
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
    {
      //remove this if errors
      name: "projectImages",
      title: "projectImages",
      type: "array",
      of: [
        {
          type: "image",
        },
        {
          title: "URL",
          name: "urlObject",
          type: "object",
          fields: [
            {
              title: "URL",
              name: "urlField",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      name: "projectVideos",
      title: "Project Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Video File",
              name: "videoFile",
              type: "file",
              accept: "video/*",
            },
            {
              title: "Video URL",
              name: "videoUrl",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
};

export default project;
