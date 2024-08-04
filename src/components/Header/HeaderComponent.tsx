import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import Image from "next/image";
import ImageSelectionPopover from "@/components/global/ImageSelectionPopover";

interface HeaderExtensionComponentProps {
  node: {
    attrs: {
      backgroundImage: string;
      logo: string;
      companyName: string;
    };
  };
  updateAttributes: (
    attrs: Partial<HeaderExtensionComponentProps["node"]["attrs"]>
  ) => void;
}

const HeaderExtensionComponent: React.FC<HeaderExtensionComponentProps> = ({
  node,
  updateAttributes,
}) => {
  const { backgroundImage, logo, companyName } = node.attrs;
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

  const handleImageClick = (type: "backgroundImage" | "logo") => {
    const newUrl = prompt(`Enter new ${type} URL:`);
    if (newUrl) {
      updateAttributes({ [type]: newUrl });
    }
  };

  return (
    <NodeViewWrapper>
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
            backgroundPosition: "center",
            padding: "20px",
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopover("logo");
              }}
              height={50}
              width={50}
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
    </NodeViewWrapper>
  );
};

export default HeaderExtensionComponent;
