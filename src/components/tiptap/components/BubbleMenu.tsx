import { BubbleMenu, Editor, EditorContent, useEditor } from "@tiptap/react";

interface BubbleMenuProps {
  editor: Editor;
}

const EditorBubbleMenu = ({ editor }: BubbleMenuProps) => {
  return (
    editor && (
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          strike
        </button>
      </BubbleMenu>
    )
  );
};

export default EditorBubbleMenu;
