import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ButtonComponent from "./ButtonComponent";

export interface ButtonOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    button: {
      setButton: (options?: {
        text?: string;
        visible?: boolean;
        url?: string;
        alignment?: "left" | "center" | "right"; // Add alignment options
      }) => ReturnType;
    };
  }
}

export const ButtonExtension = Node.create<ButtonOptions>({
  name: "button",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="button"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "button",
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      text: {
        default: "Click me",
      },
      visible: {
        default: true,
      },
      url: {
        default: "",
      },
      alignment: {
        default: "center", // Default alignment
      },
    };
  },

  addCommands() {
    return {
      setButton:
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
    return ReactNodeViewRenderer(ButtonComponent);
  },
});

export default ButtonExtension;
