import { X } from 'lucide-react';
import clsx from 'clsx';

type DialogProps = {
  isSub?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
} & React.PropsWithChildren;

export default function Dialog({ isSub, isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[var(--nav-z-index)]',
        isSub ? 'top-[100px]' : '',
        'flex items-center justify-end bg-black/50',
      )}
      onClick={onClose}
    >
      {isSub ? (
        <>{children}</>
      ) : (
        <div
          className={clsx(
            'h-full w-[200px] bg-white p-8',
            'shadow-lg transform transition-transform duration-300',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4">
            <X className="w-6 h-6 text-gray-700" />
          </button>
          {children}
        </div>
      )}
    </div>
  );
}
