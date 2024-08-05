import React from "react";
import { useEditor } from "novel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fontSizes = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
  "48px",
  "60px",
  "72px",
];

export const FontSizeSelector = () => {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  const handleFontSizeChange = (size: string) => {
    if (size === "Font Size") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(size).run();
    }
  };

  const currentFontSize =
    editor.getAttributes("textStyle").fontSize || "Font Size";

  return (
    <Select onValueChange={handleFontSizeChange} value={currentFontSize}>
      <SelectTrigger className="w-[100px] h-8 text-sm">
        <SelectValue placeholder="Font Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Font Size">{currentFontSize}</SelectItem>
        {fontSizes.map((size) => (
          <SelectItem className="" key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
