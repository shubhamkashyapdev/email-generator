import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ColumnComponent from "./ColumnComponent";

export interface ColumnOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    column: {
      setColumn: (options?: {
        image1?: string;
        image2?: string;
        settings?: {
          imageSize: {
            height: number,
            width: number,
          },
        }
      }) => ReturnType;
    };
  }
}

export const ColumnExtension = Node.create<ColumnOptions>({
  name: "column",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "column",
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      image1: {
        default: "https://via.placeholder.com/150",
      },
      image2: {
        default: "https://via.placeholder.com/150",
      },
      imageSize: {
        default: {
          height: 150,
          width: 150,
        },
      },
    };
  },

  addCommands() {
    return {
      setColumn:
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
    return ReactNodeViewRenderer(ColumnComponent);
  },
});

export default ColumnExtension;
