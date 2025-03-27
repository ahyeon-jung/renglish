import Text from '../Text';

export default function Content({ children }: React.PropsWithChildren) {
  const isString = typeof children === 'string';

  return isString ? (
    <Text className="text-gray-600 mb-6" as="p" typography="body-xl">
      {children}
    </Text>
  ) : (
    <div>{children}</div>
  );
}
