import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SocialComponent from "./SocialComponent";

export interface SocialOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    social: {
      setSocial: (options?: {
        icons?: { platform: string; url: string }[];
        alignment?: "start" | "center" | "end";
      }) => ReturnType;
    };
  }
}

export const SocialExtension = Node.create<SocialOptions>({
  name: "social",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="social"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "social",
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      icons: {
        default: [
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "youtube", url: "https://youtube.com" },
        ],
      },
      alignment: {
        default: "center",
      },
    };
  },

  addCommands() {
    return {
      setSocial:
        (options = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...this.options,
              ...options,
            },
            content: [{ type: "text", text: " " }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SocialComponent);
  },
});

export default SocialExtension;
