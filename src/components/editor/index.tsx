"use client";
import { forwardRef, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { TextButtons } from "./selectors/text-buttons";
import { uploadFn } from "./image-upload";
import { slashCommand, suggestionItems } from "./slash-command";
import { Separator } from "@/components/ui/separator";
import { FontSizeSelector } from "./selectors/font-size-selector";
import { Monitor, Smartphone } from "lucide-react";

const extensions = [...defaultExtensions, slashCommand];

interface WidthToggleProps {
  isDesktop: boolean;
  setIsDesktop: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: string) => void;
}

const WidthToggle: React.FC<WidthToggleProps> = ({
  isDesktop,
  setIsDesktop,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={() => setIsDesktop(true)}
        className={`p-2 rounded-md ${
          isDesktop ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <Monitor size={24} />
      </button>
      <button
        onClick={() => setIsDesktop(false)}
        className={`p-2 rounded-md ${
          !isDesktop ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <Smartphone size={24} />
      </button>
    </div>
  );
};

const Editor = forwardRef<HTMLDivElement, EditorProp>(
  ({ initialValue, onChange }, ref) => {
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const editorWidth = isDesktop ? "w-[800px]" : "w-[375px]";

    return (
      <EditorRoot>
        <div className="flex flex-col items-center justify-center">
          <WidthToggle isDesktop={isDesktop} setIsDesktop={setIsDesktop} />
          <EditorContent
            ref={ref}
            className={`min-h-[400px] max-h-[1200px] rounded-lg border bg-pink-50 ${editorWidth} shadow-md novel-editor-content`}
            // {...(initialValue && { initialContent: initialValue })}
            extensions={extensions}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class: `prose prose-sm dark:prose-invert prose-headings:font-semibold focus:outline-none max-w-full prose-p:my-0 prose-headings:my-0`,
              },
            }}
            onUpdate={({ editor }) => {
              onChange(editor.getHTML());
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 max-h-[400px] overflow-y-auto rounded-md border border-blue-200 bg-white shadow-md transition-all">
              <EditorCommandEmpty className="px-3 py-2 text-gray-500">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className={`flex items-center space-x-3 px-3 py-2 text-left text-sm hover:bg-gray-200 rounded-md`}
                    key={item.title}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-300 bg-blue-200">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">{item.title}</p>
                      <p className="text-xs text-blue-600">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <EditorBubble
              tippyOptions={{
                placement: "top",
              }}
              className="flex w-[36vw] bg-blue-100 border border-blue-200 shadow-md rounded-md p-2"
            >
              <Separator orientation="vertical" className="border-blue-300" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" className="border-blue-300" />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" className="border-blue-300" />
              <TextButtons />
              <Separator orientation="vertical" className="border-blue-300" />
              <Separator orientation="vertical" className="border-blue-300" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
              <FontSizeSelector />
            </EditorBubble>
          </EditorContent>
        </div>
      </EditorRoot>
    );
  }
);

Editor.displayName = "NovelEditor";
export default Editor;
