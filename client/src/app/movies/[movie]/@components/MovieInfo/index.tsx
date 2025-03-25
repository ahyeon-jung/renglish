import { Movie } from '@/types/movie';
import Text from '@/components/Text';
import { formatTitle } from '@/utils/format';

export default function MovieInfo({ title, description }: Movie) {
  return (
    <div>
      <Text as="h2" typography="display-md">
        {formatTitle(title)}
      </Text>
      <Text as="p" typography="body-xl">
        {description}
      </Text>
    </div>
  );
}
