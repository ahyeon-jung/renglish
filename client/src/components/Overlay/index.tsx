import React from 'react';
import clsx from 'clsx';

type OverlayProps = { isModal?: boolean; onClick?: () => void };

export default function Overlay({ isModal = false, onClick }: OverlayProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        isModal ? 'z-[var(--overlay-modal-index)]' : 'z-[var(--overlay-z-index)]',
        onClick ? 'fixed' : 'absolute',
        'inset-0',
        'flex items-center justify-end bg-black/50',
      )}
    ></div>
  );
}
