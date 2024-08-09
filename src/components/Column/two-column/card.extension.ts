import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TwoColCardComponent from "./card.component";

export interface TwoColCardOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    twoColCard: {
      setTwoColCard: () => ReturnType;
    };
  }
}

export const TwoColCard = Node.create<TwoColCardOptions>({
  name: "twoColCard",

  group: "block",

  content: "columnLeft columnRight",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="two-col-card"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "two-col-card" }),
      0,
    ];
  },

  addCommands() {
    return {
      setTwoColCard:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: "columnLeft",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Column 1 Head" }],
                  },
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Column 1 Subhead" }],
                  },
                  { type: "button", attrs: { label: "Button 1" } },
                ],
              },
              {
                type: "columnRight",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Column 2 Head" }],
                  },
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Column 2 Subhead" }],
                  },
                  { type: "button", attrs: { label: "Button 2" } },
                ],
              },
            ],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwoColCardComponent);
  },
});

export const ColumnLeft = Node.create({
  name: "columnLeft",
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[data-type="column-left"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "column-left" }),
      0,
    ];
  },
});

export const ColumnRight = Node.create({
  name: "columnRight",
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[data-type="column-right"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "column-right" }),
      0,
    ];
  },
});
