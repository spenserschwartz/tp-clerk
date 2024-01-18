import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useState } from "react";
import { type ItineraryWithCityInfoType } from "~/types/router";
import { useEditItineraryUserNotes } from "~/utils/hooks";
import { EditorToolbar } from "./components";

interface TextEditorProps {
  data: ItineraryWithCityInfoType;
  editable?: boolean;
  content?: string;
}

const TextEditor = ({ content, data, editable }: TextEditorProps) => {
  const { editItineraryUserNotes, isEditingItineraryUserNotes } =
    useEditItineraryUserNotes();
  const { userNotes, id } = data;
  const [currentNotes, setCurrentNotes] = useState<string>(
    (userNotes as string) ?? ""
  );

  const handleBlur = () => {
    if (!editor) return;
    const newNotes = editor.getHTML();
    if (newNotes !== currentNotes) {
      setCurrentNotes(newNotes);
      editItineraryUserNotes({ id, userNotes: newNotes });
    }
  };

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
      onBlur: handleBlur,
    },
    [editable] // dependencies, when editable changes it's updated
  );

  if (!editor) return null;

  const saveNotes = () => {
    editItineraryUserNotes({ id, userNotes: editor.getHTML() });
  };

  return (
    <>
      <div
        className={`flex min-w-[35ch] max-w-[55ch] flex-col overflow-hidden rounded-lg border border-gray-200 ${
          editable ? "" : "mt-8"
        }`}
      >
        {/* Toolbar */}
        {editable && <EditorToolbar editor={editor} />}

        {/* Editor */}
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>

      <button
        className={`mt-4 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700`}
        onClick={saveNotes}
      >
        Save
      </button>
    </>
  );
};

export default TextEditor;
