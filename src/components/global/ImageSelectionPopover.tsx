import React from "react";
import { NodeViewContent } from "@tiptap/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  type: "backgroundImage" | "logo";
  openPopover: string | null;
  setOpenPopover: (type: "backgroundImage" | "logo" | null) => void;
  logo: string;
  backgroundImage: string | null;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "backgroundImage" | "logo"
  ) => void;
  handleImageChange: (type: "backgroundImage" | "logo", newUrl: string) => void;
  children: React.ReactNode;
};

const ImageSelectionPopover = ({
  type,
  openPopover,
  setOpenPopover,
  logo,
  backgroundImage,
  imageUrl,
  setImageUrl,
  handleFileUpload,
  handleImageChange,
  children,
}: Props) => {
  return (
    <Popover
      open={openPopover === type}
      onOpenChange={(open) => setOpenPopover(open ? type : null)}
    >
      <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <Tabs defaultValue="local">
          <TabsList>
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <Input
              type="file"
              onChange={(e) => handleFileUpload(e, type)}
              accept="image/*"
            />
          </TabsContent>
          <TabsContent value="link">
            <Input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button className="mt-2" onClick={() => handleImageChange(type, imageUrl)}>
              Set Image
            </Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default ImageSelectionPopover;
