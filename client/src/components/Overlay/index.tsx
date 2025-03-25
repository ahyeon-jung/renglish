import React from 'react';
import clsx from 'clsx';

type OverlayProps = { onClick?: () => void };

export default function Overlay({ onClick }: OverlayProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        onClick ? 'fixed' : 'absolute',
        'inset-0 z-[var(--overlay-z-index)]',
        'flex items-center justify-end bg-black/50',
      )}
    ></div>
  );
}
