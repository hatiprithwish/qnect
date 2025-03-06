import { XIcon } from "lucide-react";
import React, { FC } from "react";
import ReactDOM from "react-dom";
import { cn } from "../../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center",
          width ? width : "w-11/12 md:w-1/2"
        )}
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
