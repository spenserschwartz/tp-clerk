import { type Editor } from "@tiptap/react";
import { useCallback, useRef, useState, type Dispatch } from "react";
import ModalWrapper from "./Wrapper";

interface TextLinkModalProps {
  editor: Editor;
  openModal: boolean;
  setOpenModal: Dispatch<boolean>;
}

const TextLinkModal = ({
  openModal,
  setOpenModal,
  editor,
}: TextLinkModalProps) => {
  const cancelButtonRef = useRef(null);
  const [url, setUrl] = useState<string>(
    editor.getAttributes("link").href as string
  );

  const saveLink = useCallback(() => {
    if (url) {
      let processedUrl = url;
      if (
        !processedUrl.startsWith("http://") &&
        !processedUrl.startsWith("https://")
      ) {
        processedUrl = "http://" + processedUrl;
      }

      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: processedUrl })
        .run();
    }

    // Validate and correct the URL if necessary
    if (url) {
      // Add 'http://' if no protocol is specified
      // if (!url.startsWith("http://") && !url.startsWith("https://")) {
      //   setUrl("http://" + url);
      // }
      // editor
      //   ?.chain()
      //   .focus()
      //   .extendMarkRange("link")
      //   .setLink({ href: processedUrl })
      //   .run();
    } else if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    }

    setOpenModal(false);
  }, [editor, url, setOpenModal]);

  console.log("url", url);

  return (
    <ModalWrapper openModal={openModal} setOpenModal={setOpenModal}>
      <div className="">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Update Link
          </label>
          <div className="mt-2">
            <input
              type="url"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="travelperfect.io"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            onClick={saveLink}
          >
            Save
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            onClick={() => setOpenModal(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TextLinkModal;
