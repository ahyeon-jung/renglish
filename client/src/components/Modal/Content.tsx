import clsx from 'clsx';
import Text from '../Text';

type ContentProps = { className?: string } & React.PropsWithChildren;
export default function Content({ children, className }: ContentProps) {
  const isString = typeof children === 'string';

  return isString ? (
    <Text className="text-gray-600 mb-6" as="p" typography="body-xl">
      {children}
    </Text>
  ) : (
    <div className={clsx('flex flex-col gap-2', className)}>{children}</div>
  );
}
