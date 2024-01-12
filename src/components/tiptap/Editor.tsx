import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const TextEditor = () => {
  // const editor = useEditor({
  //   extensions: [Document, Paragraph, Text, BulletList, ListItem],
  //   content: `
  //       <ul>
  //         <li>A list item</li>
  //         <li>And another one</li>
  //       </ul>
  //     `,
  // });
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
  <pre><code class="language-css">body {
    display: none;
  }</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        toggleBulletList
      </button>
      <button
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem")}
      >
        splitListItem
      </button>
      <button
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem")}
      >
        sinkListItem
      </button>
      <button
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem")}
      >
        liftListItem
      </button>

      <EditorContent editor={editor} />
    </>
  );
};

export default TextEditor;
