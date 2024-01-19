import { useUser } from "@clerk/nextjs";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { type ItineraryWithCityInfoType } from "~/types/router";
import { useEditItineraryUserNotes } from "~/utils/hooks";

interface TextEditorProps {
  data: ItineraryWithCityInfoType;
}

const TextEditor = ({ data }: TextEditorProps) => {
  const { user } = useUser();
  const { editItineraryUserNotes } = useEditItineraryUserNotes();
  const { userNotes, id } = data;
  const [currentNotes, setCurrentNotes] = useState<string>(userNotes ?? "");
  const userCanEdit = user?.id === data.userId;

  const handleBlur = () => {
    if (!editor) return;
    const newNotes = editor.isEmpty ? "" : editor.getHTML();
    if (newNotes !== currentNotes) {
      setCurrentNotes(newNotes);
      editItineraryUserNotes({ id, userNotes: newNotes });
    }
  };

  const editor = useEditor(
    {
      content: data.userNotes,
      editable: userCanEdit,
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 bg-gray-100 ",
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
        Placeholder.configure({
          placeholder: "Add notes here...",
          emptyEditorClass:
            "cursor-text before:opacity-50 before:content-[attr(data-placeholder)] before:absolute before:left-2 before:text-mauve-11 before-pointer-events-none before:flex before:items-center",
        }),
        Underline,
      ],
      onBlur: handleBlur,
    },
    [userCanEdit] // Only reinitialize editor if userCanEdit changes
  );

  // Update userNotes if editor content has changed (debounced)
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);
  useEffect(() => {
    if (!editor) return;
    const newNotes = editor.isEmpty ? "" : editor.getHTML();
    if (newNotes !== currentNotes) {
      setCurrentNotes(newNotes);
      editItineraryUserNotes({ id, userNotes: newNotes });
    }
  }, [currentNotes, debouncedEditor, editItineraryUserNotes, editor, id]);

  if (!editor || (!userCanEdit && currentNotes === "")) return null;
  return (
    <div>
      <p className="w-full truncate rounded-full border-0 p-0 text-center text-xl font-extrabold outline-none transition duration-150 ease-in-out md:px-8 md:text-3xl lg:text-4xl">
        User Notes
      </p>

      <div
        className={`flex min-w-[35ch] max-w-[55ch] flex-col overflow-hidden rounded-lg border border-gray-200 `}
      >
        {/* Toolbar */}
        {/* {editable && <EditorToolbar editor={editor} />} */}

        {/* Editor */}
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
