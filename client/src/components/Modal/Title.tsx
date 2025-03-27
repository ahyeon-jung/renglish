import Text from '../Text';

export default function Title({ children }: React.PropsWithChildren) {
  const isString = typeof children === 'string';

  return isString ? (
    <Text as="h3" typography="display-md">
      {children}
    </Text>
  ) : (
    <div>{children}</div>
  );
}
