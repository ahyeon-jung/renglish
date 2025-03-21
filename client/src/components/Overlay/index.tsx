import React from 'react';
import clsx from 'clsx';

export default function Overlay() {
  return (
    <div
      className={clsx(
        'absolute inset-0 z-[var(--overlay-z-index)]',
        'flex items-center justify-end bg-black/50',
      )}
    ></div>
  );
}
