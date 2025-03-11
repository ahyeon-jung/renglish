import { X } from "lucide-react";
import clsx from "clsx";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
} & React.PropsWithChildren;

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/50"
      onClick={onClose}
    >
      <div
        className={clsx(
          "h-full w-[200px] bg-white p-8",
          "shadow-lg transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-6 h-6 text-gray-700" />
        </button>
        {children}
      </div>
    </div>
  );
}
