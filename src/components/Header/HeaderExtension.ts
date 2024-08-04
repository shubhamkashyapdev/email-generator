import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import HeaderExtensionComponent from "./HeaderComponent";

export interface HeaderOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    header: {
      setHeader: (options?: {
        backgroundImage?: string;
        logo?: string;
        companyName?: string;
      }) => ReturnType;
    };
  }
}

export const HeaderExtension = Node.create<HeaderOptions>({
  name: "header",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="header"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "header",
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      backgroundImage: {
        default: "https://via.placeholder.com/1200x300",
      },
      logo: {
        default: "https://via.placeholder.com/100",
      },
      companyName: {
        default: "Your Company Name",
      },
    };
  },

  addCommands() {
    return {
      setHeader:
        (options = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...this.options,
              ...options,
            },
            content: [{ type: "text", text: "Your Company Name" }],
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "/header": () => this.editor.commands.setHeader(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(HeaderExtensionComponent);
  },
});

export default HeaderExtension;
