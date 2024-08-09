import {
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  AIHighlight,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";
import { cx } from "class-variance-authority";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { FontFamily } from '@tiptap/extension-font-family';
import { Extension } from "@tiptap/core";
import { FontSize } from "tiptap-extension-font-size";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import AutoJoiner from "tiptap-extension-auto-joiner"; // optional
import HeaderExtension from "../Header/HeaderExtension";
import ColumnExtension from "../Column/ColumnExtension";
import ButtonExtension from "../Button/ButtonExtension";
import SocialExtension from "../Social/SocialExtension";


const aiHighlight = AIHighlight;
const placeholder = Placeholder;


const RemoveImageSpacing = Extension.create({
  name: "removeImageSpacing",

  addGlobalAttributes() {
    return [
      {
        types: ["image"],
        attributes: {
          class: {
            default: "novel-image-no-spacing",
            rendered: true,
          },
        },
      },
    ];
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
    ),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx(" border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const textAlign = TextAlign.configure({
  types: ["heading", "paragraph", "header"],
  alignments: ["left", "center", "right", "justify"],
  defaultAlignment: "left",
});

const fontSize = FontSize.configure({
  types: ["textStyle"],
});

const fontFamily = FontFamily.configure({
  types: ["textStyle"],
});

export const defaultExtensions = [
  GlobalDragHandle.configure({
    dragHandleWidth: 20, // default
    scrollTreshold: 100, // default
  }),
  AutoJoiner.configure({
    elementsToJoin: ["bulletList", "orderedList"], // default
  }),
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  textAlign,
  TextStyle,
  Color,
  HeaderExtension,
  ColumnExtension,
  RemoveImageSpacing,
  fontSize,
  fontFamily,
  ButtonExtension,
  SocialExtension,
  
];
