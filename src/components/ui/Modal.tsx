import { XIcon } from "lucide-react";
import React, { FC } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-red-500 hover:text-red-700 border-[1px] rounded w-fit self-end m-2"
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
