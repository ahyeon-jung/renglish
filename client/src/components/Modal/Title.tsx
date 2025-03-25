import Text from '../Text';

export default function Title({ children }: React.PropsWithChildren) {
  return (
    <Text as="h3" typography="display-md">
      {children}
    </Text>
  );
}
