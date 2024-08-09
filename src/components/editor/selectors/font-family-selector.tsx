import React from 'react';
import { useEditor } from 'novel';
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

const FONT_FAMILIES = [
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Brush Script MT',
  'Caveat',
  'Varela Round',
  'Share Tech Mono',
  'Cormorant Garamond',
  'Roboto Slab',
  'Lobster',
  'Naturalist',
  'Great Vibes',
  'Roboto Condensed',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Source Sans Pro',
  'Poppins',
  'Merriweather',
  'Playfair Display',
  'Raleway',
  'Nunito',
  'Ubuntu',
  'Oswald',
  'Dancing Script',
  'Rubik',
  'Fira Sans',
  'Lora',
  'Karla',
  'Quicksand',
  'Inconsolata',
  'PT Sans'
];


export const FontFamilySelector = () => {
  const { editor } = useEditor();

  if (!editor) return null;

  const activeFontFamily = editor.getAttributes('textStyle').fontFamily || 'Arial';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span style={{ fontFamily: activeFontFamily }}>{activeFontFamily}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl">
        {FONT_FAMILIES.map((fontFamily) => (
          <div
            key={fontFamily}
            onClick={() => {
              editor.chain().focus().setFontFamily(fontFamily).run();
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <span style={{ fontFamily }}>{fontFamily}</span>
            </div>
            {activeFontFamily === fontFamily && (
              <Check className="h-4 w-4" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
