// schemas/portrait.js
const labs = {
  name: "labs",
  type: "document",
  title: "Labs",
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
      name: "bio",
      type: "string",
      title: "Bio",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables image hotspot to focus on a specific area of the image
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default labs;
