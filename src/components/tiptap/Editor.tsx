import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorToolbar } from "./components";

interface TextEditorProps {
  editable?: boolean;
  content?: string;
}

const TextEditor = ({ content, editable }: TextEditorProps) => {
  const editor = useEditor(
    {
      content,
      editable,
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2",
        },
      },
      extensions: [
        StarterKit,
        Link.configure({
          linkOnPaste: false,
          protocols: [
            {
              scheme: "tel",
              optionalSlashes: true,
            },
          ],
        }),
        Underline,
      ],
    },
    [editable] // dependencies, when editable changes it's updated
  );

  console.log("editable", editable);

  if (!editor) return null;
  return (
    <div className="flex max-w-[55ch] flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Editor */}
      <div className="">
        <EditorContent editor={editor} disabled />
      </div>
    </div>
  );
};

export default TextEditor;
