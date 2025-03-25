import Text from '@/components/Text';

export default function StepHeader({ children }: React.PropsWithChildren) {
  return (
    <Text className="mt-4" as="h3" typography="display-md">
      {children}
    </Text>
  );
}
