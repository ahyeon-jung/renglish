import Image from 'next/image';
import { Movie } from '@/types/movie';
import Text from '@/components/Text';
import { formatTitle } from '@/utils/format';

export default function MovieInfo({ title, imageUrl, description }: Movie) {
  return (
    <div>
      <Text as="h2" typography="display-md">
        {formatTitle(title)}
      </Text>
      <Image src={imageUrl} alt={`poster of ${title}`} width={400} height={400} />
      <Text as="p" typography="body-xl">
        {description}
      </Text>
    </div>
  );
}
