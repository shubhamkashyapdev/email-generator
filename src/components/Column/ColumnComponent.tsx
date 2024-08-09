import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import ImageSelectionPopover from "@/components/global/ImageSelectionPopover";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ImageSize {
  height: number;
  width: number;
}

interface ColumnAttributes {
  image1: string;
  image2: string;
  imageSize: ImageSize;
}

interface ColumnExtensionComponentProps {
  node: {
    attrs: ColumnAttributes;
  };
  updateAttributes: (attrs: Partial<ColumnAttributes>) => void;
}

const ColumnComponent: React.FC<ColumnExtensionComponentProps> = ({
  node,
  updateAttributes,
}) => {
  const defaultImageSize: ImageSize = {
    width: 500,
    height: 200,
  };
  const { image1, image2, imageSize = defaultImageSize } = node.attrs;

  const [openPopover, setOpenPopover] = React.useState<"image1" | "image2" | "logo" | "backgroundImage" | null>(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleImageChange = (
    type: "image1" | "image2" | "logo" | "backgroundImage",
    newUrl: string
  ) => {
    updateAttributes({ [type]: newUrl });
    setOpenPopover(null);
    setImageUrl("");
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image1" | "image2" | "logo" | "backgroundImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      handleImageChange(type, objectUrl);
    }
  };

  const handleImageSizeChange = (value: number[]) => {
    updateAttributes({
      imageSize: { ...imageSize, width: value[0], height: 200 },
    });
  };

  return (
    <NodeViewWrapper contentEditable={false}>
      <div
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="settings-icon"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-lg font-semibold mb-4">Column Settings</h2>
            <div className="space-y-4">
              <div className="mb-5">
                <label
                  htmlFor="imageSize"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Image Size
                </label>
                <Slider
                  id="imageSize"
                  value={[imageSize.width]}
                  onValueChange={handleImageSizeChange}
                  min={50}
                  max={500}
                  step={1}
                />
              </div>
            </div>
          </SheetContent>
          <SheetOverlay className="opacity-0" />
        </Sheet>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: 0,
            padding: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: imageSize.width,
              height: 200,
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
          >
            {/* @ts-ignore  */}
            <ImageSelectionPopover
              type="image1"
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleFileUpload={handleFileUpload}
              handleImageChange={handleImageChange}
            >
              <Image
                src={image1}
                alt="Image 1"
                width={imageSize.width}
                height={200}
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                  minWidth: "150px",
                  height: "200px",
                  display: "block",
                  margin: 0,
                  boxSizing: "border-box",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopover("image1");
                }}
              />
            </ImageSelectionPopover>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: imageSize.width,
              height: 200,
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
          >
            {/* @ts-ignore  */}
            <ImageSelectionPopover
              type="image2"
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleFileUpload={handleFileUpload}
              handleImageChange={handleImageChange}
            >
              <Image
                src={image2}
                alt="Image 2"
                width={imageSize.width}
                height={200}
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                  minWidth: "150px",
                  height: "200px",
                  display: "block",
                  margin: 0,
                  boxSizing: "border-box",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopover("image2");
                }}
              />
            </ImageSelectionPopover>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ColumnComponent;
