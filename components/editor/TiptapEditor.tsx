"use client";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";

type Props = {
  initialContent?: object;
  onChange: (json: object) => void;
};

export function TiptapEditor({ initialContent, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder: "Start writing your business letter..." })
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose mx-auto min-h-[1040px] w-[794px] max-w-none bg-white p-12 shadow"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    }
  });

  return <EditorContent editor={editor} />;
}
