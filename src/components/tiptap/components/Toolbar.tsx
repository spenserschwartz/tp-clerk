import { type Editor } from "@tiptap/react";
import {
  TextBoldIcon,
  TextBulletListIcon,
  TextItalicIcon,
  TextLinkIcon,
  TextOrderedListIcon,
  TextUnderlineIcon,
} from "public/icons";
import { useCallback, useState } from "react";
import TextLinkModal from "~/components/modal/TextLink";

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const buttonClassName = (node: string) =>
    `inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 ${
      editor?.isActive(node) ? "bg-gray-200" : ""
    }`;

  const [openTextLinkModal, setOpenTextLinkModal] = useState(false);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleLink = useCallback(() => {
    if (!openTextLinkModal) {
      setOpenTextLinkModal(true);
    } else {
      editor?.chain().focus().unsetLink().run();
    }
  }, [editor, openTextLinkModal]);

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  if (!editor) return null;
  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-x-0.5 border-b border-gray-200 px-2 py-0 align-middle dark:border-gray-700">
        {/* Bold */}
        <button
          className={buttonClassName("bold")}
          type="button"
          onClick={toggleBold}
        >
          <TextBoldIcon />
        </button>

        {/* Italic */}
        <button
          className={buttonClassName("italic")}
          type="button"
          onClick={toggleItalic}
        >
          <TextItalicIcon />
        </button>

        {/* Underline */}
        <button
          className={buttonClassName("underline")}
          type="button"
          onClick={toggleUnderline}
        >
          <TextUnderlineIcon />
        </button>

        {/* Link */}
        <button
          className={buttonClassName("link")}
          type="button"
          onClick={toggleLink}
        >
          <TextLinkIcon />
        </button>

        {/* Ordered List (Numbered) */}
        <button
          className={buttonClassName("orderedList")}
          type="button"
          onClick={toggleOrderedList}
        >
          <TextOrderedListIcon />
        </button>

        {/* Bullet List */}
        <button
          className={buttonClassName("bulletList")}
          type="button"
          onClick={toggleBulletList}
        >
          <TextBulletListIcon />
        </button>
      </div>

      <TextLinkModal
        openModal={openTextLinkModal}
        setOpenModal={setOpenTextLinkModal}
        editor={editor}
      />
    </div>
  );
};

export default EditorToolbar;