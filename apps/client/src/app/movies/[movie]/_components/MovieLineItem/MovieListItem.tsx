import Text from '@/components/Text';

type MovieListItemProps = { text: string };

export default function MovieListItem({ text }: MovieListItemProps) {
  return (
    <div className="bg-gray-100 p-2 rounded-md">
      <Text as="h2" typography="subHead-xl">
        {text}
      </Text>
    </div>
  );
}
