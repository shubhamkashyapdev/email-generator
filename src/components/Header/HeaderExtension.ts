import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import HeaderComponent from "./HeaderComponent";

export const HeaderExtension = Node.create({
  name: "header",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "div.header" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { class: "header", ...HTMLAttributes }, 0];
  },
  addAttributes() {
    return {
      textAlign: {
        default: 'left',
        parseHTML: element => element.style.textAlign,
        renderHTML: attributes => {
          if (!attributes.textAlign) {
            return {}
          }
          return { style: `text-align: ${attributes.textAlign}` }
        },
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(HeaderComponent);
  },
});