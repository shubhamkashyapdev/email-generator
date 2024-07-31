"use client";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialEmailTemplate } from "@/data/novel";
import React from "react";

const HomePage = () => {
  const [subject, setSubject] = React.useState("");
  const [previewText, setPreviewText] = React.useState("");
  const editorRef = React.useRef<HTMLDivElement>(null);

  const downloadHTML = () => {
    if (editorRef.current) {
      // @ts-ignore
      const html = editorRef.current.getHTML();
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "email-template.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container mx-auto my-20">
      <div className="flex gap-4 my-4">
        <div className="flex-1">
          <Label>Email Subject</Label>
          <Input
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Preview Text</Label>
          <Input
            placeholder="Preview Text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
          />
        </div>
        <Button>Generate</Button>
        <Button onClick={downloadHTML}>Get HTML</Button>
      </div>
      <Editor
        onChange={(text) => console.log(text)}
        initialValue={initialEmailTemplate}
        ref={editorRef}
      />
    </div>
  );
};

export default HomePage;
