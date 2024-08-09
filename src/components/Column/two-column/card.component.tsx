import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const TwoColCardComponent: React.FC<any> = ({ node, editor }) => {
  return (
    <NodeViewWrapper className="two-col-card">
      <div
        className="two-col-card-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="column left" style={{ width: "48%" }}>
          <NodeViewContent
            key="column-left"
            node={node}
            content={node.content[0]}
          />
        </div>
        <div className="column right" style={{ width: "48%" }}>
          <NodeViewContent
            key="column-right"
            node={node}
            content={node.content[1]}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default TwoColCardComponent;
