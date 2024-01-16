import { type Editor } from "@tiptap/react";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextLinkIcon,
  TextUnderlineIcon,
} from "public/icons";
import { useCallback } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const buttonClassName = (node: string) =>
    `inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 ${
      editor?.isActive(node) ? "bg-gray-200" : ""
    }`;

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
    let url = window.prompt("Enter the URL");

    // Validate and correct the URL if necessary
    if (url) {
      // Add 'http://' if no protocol is specified
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
      }

      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  return (
    <div>
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

        <button
          className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          type="button"
          data-hs-editor-ol
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="10" x2="21" y1="6" y2="6" />
            <line x1="10" x2="21" y1="12" y2="12" />
            <line x1="10" x2="21" y1="18" y2="18" />
            <path d="M4 6h1v4" />
            <path d="M4 10h2" />
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
          </svg>
        </button>
        <button
          className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          type="button"
          data-hs-editor-ul
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
        </button>
        <button
          className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          type="button"
          data-hs-editor-blockquote
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 6H3" />
            <path d="M21 12H8" />
            <path d="M21 18H8" />
            <path d="M3 12v6" />
          </svg>
        </button>
        <button
          className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          type="button"
          data-hs-editor-code
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
