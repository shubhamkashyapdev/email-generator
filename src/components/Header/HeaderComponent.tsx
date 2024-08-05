import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import Image from "next/image";
import ImageSelectionPopover from "@/components/global/ImageSelectionPopover";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface LogoWrapperAlign {
  justify: "start" | "center" | "end";
  align: "start" | "center" | "end";
}

interface LogoWrapper {
  direction: "row" | "column";
  align: LogoWrapperAlign;
}

interface HeaderAttributes {
  backgroundImage: string;
  logo: string;
  companyName: string;
  logoSize: number;
  backgroundImageSize: number;
  logoWrapper: LogoWrapper;
}

interface HeaderExtensionComponentProps {
  node: {
    attrs: HeaderAttributes;
  };
  updateAttributes: (attrs: Partial<HeaderAttributes>) => void;
}

const HeaderComponent: React.FC<HeaderExtensionComponentProps> = ({
  node,
  updateAttributes,
}) => {
  const {
    backgroundImage,
    logo,
    companyName,
    logoSize,
    backgroundImageSize,
    logoWrapper,
  } = node.attrs;
  const [openPopover, setOpenPopover] = React.useState<
    "backgroundImage" | "logo" | null
  >(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleImageChange = (
    type: "backgroundImage" | "logo",
    newUrl: string
  ) => {
    updateAttributes({ [type]: newUrl });
    setOpenPopover(null);
    setImageUrl("");
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "backgroundImage" | "logo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      handleImageChange(type, objectUrl);
    }
  };

  const handleLogoSizeChange = (value: number[]) => {
    updateAttributes({ logoSize: value[0] });
  };

  const handleBackgroundImageSizeChange = (value: number[]) => {
    updateAttributes({ backgroundImageSize: value[0] });
  };

  const handleLogoWrapperDirectionChange = (value: string) => {
    updateAttributes({
      logoWrapper: { ...logoWrapper, direction: value as "row" | "column" },
    });
  };

  const handleLogoWrapperAlignmentChange = (
    alignType: keyof LogoWrapperAlign,
    value: string
  ) => {
    updateAttributes({
      logoWrapper: {
        ...logoWrapper,
        align: {
          ...logoWrapper.align,
          [alignType]: value as "start" | "center" | "end",
        },
      },
    });
  };

  return (
    <NodeViewWrapper>
      <div style={{ position: "relative" }}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
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
            <h2 className="text-lg font-semibold mb-4">Header Settings</h2>
            <div className="space-y-4">
              <div className="mb-5">
                <label
                  htmlFor="logoSize"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Logo Size
                </label>
                <Slider
                  id="logoSize"
                  value={[logoSize]}
                  onValueChange={handleLogoSizeChange}
                  min={10}
                  max={200}
                  step={1}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="backgroundImageSize"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Background Image Size
                </label>
                <Slider
                  id="backgroundImageSize"
                  value={[backgroundImageSize]}
                  onValueChange={handleBackgroundImageSizeChange}
                  min={10}
                  max={200}
                  step={1}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="logoWrapperDirection"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Logo Wrapper Direction
                </label>
                <Select
                  value={logoWrapper.direction}
                  onValueChange={handleLogoWrapperDirectionChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">Row</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Wrapper Alignment
                </label>
                <div className="mt-1 flex space-x-4">
                  <Select
                    value={logoWrapper.align.justify}
                    onValueChange={(value) =>
                      handleLogoWrapperAlignmentChange("justify", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Justify" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={logoWrapper.align.align}
                    onValueChange={(value) =>
                      handleLogoWrapperAlignmentChange("align", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Align" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </SheetContent>
          <SheetOverlay className="opacity-0" />

        </Sheet>

        <ImageSelectionPopover
          type="backgroundImage"
          backgroundImage={backgroundImage}
          handleFileUpload={handleFileUpload}
          handleImageChange={handleImageChange}
          imageUrl={imageUrl}
          logo={logo}
          openPopover={openPopover}
          setImageUrl={setImageUrl}
          setOpenPopover={setOpenPopover}
        >
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "contain",
              padding: "20px",
              height: `${backgroundImageSize}px`,
              display: "flex",
              flexDirection: logoWrapper.direction,
              alignItems: logoWrapper.align.align,
              justifyContent: logoWrapper.align.justify,
              gap: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <ImageSelectionPopover
              type="logo"
              backgroundImage={backgroundImage}
              handleFileUpload={handleFileUpload}
              handleImageChange={handleImageChange}
              imageUrl={imageUrl}
              logo={logo}
              openPopover={openPopover}
              setImageUrl={setImageUrl}
              setOpenPopover={setOpenPopover}
            >
              <Image
                src={logo}
                alt="Company Logo"
                objectFit="contain"
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopover("logo");
                }}
                height={logoSize}
                width={logoSize}
                className="rounded-full"
              />
            </ImageSelectionPopover>
            <NodeViewContent
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              }}
            />
          </div>
        </ImageSelectionPopover>
      </div>
    </NodeViewWrapper>
  );
};

export default HeaderComponent;
