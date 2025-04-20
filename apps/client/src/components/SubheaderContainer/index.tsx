import BackButton, { BackButton as BackButtonProps } from '../BackButton';

import clsx from 'clsx';

type SubHeaderContainer = BackButtonProps & React.PropsWithChildren;

export default function SubHeaderContainer({ title, children }: SubHeaderContainer) {
  return (
    <header
      style={{
        top: 'calc(var(--header-height) - 5px)',
        zIndex: `calc(var(--header-z-index) + 1)`,
      }}
      className={clsx(
        'fixed inset-x-0 p-2',
        'h-[40px] bg-white shadow-sm',
        'flex items-center justify-between py-3',
      )}
    >
      <BackButton title={title} />
      {children}
    </header>
  );
}
