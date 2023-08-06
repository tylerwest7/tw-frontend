// schemas/portrait.js
const portrait = {
  name: "portrait",
  type: "document",
  title: "Portrait",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "alt",
      type: "string",
      title: "Alt",
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
  ],
};

export default portrait;
