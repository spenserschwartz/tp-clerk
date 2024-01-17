import { type Editor } from "@tiptap/react";
import { type Dispatch } from "react";
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
  return (
    <ModalWrapper openModal={openModal} setOpenModal={setOpenModal}>
      <div className="mt-2">
        <p className="text-lg text-gray-700"> Edit link </p>

        <input
          className="mt-2 w-full rounded-md border border-gray-300 p-2 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="www.example.com"
        />
      </div>
    </ModalWrapper>
  );
};

export default TextLinkModal;
