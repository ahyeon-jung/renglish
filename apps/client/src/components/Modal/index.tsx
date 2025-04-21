'use client';

import Content from './Content';
import Overlay from '../Overlay';
import Title from './Title';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type ModalProps = { className?: string; onClose: () => void } & React.PropsWithChildren;

export default function Modal({ className, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : null;
  if (!mounted || !modalRoot) return null;

  return createPortal(
    <>
      <Overlay isModal onClick={onClose} />
      <div
        className={clsx(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-white p-6 rounded-lg shadow-lg z-[var(--overlay-text-z-index)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.Title = Title;
Modal.Content = Content;
