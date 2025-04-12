import Container from '../Container';
import Image from 'next/image';
import Link from 'next/link';
import Overlay from '@/components/Overlay';
import { PATHS } from '@/constants/path';
import Text from '@/components/Text';
import getLatestMovieAction from '@/app/_actions/movies/getLatestMovie';

export default async function LatestScript() {
  const { data } = await getLatestMovieAction();

  return (
    <Container label="Latest Script" goTo={PATHS.MOVIE.LIST}>
      <Link
        href={`/movies/${data.title}/${data.scenes[0].id}/script/en`}
        className="group relative h-[100px] overflow-hidden rounded-xl"
      >
        <Text
          className="absolute right-4 bottom-0 text-white group-hover:text-orange-400 z-[var(--overlay-text-z-index)]"
          typography="display-xl"
        >
          {data.title}
        </Text>
        <Overlay />
        <Image
          alt="inside out poster"
          src={data.imageUrl}
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      </Link>
    </Container>
  );
}
