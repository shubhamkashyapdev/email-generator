import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Input } from "../ui/input";

interface ButtonAttributes {
  text: string;
  visible: boolean;
  url: string;
}

interface ButtonExtensionComponentProps {
  node: {
    attrs: ButtonAttributes;
  };
  updateAttributes: (attrs: Partial<ButtonAttributes>) => void;
}

const ButtonComponent: React.FC<ButtonExtensionComponentProps> = ({
  node,
  updateAttributes,
}) => {
  const { text, visible, url } = node.attrs;

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ visible: e.target.checked });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ text: e.target.value });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ url: e.target.value });
  };

  return (
    <NodeViewWrapper>
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
                right: "10px",
                zIndex: 10,
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-lg font-semibold mb-4">Button Settings</h2>
            <div className="space-y-4">
              <div className="mb-5">
                <label
                  htmlFor="buttonText"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Button Text
                </label>
                <Input
                  id="buttonText"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="buttonVisibility"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Show Button
                </label>
                <input
                  type="checkbox"
                  id="buttonVisibility"
                  checked={visible}
                  onChange={handleVisibilityChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="buttonUrl"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Button URL
                </label>
                <Input
                  id="buttonUrl"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Enter URL"
                />
              </div>
            </div>
          </SheetContent>
          <SheetOverlay className="opacity-0" />
        </Sheet>

        {visible && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
              width: '100%',
            }}
          >
            <Button
              onClick={() => {
                if (url) {
                  window.open(url, "_blank");
                }
              }}
              style={{
                margin: 0,
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              {text}
            </Button>
          </div>
        )}

        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
};

export default ButtonComponent;
