import React, { useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Settings, Instagram, Facebook, Youtube } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SocialIcon {
  platform: string;
  url: string;
}

interface SocialAttributes {
  icons: SocialIcon[];
  alignment: "start" | "center" | "end";
}

interface SocialComponentProps {
  node: {
    attrs: SocialAttributes;
  };
  updateAttributes: (attrs: Partial<SocialAttributes>) => void;
}

const SocialComponent: React.FC<SocialComponentProps> = ({ node, updateAttributes }) => {
  const [localIcons, setLocalIcons] = useState<SocialIcon[]>(node.attrs.icons);
  const [alignment, setAlignment] = useState<"start" | "center" | "end">(node.attrs.alignment);

  useEffect(() => {
    setLocalIcons(node.attrs.icons);
    setAlignment(node.attrs.alignment);
  }, [node.attrs]);

  const handleIconChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newIcons = [...localIcons];
    newIcons[index] = { ...newIcons[index], [field]: value };
    setLocalIcons(newIcons);
  };

  const handleAlignmentChange = (value: "start" | "center" | "end") => {
    setAlignment(value);
  };

  const handleIconClick = (platform: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!url) return;

    let fullUrl = url;

    switch (platform.toLowerCase()) {
      case 'instagram':
        fullUrl = url.startsWith('http') ? url : `https://www.instagram.com/${url.replace(/^[@/]/, '')}`;
        break;
      case 'facebook':
        fullUrl = url.startsWith('http') ? url : `https://www.facebook.com/${url.replace(/^\//, '')}`;
        break;
      case 'youtube':
        fullUrl = url.startsWith('http') ? url : `https://www.youtube.com/${url.replace(/^\//, '')}`;
        break;
      default:
        fullUrl = url.startsWith('http') ? url : `https://${url}`;
    }

    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const renderIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-6 w-6" />;
      case "facebook":
        return <Facebook className="h-6 w-6" />;
      case "youtube":
        return <Youtube className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <NodeViewWrapper>
      <div style={{ position: "relative", width: '100%' }}>
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
            <h2 className="text-lg font-semibold mb-4">Social Icons Settings</h2>
            <div className="space-y-4">
              <div className="mb-5">
                <label htmlFor="alignment" className="block text-sm font-medium text-gray-700 mb-2">
                  Alignment
                </label>
                <Select onValueChange={handleAlignmentChange} value={alignment}>
                  <SelectTrigger aria-label="Alignment">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {localIcons.map((icon, index) => (
                <div key={index} className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Platform {index + 1}
                  </label>
                  <Input
                    value={icon.platform}
                    onChange={(e) => handleIconChange(index, 'platform', e.target.value)}
                    placeholder="e.g., instagram, facebook, youtube"
                    className="mb-2"
                  />
                  <Input
                    value={icon.url}
                    onChange={(e) => handleIconChange(index, 'url', e.target.value)}
                    placeholder="Enter URL or username"
                  />
                </div>
              ))}
            </div>
          </SheetContent>
          <SheetOverlay className="opacity-0" />
        </Sheet>

        <div
          style={{
            display: "flex",
            justifyContent: alignment,
            alignItems: "center",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            width: '100%',
          }}
        >
          {localIcons.map((icon, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={(e) => handleIconClick(icon.platform, icon.url, e)}
              style={{ margin: "0 10px" }}
            >
              {renderIcon(icon.platform)}
            </Button>
          ))}
        </div>
      </div>
      <NodeViewContent />
    </NodeViewWrapper>
  );
};

export default SocialComponent;
