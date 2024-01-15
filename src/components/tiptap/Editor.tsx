import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorToolbar } from "./components";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2",
      },
    },
    //   content: `
    //     <h2>
    //       Hi there,
    //     </h2>
    //     <p>
    //       this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    //     </p>
    //     <ul>
    //       <li>
    //         That’s a bullet list with one …
    //       </li>
    //       <li>
    //         … or two list items.
    //       </li>
    //     </ul>
    //     <p>
    //       Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    //     </p>
    // <pre><code class="language-css">body {
    //   display: none;
    // }</code></pre>
    //     <p>
    //       I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    //     </p>
    //     <blockquote>
    //       Wow, that’s amazing. Good work, boy! 👏
    //       <br />
    //       — Mom
    //     </blockquote>
    //   `,
    content: "hey",
  });

  if (!editor) return null;
  return (
    <div className="flex max-w-[55ch] flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Editor */}
      <div className="">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
