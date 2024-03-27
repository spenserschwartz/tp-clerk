"use client";
import { BubbleMenu, type Editor } from "@tiptap/react";
import { useCallback, useState } from "react";

import {
  TextBoldIcon,
  TextBulletListIcon,
  TextItalicIcon,
  TextLinkIcon,
  TextOrderedListIcon,
  TextUnderlineIcon,
} from "@/icons";
import { TextLinkModal } from "@/modals";

interface BubbleMenuProps {
  editor: Editor;
}

const EditorBubbleMenu = ({ editor }: BubbleMenuProps) => {
  const buttonClassName = (node: string) => {
    return `rounded p-1 hover:bg-gray-600 ${
      editor.isActive(node) ? "bg-blue-500" : ""
    }`;
  };
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

  return (
    editor && (
      <div>
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex space-x-1 rounded-lg bg-gray-800 p-1 text-white"
        >
          {/* <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("link")
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button> */}
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
          {/* <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
       
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button> */}
        </BubbleMenu>

        <TextLinkModal
          openModal={openTextLinkModal}
          setOpenModal={setOpenTextLinkModal}
          editor={editor}
        />
      </div>
    )
  );
};

export default EditorBubbleMenu;
