import Image from 'next/image';
import { Movie } from '@/types/movie';
import Text from '@/components/Text';
import { formatTitle } from '@/utils/format';

export default function MovieInfo({ title, imageUrl, description }: Movie) {
  return (
    <section className="flex justify-between">
      <div className="p-4">
        <Text as="h2" typography="display-md">
          {formatTitle(title)}
        </Text>
        <Text as="p" typography="body-xl">
          {description}
        </Text>
      </div>
      <Image src={imageUrl} alt={`poster of ${title}`} width={200} height={400} />
    </section>
  );
}
