import { MovieInfo as MovieInfoType } from '@/types/script';
import Text from '@/components/Text';
import { formatTitle } from '@/utils/format';

export default function MovieInfo({ title, description }: MovieInfoType) {
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
