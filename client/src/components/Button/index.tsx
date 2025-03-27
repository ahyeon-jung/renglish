import Text from '../Text';
import clsx from 'clsx';

export type ButtonProps = {
  fit?: boolean;
  size?: 'sm' | 'md' | 'default';
  variants?: 'danger' | 'default' | 'primary' | 'secondary' | 'success';
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({
  fit = false,
  size = 'default',
  className,
  disabled,
  children,
  variants = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        fit ? '' : 'w-full',
        'px-2 rounded-xl',
        size === 'sm' ? '35' : size === 'md' ? 'h-[40]' : 'h-[50px]',
        {
          'bg-yellow-200 text-black cursor-pointer': variants === 'default',
          'bg-red-600 text-white': variants === 'danger',
          'bg-blue-400 text-white': variants === 'primary',
          'bg-gray-400 text-white': variants === 'secondary',
          'bg-green-600 text-white': variants === 'success',
          'bg-gray-200 cursor-not-allowed': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Text typography="headline-md">{children}</Text>
    </button>
  );
}
