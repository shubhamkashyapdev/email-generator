import { JSONContent } from "novel";

export const initialEmailTemplate: JSONContent = {
  "type": "doc",
  "content": [
    {
      "type": "image",
      "attrs": { "src": "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Logo Here" }
    },
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "How are we doing?" }]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Dear Community,\nYour yoga experience matters greatly to us, and we're eager to hear your thoughts! Help us enhance your time on the mat by taking a brief moment to complete our Customer Satisfaction Survey. Your feedback is a vital part of shaping the future of our studio, and as a thank you, we're offering an exclusive 10% discount on your next class package. Your insights propel us forward, and we're excited to evolve together.\nNamaste, The Borcelle Team"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Go to link",
          "marks": [{ "type": "link", "attrs": { "href": "https://reallygreatsite.com" } }]
        }
      ]
    }
  ]
};
