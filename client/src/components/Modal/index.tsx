import Content from './Content';
import Overlay from '../Overlay';
import Title from './Title';
import clsx from 'clsx';

type ModalProps = { onClose: () => void } & React.PropsWithChildren;

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <>
      <Overlay onClick={onClose}></Overlay>
      <div
        className={clsx(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          ' bg-white p-6 rounded-lg shadow-lg z-[var(--overlay-text-z-index)]',
        )}
      >
        {children}
      </div>
    </>
  );
}

Modal.Title = Title;
Modal.Content = Content;
