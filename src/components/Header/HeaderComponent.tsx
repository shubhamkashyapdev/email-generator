import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const HeaderComponent = ({ node }: any) => {
  const alignment = node.attrs.textAlign || "left";

  return (
    <NodeViewWrapper className="header">
      <div
        className={`header-content bg-blue-50 h-20 w-full flex items-center`}
        style={{ textAlign: alignment }}
      >
        <NodeViewContent className={`content w-full p-4`} />
      </div>
    </NodeViewWrapper>
  );
};

export default HeaderComponent;
