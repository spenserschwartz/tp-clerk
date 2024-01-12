import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "Editor",
      },
    },
    content: `
      <h1>Welcome to your fresh Tiptap Code Sandbox</h1>
      <p>You can create a demo for your issue inside of this sandbox and share it with us.</p>
    `,
  });

  return (
    <div className="">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
