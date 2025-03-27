import Text from '@/components/Text';

type LineItem = { text: string };
export default function LineItem({ text }: LineItem) {
  return (
    <div className="bg-gray-100 p-2 rounded-md">
      <Text as="h2" typography="subHead-xl">
        {text}
      </Text>
    </div>
  );
}
