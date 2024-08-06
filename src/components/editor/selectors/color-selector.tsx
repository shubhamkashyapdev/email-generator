import React from 'react';
import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--novel-black)",
  },
  {
    name: "White",
    color: "white",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const BACKGROUND_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "transparent",
  },
 
  {
    name: "Purple",
    color: "#F3E8FF",
  },
  {
    name: "Red",
    color: "#FECACA",
  },
  {
    name: "Yellow",
    color: "#FEF9C3",
  },
  {
    name: "Blue",
    color: "#DBEAFE",
  },
  {
    name: "Green",
    color: "#DCFCE7",
  },
  {
    name: "Orange",
    color: "#FFEDD5",
  },
  {
    name: "Pink",
    color: "#FCE7F3",
  },
  {
    name: "Gray",
    color: "#F3F4F6",
  },
];

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeBackgroundItem = BACKGROUND_COLORS.find(({ color }) => {
    const headerNode = editor.state.doc.firstChild;
    return headerNode && headerNode.type.name === 'header' && headerNode.attrs.backgroundColor === color;
  });

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeBackgroundItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Text Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                if (name !== "Default") {
                  editor.chain().focus().setColor(color).run()
                } else {
                  editor.chain().focus().unsetColor().run()
                }
                onOpenChange(false)
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm bg-gray hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Header Background
          </div>
          {BACKGROUND_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
            key={index}
            onSelect={() => {
              const headerNode = editor.state.doc.firstChild;
              if (headerNode && headerNode.type.name === 'header') {
                editor.chain().focus().updateAttributes('header', {
                  backgroundColor: name !== "Default" ? color : null
                }).run();
              }
              onOpenChange(false);
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {activeBackgroundItem?.color === color && (
                <Check className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};