import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { type ItineraryWithCityInfoType } from "~/types/router";
import { useEditItineraryUserNotes } from "~/utils/hooks";
import { EditorToolbar } from "./components";

interface TextEditorProps {
  data: ItineraryWithCityInfoType;
  editable?: boolean;
  content?: string;
}

const TextEditor = ({ content, data, editable }: TextEditorProps) => {
  const { editItineraryUserNotes } = useEditItineraryUserNotes();
  const { userNotes, id } = data;
  const [currentNotes, setCurrentNotes] = useState<string>(userNotes! ?? "");

  const handleBlur = () => {
    if (!editor) return;
    const newNotes = editor.getHTML();
    if (newNotes !== currentNotes) {
      setCurrentNotes(newNotes);
      editItineraryUserNotes({ id, userNotes: newNotes });
    }
  };

  const editor = useEditor({
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
    onBlur: handleBlur,
  });

  // Update userNotes if editor content has changed (debounced)
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);
  useEffect(() => {
    if (!editor) return;
    const newNotes = editor.getHTML();
    if (newNotes !== currentNotes) {
      setCurrentNotes(newNotes);
      editItineraryUserNotes({ id, userNotes: newNotes });
    }
  }, [currentNotes, debouncedEditor, editItineraryUserNotes, editor, id]);

  if (!editor) return null;
  return (
    <>
      <div
        className={`flex min-w-[35ch] max-w-[55ch] flex-col overflow-hidden rounded-lg border border-gray-200 ${
          editable ? "" : "mt-8"
        }`}
      >
        {/* Toolbar */}
        {/* {editable && <EditorToolbar editor={editor} />} */}

        {/* Editor */}
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
