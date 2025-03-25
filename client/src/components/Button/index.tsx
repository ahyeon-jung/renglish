import Text from '../Text';
import clsx from 'clsx';

type Button = {
  fit?: boolean;
  size?: 'sm' | 'md' | 'default';
  variants?: 'danger' | 'default';
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({
  fit = false,
  size = 'default',
  className,
  disabled,
  children,
  variants,
  ...props
}: Button) {
  return (
    <button
      className={clsx(
        fit ? '' : 'w-full',
        size === 'sm' ? '35' : size === 'md' ? 'h-[40]' : 'h-[50px]',
        variants === 'danger'
          ? 'bg-red-600 text-white'
          : disabled
            ? 'bg-gray-200'
            : 'bg-yellow-200',
        'px-2 rounded-xl cursor-pointer',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Text typography="headline-md">{children}</Text>
    </button>
  );
}
