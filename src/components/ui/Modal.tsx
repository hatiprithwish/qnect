import { XIcon } from "lucide-react";

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <XIcon
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xs cursor-pointer"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
