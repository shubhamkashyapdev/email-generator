import { JSONContent } from "novel";

export const initialEmailTemplate: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Welcome to Our Newsletter" }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "Dear Subscriber," }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Thank you for joining our mailing list. We're excited to share our latest updates with you.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "Best regards," }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "The Team" }],
    },
  ],
};
