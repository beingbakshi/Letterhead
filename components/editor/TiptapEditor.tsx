"use client";

import { Editor, EditorContent } from "@tiptap/react";

export function TiptapEditor({ editor }: { editor: Editor | null }) {
  return (
    <div className="bg-white" id="editor-surface">
      <EditorContent editor={editor} />
    </div>
  );
}
